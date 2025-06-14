import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ProductStatus } from '@prisma/client';

// GET /api/dashboard/products - Fetch products with filtering and search
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const brand = searchParams.get('brand') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = searchParams.get('sortBy') || 'updatedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const whereClause: any = {
      deletedAt: null, // Only active products
    };

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ];
    }

    if (category) {
      whereClause.Category = { slug: category };
    }

    if (status && Object.values(ProductStatus).includes(status as ProductStatus)) {
      whereClause.status = status as ProductStatus;
    }

    if (brand) {
      whereClause.Brand = { slug: brand };
    }

    // Get total count for pagination
    const totalCount = await prisma.product.count({ where: whereClause });

    // Fetch products with relationships
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        Category: true,
        Brand: true,
        Images: {
          orderBy: { position: 'asc' },
          take: 3
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
            OrderItems: true
          }
        }
      },
      orderBy: {
        [sortBy]: sortOrder as 'asc' | 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/dashboard/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions
    if (!['admin', 'manager'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.categoryId) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this name already exists' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        slug,
        createdBy: session.user.id,
        status: ProductStatus.DRAFT
      },
      include: {
        Category: true,
        Brand: true,
        Images: true,
        Creator: {
          include: { Profile: true }
        }
      }
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PUT /api/dashboard/products - Bulk update products
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions
    if (!['admin', 'manager'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { productIds, action, data } = await request.json();

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: 'Product IDs are required' },
        { status: 400 }
      );
    }

    let updateData: any = {};

    switch (action) {
      case 'publish':
        updateData = { 
          status: ProductStatus.PUBLISHED,
          approvedBy: session.user.id,
          approvedAt: new Date()
        };
        break;
      case 'archive':
        updateData = { status: ProductStatus.ARCHIVED };
        break;
      case 'draft':
        updateData = { status: ProductStatus.DRAFT };
        break;
      case 'delete':
        updateData = { deletedAt: new Date() };
        break;
      case 'update':
        updateData = data;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    const updatedProducts = await prisma.product.updateMany({
      where: {
        id: { in: productIds },
        deletedAt: null
      },
      data: updateData
    });

    return NextResponse.json({
      message: `${updatedProducts.count} products updated successfully`,
      updatedCount: updatedProducts.count
    });

  } catch (error) {
    console.error('Error bulk updating products:', error);
    return NextResponse.json(
      { error: 'Failed to update products' },
      { status: 500 }
    );
  }
} 