"use client"

import React, { useState } from 'react'
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
  MessageSquare,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Phone,
  Mail,
  Calendar,
  User,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Mock leads data - will be replaced with Prisma queries
const mockLeads = [
  {
    id: "LEAD-001",
    fullName: "Jennifer Wilson",
    email: "jennifer.wilson@email.com",
    phone: "(555) 123-4567",
    address: { city: "Napa", state: "CA" },
    projectType: "Kitchen Remodel",
    style: "Modern",
    budgetMin: 50000,
    budgetMax: 75000,
    timeline: "3-6 months",
    message: "Looking to completely renovate our kitchen with a modern design. Interested in high-end appliances and custom cabinetry.",
    status: "new",
    priority: "high",
    source: "website",
    createdAt: "2024-01-15T10:30:00Z",
    followUpAt: "2024-01-16T09:00:00Z",
    assignedTo: null,
  },
  {
    id: "LEAD-002",
    fullName: "David Thompson",
    email: "david.t@email.com",
    phone: "(555) 987-6543",
    address: { city: "Sonoma", state: "CA" },
    projectType: "Bathroom Renovation",
    style: "Traditional",
    budgetMin: 25000,
    budgetMax: 40000,
    timeline: "1-3 months",
    message: "Master bathroom renovation. Looking for luxury finishes and a spa-like feel.",
    status: "contacted",
    priority: "medium",
    source: "google",
    createdAt: "2024-01-14T14:20:00Z",
    followUpAt: "2024-01-17T11:00:00Z",
    assignedTo: "Sarah Chen",
  },
  {
    id: "LEAD-003",
    fullName: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "(555) 456-7890",
    address: { city: "St. Helena", state: "CA" },
    projectType: "Whole Home Design",
    style: "Transitional",
    budgetMin: 100000,
    budgetMax: null,
    timeline: "6+ months",
    message: "Recently purchased a home and looking for complete interior design services for the entire house.",
    status: "qualified",
    priority: "high",
    source: "referral",
    createdAt: "2024-01-13T16:45:00Z",
    followUpAt: "2024-01-15T14:00:00Z",
    assignedTo: "Michael Rodriguez",
  },
  {
    id: "LEAD-004",
    fullName: "Robert Kim",
    email: "robert.kim@email.com",
    phone: "(555) 321-0987",
    address: { city: "Yountville", state: "CA" },
    projectType: "Kitchen Remodel",
    style: "Contemporary",
    budgetMin: 30000,
    budgetMax: 50000,
    timeline: "ASAP",
    message: "Need quick turnaround for kitchen renovation before hosting family events.",
    status: "proposal",
    priority: "high",
    source: "social",
    createdAt: "2024-01-12T09:15:00Z",
    followUpAt: "2024-01-15T10:00:00Z",
    assignedTo: "Sarah Chen",
  },
  {
    id: "LEAD-005",
    fullName: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "(555) 654-3210",
    address: { city: "Calistoga", state: "CA" },
    projectType: "Bathroom Renovation",
    style: "Modern",
    budgetMin: 15000,
    budgetMax: 25000,
    timeline: "3-6 months",
    message: "Small bathroom renovation. Looking for space-efficient solutions.",
    status: "lost",
    priority: "low",
    source: "website",
    createdAt: "2024-01-10T11:30:00Z",
    followUpAt: null,
    assignedTo: null,
  },
]

const statuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
const priorities = ["All", "High", "Medium", "Low"]
const sources = ["All", "Website", "Google", "Referral", "Social"]

function LeadCard({ lead }: { lead: typeof mockLeads[0] }) {
  const formatBudget = (min: number, max: number | null) => {
    if (!max) return `$${min.toLocaleString()}+`
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'outline'
      case 'contacted': return 'secondary'
      case 'qualified': return 'default'
      case 'proposal': return 'default'
      case 'won': return 'default'
      case 'lost': return 'destructive'
      default: return 'outline'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return null
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{lead.fullName}</CardTitle>
              {getPriorityIcon(lead.priority)}
            </div>
            <CardDescription className="space-y-1">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {lead.email}
              </div>
              {lead.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {lead.phone}
                </div>
              )}
              {lead.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {lead.address.city}, {lead.address.state}
                </div>
              )}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Lead actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Lead
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                Call Client
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Mark as Won
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Project Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Project:</span>
            <span>{lead.projectType}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Style:</span>
            <span>{lead.style}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Budget:</span>
            <span className="text-green-600 font-medium">
              {formatBudget(lead.budgetMin, lead.budgetMax)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Timeline:</span>
            <span>{lead.timeline}</span>
          </div>
        </div>

        {/* Message Preview */}
        {lead.message && (
          <div className="space-y-1">
            <span className="text-sm font-medium">Message:</span>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {lead.message}
            </p>
          </div>
        )}

        {/* Status and Assignment */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={getStatusColor(lead.status)}>
              {lead.status}
            </Badge>
            <Badge variant="outline">
              {lead.source}
            </Badge>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            {lead.assignedTo ? (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {lead.assignedTo}
              </div>
            ) : (
              <span>Unassigned</span>
            )}
          </div>
        </div>

        {/* Follow-up */}
        {lead.followUpAt && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            Follow up: {new Date(lead.followUpAt).toLocaleDateString()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            <Phone className="mr-2 h-3 w-3" />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Mail className="mr-2 h-3 w-3" />
            Email
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LeadsManagement() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedSource, setSelectedSource] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter leads based on selections
  const filteredLeads = mockLeads.filter(lead => {
    const matchesStatus = selectedStatus === "All" || lead.status === selectedStatus.toLowerCase()
    const matchesPriority = selectedPriority === "All" || lead.priority === selectedPriority.toLowerCase()
    const matchesSource = selectedSource === "All" || lead.source === selectedSource.toLowerCase()
    const matchesSearch = lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSource && matchesSearch
  })

  const stats = {
    total: mockLeads.length,
    new: mockLeads.filter(l => l.status === 'new').length,
    contacted: mockLeads.filter(l => l.status === 'contacted').length,
    qualified: mockLeads.filter(l => l.status === 'qualified').length,
    proposal: mockLeads.filter(l => l.status === 'proposal').length,
    highPriority: mockLeads.filter(l => l.priority === 'high').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Design Leads</h2>
          <p className="text-muted-foreground">
            Manage client inquiries and design consultation requests
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Bulk Actions
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <Badge variant="outline" className="h-4 w-4 rounded-full p-0 text-[10px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <Badge variant="secondary" className="h-4 w-4 rounded-full p-0 text-[10px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contacted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <Badge className="h-4 w-4 rounded-full p-0 text-[10px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.qualified}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposals</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.proposal}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search leads by name, email, or project type..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
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
                {statuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Priority Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[100px]">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedPriority}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {priorities.map((priority) => (
                  <DropdownMenuItem
                    key={priority}
                    onClick={() => setSelectedPriority(priority)}
                  >
                    {priority}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Source Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[100px]">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedSource}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Source</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sources.map((source) => (
                  <DropdownMenuItem
                    key={source}
                    onClick={() => setSelectedSource(source)}
                  >
                    {source}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {stats.total} leads
          </p>
        </div>

        {/* Leads Grid */}
        {filteredLeads.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No leads found</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                No leads match your current filters. Try adjusting your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 