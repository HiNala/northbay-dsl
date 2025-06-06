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
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  User,
  MapPin,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  Plus,
  ArrowUpRight,
} from "lucide-react"

// Mock data for employee-specific leads
const myLeads = [
  {
    id: "LEAD-001",
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    phone: "(555) 234-5678",
    address: { city: "Napa", state: "CA" },
    project: "Kitchen Remodel",
    style: "Modern",
    budget: "$60k - $80k",
    budgetMin: 60000,
    timeline: "3-6 months",
    status: "new",
    priority: "high",
    lastContact: null,
    nextAction: "Initial call",
    source: "website",
    created: "2024-01-16T09:00:00Z",
    followUpDue: "2024-01-17T10:00:00Z",
    notes: "Interested in high-end appliances and custom cabinetry. Budget confirmed.",
  },
  {
    id: "LEAD-002",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "(555) 876-5432",
    address: { city: "Sonoma", state: "CA" },
    project: "Bathroom Design",
    style: "Traditional",
    budget: "$35k - $50k",
    budgetMin: 35000,
    timeline: "1-3 months",
    status: "contacted",
    priority: "medium",
    lastContact: "2024-01-14T14:30:00Z",
    nextAction: "Send proposal",
    source: "referral",
    created: "2024-01-12T11:20:00Z",
    followUpDue: "2024-01-18T09:00:00Z",
    notes: "Master bathroom renovation. Likes spa-like designs. Schedule site visit.",
  },
  {
    id: "LEAD-003",
    name: "Robert Kim",
    email: "robert.kim@email.com",
    phone: "(555) 345-6789",
    address: { city: "Yountville", state: "CA" },
    project: "Full House Renovation",
    style: "Contemporary",
    budget: "$150k+",
    budgetMin: 150000,
    timeline: "6+ months",
    status: "qualified",
    priority: "high",
    lastContact: "2024-01-15T16:00:00Z",
    nextAction: "Schedule site visit",
    source: "google",
    created: "2024-01-10T13:45:00Z",
    followUpDue: "2024-01-19T14:00:00Z",
    notes: "Large project. Very engaged. Ready to move forward with design phase.",
  },
  {
    id: "LEAD-004",
    name: "Sarah Martinez",
    email: "sarah.martinez@email.com",
    phone: "(555) 567-8901",
    address: { city: "St. Helena", state: "CA" },
    project: "Kitchen & Dining",
    style: "Transitional",
    budget: "$45k - $65k",
    budgetMin: 45000,
    timeline: "3-6 months",
    status: "proposal",
    priority: "high",
    lastContact: "2024-01-15T10:30:00Z",
    nextAction: "Follow up on proposal",
    source: "social",
    created: "2024-01-08T15:15:00Z",
    followUpDue: "2024-01-17T15:00:00Z",
    notes: "Proposal sent. Awaiting decision. Very interested in sustainable materials.",
  },
  {
    id: "LEAD-005",
    name: "Jennifer Park",
    email: "jennifer.park@email.com",
    phone: "(555) 432-1098",
    address: { city: "Calistoga", state: "CA" },
    project: "Powder Room",
    style: "Modern",
    budget: "$15k - $25k",
    budgetMin: 15000,
    timeline: "1-3 months",
    status: "lost",
    priority: "low",
    lastContact: "2024-01-10T12:00:00Z",
    nextAction: "Archive",
    source: "website",
    created: "2024-01-05T09:30:00Z",
    followUpDue: null,
    notes: "Decided to go with different contractor. Price was the main factor.",
  },
]

const statuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
const priorities = ["All", "High", "Medium", "Low"]

function LeadCard({ lead }: { lead: typeof myLeads[0] }) {
  const isOverdue = lead.followUpDue && new Date(lead.followUpDue) < new Date()
  
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

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{lead.name}</CardTitle>
              {getPriorityIcon(lead.priority)}
              {isOverdue && <Badge variant="destructive" className="text-xs">Overdue</Badge>}
            </div>
            <CardDescription className="space-y-1">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {lead.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {lead.phone}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {lead.address.city}, {lead.address.state}
              </div>
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
                <User className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
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
            <span>{lead.project}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Style:</span>
            <span>{lead.style}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Budget:</span>
            <span className="text-green-600 font-medium">{lead.budget}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Timeline:</span>
            <span>{lead.timeline}</span>
          </div>
        </div>

        {/* Status and Source */}
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
            Created {formatDate(lead.created)}
          </div>
        </div>

        {/* Contact History */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last Contact:</span>
            <span>{formatDate(lead.lastContact)}</span>
          </div>
          {lead.followUpDue && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Follow-up Due:</span>
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {formatDate(lead.followUpDue)}
              </span>
            </div>
          )}
        </div>

        {/* Next Action */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-blue-900">Next Action:</p>
          <p className="text-sm text-blue-800">{lead.nextAction}</p>
        </div>

        {/* Notes Preview */}
        {lead.notes && (
          <div className="space-y-1">
            <span className="text-sm font-medium">Notes:</span>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {lead.notes}
            </p>
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
          <Button size="sm" variant="outline">
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EmployeeLeads() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter leads based on selections
  const filteredLeads = myLeads.filter(lead => {
    const matchesStatus = selectedStatus === "All" || lead.status === selectedStatus.toLowerCase()
    const matchesPriority = selectedPriority === "All" || lead.priority === selectedPriority.toLowerCase()
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.project.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  const stats = {
    total: myLeads.length,
    new: myLeads.filter(l => l.status === 'new').length,
    contacted: myLeads.filter(l => l.status === 'contacted').length,
    qualified: myLeads.filter(l => l.status === 'qualified').length,
    proposal: myLeads.filter(l => l.status === 'proposal').length,
    overdue: myLeads.filter(l => l.followUpDue && new Date(l.followUpDue) < new Date()).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Leads</h2>
          <p className="text-muted-foreground">
            Manage your assigned design leads and track conversion progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Bulk Email
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Leads</CardTitle>
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
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
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