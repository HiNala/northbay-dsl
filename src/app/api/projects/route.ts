import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for projects
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  clientName: z.string().optional(),
  heroImage: z.string().url().optional(),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'PUBLISHED', 'ARCHIVED']).optional().default('PLANNING'),
  category: z.string().optional(),
  budget: z.number().positive().optional(),
  isPublic: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
  progress: z.number().min(0).max(100).optional().default(0),
  managedBy: z.string().uuid().optional(),
});

const projectUpdateSchema = projectSchema.partial();

// GET - Fetch projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const adminView = searchParams.get('admin') === 'true';
    const featured = searchParams.get('featured') === 'true';

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
      where.isPublic = true;
      where.status = { in: ['COMPLETED', 'PUBLISHED'] };
      where.deletedAt = null;
    }

    if (category) {
      where.category = category;
    }

    if (status && adminView) {
      where.status = status;
    }

    if (featured) {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Fetch projects
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: adminView ? { createdAt: 'desc' } : { completedAt: 'desc' },
        include: {
          Images: {
            orderBy: { position: 'asc' }
          },
          Manager: {
            include: {
              Profile: true,
            },
          },
          _count: {
            select: {
              Images: true,
              Products: true,
            },
          },
        },
      }),
      prisma.project.count({ where }),
    ]);

    const formattedProjects = projects.map(project => ({
      ...project,
      manager: project.Manager ? {
        id: project.Manager.id,
        name: project.Manager.Profile?.fullName || project.Manager.email,
        email: project.Manager.email,
      } : null,
    }));

    return NextResponse.json({
      success: true,
      projects: formattedProjects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Projects fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project
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
    const validatedData = projectSchema.parse(body);

    // Generate slug if not provided
    const slug = validatedData.slug || validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'Project with this title/slug already exists' },
        { status: 400 }
      );
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        slug,
        description: validatedData.description,
        location: validatedData.location,
        clientName: validatedData.clientName,
        heroImage: validatedData.heroImage,
        status: validatedData.status || 'PLANNING',
        category: validatedData.category,
        budget: validatedData.budget,
        isPublic: validatedData.isPublic ?? true,
        isFeatured: validatedData.isFeatured ?? false,
        tags: validatedData.tags || [],
        progress: validatedData.progress || 0,
        managedBy: validatedData.managedBy,
      },
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
    console.error('Project creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 