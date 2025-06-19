import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProducts = searchParams.get('includeProducts') === 'true';

    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      include: includeProducts ? {
        _count: {
          select: {
            Products: {
              where: {
                status: 'PUBLISHED',
                deletedAt: null
              }
            }
          }
        }
      } : undefined,
      orderBy: {
        sortOrder: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      categories: categories.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        imageUrl: category.imageUrl,
        sortOrder: category.sortOrder,
        productCount: includeProducts ? (category as any)._count?.Products : undefined,
        parentId: category.parentId
      }))
    });

  } catch (error) {
    console.error('Categories API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch categories' 
    }, { status: 500 });
  }
} 