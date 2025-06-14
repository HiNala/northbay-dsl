import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/dashboard - Get dashboard statistics and recent activity
export async function GET(request: NextRequest) {
  try {
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Get all statistics in parallel
    const [
      // Revenue stats
      totalRevenue,
      monthlyRevenue,
      
      // Order stats  
      totalOrders,
      weeklyOrders,
      recentOrders,
      
      // Lead stats
      totalLeads,
      newLeads,
      pendingLeads,
      recentLeads,
      
      // Project stats
      activeProjects,
      completedProjects,
      
      // Product stats
      totalProducts,
      activeProducts,
      outOfStockProducts,
      
      // Recent activity (audit logs)
      recentActivity
    ] = await Promise.all([
      // Revenue calculations
      prisma.order.aggregate({
        where: { 
          status: { in: ['paid', 'delivered'] },
          paymentStatus: 'paid'
        },
        _sum: { total: true }
      }),
      prisma.order.aggregate({
        where: { 
          status: { in: ['paid', 'delivered'] },
          paymentStatus: 'paid',
          createdAt: { gte: oneMonthAgo }
        },
        _sum: { total: true }
      }),
      
      // Orders
      prisma.order.count(),
      prisma.order.count({
        where: { createdAt: { gte: oneWeekAgo } }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          User: {
            include: { Profile: true }
          },
          Items: {
            include: { Product: true },
            take: 1
          }
        }
      }),
      
      // Leads
      prisma.designLead.count(),
      prisma.designLead.count({
        where: { status: 'NEW' }
      }),
      prisma.designLead.count({
        where: { 
          status: { in: ['NEW', 'CONTACTED'] },
          followUpAt: { lte: now }
        }
      }),
      prisma.designLead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          AssignedTo: {
            include: { Profile: true }
          }
        }
      }),
      
      // Projects
      prisma.project.count({
        where: { status: { in: ['PLANNING', 'IN_PROGRESS'] } }
      }),
      prisma.project.count({
        where: { status: 'COMPLETED' }
      }),
      
      // Products
      prisma.product.count(),
      prisma.product.count({
        where: { status: 'PUBLISHED' }
      }),
      prisma.product.count({
        where: { 
          trackInventory: true,
          stockQuantity: { lte: 0 }
        }
      }),
      
      // Recent activity from audit logs
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          User: {
            include: { Profile: true }
          }
        }
      })
    ])

    // Calculate percentage changes (mock data for now)
    const currentMonthRevenue = Number(monthlyRevenue._sum.total || 0)
    const previousMonthRevenue = currentMonthRevenue * 0.8 // Mock calculation
    const revenueChange = previousMonthRevenue > 0 
      ? (((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100).toFixed(1)
      : '0.0'

    const previousWeekOrders = Math.max(1, weeklyOrders - 2) // Mock calculation
    const ordersChange = ((weeklyOrders - previousWeekOrders) / previousWeekOrders * 100).toFixed(1)

    // Format the response
    const dashboardStats = {
      revenue: {
        total: Number(totalRevenue._sum.total || 0),
        monthly: currentMonthRevenue,
        change: parseFloat(revenueChange),
        changeType: parseFloat(revenueChange) >= 0 ? 'positive' : 'negative'
      },
      orders: {
        total: totalOrders,
        weekly: weeklyOrders,
        change: parseFloat(ordersChange),
        changeType: parseFloat(ordersChange) >= 0 ? 'positive' : 'negative'
      },
      leads: {
        total: totalLeads,
        new: newLeads,
        pending: pendingLeads
      },
      projects: {
        active: activeProjects,
        completed: completedProjects
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        outOfStock: outOfStockProducts
      }
    }

    // Format recent orders for display
    const formattedRecentOrders = recentOrders.map(order => ({
      id: order.orderNumber,
      customer: order.User?.Profile?.fullName || order.guestEmail || 'Guest Customer',
      product: order.Items[0]?.Product?.name || 'Multiple Items',
      status: order.status,
      amount: order.total,
      date: order.createdAt
    }))

    // Format recent leads for display
    const formattedRecentLeads = recentLeads.map(lead => ({
      id: lead.id,
      name: lead.fullName,
      email: lead.email,
      project: lead.projectType,
      budget: lead.budgetMax ? `$${lead.budgetMin?.toLocaleString()} - $${lead.budgetMax?.toLocaleString()}` : `$${lead.budgetMin?.toLocaleString()}+`,
      status: lead.status,
      created: lead.createdAt,
      assignedTo: lead.AssignedTo?.Profile?.fullName
    }))

    // Format recent activity
    const formattedActivity = recentActivity.map(activity => ({
      id: activity.id,
      action: activity.action,
      tableName: activity.tableName,
      recordId: activity.recordId,
      user: activity.User?.Profile?.fullName || 'System',
      createdAt: activity.createdAt
    }))

    return NextResponse.json({
      stats: dashboardStats,
      recentOrders: formattedRecentOrders,
      recentLeads: formattedRecentLeads,
      recentActivity: formattedActivity
    })

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
} 