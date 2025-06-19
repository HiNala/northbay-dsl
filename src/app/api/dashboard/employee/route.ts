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

    // Get employee-specific data
    const userId = session.user.id;
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get employee's assigned leads
    const myLeads = await prisma.designLead.findMany({
      where: {
        assignedTo: userId,
        status: {
          in: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL']
        }
      },
      include: {
        AssignedTo: {
          include: { Profile: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Get recent leads
    const recentLeads = await prisma.designLead.findMany({
      where: {
        assignedTo: userId,
        createdAt: {
          gte: startOfWeek
        }
      }
    });

    // Get monthly performance data
    const monthlyLeads = await prisma.designLead.findMany({
      where: {
        assignedTo: userId,
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    const convertedLeads = monthlyLeads.filter(lead => lead.status === 'WON');
    const followUpsNeeded = myLeads.filter(lead => 
      lead.followUpAt && new Date(lead.followUpAt) <= today
    );

    // Calculate stats
    const stats = {
      activeLeads: myLeads.length,
      recentLeads: recentLeads.length,
      followUpsDue: followUpsNeeded.length,
      monthlyConversions: convertedLeads.length,
      monthlyGoalProgress: Math.min((convertedLeads.length / 10) * 100, 100), // Assuming goal of 10 conversions per month
      appointmentsToday: 0, // This would come from a calendar integration
    };

    // Get recent activities
    const recentActivities = await prisma.auditLog.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfWeek
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Return employee dashboard data
    return NextResponse.json({
      success: true,
      data: {
        stats,
        myLeads: myLeads.slice(0, 5), // Latest 5 leads
        recentActivities,
        appointments: [], // This would come from calendar integration
        tasks: [], // This would come from task management system
        performance: {
          leadsConverted: convertedLeads.length,
          goalTarget: 10,
          responseRate: myLeads.length > 0 ? Math.round((convertedLeads.length / myLeads.length) * 100) : 0,
          averageResponseTime: '2.3 hours' // This would be calculated from actual data
        }
      }
    });

  } catch (error) {
    console.error('Employee dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employee dashboard data' },
      { status: 500 }
    );
  }
} 