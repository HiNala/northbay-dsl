import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateProductDescription, ProductData } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
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

    // Test AI functionality with sample product
    const testProduct: ProductData = {
      name: "Luxury Marble Kitchen Island",
      category: "Kitchen Islands", 
      brand: "North Bay Designs",
      specifications: {
        material: "Carrara Marble",
        dimensions: "8ft x 4ft",
        finish: "Polished",
        features: ["Built-in storage", "Breakfast bar", "Premium hardware"]
      },
      price: 4500,
      type: "physical",
      tags: ["luxury", "marble", "kitchen", "island"]
    };

    console.log('🤖 Testing AI generation...');

    const aiResult = await generateProductDescription(testProduct, {
      type: 'luxury',
      tone: 'luxury',
      length: 'medium',
      includeFeatures: true,
      includeBenefits: true
    });

    return NextResponse.json({
      success: true,
      message: 'AI functionality test completed successfully!',
      test_result: aiResult,
      openai_configured: !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-actual-openai-api-key-here-sk-proj-xxxx',
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
    });

  } catch (error) {
    console.error('AI Test Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      openai_configured: !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-actual-openai-api-key-here-sk-proj-xxxx',
      message: 'AI functionality test failed. Check OpenAI API key configuration.'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { productData, options } = body;

    const aiResult = await generateProductDescription(productData, options);

    return NextResponse.json({
      success: true,
      result: aiResult
    });

  } catch (error) {
    console.error('AI Test Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 