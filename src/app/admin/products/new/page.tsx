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
import { Alert } from '@/components/ui/alert'
import { ImageUpload } from '@/components/ui/image-upload'
import {
  ArrowLeft,
  Save,
  Eye,
  Bot,
  Plus,
  X,
  Upload,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface Brand {
  id: string
  name: string
}

export default function NewProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    sku: '',
    categoryId: '',
    brandId: '',
    tags: [] as string[],
    specifications: {} as Record<string, string>,
    inStock: true,
    stockQuantity: '',
    trackInventory: false,
    status: 'draft' as 'draft' | 'published',
    type: 'physical',
    seoTitle: '',
    seoDescription: '',
    images: [] as Array<{
      id: string
      url: string
      alt?: string
      position: number
      isHero?: boolean
    }>
  })
  
  const [tagInput, setTagInput] = useState('')
  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    
    fetchCategories()
    fetchBrands()
  }, [session, status, router])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands')
      if (response.ok) {
        const data = await response.json()
        setBrands(data.brands || [])
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

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

  const addSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey.trim()]: specValue.trim()
        }
      }))
      setSpecKey('')
      setSpecValue('')
    }
  }

  const removeSpecification = (keyToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([key]) => key !== keyToRemove)
      )
    }))
  }

  const generateAIDescription = async () => {
    if (!formData.name) {
      setErrors(prev => ({ ...prev, name: 'Product name is required for AI generation' }))
      return
    }

    setAiGenerating(true)
    try {
      // Create a temporary product for AI generation
      const tempProduct = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          price: formData.price ? parseFloat(formData.price) : null,
          categoryId: formData.categoryId || null,
          brandId: formData.brandId || null,
          specifications: formData.specifications,
          tags: formData.tags,
          status: 'draft',
        }),
      })

      if (!tempProduct.ok) {
        throw new Error('Failed to create temporary product')
      }

      const productData = await tempProduct.json()
      
      // Generate AI description
      const aiResponse = await fetch('/api/products/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productData.product.id,
          options: {
            type: 'luxury',
            length: 'medium',
            includeFeatures: true,
            includeBenefits: true,
          },
          updateProduct: false, // Don't update the temp product
        }),
      })

      if (aiResponse.ok) {
        const aiResult = await aiResponse.json()
        setFormData(prev => ({
          ...prev,
          description: aiResult.data.description,
          seoTitle: aiResult.data.seoTitle || prev.seoTitle,
          seoDescription: aiResult.data.seoDescription || prev.seoDescription,
        }))
        
        // Clean up temporary product
        await fetch(`/api/products/${productData.product.id}`, {
          method: 'DELETE',
        })
        
        alert(`✨ AI description generated! Quality Score: ${aiResult.data.quality_score}/100`)
      } else {
        const error = await aiResponse.json()
        alert(`Failed to generate description: ${error.error}`)
      }
    } catch (error) {
      console.error('AI generation error:', error)
      alert('Failed to generate description. Please try again.')
    } finally {
      setAiGenerating(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (formData.price && (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0)) {
      newErrors.price = 'Price must be a valid positive number'
    }

    if (formData.comparePrice && (isNaN(parseFloat(formData.comparePrice)) || parseFloat(formData.comparePrice) < 0)) {
      newErrors.comparePrice = 'Compare price must be a valid positive number'
    }

    if (formData.price && formData.comparePrice && parseFloat(formData.comparePrice) < parseFloat(formData.price)) {
      newErrors.comparePrice = 'Compare price should be higher than regular price'
    }

    if (formData.stockQuantity && (isNaN(parseInt(formData.stockQuantity)) || parseInt(formData.stockQuantity) < 0)) {
      newErrors.stockQuantity = 'Stock quantity must be a valid non-negative number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveProduct = async (status: 'draft' | 'published') => {
    if (!validateForm()) return

    setSaving(true)
    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
        sku: formData.sku.trim() || undefined,
        categoryId: formData.categoryId || undefined,
        brandId: formData.brandId || undefined,
        tags: formData.tags,
        specifications: Object.keys(formData.specifications).length > 0 ? formData.specifications : undefined,
        inStock: formData.inStock,
        stockQuantity: formData.stockQuantity ? parseInt(formData.stockQuantity) : undefined,
        trackInventory: formData.trackInventory,
        status: status,
        type: formData.type,
        seoTitle: formData.seoTitle.trim() || undefined,
        seoDescription: formData.seoDescription.trim() || undefined,
        images: formData.images.map(img => ({
          url: img.url,
          alt: img.alt || undefined,
          position: img.position,
          isHero: img.isHero || false,
        })),
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        alert(`✅ Product ${status === 'published' ? 'created and published' : 'saved as draft'} successfully!`)
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(`Failed to save product: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save product. Please try again.')
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
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">➕ Create New Product</h1>
          </div>
          <p className="text-gray-600">
            Add a new product to your catalog with AI-powered descriptions
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Basic Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter product name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAIDescription}
                    disabled={aiGenerating || !formData.name}
                  >
                    {aiGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 mr-2" />
                        Generate AI Description
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter product description or generate with AI"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.categoryId}
                    onChange={(e) => handleInputChange('categoryId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <select
                    id="brand"
                    value={formData.brandId}
                    onChange={(e) => handleInputChange('brandId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Select brand</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Images */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 Product Images</h3>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => handleInputChange('images', images)}
              maxImages={15}
              maxFileSizeMB={10}
            />
          </Card>

          {/* Pricing */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="comparePrice">Compare Price ($)</Label>
                <Input
                  id="comparePrice"
                  type="number"
                  step="0.01"
                  value={formData.comparePrice}
                  onChange={(e) => handleInputChange('comparePrice', e.target.value)}
                  placeholder="0.00"
                  className={errors.comparePrice ? 'border-red-500' : ''}
                />
                {errors.comparePrice && <p className="text-sm text-red-600 mt-1">{errors.comparePrice}</p>}
              </div>

              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  placeholder="Product SKU"
                />
              </div>
            </div>
          </Card>

          {/* Inventory */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📦 Inventory</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="inStock" className="ml-2 text-sm text-gray-900">
                    In Stock
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="trackInventory"
                    checked={formData.trackInventory}
                    onChange={(e) => handleInputChange('trackInventory', e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="trackInventory" className="ml-2 text-sm text-gray-900">
                    Track Inventory
                  </label>
                </div>
              </div>

              {formData.trackInventory && (
                <div className="w-48">
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                    placeholder="0"
                    className={errors.stockQuantity ? 'border-red-500' : ''}
                  />
                  {errors.stockQuantity && <p className="text-sm text-red-600 mt-1">{errors.stockQuantity}</p>}
                </div>
              )}
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏷️ Tags</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} disabled={!tagInput.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Specifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Specifications</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="Specification name"
                />
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Value"
                />
                <Button onClick={addSpecification} disabled={!specKey.trim() || !specValue.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {Object.keys(formData.specifications).length > 0 && (
                <div className="space-y-2">
                  {Object.entries(formData.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                      <button onClick={() => removeSpecification(key)}>
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* SEO */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 SEO</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="SEO-optimized title (60 characters or less)"
                  maxLength={60}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.seoTitle.length}/60 characters</p>
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  placeholder="SEO meta description (160 characters or less)"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.seoDescription.length}/160 characters</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="status">Product Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="block mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => saveProduct('draft')}
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
                  onClick={() => saveProduct('published')}
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
                      Publish Product
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