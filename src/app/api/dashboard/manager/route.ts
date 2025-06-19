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
    const startOfWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Revenue Analytics
    const monthlyOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startOfMonth },
        status: { in: ['paid', 'processing', 'shipped', 'delivered'] }
      }
    });

    const lastMonthOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: lastMonth, lte: endOfLastMonth },
        status: { in: ['paid', 'processing', 'shipped', 'delivered'] }
      }
    });

    const weeklyOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startOfWeek },
        status: { in: ['paid', 'processing', 'shipped', 'delivered'] }
      }
    });

    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const weeklyRevenue = weeklyOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const revenueGrowth = lastMonthRevenue > 0 ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue * 100) : 0;

    // Sales Pipeline Analytics
    const salesPipeline = await prisma.designLead.groupBy({
      by: ['status'],
      _count: {
        status: true
      },
      _sum: {
        budgetMin: true
      }
    });

    const pipelineValue = salesPipeline.reduce((sum, stage) => 
      sum + (Number(stage._sum.budgetMin) || 0), 0
    );

    // Lead Conversion Analytics
    const totalLeads = await prisma.designLead.count();
    const convertedLeads = await prisma.designLead.count({
      where: { status: 'WON' }
    });
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads * 100) : 0;

    // Product Performance
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _count: { productId: true },
      _sum: { quantity: true },
      orderBy: { _count: { productId: 'desc' } },
      take: 5
    });

    const productDetails = await prisma.product.findMany({
      where: {
        id: { in: topProducts.map(p => p.productId) }
      },
      select: { id: true, name: true, price: true }
    });

    const topProductsWithDetails = topProducts.map(item => {
      const product = productDetails.find(p => p.id === item.productId);
      return {
        ...item,
        name: product?.name || 'Unknown Product',
        price: product?.price || 0
      };
    });

    // Recent High-Value Activities
    const recentActivities = await prisma.auditLog.findMany({
      where: {
        createdAt: { gte: startOfWeek },
        OR: [
          { tableName: 'orders' },
          { tableName: 'design_leads' },
          { tableName: 'products' }
        ]
      },
      include: {
        User: { include: { Profile: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Inventory Alerts
    const lowStockCount = await prisma.product.count({
      where: {
        trackInventory: true,
        stockQuantity: { lte: 10 },
        status: 'PUBLISHED'
      }
    });

    // Monthly Goals (Business-focused)
    const goals = {
      revenue: {
        current: monthlyRevenue,
        target: 150000,
        progress: Math.min((monthlyRevenue / 150000) * 100, 100)
      },
      conversion: {
        current: Math.round(conversionRate),
        target: 25,
        progress: Math.min((conversionRate / 25) * 100, 100)
      },
      orders: {
        current: monthlyOrders.length,
        target: 50,
        progress: Math.min((monthlyOrders.length / 50) * 100, 100)
      }
    };

    // Return manager dashboard data focused on business operations
    return NextResponse.json({
      success: true,
      data: {
        // Core Business Metrics
        metrics: {
          monthlyRevenue,
          weeklyRevenue,
          revenueGrowth: Number(revenueGrowth.toFixed(1)),
          totalOrders: monthlyOrders.length,
          pipelineValue,
          conversionRate: Number(conversionRate.toFixed(1)),
          lowStockAlerts: lowStockCount
        },
        
        // Business Goals
        goals,
        
        // Sales Pipeline
        salesPipeline: salesPipeline.map(stage => ({
          status: stage.status,
          count: stage._count.status,
          value: Number(stage._sum.budgetMin) || 0
        })),
        
        // Top Performing Products
        topProducts: topProductsWithDetails,
        
        // Recent Business Activities
        recentActivities: recentActivities.map(activity => ({
          id: activity.id,
          action: activity.action,
          table: activity.tableName,
          user: activity.User ? activity.User.Profile?.fullName || activity.User.email || 'Unknown' : 'System',
          createdAt: activity.createdAt
        })),
        
        // Revenue Trend Data (last 7 days)
        revenuetrend: {
          weekly: weeklyRevenue,
          daily: Math.round(weeklyRevenue / 7),
          growth: revenueGrowth
        }
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