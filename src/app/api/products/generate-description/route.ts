import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateProductDescription, ProductData, AIDescriptionOptions } from '@/lib/ai';
import { z } from 'zod';

// Validation schema for AI description request
const generateDescriptionSchema = z.object({
  productId: z.string().uuid(),
  options: z.object({
    type: z.enum(['short', 'detailed', 'seo', 'luxury']).optional().default('luxury'),
    tone: z.enum(['professional', 'luxury', 'technical', 'friendly']).optional().default('luxury'),
    length: z.enum(['brief', 'medium', 'detailed']).optional().default('medium'),
    includeFeatures: z.boolean().optional().default(true),
    includeBenefits: z.boolean().optional().default(true),
    seoKeywords: z.array(z.string()).optional(),
  }).optional().default({
    type: 'luxury',
    tone: 'luxury',
    length: 'medium',
    includeFeatures: true,
    includeBenefits: true
  }),
  updateProduct: z.boolean().optional().default(true) // Whether to save the generated description
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
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
    const { productId, options, updateProduct } = generateDescriptionSchema.parse(body);

    // Fetch product data
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        Category: true,
        Brand: true,
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Prepare product data for AI
    const productData: ProductData = {
      name: product.name,
      category: product.Category?.name,
      brand: product.Brand?.name,
      specifications: product.specifications as Record<string, any> || {},
      price: product.price ? Number(product.price) : undefined,
      type: product.type,
      tags: product.tags,
      existingDescription: product.description || undefined,
    };

    // Generate AI description
    const aiResult = await generateProductDescription(productData, options as AIDescriptionOptions);

    // Update product in database if requested
    if (updateProduct) {
      await prisma.product.update({
        where: { id: productId },
        data: {
          description: aiResult.description,
          seoTitle: aiResult.seoTitle,
          seoDescription: aiResult.seoDescription,
          aiGeneratedDescription: true,
          lastAiUpdate: new Date(),
          updatedAt: new Date(),
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        description: aiResult.description,
        seoTitle: aiResult.seoTitle,
        seoDescription: aiResult.seoDescription,
        quality_score: aiResult.quality_score,
        word_count: aiResult.word_count,
        updated: updateProduct
      }
    });

  } catch (error) {
    console.error('AI Description Generation Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data', 
        details: error.errors 
      }, { status: 400 });
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({ 
      error: 'Failed to generate description',
      details: errorMessage
    }, { status: 500 });
  }
}

// GET endpoint for checking AI generation status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        description: true,
        aiGeneratedDescription: true,
        lastAiUpdate: true,
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        hasDescription: !!product.description,
        isAiGenerated: product.aiGeneratedDescription,
        lastAiUpdate: product.lastAiUpdate,
        canGenerate: true // Could add more logic here for rate limiting
      }
    });

  } catch (error) {
    console.error('AI status check error:', error);
    return NextResponse.json({ 
      error: 'Failed to check AI status' 
    }, { status: 500 });
  }
} 