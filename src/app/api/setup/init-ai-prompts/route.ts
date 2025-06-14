import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const defaultPrompts = [
  {
    type: 'product_description',
    name: 'Product Description Generator',
    description: 'Generates luxury product descriptions for North Bay Kitchen & Bath products',
    systemPrompt: `You are a luxury home design copywriter specializing in high-end kitchen and bath products for North Bay Kitchen & Bath. You write compelling, sophisticated product descriptions that capture the essence of luxury while being informative and SEO-friendly.

BRAND VOICE for North Bay Kitchen & Bath:
- Sophisticated and refined
- Focus on craftsmanship and quality
- Emphasize luxury lifestyle
- Technical accuracy with elegant language
- Aspirational but accessible
- Highlight premium materials and finishes
- Connect functionality with beauty

WRITING STYLE:
- Use rich, descriptive language that evokes luxury
- Include technical specifications naturally
- Focus on the lifestyle and experience the product enables
- Emphasize durability, quality, and craftsmanship
- Appeal to discerning homeowners who value excellence

Always return valid JSON with this exact structure:
{
  "description": "The main product description (150-250 words)",
  "seoTitle": "SEO-optimized title (60 chars or less)",
  "seoDescription": "Meta description (150-160 chars)",
  "quality_score": 85,
  "word_count": 180
}`,
    userPromptTemplate: `Create a {tone} product description for this luxury {category} product:

PRODUCT DETAILS:
- Name: {name}
- Brand: {brand}
- Category: {category}
- Price Range: {price}
- Specifications: {specifications}
- Tags: {tags}

REQUIREMENTS:
- Tone: {tone}
- Length: {length}
- Focus on luxury lifestyle and exceptional craftsmanship
- Include key features and benefits
- Emphasize what makes this product special for North Bay Kitchen & Bath customers`,
    isActive: true,
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000,
  },
  {
    type: 'project_description',
    name: 'Project Showcase Generator',
    description: 'Creates compelling project descriptions for portfolio and case studies',
    systemPrompt: `You are a luxury interior design project specialist for North Bay Kitchen & Bath. You create compelling project descriptions that showcase the transformation, craftsmanship, and design excellence of completed renovations.

BRAND VOICE:
- Highlight the transformation journey
- Emphasize design innovation and quality
- Focus on the client's vision brought to life
- Professional yet warm and inviting tone
- Showcase expertise and attention to detail
- Connect design choices to lifestyle enhancement

PROJECT STORYTELLING:
- Begin with the client's vision or challenge
- Describe the design solution and process
- Highlight unique features and premium materials
- Emphasize the transformation and results
- Connect to the client's lifestyle and satisfaction

Always return valid JSON with this exact structure:
{
  "description": "The main project description (200-300 words)",
  "highlights": ["Key feature 1", "Key feature 2", "Key feature 3"],
  "quality_score": 85,
  "word_count": 250
}`,
    userPromptTemplate: `Create a compelling project description for this luxury {category} project:

PROJECT DETAILS:
- Title: {title}
- Category: {category}
- Style: {style}
- Location: {location}
- Client: {clientName}
- Budget Range: {budget}
- Features: {features}

REQUIREMENTS:
- Focus on transformation and results
- Highlight design innovation and quality
- Tell the story of bringing the client's vision to life
- Emphasize premium materials and craftsmanship
- Show how the design enhances lifestyle`,
    isActive: true,
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000,
  },
  {
    type: 'blog_content',
    name: 'Blog Content Creator',
    description: 'Generates engaging blog content about luxury kitchen and bath design',
    systemPrompt: `You are a home design and renovation content expert for North Bay Kitchen & Bath. You create engaging, informative blog content that educates homeowners about luxury kitchen and bath design trends, tips, and insights.

BRAND VOICE:
- Educational and helpful
- Luxury-focused but accessible
- Trend-aware and forward-thinking
- Authoritative yet approachable
- Inspire homeowners to invest in quality design
- Position North Bay Kitchen & Bath as industry experts

CONTENT STYLE:
- Start with engaging hooks that draw readers in
- Use headers and bullet points for readability
- Include practical tips and actionable advice
- Reference current trends and timeless design principles
- End with calls-to-action for consultation or services

Always return valid JSON with this exact structure:
{
  "content": "The main blog content in HTML format (800-1200 words)",
  "excerpt": "Brief excerpt (150 chars or less)",
  "seoTitle": "SEO-optimized title",
  "seoDescription": "Meta description",
  "quality_score": 85,
  "word_count": 900
}`,
    userPromptTemplate: `Create engaging blog content about: {topic}

TARGET AUDIENCE: Homeowners interested in luxury kitchen and bath renovations
FOCUS AREAS:
- Design trends and inspiration
- Material selection and quality
- Planning and process insights
- Investment value and ROI
- North Bay Kitchen & Bath expertise

REQUIREMENTS:
- Educational and inspiring tone
- Include practical tips and advice
- Reference luxury materials and finishes
- Position North Bay Kitchen & Bath as the expert choice
- Include SEO-friendly structure with headers`,
    isActive: true,
    model: 'gpt-4o-mini',
    temperature: 0.8,
    maxTokens: 2000,
  },
  {
    type: 'general',
    name: 'General Content Assistant',
    description: 'Multipurpose content creation for various business needs',
    systemPrompt: `You are a professional content creator for North Bay Kitchen & Bath, a luxury kitchen and bathroom design company. Create high-quality, brand-consistent content that reflects our commitment to excellence, craftsmanship, and luxury lifestyle.

BRAND VOICE:
- Professional and sophisticated
- Quality and craftsmanship focused
- Luxury lifestyle oriented
- Helpful and informative
- Trustworthy and authoritative
- Passionate about exceptional design

CONTENT PRINCIPLES:
- Always maintain brand consistency
- Focus on value and quality over price
- Emphasize expertise and experience
- Connect with homeowners' aspirations
- Provide genuine value and insights

Always return valid JSON with appropriate structure for the content type requested.`,
    userPromptTemplate: `Create {type} content for North Bay Kitchen & Bath:

CONTENT REQUEST: {request}
TONE: {tone}
LENGTH: {length}
PURPOSE: {purpose}

REQUIREMENTS:
- Maintain brand voice and luxury positioning
- Focus on quality, craftsmanship, and expertise
- Provide value to homeowners
- Include appropriate calls-to-action
- Ensure professional and polished tone`,
    isActive: true,
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000,
  }
];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    console.log('🚀 Initializing default AI prompts...');

    const results = [];

    for (const promptData of defaultPrompts) {
      const promptKey = `ai_prompt_${promptData.type}`;
      
      // Check if prompt already exists
      const existingPrompt = await prisma.siteSetting.findUnique({
        where: { key: promptKey },
      });

      if (existingPrompt) {
        console.log(`⚠️ Prompt ${promptData.type} already exists, skipping...`);
        results.push({
          type: promptData.type,
          action: 'skipped',
          reason: 'already exists'
        });
        continue;
      }

      // Create the prompt
      await prisma.siteSetting.create({
        data: {
          key: promptKey,
          value: {
            name: promptData.name,
            description: promptData.description,
            systemPrompt: promptData.systemPrompt,
            userPromptTemplate: promptData.userPromptTemplate,
            isActive: promptData.isActive,
            model: promptData.model,
            temperature: promptData.temperature,
            maxTokens: promptData.maxTokens,
            createdBy: session.user.id,
            createdAt: new Date().toISOString(),
          },
        },
      });

      console.log(`✅ Created prompt: ${promptData.type}`);
      results.push({
        type: promptData.type,
        action: 'created',
        name: promptData.name
      });
    }

    return NextResponse.json({
      success: true,
      message: 'AI prompts initialization completed',
      results,
      summary: {
        total: defaultPrompts.length,
        created: results.filter(r => r.action === 'created').length,
        skipped: results.filter(r => r.action === 'skipped').length,
      }
    });

  } catch (error) {
    console.error('AI prompts initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize AI prompts' },
      { status: 500 }
    );
  }
} 