import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/leads - Get all design leads with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const source = searchParams.get('source')
    const search = searchParams.get('search')
    const assignedTo = searchParams.get('assignedTo')
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (status && status !== 'All') {
      where.status = status.toLowerCase()
    }
    
    if (priority && priority !== 'All') {
      where.priority = priority.toLowerCase()
    }
    
    if (source && source !== 'All') {
      where.source = source.toLowerCase()
    }
    
    if (assignedTo) {
      where.assignedTo = assignedTo
    }
    
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { projectType: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get leads with assigned user info
    const [leads, total] = await Promise.all([
      prisma.designLead.findMany({
        where,
        include: {
          AssignedTo: {
            include: {
              Profile: true
            }
          }
        },
        orderBy: [
          { priority: 'desc' }, // High priority first
          { createdAt: 'desc' }  // Then newest first
        ],
        skip,
        take: limit,
      }),
      prisma.designLead.count({ where })
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

// POST /api/admin/leads - Create new design lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      fullName,
      email,
      phone,
      address,
      projectType,
      style,
      budgetMin,
      budgetMax,
      timeline,
      message,
      status = 'new',
      priority = 'medium',
      source = 'website',
      assignedTo,
      followUpAt
    } = body

    // Validate required fields
    if (!fullName) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Create lead
    const lead = await prisma.designLead.create({
      data: {
        fullName,
        email,
        phone,
        address: address ? JSON.parse(typeof address === 'string' ? address : JSON.stringify(address)) : null,
        projectType,
        style,
        budgetMin: budgetMin ? parseInt(budgetMin) : null,
        budgetMax: budgetMax ? parseInt(budgetMax) : null,
        timeline,
        message,
        status,
        priority,
        source,
        assignedTo,
        followUpAt: followUpAt ? new Date(followUpAt) : null,
      },
      include: {
        AssignedTo: {
          include: {
            Profile: true
          }
        }
      }
    })

    // TODO: Send notification email to assigned user
    // TODO: Add to CRM system if integrated

    return NextResponse.json({ lead }, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}

// GET /api/admin/leads/stats - Get lead statistics
export async function GET_STATS() {
  try {
    const [
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      proposalLeads,
      wonLeads,
      lostLeads,
      highPriorityLeads,
      overdueFollowUps
    ] = await Promise.all([
      prisma.designLead.count(),
      prisma.designLead.count({ where: { status: 'new' } }),
      prisma.designLead.count({ where: { status: 'contacted' } }),
      prisma.designLead.count({ where: { status: 'qualified' } }),
      prisma.designLead.count({ where: { status: 'proposal' } }),
      prisma.designLead.count({ where: { status: 'won' } }),
      prisma.designLead.count({ where: { status: 'lost' } }),
      prisma.designLead.count({ where: { priority: 'high' } }),
      prisma.designLead.count({
        where: {
          followUpAt: {
            lt: new Date()
          },
          status: {
            not: 'won'
          }
        }
      })
    ])

    // Calculate conversion rates
    const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads * 100).toFixed(1) : '0'
    const qualificationRate = totalLeads > 0 ? ((qualifiedLeads + proposalLeads + wonLeads) / totalLeads * 100).toFixed(1) : '0'

    return NextResponse.json({
      stats: {
        total: totalLeads,
        new: newLeads,
        contacted: contactedLeads,
        qualified: qualifiedLeads,
        proposal: proposalLeads,
        won: wonLeads,
        lost: lostLeads,
        highPriority: highPriorityLeads,
        overdueFollowUps,
        conversionRate: parseFloat(conversionRate),
        qualificationRate: parseFloat(qualificationRate)
      }
    })
  } catch (error) {
    console.error('Error fetching lead stats:', error)
    return NextResponse.json({ error: 'Failed to fetch lead stats' }, { status: 500 })
  }
} 