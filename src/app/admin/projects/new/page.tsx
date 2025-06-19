"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from '@/components/ui/image-upload'
import {
  ArrowLeft,
  Save,
  CheckCircle,
  AlertTriangle,
  MapPin,
  User,
  DollarSign
} from 'lucide-react'

export default function NewProjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    clientName: '',
    category: '',
    budget: '',
    status: 'PLANNING' as 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'PUBLISHED' | 'ARCHIVED',
    isPublic: true,
    isFeatured: false,
    tags: [] as string[],
    progress: 0,
    images: [] as Array<{
      id: string
      url: string
      alt?: string
      position: number
      isHero?: boolean
      room?: string
      beforeAfter?: string
    }>
  })

  const [tagInput, setTagInput] = useState('')

  // Check authentication
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
  }, [session, status, router])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (formData.budget && (isNaN(parseFloat(formData.budget)) || parseFloat(formData.budget) < 0)) {
      newErrors.budget = 'Budget must be a valid positive number'
    }

    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = 'Progress must be between 0 and 100'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveProject = async (status: 'PLANNING' | 'PUBLISHED') => {
    if (!validateForm()) return

    setSaving(true)
    try {
      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        location: formData.location.trim() || undefined,
        clientName: formData.clientName.trim() || undefined,
        category: formData.category.trim() || undefined,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        status: status,
        isPublic: formData.isPublic,
        isFeatured: formData.isFeatured,
        tags: formData.tags,
        progress: formData.progress,
        images: formData.images.map(img => ({
          url: img.url,
          alt: img.alt || undefined,
          position: img.position,
          isHero: img.isHero || false,
          room: img.room || undefined,
          beforeAfter: img.beforeAfter || undefined,
        })),
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        alert(`✅ Project ${status === 'PUBLISHED' ? 'created and published' : 'saved as draft'} successfully!`)
        router.push('/admin/projects')
      } else {
        const error = await response.json()
        alert(`Failed to save project: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save project. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/admin/projects">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">🏗️ Create New Project</h1>
          </div>
          <p className="text-gray-600">
            Add a new project to your portfolio with images and details
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Project Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter project title"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the project, goals, and achievements"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, State"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      placeholder="Client or homeowner name"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="whole-home">Whole Home</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="budget">Budget ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      placeholder="0"
                      className={`pl-10 ${errors.budget ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.budget && <p className="text-sm text-red-600 mt-1">{errors.budget}</p>}
                </div>

                <div>
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleInputChange('progress', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className={errors.progress ? 'border-red-500' : ''}
                  />
                  {errors.progress && <p className="text-sm text-red-600 mt-1">{errors.progress}</p>}
                </div>
              </div>
            </div>
          </Card>

          {/* Images */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 Project Images</h3>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => handleInputChange('images', images)}
              maxImages={25}
              maxFileSizeMB={10}
              showRoomField={true}
              showBeforeAfterField={true}
            />
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏷️ Tags</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag (e.g., modern, luxury, renovation)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} disabled={!tagInput.trim()}>
                  Add
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Project Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPublic" className="ml-2 text-sm text-gray-900">
                    Make public (visible on website)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-900">
                    Featured project
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="status">Project Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="block mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PLANNING">Planning</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => saveProject('PLANNING')}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => saveProject('PUBLISHED')}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Publish Project
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 