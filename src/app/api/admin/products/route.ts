import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/products - Get all products with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const brand = searchParams.get('brand')
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (category && category !== 'All') {
      where.Category = {
        name: category
      }
    }
    
    if (status && status !== 'All') {
      where.status = status.toLowerCase()
    }
    
    if (brand && brand !== 'All') {
      where.Brand = {
        name: brand
      }
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get products with relations
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          Category: true,
          Brand: true,
          Images: {
            orderBy: { position: 'asc' },
            take: 1 // Just get hero image for list view
          },
          Finishes: {
            include: {
              Finish: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST /api/admin/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      sku,
      description,
      specifications,
      price,
      comparePrice,
      categoryId,
      brandId,
      status = 'draft',
      trackInventory = false,
      stockQuantity,
      tags = [],
      seoTitle,
      seoDescription,
      finishes = [],
      images = []
    } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 })
    }

    if (!categoryId) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }

    // Generate SKU if not provided
    const finalSku = sku || `PROD-${Date.now()}`

    // Generate slug from product name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if SKU already exists
    const existingSku = await prisma.product.findUnique({
      where: { sku: finalSku }
    })

    if (existingSku) {
      return NextResponse.json({ error: 'SKU already exists' }, { status: 400 })
    }

    // Check if slug already exists
    const existingSlug = await prisma.product.findUnique({
      where: { slug }
    })

    if (existingSlug) {
      return NextResponse.json({ error: 'Product with similar name already exists' }, { status: 400 })
    }

    // Create product with relations
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        sku: finalSku,
        description,
        specifications: specifications ? JSON.parse(specifications) : null,
        price: price ? parseFloat(price) : null,
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        categoryId,
        brandId: brandId || null,
        status,
        trackInventory,
        stockQuantity: trackInventory ? parseInt(stockQuantity || '0') : null,
        tags,
        seoTitle: seoTitle || name,
        seoDescription,
        // Create finish relations
        Finishes: {
          create: finishes.map((finishId: string, index: number) => ({
            finishId,
            isDefault: index === 0 // First finish is default
          }))
        },
        // Create image relations (will be handled separately for file uploads)
        Images: {
          create: images.map((imageUrl: string, index: number) => ({
            url: imageUrl,
            position: index,
            isHero: index === 0,
            alt: `${name} - Image ${index + 1}`
          }))
        }
      },
      include: {
        Category: true,
        Brand: true,
        Images: true,
        Finishes: {
          include: {
            Finish: true
          }
        }
      }
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
} 