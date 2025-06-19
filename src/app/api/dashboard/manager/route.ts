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

    // Check manager permissions
    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.user.id },
      include: { Role: true }
    });

    const hasManagerAccess = userRoles.some(ur => 
      ur.Role.level >= 70 // Manager level or above
    );

    if (!hasManagerAccess) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    // Get monthly revenue from orders
    const monthlyOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfMonth
        },
        status: {
          in: ['paid', 'processing', 'shipped', 'delivered']
        }
      }
    });

    const lastMonthOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: lastMonth,
          lte: endOfLastMonth
        },
        status: {
          in: ['paid', 'processing', 'shipped', 'delivered']
        }
      }
    });

    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const revenueGrowth = lastMonthRevenue > 0 ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue * 100) : 0;

    // Get active leads
    const activeLeads = await prisma.designLead.findMany({
      where: {
        status: {
          in: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL']
        }
      }
    });

    // Get team performance
    const teamMembers = await prisma.user.findMany({
      where: {
        roles: {
          some: {
            Role: {
              name: {
                in: ['employee', 'manager']
              }
            }
          }
        },
        status: 'active'
      },
      include: {
        Profile: true,
        DesignLeads: {
          where: {
            createdAt: {
              gte: startOfMonth
            }
          }
        },
        ManagedProjects: {
          where: {
            status: {
              in: ['IN_PROGRESS', 'COMPLETED']
            }
          }
        }
      }
    });

    // Get active projects
    const activeProjects = await prisma.project.findMany({
      where: {
        status: {
          in: ['PLANNING', 'IN_PROGRESS']
        }
      },
      include: {
        Manager: {
          include: { Profile: true }
        }
      }
    });

    // Calculate team stats
    const teamStats = teamMembers.map(member => {
      const leadsThisMonth = member.DesignLeads.length;
      const projectsManaged = member.ManagedProjects.length;
      const rating = Math.min(4.9, 3.5 + (leadsThisMonth * 0.1) + (projectsManaged * 0.2)); // Simulated rating

      return {
        id: member.id,
        name: member.Profile?.fullName || member.email || 'Unknown',
        role: 'Team Member', // Would come from role relationship
        leadsThisMonth,
        projectsManaged,
        rating: Number(rating.toFixed(1))
      };
    });

    // Get recent activities
    const recentActivities = await prisma.auditLog.findMany({
      where: {
        createdAt: {
          gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      include: {
        User: {
          include: { Profile: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Calculate goal progress
    const goals = {
      revenue: {
        current: monthlyRevenue,
        target: 150000,
        progress: Math.min((monthlyRevenue / 150000) * 100, 100)
      },
      leads: {
        current: activeLeads.length,
        target: 40,
        progress: Math.min((activeLeads.length / 40) * 100, 100)
      },
      teamTraining: {
        current: 6,
        target: 8,
        progress: (6 / 8) * 100
      }
    };

    // Return manager dashboard data
    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          monthlyRevenue,
          revenueGrowth: Number(revenueGrowth.toFixed(1)),
          activeLeads: activeLeads.length,
          teamPerformance: teamStats.length > 0 ? Math.round(teamStats.reduce((sum, member) => sum + member.rating, 0) / teamStats.length * 20) : 85,
          activeProjects: activeProjects.length
        },
        goals,
        teamStats: teamStats.slice(0, 5), // Top 5 team members
        recentActivities: recentActivities.map(activity => ({
          id: activity.id,
          action: activity.action,
          tableName: activity.tableName,
          user: activity.User ? activity.User.Profile?.fullName || activity.User.email || 'Unknown' : 'System',
          createdAt: activity.createdAt
        })),
        projects: activeProjects.slice(0, 5) // Latest 5 active projects
      }
    });

  } catch (error) {
    console.error('Manager dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch manager dashboard data' },
      { status: 500 }
    );
  }
} 