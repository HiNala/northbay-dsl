import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for product updates
const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  specifications: z.record(z.any()).optional(),
  price: z.number().or(z.string().transform(Number)).optional(),
  comparePrice: z.number().or(z.string().transform(Number)).optional(),
  inStock: z.boolean().optional(),
  stockQuantity: z.number().or(z.string().transform(Number)).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  type: z.string().optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
  aiGeneratedDescription: z.boolean().optional(),
  metaData: z.record(z.any()).optional(),
});

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { 
        id: params.id,
        deletedAt: null 
      },
      include: {
        Brand: true,
        Category: true,
        Images: true,
        Variants: true,
        Finishes: {
          include: {
            Finish: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if this requires admin access (for draft/archived products)
    if (product.status !== 'published') {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const hasAccess = session.user.roles?.some(role => 
        ['admin', 'manager', 'employee', 'super_admin'].includes(role)
      );

      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    return NextResponse.json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch product' 
    }, { status: 500 });
  }
}

// PATCH update product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const updateData = updateProductSchema.parse(body);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { 
        id: params.id,
        deletedAt: null 
      }
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Generate slug if name is being updated
    if (updateData.name && !body.slug) {
      (updateData as any).slug = updateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        Brand: true,
        Category: true,
        Images: true,
      }
    });

    return NextResponse.json({
      success: true,
      product: updatedProduct
    });

  } catch (error) {
    console.error('Product update error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid update data', 
        details: error.errors 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Failed to update product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE product (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has admin access (only admins can delete)
    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden - Admin access required for deletion' }, { status: 403 });
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { 
        id: params.id,
        deletedAt: null 
      }
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Soft delete the product
    await prisma.product.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        status: 'archived'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Product deletion error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete product' 
    }, { status: 500 });
  }
} 