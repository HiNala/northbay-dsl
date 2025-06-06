"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MessageSquare,
  Clock,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Plus,
  Eye,
  User,
  DollarSign,
} from "lucide-react"

// Mock data for the employee dashboard
const employeeStats = [
  {
    title: "My Active Leads",
    value: "12",
    change: "+3",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "this week",
  },
  {
    title: "Appointments Today",
    value: "3",
    change: "+1",
    changeType: "positive" as const,
    icon: Calendar,
    description: "scheduled",
  },
  {
    title: "Follow-ups Due",
    value: "5",
    change: "-2",
    changeType: "positive" as const,
    icon: Clock,
    description: "pending",
  },
  {
    title: "Monthly Goal",
    value: "75%",
    change: "+15%",
    changeType: "positive" as const,
    icon: Target,
    description: "completed",
  },
]

const todayAppointments = [
  {
    id: "1",
    time: "9:00 AM",
    client: "Jennifer Wilson",
    type: "Initial Consultation",
    location: "Showroom",
    project: "Kitchen Remodel",
    budget: "$50k - $75k",
    status: "confirmed",
  },
  {
    id: "2",
    time: "2:00 PM",
    client: "David Thompson",
    type: "Design Review",
    location: "Client Home",
    project: "Bathroom Renovation",
    budget: "$25k - $40k",
    status: "confirmed",
  },
  {
    id: "3",
    time: "4:30 PM",
    client: "Lisa Anderson",
    type: "Project Walkthrough",
    location: "St. Helena",
    project: "Whole Home Design",
    budget: "$100k+",
    status: "pending",
  },
]

const myLeads = [
  {
    id: "LEAD-001",
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    phone: "(555) 234-5678",
    project: "Kitchen Remodel",
    budget: "$60k - $80k",
    status: "new",
    priority: "high",
    lastContact: "Never",
    nextAction: "Initial call",
    source: "website",
  },
  {
    id: "LEAD-002",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "(555) 876-5432",
    project: "Bathroom Design",
    budget: "$35k - $50k",
    status: "contacted",
    priority: "medium",
    lastContact: "2 days ago",
    nextAction: "Send proposal",
    source: "referral",
  },
  {
    id: "LEAD-003",
    name: "Robert Kim",
    email: "robert.kim@email.com",
    phone: "(555) 345-6789",
    project: "Full House Renovation",
    budget: "$150k+",
    status: "qualified",
    priority: "high",
    lastContact: "Yesterday",
    nextAction: "Schedule site visit",
    source: "google",
  },
]

const dailyTasks = [
  {
    id: "1",
    task: "Follow up with Jennifer Wilson on kitchen design approval",
    priority: "high",
    completed: false,
    dueTime: "10:00 AM",
  },
  {
    id: "2",
    task: "Prepare materials for 2 PM client meeting",
    priority: "high",
    completed: true,
    dueTime: "1:00 PM",
  },
  {
    id: "3",
    task: "Send quote to Emma Davis for bathroom renovation",
    priority: "medium",
    completed: false,
    dueTime: "3:00 PM",
  },
  {
    id: "4",
    task: "Update project status for Anderson whole home design",
    priority: "medium",
    completed: false,
    dueTime: "5:00 PM",
  },
  {
    id: "5",
    task: "Research new tile options for Rodriguez kitchen",
    priority: "low",
    completed: false,
    dueTime: "End of day",
  },
]

function StatCard({ stat }: { stat: typeof employeeStats[0] }) {
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

export default function EmployeeDashboard() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  })

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Good morning, Sarah!</h2>
          <p className="text-muted-foreground">
            It's {currentTime} - You have 3 appointments and 5 follow-ups scheduled today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            My Calendar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {employeeStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Appointments */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  {todayAppointments.length} appointments scheduled
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">{appointment.time}</div>
                      <Badge 
                        variant={appointment.status === 'confirmed' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {appointment.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {appointment.budget}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>
              {dailyTasks.filter(task => !task.completed).length} remaining
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start space-x-3 p-2 rounded ${
                    task.completed ? 'bg-green-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="mt-1 h-4 w-4"
                    readOnly
                  />
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.task}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.dueTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Active Leads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Active Leads</CardTitle>
              <CardDescription>
                Leads assigned to you that need attention
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{lead.name}</p>
                    <Badge 
                      variant={
                        lead.priority === 'high' ? 'destructive' :
                        lead.priority === 'medium' ? 'secondary' : 'outline'
                      }
                    >
                      {lead.priority}
                    </Badge>
                    <Badge variant="outline">
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>{lead.project}</div>
                    <div>{lead.budget}</div>
                    <div>Last contact: {lead.lastContact}</div>
                    <div>Next: {lead.nextAction}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>This Month's Performance</CardTitle>
            <CardDescription>Your progress toward monthly goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Leads Converted</span>
                <span className="font-medium">8 / 10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Appointments Scheduled</span>
                <span className="font-medium">15 / 20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Follow-up Response Rate</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Follow-up Email
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              View My Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 