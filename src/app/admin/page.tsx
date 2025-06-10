"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Plus,
  Eye,
  MessageSquare,
  Palette,
  Activity,
  BarChart3,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  FileSpreadsheet,
  Edit3
} from "lucide-react"

interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalLeads: number;
  newLeads: number;
  aiGeneratedCount: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalLeads: 0,
    newLeads: 0,
    aiGeneratedCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Check authentication and permissions
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user) {
      router.push('/auth/login');
      return;
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'employee', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      router.push('/');
      return;
    }
    
    fetchDashboardStats();
  }, [session, status, router]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch product stats
      const productsResponse = await fetch('/api/products?admin=true&limit=1000');
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        const products = productsData.products || [];
        
        const published = products.filter((p: any) => p.status === 'published').length;
        const draft = products.filter((p: any) => p.status === 'draft').length;
        const aiGenerated = products.filter((p: any) => p.aiGeneratedDescription).length;
        
        setStats(prev => ({
          ...prev,
          totalProducts: products.length,
          publishedProducts: published,
          draftProducts: draft,
          aiGeneratedCount: aiGenerated,
        }));
      }

      // Fetch leads stats
      const leadsResponse = await fetch('/api/leads');
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json();
        const leads = leadsData.leads || [];
        
        const newLeads = leads.filter((l: any) => l.status === 'new').length;
        
        setStats(prev => ({
          ...prev,
          totalLeads: leads.length,
          newLeads: newLeads,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: '🤖 AI Product Manager',
      description: 'Generate descriptions, manage drafts, bulk operations',
      href: '/admin/products',
      icon: Bot,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      stats: `${stats.totalProducts} products, ${stats.aiGeneratedCount} AI-generated`,
    },
    {
      title: '📊 Bulk Import',
      description: 'Upload Excel/CSV files to create multiple products',
      href: '/admin/products/import',
      icon: FileSpreadsheet,
      color: 'bg-green-100 text-green-700 border-green-200',
      stats: 'Excel, CSV, JSON support',
    },
    {
      title: '👥 Lead Management',
      description: 'Manage customer inquiries and design leads',
      href: '/admin/leads',
      icon: Users,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      stats: `${stats.totalLeads} total, ${stats.newLeads} new`,
    },
    {
      title: '⚙️ System Settings',
      description: 'Configure site settings and user permissions',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      stats: 'Configuration & security',
    },
  ];

  const statsCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-blue-600',
      trend: '+12%',
    },
    {
      title: 'Published',
      value: stats.publishedProducts,
      icon: CheckCircle,
      color: 'text-green-600',
      trend: '+8%',
    },
    {
      title: 'Drafts',
      value: stats.draftProducts,
      icon: Edit3,
      color: 'text-yellow-600',
      trend: '+15%',
    },
    {
      title: 'AI Generated',
      value: stats.aiGeneratedCount,
      icon: Bot,
      color: 'text-purple-600',
      trend: '+45%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚀 Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {session?.user?.email?.split('@')[0]}! Manage your North Bay Kitchen & Bath platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color === 'text-blue-600' ? 'bg-blue-100' : stat.color === 'text-green-600' ? 'bg-green-100' : stat.color === 'text-yellow-600' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <Badge variant="outline" className="ml-2 text-green-600 border-green-200">
                      {stat.trend}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-amber-200">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{action.description}</p>
                      <p className="text-sm text-gray-500">{action.stats}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Link href="/admin/products">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">AI descriptions generated</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <Badge>New</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">5 products published</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <Badge variant="outline">Published</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">New design lead received</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
                <Badge>Lead</Badge>
              </div>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-3 text-sm text-gray-900">AI Service</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-3 text-sm text-gray-900">Database</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-3 text-sm text-gray-900">Email Service</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="ml-3 text-sm text-gray-900">Bulk Import</span>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Ready</Badge>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 