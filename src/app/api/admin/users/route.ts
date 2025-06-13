import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import crypto from 'crypto'

// GET /api/admin/users - List all users with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !isAdmin(session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const role = searchParams.get('role') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { Profile: { fullName: { contains: search, mode: 'insensitive' } } }
      ]
    }
    
    if (status) {
      where.status = status
    }

    if (role) {
      where.roles = {
        some: {
          Role: {
            name: role
          }
        }
      }
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          Profile: true,
          roles: {
            include: {
              Role: true
            }
          },
          _count: {
            select: {
              Orders: true,
              DesignLeads: true,
              Wishlists: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.user.count({ where })
    ])

    return NextResponse.json({
      users: users.map(user => ({
        ...user,
        password: undefined, // Don't expose password
        passwordResetToken: undefined,
        twoFactorSecret: undefined
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/admin/users - Create new user
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).default('active'),
  roleIds: z.array(z.string()).min(1, 'At least one role is required'),
  emailVerified: z.boolean().default(false)
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !isAdmin(session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user with profile and roles
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email: validatedData.email,
        password: hashedPassword,
        status: validatedData.status,
        emailVerified: validatedData.emailVerified,
        emailVerifiedAt: validatedData.emailVerified ? new Date() : null,
        Profile: validatedData.fullName || validatedData.phone ? {
          create: {
            fullName: validatedData.fullName,
            phone: validatedData.phone
          }
        } : undefined,
        roles: {
          create: validatedData.roleIds.map(roleId => ({
            roleId
          }))
        }
      },
      include: {
        Profile: true,
        roles: {
          include: {
            Role: true
          }
        }
      }
    })

    // Remove sensitive data from response
    const { password, passwordResetToken, twoFactorSecret, ...safeUser } = user

    return NextResponse.json(safeUser, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
} 