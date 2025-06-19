import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProducts = searchParams.get('includeProducts') === 'true';

    const brands = await prisma.brand.findMany({
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
        name: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      brands: brands.map(brand => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        logoUrl: brand.logoUrl,
        productCount: includeProducts ? (brand as any)._count?.Products : undefined
      }))
    });

  } catch (error) {
    console.error('Brands API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch brands' 
    }, { status: 500 });
  }
} 