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
  ClipboardList,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Phone,
  Mail,
  Eye,
  Edit,
  Loader2,
  Building,
  Hammer,
  Palette,
  Package,
} from "lucide-react"

// Types
interface Project {
  id: string
  name: string
  client: {
    name: string
    email: string
    phone?: string
    address: string
  }
  type: 'Kitchen Remodel' | 'Bathroom Renovation' | 'Whole Home Design' | 'Kitchen Island' | 'Powder Room' | 'Custom Design'
  status: 'planning' | 'design' | 'approval' | 'construction' | 'installation' | 'completed' | 'on-hold'
  priority: 'low' | 'medium' | 'high'
  budget: {
    estimated: number
    actual?: number
    approved: boolean
  }
  timeline: {
    startDate: string
    estimatedCompletion: string
    actualCompletion?: string
  }
  progress: number // 0-100
  assignedTo: string
  description: string
  notes?: string
  lastUpdate: string
  nextMilestone?: string
  createdAt: string
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: "proj-001",
    name: "Wilson Kitchen Transformation",
    client: {
      name: "Jennifer Wilson",
      email: "jennifer.w@email.com",
      phone: "(555) 123-4567",
      address: "123 Oak Street, Napa, CA 94558"
    },
    type: "Kitchen Remodel",
    status: "design",
    priority: "high",
    budget: {
      estimated: 65000,
      actual: 67500,
      approved: true
    },
    timeline: {
      startDate: "2024-11-15",
      estimatedCompletion: "2025-02-15"
    },
    progress: 35,
    assignedTo: "Sarah Johnson",
    description: "Modern farmhouse kitchen with custom cabinetry, quartz countertops, and premium appliances. Complete layout redesign with island addition.",
    notes: "Client loves the initial designs. Waiting for final material selections. Kitchen island electrical needs city permit.",
    lastUpdate: "2024-12-10",
    nextMilestone: "Final design approval and material orders",
    createdAt: "2024-11-01"
  },
  {
    id: "proj-002",
    name: "Thompson Master Bath",
    client: {
      name: "David Thompson",
      email: "david.t@email.com", 
      phone: "(555) 987-6543",
      address: "456 Pine Avenue, St. Helena, CA 94574"
    },
    type: "Bathroom Renovation",
    status: "construction",
    priority: "medium",
    budget: {
      estimated: 32000,
      actual: 29800,
      approved: true
    },
    timeline: {
      startDate: "2024-10-01",
      estimatedCompletion: "2024-12-20"
    },
    progress: 75,
    assignedTo: "Sarah Johnson",
    description: "Luxury master bathroom renovation with walk-in shower, freestanding tub, and double vanity. Premium tile and fixture selections.",
    notes: "Construction on schedule. Plumbing rough-in complete. Tile installation starting next week.",
    lastUpdate: "2024-12-11",
    nextMilestone: "Tile installation and vanity delivery",
    createdAt: "2024-09-15"
  },
  {
    id: "proj-003",
    name: "Anderson Whole Home Project",
    client: {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "(555) 456-7890", 
      address: "789 Vineyard Road, Calistoga, CA 94515"
    },
    type: "Whole Home Design",
    status: "planning",
    priority: "high",
    budget: {
      estimated: 150000,
      approved: false
    },
    timeline: {
      startDate: "2025-01-15",
      estimatedCompletion: "2025-08-15"
    },
    progress: 15,
    assignedTo: "Sarah Johnson",
    description: "Complete home interior design including kitchen, 3 bathrooms, living areas, and custom built-ins. High-end finishes throughout.",
    notes: "Initial consultation complete. Working on space planning and preliminary designs. Budget approval pending.",
    lastUpdate: "2024-12-08",
    nextMilestone: "Present initial design concepts",
    createdAt: "2024-11-20"
  },
  {
    id: "proj-004",
    name: "Rodriguez Kitchen Island",
    client: {
      name: "Michael Rodriguez",
      email: "michael.r@email.com",
      phone: "(555) 234-5678",
      address: "321 Valley View Drive, Napa, CA 94559"
    },
    type: "Kitchen Island",
    status: "approval",
    priority: "medium",
    budget: {
      estimated: 18000,
      approved: false
    },
    timeline: {
      startDate: "2024-12-15",
      estimatedCompletion: "2025-01-30"
    },
    progress: 20,
    assignedTo: "Sarah Johnson",
    description: "Custom kitchen island with seating for 4, additional storage, and prep sink. Matching existing cabinetry with upgraded hardware.",
    notes: "Design completed. Waiting for client approval on final specifications and budget. Electrical work needed for island prep sink.",
    lastUpdate: "2024-12-09",
    nextMilestone: "Client approval meeting scheduled",
    createdAt: "2024-11-25"
  },
  {
    id: "proj-005",
    name: "Kim Powder Room Refresh",
    client: {
      name: "Sarah Kim",
      email: "sarah.k@email.com",
      address: "654 Hillside Court, Napa, CA 94558"
    },
    type: "Powder Room",
    status: "completed",
    priority: "low",
    budget: {
      estimated: 9500,
      actual: 9200,
      approved: true
    },
    timeline: {
      startDate: "2024-10-15",
      estimatedCompletion: "2024-11-15",
      actualCompletion: "2024-11-12"
    },
    progress: 100,
    assignedTo: "Sarah Johnson",
    description: "Modern powder room update with new vanity, mirror, lighting, and decorative wallpaper. Premium fixtures and finishes.",
    notes: "Project completed successfully. Client very satisfied with results. Final walkthrough complete.",
    lastUpdate: "2024-11-12",
    createdAt: "2024-09-30"
  }
]

