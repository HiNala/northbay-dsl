import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const projectUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  clientName: z.string().optional(),
  heroImage: z.string().url().optional().nullable(),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'PUBLISHED', 'ARCHIVED']).optional(),
  category: z.string().optional().nullable(),
  budget: z.number().positive().optional().nullable(),
  isPublic: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  progress: z.number().min(0).max(100).optional(),
  managedBy: z.string().uuid().optional().nullable(),
  completedAt: z.string().datetime().optional().nullable(),
}).partial();

function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// GET - Fetch single project
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

    // Determine if we're searching by ID or slug
    const isId = isUUID(id);
    const whereClause = isId 
      ? { id, deletedAt: null }
      : { slug: id, deletedAt: null };

    if (!adminView) {
      (whereClause as any).isPublic = true;
      (whereClause as any).status = { in: ['COMPLETED', 'PUBLISHED'] };
    }

    const project = await prisma.project.findUnique({
      where: whereClause,
      include: {
        Images: {
          orderBy: { position: 'asc' }
        },
        Products: {
          include: {
            Product: {
              include: {
                Category: true,
                Brand: true,
                Images: {
                  where: { isHero: true },
                  take: 1
                }
              }
            }
          }
        },
        Manager: {
          include: {
            Profile: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      project: {
        ...project,
        manager: project.Manager ? {
          id: project.Manager.id,
          name: project.Manager.Profile?.fullName || project.Manager.email,
          email: project.Manager.email,
        } : null,
      },
    });

  } catch (error) {
    console.error('Project fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
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
    const validatedData = projectUpdateSchema.parse(body);

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check if slug already exists (for other projects)
    if (validatedData.slug && validatedData.slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug: validatedData.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Project with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Generate slug if title changed but no slug provided
    if (validatedData.title && !validatedData.slug && validatedData.title !== existingProject.title) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Prepare update data
    const updateData: any = {};
    
    Object.keys(validatedData).forEach(key => {
      if (validatedData[key as keyof typeof validatedData] !== undefined) {
        if (key === 'completedAt' && validatedData.completedAt) {
          updateData[key] = new Date(validatedData.completedAt);
        } else {
          updateData[key] = validatedData[key as keyof typeof validatedData];
        }
      }
    });

    // Auto-set completedAt when status changes to COMPLETED
    if (validatedData.status === 'COMPLETED' && existingProject.status !== 'COMPLETED') {
      updateData.completedAt = new Date();
      updateData.progress = 100;
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        Images: {
          orderBy: { position: 'asc' }
        },
        Manager: {
          include: {
            Profile: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      project: {
        ...project,
        manager: project.Manager ? {
          id: project.Manager.id,
          name: project.Manager.Profile?.fullName || project.Manager.email,
          email: project.Manager.email,
        } : null,
      },
    });

  } catch (error) {
    console.error('Project update error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
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

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Soft delete (set deletedAt timestamp)
    await prisma.project.update({
      where: { id },
      data: { 
        deletedAt: new Date(),
        isPublic: false, // Hide when deleting
        status: 'ARCHIVED',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });

  } catch (error) {
    console.error('Project deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 