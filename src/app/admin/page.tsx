"use client"

import React from 'react'
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
} from "lucide-react"

// Mock data - will be replaced with real data from Prisma
const dashboardStats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "New Orders",
    value: "12",
    change: "+4",
    changeType: "positive" as const,
    icon: ShoppingCart,
    description: "this week",
  },
  {
    title: "Design Leads",
    value: "23",
    change: "+8",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "pending follow-up",
  },
  {
    title: "Active Projects",
    value: "7",
    change: "+2",
    changeType: "positive" as const,
    icon: Palette,
    description: "in progress",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    product: "Kitchen Cabinet Set",
    status: "processing",
    amount: "$3,299",
    date: "2024-01-15",
  },
  {
    id: "ORD-002", 
    customer: "Michael Chen",
    product: "Bathroom Vanity",
    status: "shipped",
    amount: "$1,599",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Emily Davis",
    product: "Custom Hardware Set",
    status: "delivered",
    amount: "$899",
    date: "2024-01-13",
  },
]

const recentLeads = [
  {
    id: "LEAD-001",
    name: "Jennifer Wilson",
    email: "jennifer@email.com",
    project: "Kitchen Remodel",
    budget: "$50,000 - $75,000",
    status: "new",
    created: "2 hours ago",
  },
  {
    id: "LEAD-002",
    name: "David Thompson",
    email: "david@email.com",
    project: "Bathroom Renovation",
    budget: "$25,000 - $40,000",
    status: "contacted",
    created: "1 day ago",
  },
  {
    id: "LEAD-003",
    name: "Lisa Anderson",
    email: "lisa@email.com",
    project: "Whole Home Design",
    budget: "$100,000+",
    status: "qualified",
    created: "2 days ago",
  },
]

const quickActions = [
  {
    title: "Add New Product",
    description: "Upload a new product to the catalog",
    icon: Package,
    href: "/admin/products/new",
  },
  {
    title: "Create Project",
    description: "Document a new client project",
    icon: Palette,
    href: "/admin/projects/new",
  },
  {
    title: "Follow Up Lead",
    description: "Contact pending design leads",
    icon: MessageSquare,
    href: "/admin/leads",
  },
  {
    title: "View Analytics",
    description: "Check detailed performance metrics",
    icon: Activity,
    href: "/admin/analytics",
  },
]

function StatCard({ stat }: { stat: typeof dashboardStats[0] }) {
  const Icon = stat.icon
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {stat.title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={`${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {stat.change}
          </span>{' '}
          {stat.description}
        </p>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You have {recentOrders.length} orders this week.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {order.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.product}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        order.status === 'delivered' ? 'default' :
                        order.status === 'shipped' ? 'secondary' : 'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                    <span className="font-semibold">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Design Leads</CardTitle>
                <CardDescription>
                  Latest potential clients
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                    <p className="text-xs text-blue-600">{lead.project}</p>
                    <p className="text-xs text-green-600">{lead.budget}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge 
                      variant={
                        lead.status === 'qualified' ? 'default' :
                        lead.status === 'contacted' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {lead.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{lead.created}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your business efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="rounded-md bg-amber-100 p-2">
                  <action.icon className="h-5 w-5 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates across your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-2">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">New order received from Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-green-100 p-2">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">Design consultation scheduled with Michael Chen</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-purple-100 p-2">
                <Palette className="h-4 w-4 text-purple-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">Project "Modern Kitchen Remodel" completed</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-orange-100 p-2">
                <Package className="h-4 w-4 text-orange-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">New product "Premium Faucet Set" added to catalog</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 