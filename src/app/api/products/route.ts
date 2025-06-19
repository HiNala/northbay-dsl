import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for product query parameters
const productQuerySchema = z.object({
  status: z.enum(['draft', 'published', 'archived']).optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  include: z.string().optional(), // 'brand,category,images' etc.
  admin: z.string().optional().default('false').transform(str => str === 'true'),
  sortBy: z.enum(['name', 'price', 'createdAt', 'updatedAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = productQuerySchema.parse({
      status: searchParams.get('status'),
      category: searchParams.get('category'),
      brand: searchParams.get('brand'),
      search: searchParams.get('search'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      include: searchParams.get('include'),
      admin: searchParams.get('admin'),
      sortBy: searchParams.get('sortBy'),
      sortOrder: searchParams.get('sortOrder'),
    });

    // Check if admin access is required
    if (query.admin) {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const hasAccess = session.user.roles?.some(role => 
        ['admin', 'manager', 'employee', 'super_admin'].includes(role)
      );

      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }
    }

    // Build include object based on request
    const includeOptions: any = {};
    if (query.include) {
      const includes = query.include.split(',');
      if (includes.includes('brand')) includeOptions.Brand = true;
      if (includes.includes('category')) includeOptions.Category = true;
      if (includes.includes('images')) includeOptions.Images = true;
      if (includes.includes('variants')) includeOptions.Variants = true;
      if (includes.includes('finishes')) includeOptions.Finishes = { include: { Finish: true } };
    }

    // Build where clause
    const whereClause: any = {
      deletedAt: null, // Only active products
    };

    // Status filter (for admin, default to published for public)
    if (query.status) {
      whereClause.status = query.status;
    } else if (!query.admin) {
      whereClause.status = 'published'; // Only published products for public
    }

    // Category filter
    if (query.category) {
      whereClause.Category = {
        slug: query.category
      };
    }

    // Brand filter
    if (query.brand) {
      whereClause.Brand = {
        slug: query.brand
      };
    }

    // Search filter
    if (query.search) {
      whereClause.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { tags: { has: query.search } },
        { Brand: { name: { contains: query.search, mode: 'insensitive' } } },
        { Category: { name: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    // Calculate pagination
    const skip = (query.page - 1) * query.limit;

    // Build order by clause
    const orderBy: any = {};
    orderBy[query.sortBy] = query.sortOrder;

    // Fetch products with count
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: includeOptions,
        orderBy,
        skip,
        take: query.limit,
      }),
      prisma.product.count({
        where: whereClause,
      })
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / query.limit);
    const hasNextPage = query.page < totalPages;
    const hasPrevPage = query.page > 1;

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page: query.page,
        limit: query.limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      meta: {
        searchQuery: query.search,
        statusFilter: query.status,
        categoryFilter: query.category,
        brandFilter: query.brand,
      }
    });

  } catch (error) {
    console.error('Products API Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid query parameters', 
        details: error.errors 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Failed to fetch products' 
    }, { status: 500 });
  }
}

// POST endpoint for creating new products
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

    const body = await request.json();
    
    // Basic validation for product creation
    const productData = {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: body.description,
      specifications: body.specifications,
      price: body.price ? parseFloat(body.price) : null,
      comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
      inStock: body.inStock ?? true,
      stockQuantity: body.stockQuantity ? parseInt(body.stockQuantity) : 0,
      trackInventory: body.trackInventory ?? false,
      status: body.status || 'draft',
      type: body.type || 'physical',
      tags: body.tags || [],
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      categoryId: body.categoryId,
      brandId: body.brandId,
      bulkImportBatch: body.bulkImportBatch,
      metaData: body.metaData,
    };

    const product = await prisma.product.create({
      data: productData,
      include: {
        Brand: true,
        Category: true,
        Images: {
          orderBy: { position: 'asc' }
        }
      }
    });

    // Create product images if provided
    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
      const imageData = body.images.map((img: any, index: number) => ({
        productId: product.id,
        url: img.url,
        alt: img.alt || null,
        position: img.position || index,
        isHero: img.isHero || false,
      }));

      await prisma.productImage.createMany({
        data: imageData
      });

      // Fetch the updated product with images
      const updatedProduct = await prisma.product.findUnique({
        where: { id: product.id },
        include: {
          Brand: true,
          Category: true,
          Images: {
            orderBy: { position: 'asc' }
          }
        }
      });

      return NextResponse.json({
        success: true,
        product: updatedProduct
      }, { status: 201 });
    }

    return NextResponse.json({
      success: true,
      product
    }, { status: 201 });

  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({ 
      error: 'Failed to create product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 