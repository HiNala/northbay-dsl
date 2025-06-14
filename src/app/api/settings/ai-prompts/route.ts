import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for AI prompts
const aiPromptSchema = z.object({
  type: z.enum(['product_description', 'project_description', 'blog_content', 'general']),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  systemPrompt: z.string().min(10, 'System prompt must be at least 10 characters'),
  userPromptTemplate: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  model: z.string().optional().default('gpt-4o-mini'),
  temperature: z.number().min(0).max(2).optional().default(0.7),
  maxTokens: z.number().min(100).max(4000).optional().default(1000),
});

// GET - Fetch AI prompts
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const activeOnly = searchParams.get('active') === 'true';

    // Build where clause
    const where: any = {};
    if (type) where.key = { startsWith: `ai_prompt_${type}` };
    
    // Fetch prompts from site settings
    const prompts = await prisma.siteSetting.findMany({
      where: {
        key: { startsWith: 'ai_prompt_' },
        ...(type && { key: `ai_prompt_${type}` })
      },
      orderBy: { updatedAt: 'desc' }
    });

    const formattedPrompts = prompts.map(setting => {
      const value = setting.value as any;
      return {
        id: setting.key,
        type: setting.key.replace('ai_prompt_', ''),
        ...value,
        updatedAt: setting.updatedAt,
      };
    }).filter(prompt => activeOnly ? prompt.isActive : true);

    return NextResponse.json({
      prompts: formattedPrompts,
    });

  } catch (error) {
    console.error('AI prompts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI prompts' },
      { status: 500 }
    );
  }
}

// POST - Create new AI prompt
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = aiPromptSchema.parse(body);

    const promptKey = `ai_prompt_${validatedData.type}`;

    // Check if prompt already exists
    const existingPrompt = await prisma.siteSetting.findUnique({
      where: { key: promptKey },
    });

    if (existingPrompt) {
      return NextResponse.json(
        { error: 'AI prompt for this type already exists. Use PUT to update.' },
        { status: 400 }
      );
    }

    // Create AI prompt setting
    const promptSetting = await prisma.siteSetting.create({
      data: {
        key: promptKey,
        value: {
          name: validatedData.name,
          description: validatedData.description,
          systemPrompt: validatedData.systemPrompt,
          userPromptTemplate: validatedData.userPromptTemplate,
          isActive: validatedData.isActive,
          model: validatedData.model,
          temperature: validatedData.temperature,
          maxTokens: validatedData.maxTokens,
          createdBy: session.user.id,
          createdAt: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      prompt: {
        id: promptSetting.key,
        type: validatedData.type,
        ...(promptSetting.value as any),
        updatedAt: promptSetting.updatedAt,
      },
    });

  } catch (error) {
    console.error('AI prompt creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create AI prompt' },
      { status: 500 }
    );
  }
}

// PUT - Update AI prompt
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { type, ...updateData } = body;
    
    if (!type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    const promptKey = `ai_prompt_${type}`;

    // Check if prompt exists
    const existingPrompt = await prisma.siteSetting.findUnique({
      where: { key: promptKey },
    });

    if (!existingPrompt) {
      return NextResponse.json({ error: 'AI prompt not found' }, { status: 404 });
    }

    const currentValue = existingPrompt.value as any;

    // Update prompt setting
    const updatedPrompt = await prisma.siteSetting.update({
      where: { key: promptKey },
      data: {
        value: {
          ...currentValue,
          ...updateData,
          updatedBy: session.user.id,
          updatedAt: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      prompt: {
        id: updatedPrompt.key,
        type,
        ...(updatedPrompt.value as any),
        updatedAt: updatedPrompt.updatedAt,
      },
    });

  } catch (error) {
    console.error('AI prompt update error:', error);
    return NextResponse.json(
      { error: 'Failed to update AI prompt' },
      { status: 500 }
    );
  }
} 