const statusColors = {
  planning: "bg-blue-100 text-blue-800",
  design: "bg-purple-100 text-purple-800",
  approval: "bg-yellow-100 text-yellow-800",
  construction: "bg-orange-100 text-orange-800",
  installation: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  "on-hold": "bg-red-100 text-red-800"
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800", 
  high: "bg-red-100 text-red-800"
}

export default function EmployeeProjects() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

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

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
    const matchesPriority = selectedPriority === "All" || project.priority === selectedPriority
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  // Calculate stats
  const stats = {
    total: projects.length,
    active: projects.filter(p => !['completed', 'on-hold'].includes(p.status)).length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
    highPriority: projects.filter(p => p.priority === 'high').length,
    totalValue: projects.reduce((sum, p) => sum + p.budget.estimated, 0)
  }

  const getProjectIcon = (type: Project['type']) => {
    switch (type) {
      case 'Kitchen Remodel':
        return <Package className="h-5 w-5" />
      case 'Bathroom Renovation':
        return <Building className="h-5 w-5" />
      case 'Whole Home Design':
        return <Hammer className="h-5 w-5" />
      default:
        return <Palette className="h-5 w-5" />
    }
  }

  const ProjectCard = ({ project }: { project: Project }) => {
    const isOverdue = new Date(project.timeline.estimatedCompletion) < new Date() && project.status !== 'completed'
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {getProjectIcon(project.type)}
                <h3 className="font-semibold text-lg">{project.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{project.client.name}</p>
              <Badge variant="outline" className="text-xs">{project.type}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={statusColors[project.status]}>
                {project.status}
              </Badge>
              <Badge className={priorityColors[project.priority]}>
                {project.priority}
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
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Update Status
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Client
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Client
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  project.progress === 100 ? 'bg-green-500' : 
                  project.progress >= 75 ? 'bg-blue-500' :
                  project.progress >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${project.budget.estimated.toLocaleString()}</span>
              {project.budget.approved && (
                <CheckCircle className="h-3 w-3 text-green-500" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(project.timeline.estimatedCompletion).toLocaleDateString()}</span>
              {isOverdue && (
                <AlertTriangle className="h-3 w-3 text-red-500" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{project.client.address.split(',')[0]}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Updated {new Date(project.lastUpdate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Next Milestone */}
          {project.nextMilestone && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <p className="text-sm font-medium text-blue-800">Next Milestone:</p>
              <p className="text-sm text-blue-700">{project.nextMilestone}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Contact
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              ID: {project.id}
            </span>
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
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Projects</h2>
          <p className="text-muted-foreground">
            Track and manage your client design projects
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <ClipboardList className="mr-2 h-4 w-4" />
            Project Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Hammer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Hold</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.onHold}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalValue / 1000).toFixed(0)}k</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by project name, client, or type..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
                <DropdownMenuItem onClick={() => setSelectedStatus("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("planning")}>Planning</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("design")}>Design</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("approval")}>Approval</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("construction")}>Construction</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("installation")}>Installation</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("completed")}>Completed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("on-hold")}>On Hold</DropdownMenuItem>
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
                <DropdownMenuItem onClick={() => setSelectedPriority("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPriority("high")}>High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPriority("medium")}>Medium</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPriority("low")}>Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
          <Button variant="outline" size="sm">
            Export Report
          </Button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No projects found</h3>
              <p className="text-sm text-muted-foreground text-center">
                {searchQuery || selectedStatus !== "All" || selectedPriority !== "All" 
                  ? "Try adjusting your filters to see more results."
                  : "Create your first project to get started."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 