import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for blog post
const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.any().default({}), // Rich text content (JSON)
  featuredImage: z.string().url().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().optional().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const blogPostUpdateSchema = blogPostSchema.partial();

// GET - Fetch blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const adminView = searchParams.get('admin') === 'true';

    // Check authentication for admin view
    if (adminView) {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const hasAccess = session.user.roles?.some(role => 
        ['admin', 'manager', 'employee'].includes(role)
      );

      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (!adminView) {
      where.isPublished = true;
      where.deletedAt = null;
    }

    if (category) {
      where.category = category;
    }

    if (status && adminView) {
      where.isPublished = status === 'published';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Fetch posts
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: adminView ? { createdAt: 'desc' } : { publishedAt: 'desc' },
        include: {
          Author: {
            include: {
              Profile: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      posts: posts.map(post => ({
        ...post,
        author: post.Author ? {
          id: post.Author.id,
          name: post.Author.Profile?.fullName || post.Author.email,
          email: post.Author.email,
        } : null,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });

  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    // Create blog post
    const blogPost = await prisma.blogPost.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        excerpt: validatedData.excerpt || null,
        content: validatedData.content || {},
        featuredImage: validatedData.featuredImage || null,
        category: validatedData.category || null,
        tags: validatedData.tags || [],
        isPublished: validatedData.isPublished || false,
        seoTitle: validatedData.seoTitle || null,
        seoDescription: validatedData.seoDescription || null,
        authorId: session.user.id,
        publishedAt: validatedData.isPublished ? new Date() : null,
      },
      include: {
        Author: {
          include: {
            Profile: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      post: {
        ...blogPost,
        author: blogPost.Author ? {
          id: blogPost.Author.id,
          name: blogPost.Author.Profile?.fullName || blogPost.Author.email,
          email: blogPost.Author.email,
        } : null,
      },
    });

  } catch (error) {
    console.error('Blog creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 