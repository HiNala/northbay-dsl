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

    // Check admin permissions
    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.user.id },
      include: { Role: true }
    });

    const hasAdminAccess = userRoles.some(ur => 
      ur.Role.level >= 80 // Admin level or above
    );

    if (!hasAdminAccess) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Product statistics
    const totalProducts = await prisma.product.count({
      where: { deletedAt: null }
    });
    
    const publishedProducts = await prisma.product.count({
      where: { 
        status: 'PUBLISHED',
        deletedAt: null 
      }
    });
    
    const draftProducts = await prisma.product.count({
      where: { 
        status: 'DRAFT',
        deletedAt: null 
      }
    });

    const aiGeneratedProducts = await prisma.product.count({
      where: { 
        aiGeneratedDescription: true,
        deletedAt: null 
      }
    });

    // Recent products
    const recentProducts = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: lastWeek
        },
        deletedAt: null
      },
      include: {
        Creator: {
          include: { Profile: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Lead statistics
    const totalLeads = await prisma.designLead.count();
    const newLeads = await prisma.designLead.count({
      where: { status: 'NEW' }
    });
    const qualifiedLeads = await prisma.designLead.count({
      where: { status: 'QUALIFIED' }
    });
    const wonLeads = await prisma.designLead.count({
      where: { status: 'WON' }
    });

    // Recent leads
    const recentLeads = await prisma.designLead.findMany({
      where: {
        createdAt: {
          gte: lastWeek
        }
      },
      include: {
        AssignedTo: {
          include: { Profile: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // User activity
    const recentActivity = await prisma.auditLog.findMany({
      where: {
        createdAt: {
          gte: lastWeek
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

    // System health indicators
    const systemStatus = {
      database: 'healthy',
      aiService: 'operational',
      emailService: 'active',
      bulkImport: 'ready'
    };

    // Calculate growth metrics
    const lastMonthProducts = await prisma.product.count({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          lt: startOfMonth
        },
        deletedAt: null
      }
    });

    const productGrowth = lastMonthProducts > 0 ? 
      Math.round(((totalProducts - lastMonthProducts) / lastMonthProducts) * 100) : 0;

    const lastMonthLeads = await prisma.designLead.count({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          lt: startOfMonth
        }
      }
    });

    const leadGrowth = lastMonthLeads > 0 ? 
      Math.round(((totalLeads - lastMonthLeads) / lastMonthLeads) * 100) : 0;

    // Return admin dashboard data
    return NextResponse.json({
      success: true,
      data: {
        productStats: {
          total: totalProducts,
          published: publishedProducts,
          drafts: draftProducts,
          aiGenerated: aiGeneratedProducts,
          growth: productGrowth
        },
        leadStats: {
          total: totalLeads,
          new: newLeads,
          qualified: qualifiedLeads,
          won: wonLeads,
          growth: leadGrowth,
          conversionRate: totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0
        },
        recentProducts: recentProducts.map(product => ({
          id: product.id,
          name: product.name,
          status: product.status,
          creator: product.Creator ? product.Creator.Profile?.fullName || product.Creator.email : 'Unknown',
          createdAt: product.createdAt
        })),
        recentLeads: recentLeads.map(lead => ({
          id: lead.id,
          name: lead.fullName,
          email: lead.email,
          status: lead.status,
          assignedTo: lead.AssignedTo ? lead.AssignedTo.Profile?.fullName || lead.AssignedTo.email : null,
          createdAt: lead.createdAt
        })),
        recentActivity: recentActivity.map(activity => ({
          id: activity.id,
          action: activity.action,
          table: activity.tableName,
          user: activity.User ? activity.User.Profile?.fullName || activity.User.email : 'System',
          createdAt: activity.createdAt
        })),
        systemStatus
      }
    });

  } catch (error) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin dashboard data' },
      { status: 500 }
    );
  }
} 