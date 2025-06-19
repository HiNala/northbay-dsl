"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, MapPin, User, DollarSign, Image, Calendar } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  location?: string
  clientName?: string
  status: string
  category?: string
  budget?: number
  progress: number
  isPublic: boolean
  isFeatured: boolean
  createdAt: string
  Images: Array<{
    id: string
    url: string
    isHero: boolean
  }>
}

export default function AdminProjectsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session?.user) {
      router.push('/auth/login')
      return
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'super_admin'].includes(role)
    )

    if (!hasAccess) {
      router.push('/')
      return
    }

    fetchProjects()
  }, [session, status, router])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?admin=true&include=images')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'PLANNING':
        return 'bg-gray-100 text-gray-800'
      case 'ARCHIVED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🏗️ Projects Management</h1>
              <p className="text-gray-600">Manage your portfolio projects</p>
            </div>
            <Link href="/admin/projects/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first project</p>
            <Link href="/admin/projects/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Project Image */}
                <div className="aspect-video bg-gray-200 relative">
                  {project.Images.length > 0 ? (
                    <img
                      src={project.Images.find(img => img.isHero)?.url || project.Images[0]?.url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <Badge className={`absolute top-2 left-2 ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </Badge>

                  {/* Featured Badge */}
                  {project.isFeatured && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                    {project.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    {project.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                    )}
                    
                    {project.clientName && (
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {project.clientName}
                      </div>
                    )}
                    
                    {project.budget && (
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ${project.budget.toLocaleString()}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <span className="text-xs">{project.Images.length} images</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Category & Visibility */}
                  <div className="flex items-center justify-between mt-3">
                    {project.category && (
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    )}
                    <div className="flex gap-1">
                      {project.isPublic && (
                        <Badge variant="outline" className="text-xs">
                          Public
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 