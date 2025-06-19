"use client"

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  X, 
  Star, 
  Eye, 
  Move, 
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ImageItem {
  id: string
  url: string
  alt?: string
  position: number
  isHero?: boolean
  room?: string
  beforeAfter?: string
}

interface ImageUploadProps {
  images: ImageItem[]
  onImagesChange: (images: ImageItem[]) => void
  maxImages?: number
  maxFileSizeMB?: number
  acceptedFileTypes?: string[]
  showRoomField?: boolean
  showBeforeAfterField?: boolean
  className?: string
}

const MAX_FILE_SIZE_MB = 10
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 20,
  maxFileSizeMB = MAX_FILE_SIZE_MB,
  acceptedFileTypes = ACCEPTED_FILE_TYPES,
  showRoomField = false,
  showBeforeAfterField = false,
  className = ''
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string[] => {
    const errors: string[] = []
    
    if (!acceptedFileTypes.includes(file.type)) {
      errors.push(`${file.name}: Invalid file type. Accepted: ${acceptedFileTypes.join(', ')}`)
    }
    
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      errors.push(`${file.name}: File too large. Max size: ${maxFileSizeMB}MB`)
    }
    
    return errors
  }

  const uploadToStorage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }
    
    const data = await response.json()
    return data.url
  }

  const handleFileUpload = useCallback(async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      setErrors([`Maximum ${maxImages} images allowed`])
      return
    }

    setErrors([])
    setUploading(true)

    const validationErrors: string[] = []
    const validFiles: File[] = []

    Array.from(files).forEach(file => {
      const fileErrors = validateFile(file)
      if (fileErrors.length > 0) {
        validationErrors.push(...fileErrors)
      } else {
        validFiles.push(file)
      }
    })

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setUploading(false)
      return
    }

    try {
      const uploadPromises = validFiles.map(async (file, index) => {
        try {
          const url = await uploadToStorage(file)
          return {
            id: `temp-${Date.now()}-${index}`,
            url,
            alt: file.name.replace(/\.[^/.]+$/, ''),
            position: images.length + index,
            isHero: images.length === 0 && index === 0, // First image is hero
          }
        } catch (error) {
          throw new Error(`Failed to upload ${file.name}`)
        }
      })

      const newImages = await Promise.all(uploadPromises)
      onImagesChange([...images, ...newImages])
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Upload failed'])
    } finally {
      setUploading(false)
    }
  }, [images, maxImages, onImagesChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }, [handleFileUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [handleFileUpload])

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id)
    // Reorder positions
    const reorderedImages = updatedImages.map((img, index) => ({
      ...img,
      position: index,
      isHero: index === 0 && updatedImages.length > 0 ? true : img.isHero
    }))
    onImagesChange(reorderedImages)
  }

  const setHeroImage = (id: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isHero: img.id === id
    }))
    onImagesChange(updatedImages)
  }

  const updateImageField = (id: string, field: keyof ImageItem, value: any) => {
    const updatedImages = images.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    )
    onImagesChange(updatedImages)
  }

  const reorderImages = (startIndex: number, endIndex: number) => {
    const reorderedImages = [...images]
    const [movedImage] = reorderedImages.splice(startIndex, 1)
    reorderedImages.splice(endIndex, 0, movedImage)
    
    // Update positions
    const updatedImages = reorderedImages.map((img, index) => ({
      ...img,
      position: index
    }))
    
    onImagesChange(updatedImages)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : images.length >= maxImages 
              ? 'border-gray-300 bg-gray-50' 
              : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
      >
        <div className="text-center">
          <ImageIcon className={`mx-auto h-12 w-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              {images.length >= maxImages ? 'Maximum images reached' : 'Upload images'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Drag and drop files here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= maxImages || uploading}
                className="text-blue-600 hover:text-blue-500 font-medium disabled:text-gray-400"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Max {maxImages} images, up to {maxFileSizeMB}MB each. Supported: JPG, PNG, WebP
            </p>
          </div>
          
          {uploading && (
            <div className="mt-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-sm text-blue-800">Uploading...</span>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={images.length >= maxImages || uploading}
        />
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Uploaded Images ({images.length}/{maxImages})
            </h3>
            <Badge variant="outline">
              {images.filter(img => img.isHero).length > 0 ? 'Hero image set' : 'No hero image'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {images
                .sort((a, b) => a.position - b.position)
                .map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <div className="aspect-square relative">
                      <img
                        src={image.url}
                        alt={image.alt || 'Product image'}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Hero Badge */}
                      {image.isHero && (
                        <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Hero
                        </Badge>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!image.isHero && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setHeroImage(image.id)}
                            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                          >
                            <Star className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeImage(image.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Image Details */}
                    <div className="p-3 space-y-2">
                      <input
                        type="text"
                        value={image.alt || ''}
                        onChange={(e) => updateImageField(image.id, 'alt', e.target.value)}
                        placeholder="Alt text (for accessibility)"
                        className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      
                      {showRoomField && (
                        <input
                          type="text"
                          value={image.room || ''}
                          onChange={(e) => updateImageField(image.id, 'room', e.target.value)}
                          placeholder="Room (e.g., kitchen, master bath)"
                          className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                      
                      {showBeforeAfterField && (
                        <select
                          value={image.beforeAfter || ''}
                          onChange={(e) => updateImageField(image.id, 'beforeAfter', e.target.value)}
                          className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select type</option>
                          <option value="before">Before</option>
                          <option value="after">After</option>
                        </select>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Position: {index + 1}</span>
                        <div className="flex gap-1">
                          {index > 0 && (
                            <button
                              onClick={() => reorderImages(index, index - 1)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              ↑
                            </button>
                          )}
                          {index < images.length - 1 && (
                            <button
                              onClick={() => reorderImages(index, index + 1)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              ↓
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="mx-auto h-8 w-8 mb-2" />
          <p>No images uploaded yet</p>
        </div>
      )}
    </div>
  )
} 