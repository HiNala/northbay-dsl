import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'all', 'alerts', 'updates', 'tasks'
    const limit = parseInt(searchParams.get('limit') || '20');

    // Get user roles to determine notification level
    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.user.id },
      include: { Role: true }
    });

    const userLevel = Math.max(...userRoles.map(ur => ur.Role.level));
    const userId = session.user.id;

    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    let notifications: any[] = [];

    // Employee-level notifications (Level 50+)
    if (userLevel >= 50) {
      // Follow-up reminders
      const overdueFollowUps = await prisma.designLead.findMany({
        where: {
          assignedTo: userId,
          followUpAt: {
            lte: today
          },
          status: {
            in: ['NEW', 'CONTACTED', 'QUALIFIED']
          }
        },
        take: 5
      });

      overdueFollowUps.forEach(lead => {
        notifications.push({
          id: `followup-${lead.id}`,
          type: 'alert',
          title: 'Follow-up Overdue',
          message: `Follow-up with ${lead.fullName} is overdue`,
          priority: 'high',
          createdAt: lead.followUpAt,
          data: { leadId: lead.id, leadName: lead.fullName }
        });
      });

      // New lead assignments
      const newAssignments = await prisma.designLead.findMany({
        where: {
          assignedTo: userId,
          createdAt: {
            gte: lastWeek
          },
          status: 'NEW'
        },
        take: 3
      });

      newAssignments.forEach(lead => {
        notifications.push({
          id: `assignment-${lead.id}`,
          type: 'update',
          title: 'New Lead Assigned',
          message: `You've been assigned a new lead: ${lead.fullName}`,
          priority: 'medium',
          createdAt: lead.createdAt,
          data: { leadId: lead.id, leadName: lead.fullName }
        });
      });
    }

    // Manager-level notifications (Level 70+)
    if (userLevel >= 70) {
      // Team performance alerts
      const highValueLeads = await prisma.designLead.findMany({
        where: {
          budgetMin: {
            gte: 100000
          },
          status: {
            in: ['NEW', 'CONTACTED']
          },
          createdAt: {
            gte: lastWeek
          }
        }
      });

      highValueLeads.forEach(lead => {
        notifications.push({
          id: `high-value-${lead.id}`,
          type: 'alert',
          title: 'High-Value Lead',
          message: `High-value lead requires attention: ${lead.fullName} ($${lead.budgetMin?.toLocaleString()}+)`,
          priority: 'high',
          createdAt: lead.createdAt,
          data: { leadId: lead.id, leadName: lead.fullName, budget: lead.budgetMin }
        });
      });

      // Revenue milestones
      const monthlyOrders = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: new Date(today.getFullYear(), today.getMonth(), 1)
          },
          status: {
            in: ['paid', 'processing', 'shipped', 'delivered']
          }
        }
      });

      const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + Number(order.total), 0);
      
      if (monthlyRevenue >= 125000) {
        notifications.push({
          id: 'revenue-milestone',
          type: 'update',
          title: 'Revenue Milestone Achieved',
          message: `Monthly revenue target reached: $${monthlyRevenue.toLocaleString()}`,
          priority: 'medium',
          createdAt: new Date(),
          data: { revenue: monthlyRevenue }
        });
      }
    }

    // Admin-level notifications (Level 80+)
    if (userLevel >= 80) {
      // Low stock alerts
      const lowStockProducts = await prisma.product.findMany({
        where: {
          trackInventory: true,
          stockQuantity: {
            lte: 5
          },
          status: 'PUBLISHED'
        },
        take: 5
      });

      lowStockProducts.forEach(product => {
        notifications.push({
          id: `stock-${product.id}`,
          type: 'alert',
          title: 'Low Stock Alert',
          message: `${product.name} is running low (${product.stockQuantity} remaining)`,
          priority: 'medium',
          createdAt: product.updatedAt,
          data: { productId: product.id, productName: product.name, stock: product.stockQuantity }
        });
      });

      // Pending product approvals
      const pendingProducts = await prisma.product.findMany({
        where: {
          status: 'DRAFT',
          createdAt: {
            gte: lastWeek
          }
        },
        include: {
          Creator: {
            include: { Profile: true }
          }
        },
        take: 3
      });

      pendingProducts.forEach(product => {
        notifications.push({
          id: `approval-${product.id}`,
          type: 'task',
          title: 'Product Pending Approval',
          message: `${product.name} is awaiting approval`,
          priority: 'medium',
          createdAt: product.createdAt,
          data: { 
            productId: product.id, 
            productName: product.name,
            creator: product.Creator?.Profile?.fullName || product.Creator?.email
          }
        });
      });
    }

    // Super Admin-level notifications (Level 100)
    if (userLevel >= 100) {
      // System health alerts
      const recentErrors = await prisma.auditLog.findMany({
        where: {
          action: {
            contains: 'error'
          },
          createdAt: {
            gte: lastWeek
          }
        },
        take: 3
      });

      recentErrors.forEach(error => {
        notifications.push({
          id: `error-${error.id}`,
          type: 'alert',
          title: 'System Error Detected',
          message: `Error in ${error.tableName}: ${error.action}`,
          priority: 'high',
          createdAt: error.createdAt,
          data: { errorId: error.id, table: error.tableName, action: error.action }
        });
      });

      // Security alerts
      const suspiciousActivity = await prisma.auditLog.findMany({
        where: {
          action: {
            in: ['failed_login', 'unauthorized_access']
          },
          createdAt: {
            gte: lastWeek
          }
        },
        take: 2
      });

      suspiciousActivity.forEach(activity => {
        notifications.push({
          id: `security-${activity.id}`,
          type: 'alert',
          title: 'Security Alert',
          message: `Suspicious activity detected: ${activity.action}`,
          priority: 'high',
          createdAt: activity.createdAt,
          data: { activityId: activity.id, action: activity.action }
        });
      });
    }

    // Filter by type if specified
    if (type !== 'all') {
      notifications = notifications.filter(notif => notif.type === type);
    }

    // Sort by priority and date
    notifications.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority as keyof typeof priorityOrder] - 
                          priorityOrder[a.priority as keyof typeof priorityOrder];
      
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Limit results
    notifications = notifications.slice(0, limit);

    // Get unread count
    const unreadCount = notifications.filter(n => n.priority === 'high').length;

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        unreadCount,
        total: notifications.length,
        userLevel
      }
    });

  } catch (error) {
    console.error('Notifications API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// Mark notification as read
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { notificationId } = await request.json();

    // In a real system, you'd update a notifications table
    // For now, we'll just acknowledge the request
    
    return NextResponse.json({
      success: true,
      message: 'Notification marked as read'
    });

  } catch (error) {
    console.error('Mark notification read error:', error);
    return NextResponse.json(
      { error: 'Failed to mark notification as read' },
      { status: 500 }
    );
  }
} 