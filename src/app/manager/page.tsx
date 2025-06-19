"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Target,
  BarChart3,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Calendar
} from "lucide-react"

interface DashboardData {
  metrics: {
    monthlyRevenue: number
    weeklyRevenue: number
    revenueGrowth: number
    totalOrders: number
    pipelineValue: number
    conversionRate: number
    lowStockAlerts: number
  }
  goals: {
    revenue: { current: number; target: number; progress: number }
    conversion: { current: number; target: number; progress: number }
    orders: { current: number; target: number; progress: number }
  }
  salesPipeline: Array<{
    status: string
    count: number
    value: number
  }>
  topProducts: Array<{
    name: string
    _count: { productId: number }
    _sum: { quantity: number }
    price: number
  }>
  recentActivities: Array<{
    id: string
    action: string
    table: string
    user: string
    createdAt: string
  }>
  revenuetrend: {
    weekly: number
    daily: number
    growth: number
  }
}

export default function ManagerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard/manager')
        if (response.ok) {
          const result = await response.json()
          setData(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-luxury-gold-500"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load dashboard</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-light text-charcoal-900 font-serif">Business Operations Dashboard</h1>
        <p className="text-sm sm:text-base text-charcoal-600">
          {today} • Business Performance & Analytics
        </p>
      </motion.div>

      {/* Key Metrics Row */}
      <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-luxury-gold-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-luxury-gold-600">
              ${data.metrics.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className={`flex items-center ${data.metrics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.metrics.revenueGrowth >= 0 ? 
                  <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                }
                {Math.abs(data.metrics.revenueGrowth).toFixed(1)}%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Pipeline</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${data.metrics.pipelineValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600 flex items-center">
                <Activity className="h-3 w-3 mr-1" />
                {data.salesPipeline.reduce((sum, stage) => sum + stage.count, 0)} active leads
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{data.metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                This month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{data.metrics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {data.metrics.lowStockAlerts > 0 && (
                <span className="text-orange-600 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {data.metrics.lowStockAlerts} low stock alerts
                </span>
              )}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Business Goals */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Monthly Goals</CardTitle>
                <Target className="h-5 w-5 text-luxury-gold-500" />
              </div>
              <CardDescription>Track progress toward business targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Revenue Target</span>
                  <span className="text-sm text-muted-foreground">
                    ${data.goals.revenue.current.toLocaleString()} / ${data.goals.revenue.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={data.goals.revenue.progress} className="h-2" />
                <Badge variant="secondary" className={`${
                  data.goals.revenue.progress >= 80 ? 'bg-green-100 text-green-700' :
                  data.goals.revenue.progress >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {Math.round(data.goals.revenue.progress)}% Complete
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {data.goals.conversion.current}% / {data.goals.conversion.target}%
                  </span>
                </div>
                <Progress value={data.goals.conversion.progress} className="h-2" />
                <Badge variant="secondary" className={`${
                  data.goals.conversion.progress >= 80 ? 'bg-green-100 text-green-700' :
                  data.goals.conversion.progress >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {Math.round(data.goals.conversion.progress)}% Complete
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Monthly Orders</span>
                  <span className="text-sm text-muted-foreground">
                    {data.goals.orders.current} / {data.goals.orders.target}
                  </span>
                </div>
                <Progress value={data.goals.orders.progress} className="h-2" />
                <Badge variant="secondary" className={`${
                  data.goals.orders.progress >= 80 ? 'bg-green-100 text-green-700' :
                  data.goals.orders.progress >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {Math.round(data.goals.orders.progress)}% Complete
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Top Products</CardTitle>
                <Package className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topProducts.slice(0, 5).map((product, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                    index === 0 ? 'bg-gold-50 border-gold-200' :
                    index === 1 ? 'bg-blue-50 border-blue-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-gold-500' :
                        index === 1 ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`}>
                        <span className="text-white text-sm font-medium">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product._sum.quantity} sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${Number(product.price).toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        {product._count.productId} orders
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View Product Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Activities</CardTitle>
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <CardDescription>Latest business activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivities.slice(0, 5).map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {activity.table === 'orders' && <CheckCircle className="h-4 w-4 text-green-500 mt-1" />}
                    {activity.table === 'design_leads' && <Target className="h-4 w-4 text-blue-500 mt-1" />}
                    {activity.table === 'products' && <Package className="h-4 w-4 text-purple-500 mt-1" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.action} in {activity.table.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sales Pipeline Overview */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sales Pipeline Overview
            </CardTitle>
            <CardDescription>Lead distribution across sales stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.salesPipeline.map((stage, index) => (
                <div key={stage.status} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stage.count}</div>
                  <div className="text-sm font-medium text-gray-900">{stage.status}</div>
                  <div className="text-xs text-gray-600">
                    ${stage.value.toLocaleString()} value
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom Action Cards */}
      <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="border-luxury-gold-200 bg-luxury-gold-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-luxury-gold-500 rounded-lg">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-luxury-gold-700">Business Report</h3>
                <p className="text-sm text-luxury-gold-600">Generate comprehensive analytics</p>
              </div>
              <Button variant="outline" className="border-luxury-gold-300 w-full sm:w-auto">
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-700">Inventory Review</h3>
                <p className="text-sm text-blue-600">Check stock levels & alerts</p>
              </div>
              <Button variant="outline" className="border-blue-300 w-full sm:w-auto">
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-green-500 rounded-lg">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-green-700">Set Goals</h3>
                <p className="text-sm text-green-600">Define next month's targets</p>
              </div>
              <Button variant="outline" className="border-green-300 w-full sm:w-auto">
                Set Goals
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
} 