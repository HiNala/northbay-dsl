import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const blogPostUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  slug: z.string().min(1, 'Slug is required').optional(),
  excerpt: z.string().optional(),
  content: z.any().optional(),
  featuredImage: z.string().url().optional().nullable(),
  category: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
}).partial();

// GET - Fetch single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
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

    const where: any = { id };
    
    if (!adminView) {
      where.isPublished = true;
      where.deletedAt = null;
    }

    const post = await prisma.blogPost.findUnique({
      where,
      include: {
        Author: {
          include: {
            Profile: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Increment view count for public views
    if (!adminView) {
      await prisma.blogPost.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return NextResponse.json({
      post: {
        ...post,
        author: post.Author ? {
          id: post.Author.id,
          name: post.Author.Profile?.fullName || post.Author.email,
          email: post.Author.email,
        } : null,
      },
    });

  } catch (error) {
    console.error('Blog post fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;
    const body = await request.json();
    const validatedData = blogPostUpdateSchema.parse(body);

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Check if slug already exists (for other posts)
    if (validatedData.slug && validatedData.slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug: validatedData.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};
    
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (validatedData.slug !== undefined) updateData.slug = validatedData.slug;
    if (validatedData.excerpt !== undefined) updateData.excerpt = validatedData.excerpt;
    if (validatedData.content !== undefined) updateData.content = validatedData.content;
    if (validatedData.featuredImage !== undefined) updateData.featuredImage = validatedData.featuredImage;
    if (validatedData.category !== undefined) updateData.category = validatedData.category;
    if (validatedData.tags !== undefined) updateData.tags = validatedData.tags;
    if (validatedData.seoTitle !== undefined) updateData.seoTitle = validatedData.seoTitle;
    if (validatedData.seoDescription !== undefined) updateData.seoDescription = validatedData.seoDescription;
    
    if (validatedData.isPublished !== undefined) {
      updateData.isPublished = validatedData.isPublished;
      // Set publishedAt when publishing for the first time
      if (validatedData.isPublished && !existingPost.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    // Update blog post
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
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
    console.error('Blog post update error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Soft delete (set deletedAt timestamp)
    await prisma.blogPost.update({
      where: { id },
      data: { 
        deletedAt: new Date(),
        isPublished: false, // Unpublish when deleting
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });

  } catch (error) {
    console.error('Blog post deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 