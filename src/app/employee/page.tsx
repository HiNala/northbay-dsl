"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar,
  CheckSquare,
  TrendingUp,
  AlertCircle,
  Phone,
  Mail,
  DollarSign,
  Target,
  Clock,
  Award,
  BarChart3,
  User
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { NotificationCenter } from '@/components/ui/notification-center'

interface DashboardData {
  stats: {
    activeLeads: number
    recentLeads: number
    followUpsDue: number
    monthlyConversions: number
    conversionRate: number
    potentialValue: number
    convertedValue: number
    quotaProgress: number
    highPriorityCount: number
  }
  myLeads: Array<{
    id: string
    fullName: string
    email: string
    phone: string | null
    projectType: string | null
    budgetMin: number | null
    budgetMax: number | null
    status: string
    priority: string | null
    followUpAt: string | null
    createdAt: string
  }>
  performance: {
    monthlyConversions: number
    monthlyQuota: number
    conversionRate: number
    responseRate: number
    totalLeadsHandled: number
    averageLeadValue: number
  }
  leadSources: Array<{
    source: string
    count: number
  }>
  priorities: {
    high: number
    medium: number
    low: number
  }
}

export default function EmployeeDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard/employee')
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800'
      case 'CONTACTED': return 'bg-purple-100 text-purple-800'
      case 'QUALIFIED': return 'bg-green-100 text-green-800'
      case 'PROPOSAL': return 'bg-orange-100 text-orange-800'
      case 'WON': return 'bg-emerald-100 text-emerald-800'
      case 'LOST': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Dashboard</h1>
          <p className="text-gray-600">Track your performance and manage your leads</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
                <Users className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.stats.activeLeads}</div>
                <p className="text-xs text-blue-100 mt-1">
                  {data.stats.highPriorityCount} high priority
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Conversions</CardTitle>
                <Target className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.stats.monthlyConversions}</div>
                <p className="text-xs text-green-100 mt-1">
                  {data.stats.quotaProgress.toFixed(0)}% of quota
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart3 className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.stats.conversionRate}%</div>
                <p className="text-xs text-purple-100 mt-1">
                  This month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
                <Clock className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.stats.followUpsDue}</div>
                <p className="text-xs text-orange-100 mt-1">
                  Need attention
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Leads */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Leads
                </CardTitle>
                <CardDescription>
                  Your current leads requiring action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.myLeads.map((lead, index) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{lead.fullName}</h3>
                          <Badge className={getPriorityColor(lead.priority)}>
                            {lead.priority || 'Normal'}
                          </Badge>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{lead.projectType || 'General Inquiry'}</p>
                          {lead.budgetMin && (
                            <p className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              ${lead.budgetMin.toLocaleString()} - ${lead.budgetMax?.toLocaleString() || 'Open'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {lead.phone && (
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Sidebar */}
          <div className="space-y-6">
            {/* Quota Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Monthly Quota
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{data.performance.monthlyConversions}/{data.performance.monthlyQuota}</span>
                    </div>
                    <Progress value={data.stats.quotaProgress} className="h-2" />
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {data.stats.quotaProgress.toFixed(0)}%
                    </div>
                    <div className="text-sm text-blue-800">Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.leadSources.map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{source.source}</span>
                      <Badge variant="secondary">{source.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Priority Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Priority Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Priority</span>
                    <Badge className="bg-red-100 text-red-800">{data.priorities.high}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium Priority</span>
                    <Badge className="bg-yellow-100 text-yellow-800">{data.priorities.medium}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Priority</span>
                    <Badge className="bg-green-100 text-green-800">{data.priorities.low}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.performance.totalLeadsHandled}</div>
                <div className="text-sm text-gray-600">Leads Handled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.performance.responseRate}%</div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${data.performance.averageLeadValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Avg Lead Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ${data.stats.potentialValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Pipeline Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Center */}
        <div className="mt-8">
          <NotificationCenter />
        </div>
      </div>
    </div>
  )
} 