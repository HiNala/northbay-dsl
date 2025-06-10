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
  Loader2,
} from "lucide-react"

// Interface for lead data
interface Lead {
  id: string
  fullName: string
  email: string
  phone?: string
  address?: any
  projectType?: string
  style?: string
  budgetMin?: number
  budgetMax?: number
  timeline?: string
  message?: string
  status: string
  priority: string
  source?: string
  notes?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  followUpAt?: string
}

const statuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
const priorities = ["All", "High", "Medium", "Low"]

function LeadCard({ lead, onUpdateLead }: { lead: Lead; onUpdateLead: (leadId: string, updates: any) => void }) {
  const isOverdue = lead.followUpAt && new Date(lead.followUpAt) < new Date()
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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
    switch (priority.toLowerCase()) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return null
    }
  }

  const formatCurrency = (min?: number, max?: number) => {
    if (!min && !max) return 'Budget not specified'
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    if (min) return `$${min.toLocaleString()}+`
    return 'Budget TBD'
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const updateLeadStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/leads?id=${lead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updatedLead = await response.json()
        onUpdateLead(lead.id, updatedLead.data)
      }
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{lead.fullName}</CardTitle>
              {getPriorityIcon(lead.priority)}
              {isOverdue && <Badge variant="destructive" className="text-xs">Overdue</Badge>}
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
                  {lead.address.city || 'Location not specified'}
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
              <DropdownMenuItem onClick={() => window.open(`tel:${lead.phone}`)}>
                <Phone className="mr-2 h-4 w-4" />
                Call Client
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open(`mailto:${lead.email}`)}>
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
              <DropdownMenuItem onClick={() => updateLeadStatus('won')}>
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
            <span>{lead.projectType || 'Not specified'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Budget:</span>
            <span className="text-green-600 font-medium">{formatCurrency(lead.budgetMin, lead.budgetMax)}</span>
          </div>
          {lead.timeline && (
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Timeline:</span>
              <span>{lead.timeline}</span>
            </div>
          )}
        </div>

        {/* Status and Source */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={getStatusColor(lead.status)}>
              {lead.status}
            </Badge>
            {lead.source && (
              <Badge variant="outline">
                {lead.source}
              </Badge>
            )}
          </div>
          <div className="text-right text-xs text-muted-foreground">
            Created {formatDate(lead.createdAt)}
          </div>
        </div>

        {/* Contact History */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last Updated:</span>
            <span>{formatDate(lead.updatedAt)}</span>
          </div>
          {lead.followUpAt && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Follow-up Due:</span>
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {formatDate(lead.followUpAt)}
              </span>
            </div>
          )}
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
          <Button size="sm" className="flex-1" onClick={() => window.open(`tel:${lead.phone}`)}>
            <Phone className="mr-2 h-3 w-3" />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => window.open(`mailto:${lead.email}`)}>
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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Check authentication
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
    
    fetchLeads()
  }, [session, status, router])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')
      if (response.ok) {
        const data = await response.json()
        setLeads(data.data || [])
      } else {
        console.error('Failed to fetch leads:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateLead = (leadId: string, updatedData: any) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, ...updatedData } : lead
    ))
  }

  // Filter leads based on selections
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = selectedStatus === "All" || lead.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesPriority = selectedPriority === "All" || lead.priority.toLowerCase() === selectedPriority.toLowerCase()
    const matchesSearch = lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (lead.projectType && lead.projectType.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status.toLowerCase() === 'new').length,
    contacted: leads.filter(l => l.status.toLowerCase() === 'contacted').length,
    qualified: leads.filter(l => l.status.toLowerCase() === 'qualified').length,
    proposal: leads.filter(l => l.status.toLowerCase() === 'proposal').length,
    overdue: leads.filter(l => l.followUpAt && new Date(l.followUpAt) < new Date()).length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    )
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
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
          <Button variant="outline" size="sm" onClick={fetchLeads}>
            Refresh
          </Button>
        </div>

        {/* Leads Grid */}
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No leads found</h3>
              <p className="text-sm text-muted-foreground text-center">
                {searchQuery || selectedStatus !== "All" || selectedPriority !== "All" 
                  ? "Try adjusting your filters to see more results."
                  : "New leads will appear here when customers submit contact forms."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onUpdateLead={updateLead} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 