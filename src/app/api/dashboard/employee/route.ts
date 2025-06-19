import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Get recent leads assigned this week
    const recentLeads = await prisma.designLead.findMany({
      where: {
        assignedTo: userId,
        createdAt: {
          gte: startOfWeek
        }
      }
    });

    // Get monthly sales performance
    const monthlyLeads = await prisma.designLead.findMany({
      where: {
        assignedTo: userId,
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    const convertedLeads = monthlyLeads.filter(lead => lead.status === 'WON');
    const potentialValue = myLeads.reduce((sum, lead) => sum + (lead.budgetMin || 0), 0);
    const convertedValue = convertedLeads.reduce((sum, lead) => sum + (lead.budgetMin || 0), 0);

    // Follow-ups needed
    const followUpsNeeded = myLeads.filter(lead => 
      lead.followUpAt && new Date(lead.followUpAt) <= today
    );

    // Lead priority breakdown
    const highPriorityLeads = myLeads.filter(lead => lead.priority === 'HIGH').length;
    const mediumPriorityLeads = myLeads.filter(lead => lead.priority === 'MEDIUM').length;

    // Calculate personal performance metrics
    const totalContactedLeads = monthlyLeads.filter(lead => 
      ['CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON'].includes(lead.status)
    ).length;

    const conversionRate = monthlyLeads.length > 0 ? 
      (convertedLeads.length / monthlyLeads.length * 100) : 0;

    const responseRate = monthlyLeads.length > 0 ? 
      (totalContactedLeads / monthlyLeads.length * 100) : 0;

    // Get recent sales activities
    const recentActivities = await prisma.auditLog.findMany({
      where: {
        userId: userId,
        tableName: 'design_leads',
        createdAt: {
          gte: startOfWeek
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Lead source performance
    const leadSources = await prisma.designLead.groupBy({
      by: ['source'],
      where: {
        assignedTo: userId,
        createdAt: {
          gte: startOfMonth
        }
      },
      _count: {
        source: true
      }
    });

    // Sales quota tracking (assuming monthly quota of 10 conversions)
    const monthlyQuota = 10;
    const quotaProgress = (convertedLeads.length / monthlyQuota) * 100;

    // Calculate stats
    const stats = {
      activeLeads: myLeads.length,
      recentLeads: recentLeads.length,
      followUpsDue: followUpsNeeded.length,
      monthlyConversions: convertedLeads.length,
      conversionRate: Math.round(conversionRate),
      potentialValue,
      convertedValue,
      quotaProgress: Math.min(quotaProgress, 100),
      highPriorityCount: highPriorityLeads
    };

    // Return employee dashboard data focused on sales performance
    return NextResponse.json({
      success: true,
      data: {
        // Personal Sales Metrics
        stats,
        
        // Current Active Leads
        myLeads: myLeads.slice(0, 5).map(lead => ({
          id: lead.id,
          fullName: lead.fullName,
          email: lead.email,
          phone: lead.phone,
          projectType: lead.projectType,
          budgetMin: lead.budgetMin,
          budgetMax: lead.budgetMax,
          status: lead.status,
          priority: lead.priority,
          followUpAt: lead.followUpAt,
          createdAt: lead.createdAt
        })),
        
        // Recent Sales Activities
        recentActivities: recentActivities.map(activity => ({
          id: activity.id,
          action: activity.action,
          details: activity.newValues,
          createdAt: activity.createdAt
        })),
        
        // Lead Sources Performance
        leadSources: leadSources.map(source => ({
          source: source.source || 'Direct',
          count: source._count.source
        })),
        
        // Performance Summary
        performance: {
          monthlyConversions: convertedLeads.length,
          monthlyQuota,
          conversionRate: Math.round(conversionRate),
          responseRate: Math.round(responseRate),
          totalLeadsHandled: monthlyLeads.length,
          averageLeadValue: monthlyLeads.length > 0 ? 
            Math.round(potentialValue / monthlyLeads.length) : 0
        },
        
        // Priority Breakdown
        priorities: {
          high: highPriorityLeads,
          medium: mediumPriorityLeads,
          low: myLeads.length - highPriorityLeads - mediumPriorityLeads
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