"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/layout/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from '@/lib/design-system'
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  Share2, 
  Heart,
  ShoppingCart,
  Ruler,
  Palette,
  Award,
  Truck,
  Shield,
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'

// Product interface matching the database schema
interface Product {
  id: string
  name: string
  slug: string
  sku: string | null
  description: string | null
  specifications: any
  price: number | null
  comparePrice: number | null
  inStock: boolean
  stockQuantity: number | null
  status: string
  type: string
  tags: string[]
  seoTitle: string | null
  seoDescription: string | null
  Category: {
    id: string
    name: string
    slug: string
  } | null
  Brand: {
    id: string
    name: string
    slug: string
  } | null
  Images: {
    id: string
    url: string
    alt: string | null
    isHero: boolean
    position: number
  }[]
  Variants: {
    id: string
    name: string
    price: number | null
    stockQuantity: number | null
    options: any
    isActive: boolean
  }[]
  Finishes: {
    Finish: {
      id: string
      name: string
      slug: string
      hexColor: string | null
      imageUrl: string | null
    }
    upcharge: number | null
    isDefault: boolean
  }[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Fetch product from API
  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/products/${slug}?include=brand,category,images,variants,finishes`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found')
        }
        throw new Error(`Failed to fetch product: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data.success && data.product) {
        setProduct(data.product)
        
        // Set default selections
        if (data.product.Variants && data.product.Variants.length > 0) {
          setSelectedVariant(data.product.Variants[0].id)
        }
        
        const defaultFinish = data.product.Finishes?.find((f: any) => f.isDefault)
        if (defaultFinish) {
          setSelectedFinish(defaultFinish.Finish.id)
        } else if (data.product.Finishes && data.product.Finishes.length > 0) {
          setSelectedFinish(data.product.Finishes[0].Finish.id)
        }
      } else {
        throw new Error('Product not found')
      }
    } catch (err) {
      console.error('Error fetching product:', err)
      setError(err instanceof Error ? err.message : 'Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  // Calculate current price including variant and finish upcharges
  const getCurrentPrice = () => {
    if (!product?.price) return null
    
    let currentPrice = product.price
    
    // Add variant price if selected
    if (selectedVariant) {
      const variant = product.Variants?.find(v => v.id === selectedVariant)
      if (variant?.price) {
        currentPrice = variant.price
      }
    }
    
    // Add finish upcharge if selected
    if (selectedFinish) {
      const finish = product.Finishes?.find(f => f.Finish.id === selectedFinish)
      if (finish?.upcharge) {
        currentPrice += finish.upcharge
      }
    }
    
    return currentPrice
  }

  // Format price display
  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request'
    return `$${price.toLocaleString()}`
  }

  // Get fallback image for products without images
  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }

  // Get current product images
  const getProductImages = () => {
    if (!product?.Images || product.Images.length === 0) {
      return [{ url: getFallbackImage(), alt: product?.name || 'Product image' }]
    }
    return product.Images.sort((a, b) => a.position - b.position)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navigation />
        <div className="pt-20 lg:pt-32">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold-600 mr-3" />
            <span className="text-lg text-gray-600">Loading product...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navigation />
        <div className="pt-20 lg:pt-32">
          <div className={cn(SPACING.container.default, "py-20")}>
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-2">Product Not Found</h2>
              <p className="text-red-700 mb-6">{error || 'The product you are looking for does not exist.'}</p>
              <Button asChild variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                <Link href="/products">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const images = getProductImages()
  const currentPrice = getCurrentPrice()

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />
      
      <div className="pt-20 lg:pt-32">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className={cn(SPACING.container.default, "py-6")}>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link href="/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Products
                  </Link>
                </li>
                {product.Category && (
                  <>
                    <li className="text-gray-400">/</li>
                    <li>
                      <Link 
                        href={`/products?category=${product.Category.slug}`} 
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {product.Category.name}
                      </Link>
                    </li>
                  </>
                )}
                <li className="text-gray-400">/</li>
                <li className="text-navy-900 font-medium truncate">{product.name}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className={cn(SPACING.container.default, "py-12")}>
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative group cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
                <img 
                  src={images[selectedImageIndex]?.url || getFallbackImage()}
                  alt={images[selectedImageIndex]?.alt || product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
                
                {/* Image navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)
                      }}
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)
                      }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Grid */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={cn(
                        "aspect-square rounded-md overflow-hidden border-2 transition-all duration-200",
                        selectedImageIndex === index 
                          ? "border-gold-500 shadow-md" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={image.url}
                        alt={image.alt || `${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                {product.Category && (
                  <p className="text-sm text-gold-600 uppercase tracking-wide font-medium mb-2">
                    {product.Category.name}
                  </p>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 font-serif">
                  {product.name}
                </h1>
                {product.Brand && (
                  <p className="text-lg text-gray-600">by {product.Brand.name}</p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-navy-900 font-serif">
                  {formatPrice(currentPrice)}
                </span>
                {product.comparePrice && currentPrice && product.comparePrice > currentPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
                {product.sku && (
                  <Badge variant="outline" className="text-xs">
                    SKU: {product.sku}
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 font-medium">
                      In Stock
                      {product.stockQuantity && ` (${product.stockQuantity} available)`}
                    </span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Variants */}
              {product.Variants && product.Variants.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-3">Options</h3>
                  <div className="space-y-2">
                    {product.Variants.filter(v => v.isActive).map((variant) => (
                      <label key={variant.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="variant"
                          value={variant.id}
                          checked={selectedVariant === variant.id}
                          onChange={(e) => setSelectedVariant(e.target.value)}
                          className="text-gold-600 focus:ring-gold-500"
                        />
                        <span className="text-gray-700">
                          {variant.name}
                          {variant.price && variant.price !== product.price && (
                            <span className="text-gold-600 ml-2">+{formatPrice(variant.price - (product.price || 0))}</span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Finishes */}
              {product.Finishes && product.Finishes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-3">Finish</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {product.Finishes.map((finishOption) => (
                      <button
                        key={finishOption.Finish.id}
                        className={cn(
                          "p-3 border-2 rounded-lg transition-all duration-200 text-left",
                          selectedFinish === finishOption.Finish.id
                            ? "border-gold-500 bg-gold-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                        onClick={() => setSelectedFinish(finishOption.Finish.id)}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {finishOption.Finish.hexColor && (
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: finishOption.Finish.hexColor }}
                            />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {finishOption.Finish.name}
                          </span>
                        </div>
                        {finishOption.upcharge && finishOption.upcharge > 0 && (
                          <span className="text-xs text-gold-600">
                            +{formatPrice(finishOption.upcharge)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gold-600 hover:bg-gold-700 text-white font-medium"
                    asChild
                  >
                    <Link href="/contact">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Get Quote
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-gold-600 text-gold-600 hover:bg-gold-50"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="tel:(707) 555-0123">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Expert
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-gold-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-gold-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">1-Year Warranty</p>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 text-gold-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Premium Quality</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <Card className="mb-16">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6 font-serif">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-gray-600">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-gold-50 to-gold-100 border-gold-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-navy-900 mb-4 font-serif">
                Questions About This Product?
              </h3>
              <p className="text-gray-700 mb-6">
                Our design experts are here to help you make the perfect choice for your space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gold-600 hover:bg-gold-700">
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Expert
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="tel:(707) 555-0123">
                    <Phone className="w-4 h-4 mr-2" />
                    (707) 555-0123
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsImageModalOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={images[selectedImageIndex]?.url || getFallbackImage()}
              alt={images[selectedImageIndex]?.alt || product.name}
              className="max-w-full max-h-full object-contain"
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      selectedImageIndex === index ? "bg-white" : "bg-white/50"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 