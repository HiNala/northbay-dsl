"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Video,
  DollarSign,
  Loader2,
  Edit,
  Trash2,
} from "lucide-react"

// Types
interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  date: string
  time: string
  duration: number // in minutes
  type: string
  location: string
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  projectType?: string
  estimatedBudget?: string
  notes?: string
  followUpRequired?: boolean
  createdAt: string
  updatedAt: string
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: "apt-001",
    clientName: "Jennifer Wilson",
    clientEmail: "jennifer.w@email.com",
    clientPhone: "(555) 123-4567",
    date: "2024-12-12",
    time: "09:00",
    duration: 90,
    type: "Initial Consultation",
    location: "North Bay Showroom",
    status: "confirmed",
    projectType: "Kitchen Remodel",
    estimatedBudget: "$50k - $75k",
    notes: "Interested in modern farmhouse style. Has Pinterest board with ideas.",
    followUpRequired: true,
    createdAt: "2024-12-10T10:00:00Z",
    updatedAt: "2024-12-11T14:30:00Z"
  },
  {
    id: "apt-002",
    clientName: "David Thompson",
    clientEmail: "david.t@email.com",
    clientPhone: "(555) 987-6543",
    date: "2024-12-12",
    time: "14:00",
    duration: 60,
    type: "Design Review",
    location: "Client Home - 123 Oak St, Napa",
    status: "scheduled",
    projectType: "Bathroom Renovation",
    estimatedBudget: "$25k - $40k",
    notes: "Second meeting to review updated designs and material selections.",
    followUpRequired: false,
    createdAt: "2024-12-09T15:20:00Z",
    updatedAt: "2024-12-11T09:15:00Z"
  },
  {
    id: "apt-003",
    clientName: "Lisa Anderson",
    clientEmail: "lisa.a@email.com",
    clientPhone: "(555) 456-7890",
    date: "2024-12-12",
    time: "16:30",
    duration: 120,
    type: "Project Walkthrough",
    location: "St. Helena Residence",
    status: "confirmed",
    projectType: "Whole Home Design",
    estimatedBudget: "$100k+",
    notes: "Final walkthrough before construction begins. Review timeline and materials.",
    followUpRequired: true,
    createdAt: "2024-12-08T11:00:00Z",
    updatedAt: "2024-12-11T16:45:00Z"
  },
  {
    id: "apt-004",
    clientName: "Michael Rodriguez",
    clientEmail: "michael.r@email.com",
    clientPhone: "(555) 234-5678",
    date: "2024-12-13",
    time: "10:00",
    duration: 90,
    type: "Site Measurement",
    location: "Client Home - 456 Vine St, Calistoga",
    status: "scheduled",
    projectType: "Kitchen Island Addition",
    estimatedBudget: "$15k - $25k",
    notes: "Measure existing space for custom island design. Discuss electrical requirements.",
    followUpRequired: false,
    createdAt: "2024-12-11T09:30:00Z",
    updatedAt: "2024-12-11T09:30:00Z"
  },
  {
    id: "apt-005",
    clientName: "Sarah Kim",
    clientEmail: "sarah.k@email.com",
    date: "2024-12-13",
    time: "15:00",
    duration: 60,
    type: "Follow-up Call",
    location: "Virtual Meeting",
    status: "scheduled",
    projectType: "Powder Room Design",
    estimatedBudget: "$8k - $12k",
    notes: "Check on material delivery and discuss minor design adjustments.",
    followUpRequired: true,
    createdAt: "2024-12-10T13:45:00Z",
    updatedAt: "2024-12-10T13:45:00Z"
  }
]

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800", 
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  "no-show": "bg-red-100 text-red-800"
}

export default function EmployeeAppointments() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewAppointmentDialog, setShowNewAppointmentDialog] = useState(false)

  // Authentication check
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session?.user) {
      router.push('/auth/login')
      return
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'employee', 'super_admin'].includes(role)
    )

    if (!hasAccess) {
      router.push('/')
      return
    }
  }, [session, status, router])

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesDate = !selectedDate || apt.date === selectedDate
    const matchesStatus = selectedStatus === "All" || apt.status === selectedStatus
    const matchesSearch = apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.projectType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesDate && matchesStatus && matchesSearch
  })

  // Stats calculation
  const todayDate = new Date().toISOString().split('T')[0]
  const stats = {
    total: appointments.length,
    today: appointments.filter(apt => apt.date === todayDate).length,
    thisWeek: appointments.filter(apt => {
      const aptDate = new Date(apt.date)
      const today = new Date()
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      return aptDate >= today && aptDate <= weekFromNow
    }).length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    pending: appointments.filter(apt => apt.status === 'scheduled').length,
    followUps: appointments.filter(apt => apt.followUpRequired).length
  }

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
              <p className="text-sm text-muted-foreground">{appointment.type}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={statusColors[appointment.status]}>
                {appointment.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Appointment
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Complete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Cancel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(appointment.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{appointment.time} ({appointment.duration}min)</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{appointment.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{appointment.estimatedBudget}</span>
            </div>
          </div>

          {appointment.projectType && (
            <div className="mb-3">
              <Badge variant="outline">{appointment.projectType}</Badge>
            </div>
          )}

          {appointment.notes && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {appointment.notes}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
              {appointment.location.includes('Virtual') && (
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4 mr-1" />
                  Join
                </Button>
              )}
            </div>
            {appointment.followUpRequired && (
              <Badge variant="secondary" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Follow-up Required
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Appointments</h2>
          <p className="text-muted-foreground">
            Manage your client meetings and project consultations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button onClick={() => setShowNewAppointmentDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.followUps}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Date Filter */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-input rounded-md px-3 py-2 text-sm"
              />
            </div>

            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  id="search"
                  placeholder="Search by client name, project type..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="min-w-[120px]">
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedStatus("All")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("scheduled")}>
                    Scheduled
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("confirmed")}>
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("completed")}>
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("cancelled")}>
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAppointments.length} of {appointments.length} appointments
          </p>
          <Button variant="outline" size="sm">
            Export Calendar
          </Button>
        </div>

        {/* Appointments Grid */}
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No appointments found</h3>
              <p className="text-sm text-muted-foreground text-center">
                {searchQuery || selectedDate || selectedStatus !== "All" 
                  ? "Try adjusting your filters to see more results."
                  : "Schedule your first appointment to get started."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 