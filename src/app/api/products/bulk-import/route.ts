import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { processImportFile, ImportedProduct } from '@/lib/bulk-import';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Validation schema for bulk import request
const bulkImportSchema = z.object({
  fileType: z.enum(['excel', 'csv']),
  columnMapping: z.record(z.string()).optional(),
  importOptions: z.object({
    updateExisting: z.boolean().default(false),
    skipDuplicates: z.boolean().default(true),
    defaultStatus: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
    defaultCategoryId: z.string().uuid().optional(),
    defaultBrandId: z.string().uuid().optional(),
    bulkImportBatch: z.string().optional(),
  }).optional(),
});

// POST endpoint for processing import files
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has admin/employee access
    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'employee', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const metadataString = formData.get('metadata') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv', // .csv
      'application/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload Excel (.xlsx, .xls) or CSV files only.' 
      }, { status: 400 });
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 10MB.' 
      }, { status: 400 });
    }

    // Parse metadata
    let metadata: any = {};
    if (metadataString) {
      try {
        metadata = JSON.parse(metadataString);
      } catch {
        return NextResponse.json({ error: 'Invalid metadata format' }, { status: 400 });
      }
    }

    const validatedMetadata = bulkImportSchema.parse(metadata);

    // Read file content
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileType = file.type.includes('csv') ? 'csv' as const : 'excel' as const;

    // Process the import file
    const importResult = processImportFile(
      fileType === 'csv' ? fileBuffer.toString('utf-8') : fileBuffer,
      fileType,
      validatedMetadata.columnMapping
    );

    // If this is just a preview request, return the results without saving
    const isPreview = formData.get('preview') === 'true';
    if (isPreview) {
      return NextResponse.json({
        success: true,
        preview: true,
        result: {
          ...importResult,
          // Limit preview data to first 10 rows
          data: importResult.data.slice(0, 10),
        }
      });
    }

    // If there are critical errors, don't proceed with import
    const criticalErrors = importResult.errors.filter(e => e.field === 'name');
    if (criticalErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Critical validation errors found',
        result: importResult
      }, { status: 400 });
    }

    // Generate batch ID for tracking
    const batchId = validatedMetadata.importOptions?.bulkImportBatch || `import-${uuidv4()}`;
    const importOptions = validatedMetadata.importOptions || {
      updateExisting: false,
      skipDuplicates: true,
      defaultStatus: 'DRAFT' as const,
      defaultCategoryId: undefined,
      defaultBrandId: undefined,
    };

    // Process valid products for import
    const validProducts = importResult.data.filter((_, index) => {
      const hasNameError = importResult.errors.some(e => 
        e.row === index + 1 && e.field === 'name'
      );
      return !hasNameError;
    });

    const results = {
      imported: 0,
      skipped: 0,
      updated: 0,
      errors: [] as string[],
    };

    // Import products in batches to avoid overwhelming the database
    const BATCH_SIZE = 50;
    const batches = [];
    
    for (let i = 0; i < validProducts.length; i += BATCH_SIZE) {
      batches.push(validProducts.slice(i, i + BATCH_SIZE));
    }

    for (const batch of batches) {
      const importPromises = batch.map(async (product) => {
        try {
          // Check for existing product by name
          const existingProduct = await prisma.product.findFirst({
            where: {
              name: product.name,
              deletedAt: null,
            }
          });

          if (existingProduct) {
            if (importOptions.updateExisting) {
              // Update existing product
              await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                  description: product.description || existingProduct.description,
                  price: product.price || existingProduct.price,
                  comparePrice: product.comparePrice || existingProduct.comparePrice,
                  sku: product.sku || existingProduct.sku,
                  tags: product.tags || existingProduct.tags || undefined,
                  specifications: product.specifications || existingProduct.specifications || undefined,
                  inStock: product.inStock ?? existingProduct.inStock,
                  stockQuantity: product.stockQuantity ?? existingProduct.stockQuantity,
                  status: (product.status as any) || existingProduct.status,
                  type: product.type || existingProduct.type,
                  categoryId: importOptions.defaultCategoryId || existingProduct.categoryId,
                  brandId: importOptions.defaultBrandId || existingProduct.brandId,
                  bulkImportBatch: batchId,
                  metaData: {
                    ...(typeof existingProduct.metaData === 'object' && existingProduct.metaData ? existingProduct.metaData as Record<string, any> : {}),
                    lastImport: new Date().toISOString(),
                    importBatch: batchId,
                  } as any,
                  updatedAt: new Date(),
                }
              });
              results.updated++;
            } else if (importOptions.skipDuplicates) {
              results.skipped++;
            } else {
              results.errors.push(`Duplicate product: ${product.name}`);
            }
          } else {
            // Create new product
            const slug = product.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');

            await prisma.product.create({
              data: {
                name: product.name,
                slug: `${slug}-${Date.now()}`, // Ensure unique slug
                description: product.description,
                price: product.price,
                comparePrice: product.comparePrice,
                sku: product.sku,
                tags: product.tags || [],
                specifications: product.specifications,
                inStock: product.inStock ?? true,
                stockQuantity: product.stockQuantity ?? 0,
                trackInventory: product.stockQuantity !== undefined,
                status: (product.status as any) || importOptions.defaultStatus || 'DRAFT',
                type: product.type || 'physical',
                categoryId: importOptions.defaultCategoryId,
                brandId: importOptions.defaultBrandId,
                bulkImportBatch: batchId,
                metaData: {
                  importedAt: new Date().toISOString(),
                  importBatch: batchId,
                  importedBy: session.user.id,
                },
              }
            });
            results.imported++;
          }
        } catch (error) {
          console.error(`Error importing product ${product.name}:`, error);
          results.errors.push(`Failed to import ${product.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      });

      // Process batch
      await Promise.all(importPromises);
    }

    return NextResponse.json({
      success: true,
      batchId,
      results: {
        ...results,
        total: validProducts.length,
      },
      originalResult: {
        totalRows: importResult.totalRows,
        validRows: importResult.validRows,
        errors: importResult.errors,
        duplicates: importResult.duplicates,
        warnings: importResult.warnings,
      }
    });

  } catch (error) {
    console.error('Bulk import error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data', 
        details: error.errors 
      }, { status: 400 });
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({ 
      error: 'Bulk import failed',
      details: errorMessage
    }, { status: 500 });
  }
}

// GET endpoint for checking import status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId');

    if (!batchId) {
      // Return import history
      const imports = await prisma.product.groupBy({
        by: ['bulkImportBatch'],
        where: {
          bulkImportBatch: { not: null },
          deletedAt: null,
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
        take: 10,
      });

      return NextResponse.json({
        success: true,
        imports: imports.map(imp => ({
          batchId: imp.bulkImportBatch,
          productCount: imp._count.id,
        }))
      });
    }

    // Return specific batch info
    const products = await prisma.product.findMany({
      where: {
        bulkImportBatch: batchId,
        deletedAt: null,
      },
      include: {
        Category: true,
        Brand: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json({
      success: true,
      batchId,
      products,
      count: products.length,
    });

  } catch (error) {
    console.error('Import status check error:', error);
    return NextResponse.json({ 
      error: 'Failed to check import status' 
    }, { status: 500 });
  }
} 