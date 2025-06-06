import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

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
    const role = searchParams.get('role') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      AND: [
        // Only show business users (not customers)
        {
          roles: {
            some: {
              Role: {
                name: {
                  in: ['admin', 'manager', 'employee', 'super_admin']
                }
              }
            }
          }
        }
      ]
    }

    // Add search filter
    if (search) {
      where.AND.push({
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { Profile: { fullName: { contains: search, mode: 'insensitive' } } }
        ]
      })
    }

    // Add role filter
    if (role) {
      where.AND.push({
        roles: {
          some: {
            Role: { name: role }
          }
        }
      })
    }

    const [users, totalCount] = await Promise.all([
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
          }
        },
        orderBy: { Profile: { fullName: 'asc' } }
      }),
      prisma.user.count({ where })
    ])

    // Transform user data for frontend
    const transformedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      fullName: user.Profile?.fullName || 'Unknown',
      phone: user.Profile?.phone,
      roles: user.roles.map(ur => ({
        name: ur.Role.name,
        displayName: ur.Role.displayName,
        level: ur.Role.level
      })),
      highestRole: user.roles.reduce((highest, current) => 
        current.Role.level > highest.level ? current.Role : highest, 
        user.roles[0]?.Role || { name: 'customer', displayName: 'Customer', level: 0 }
      ),
      createdAt: user.Profile?.createdAt
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      users: transformedUsers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !isAdmin(session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { email, password, fullName, phone, role } = data

    // Validate required fields
    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { error: 'Email, password, full name, and role are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Find the role
    const roleRecord = await prisma.role.findUnique({
      where: { name: role }
    })

    if (!roleRecord) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user with profile and role in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          id: crypto.randomUUID(),
          email,
          password: hashedPassword,
        }
      })

      // Create profile
      await tx.profile.create({
        data: {
          id: crypto.randomUUID(),
          userId: user.id,
          fullName,
          phone: phone || null,
        }
      })

      // Assign role
      await tx.userRole.create({
        data: {
          userId: user.id,
          roleId: roleRecord.id,
        }
      })

      return user
    })

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      userId: newUser.id
    })

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
} 