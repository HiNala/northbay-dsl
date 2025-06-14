import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ProductStatus } from '@prisma/client';

// GET /api/dashboard/products/[id] - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
        deletedAt: null
      },
      include: {
        Category: true,
        Brand: true,
        Images: {
          orderBy: { position: 'asc' }
        },
        Finishes: {
          include: {
            Finish: true
          }
        },
        Variants: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        },
        Creator: {
          include: { Profile: true }
        },
        ApprovedBy: {
          include: { Profile: true }
        },
        _count: {
          select: {
            WishlistItems: true,
            CartItems: true,
            OrderItems: true,
            ProjectLinks: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/dashboard/products/[id] - Update single product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions
    if (!['admin', 'manager'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
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

    const data = await request.json();
    
    // Generate new slug if name changed
    let updateData = { ...data };
    if (data.name && data.name !== existingProduct.name) {
      const slug = data.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if new slug already exists
      const slugExists = await prisma.product.findFirst({
        where: {
          slug,
          id: { not: params.id },
          deletedAt: null
        }
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'A product with this name already exists' },
          { status: 400 }
        );
      }

      updateData.slug = slug;
    }

    // Handle status changes
    if (data.status && data.status !== existingProduct.status) {
      if (data.status === ProductStatus.PUBLISHED) {
        updateData.approvedBy = session.user.id;
        updateData.approvedAt = new Date();
      }
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
      include: {
        Category: true,
        Brand: true,
        Images: {
          orderBy: { position: 'asc' }
        },
        Creator: {
          include: { Profile: true }
        },
        ApprovedBy: {
          include: { Profile: true }
        }
      }
    });

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/dashboard/products/[id] - Soft delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions - only admin and manager can delete
    if (!['admin', 'manager'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
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
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        status: ProductStatus.ARCHIVED
      }
    });

    return NextResponse.json({
      message: 'Product deleted successfully',
      product: { id: product.id, name: product.name }
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
