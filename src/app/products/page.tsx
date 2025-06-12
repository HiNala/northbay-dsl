"use client";

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionSeparator } from '@/components/ui/section-separator'
import { Navigation } from '@/components/layout/navigation'
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from '@/lib/design-system'
import { 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  ChevronDown,
  X,
  Sparkles,
  ChefHat,
  Lightbulb,
  Bath,
  Wrench,
  Package,
  Hammer,
  Loader2,
  AlertCircle
} from 'lucide-react'

// Function to get product images based on category - fallback for products without images
const getProductImage = (category: string) => {
  const imageMap: Record<string, string> = {
    "Kitchen Islands": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "Appliances": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "Cabinetry": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80",
    "Lighting": "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    "Bathroom": "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    "Tile": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "default": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  };
  return imageMap[category] || imageMap.default;
};

// Function to get professional icons for categories
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    "Kitchen Islands": <ChefHat className="w-8 h-8 text-white" />,
    "Appliances": <Package className="w-8 h-8 text-white" />,
    "Cabinetry": <Hammer className="w-8 h-8 text-white" />,
    "Lighting": <Lightbulb className="w-8 h-8 text-white" />,
    "Bathroom": <Bath className="w-8 h-8 text-white" />,
    "Tile": <Wrench className="w-8 h-8 text-white" />,
    "default": <Package className="w-8 h-8 text-white" />
  };
  return iconMap[category] || iconMap.default;
};

// Product interface matching the database schema
interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number | null
  comparePrice: number | null
  inStock: boolean
  status: string
  type: string
  tags: string[]
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
  }[]
}

interface ProductsResponse {
  success: boolean
  products: Product[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  meta: {
    searchQuery: string | null
    statusFilter: string | null
    categoryFilter: string | null
    brandFilter: string | null
  }
}

export default function ProductsPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  
  // State for API data
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  
  // Ref for card hover effects
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        include: 'brand,category,images',
        limit: '50', // Get more products for better display
        status: 'published' // Only show published products
      })
      
      if (searchQuery) params.append('search', searchQuery)
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedBrand) params.append('brand', selectedBrand)
      
      const response = await fetch(`/api/products?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }
      
      const data: ProductsResponse = await response.json()
      
      if (data.success) {
        setProducts(data.products)
        
        // Extract unique categories and brands for filter options
        const uniqueCategories = Array.from(new Set(
          data.products
            .filter(p => p.Category)
            .map(p => p.Category!.name)
        )).sort()
        
        const uniqueBrands = Array.from(new Set(
          data.products
            .filter(p => p.Brand)
            .map(p => p.Brand!.name)
        )).sort()
        
        setCategories(uniqueCategories)
        setBrands(uniqueBrands)
      } else {
        throw new Error('Failed to fetch products')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Effect to fetch products on component mount and when filters change
  useEffect(() => {
    fetchProducts()
  }, [searchQuery, selectedCategory, selectedBrand])

  // Card hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = cardRefs.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 25
      const rotateY = (centerX - x) / 25
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    
    const handleMouseLeave = (index: number) => {
      const card = cardRefs.current[index]
      if (!card) return
      
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
    
    // Add event listeners to each card
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      
      card.addEventListener('mousemove', (e) => handleMouseMove(e, index))
      card.addEventListener('mouseleave', () => handleMouseLeave(index))
    })
    
    // Cleanup
    return () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, index))
        card.removeEventListener('mouseleave', () => handleMouseLeave(index))
      })
    }
  }, [products.length])

  // Get primary image for product
  const getProductImageUrl = (product: Product) => {
    const heroImage = product.Images?.find(img => img.isHero)
    const firstImage = product.Images?.[0]
    const categoryFallback = product.Category?.name || 'default'
    
    return heroImage?.url || firstImage?.url || getProductImage(categoryFallback)
  }

  // Format price display
  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request'
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />
      
      {/* Add top padding to account for fixed navigation */}
                             <div className="pt-20 lg:pt-32">
        {/* Enhanced Header */}
        <div className="bg-white border-b shadow-sm pt-24">
          <div className={cn(SPACING.container.default, PATTERNS.section.standard)}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-navy-900 font-medium">Products</li>
              </ol>
            </nav>
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 font-serif tracking-tight">
                Handcrafted Excellence
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Discover our curated collection of premium kitchen and bathroom fixtures from the world's most respected artisans. 
                Each piece represents generations of craftsmanship and uncompromising quality.
              </p>
            </div>
          </div>
        </div>

        <div className={cn(SPACING.container.default, PATTERNS.section.spacious)}>
          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg border border-gold-100 p-6 md:p-8 mb-12 transition-all duration-300 hover:shadow-xl">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search handcrafted fixtures and premium collections..."
                  className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all text-lg bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                className="px-6 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-lg bg-white transition-all duration-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loading}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                className="px-6 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-lg bg-white transition-all duration-300"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                disabled={loading}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            {/* Active filters display */}
            {(selectedCategory || selectedBrand || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchQuery && (
                  <Badge variant="outline" className="px-3 py-1 text-sm bg-gold-50 border-gold-200 text-gold-700">
                    Search: {searchQuery}
                    <Button 
                      variant="minimal" 
                      size="sm" 
                      className="h-5 w-5 ml-1 p-0 hover:bg-gold-100" 
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {selectedCategory && (
                  <Badge variant="outline" className="px-3 py-1 text-sm bg-gold-50 border-gold-200 text-gold-700">
                    Category: {selectedCategory}
                    <Button 
                      variant="minimal" 
                      size="sm" 
                      className="h-5 w-5 ml-1 p-0 hover:bg-gold-100" 
                      onClick={() => setSelectedCategory('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {selectedBrand && (
                  <Badge variant="outline" className="px-3 py-1 text-sm bg-gold-50 border-gold-200 text-gold-700">
                    Brand: {selectedBrand}
                    <Button 
                      variant="minimal" 
                      size="sm" 
                      className="h-5 w-5 ml-1 p-0 hover:bg-gold-100" 
                      onClick={() => setSelectedBrand('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {(selectedCategory || selectedBrand || searchQuery) && (
                  <Button 
                    variant="minimal" 
                    size="sm" 
                    className="text-xs text-gold-600 hover:text-gold-700 hover:bg-gold-50" 
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('')
                      setSelectedBrand('')
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-gold-600 mr-3" />
              <span className="text-lg text-gray-600">Loading products...</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-red-800 font-medium">Error Loading Products</h3>
              </div>
              <p className="text-red-700 mt-2">{error}</p>
              <Button 
                onClick={fetchProducts}
                variant="outline"
                className="mt-4 border-red-300 text-red-700 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* No results message */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-navy-900 mb-2 font-serif">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('')
                  setSelectedBrand('')
                }}
                variant="outline"
                className="border-gold-600 text-gold-600 hover:bg-gold-50"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Featured Categories - Only show when we have products and no active filters */}
          {!loading && !error && products.length > 0 && !searchQuery && !selectedCategory && !selectedBrand && (
            <div className="mb-16 py-16 bg-gradient-to-b from-gray-50 to-white">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-serif">
                Shop by Category
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    name: 'Kitchens', 
                    description: 'Handcrafted fixtures & professional appliances', 
                    icon: ChefHat,
                    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                  },
                  { 
                    name: 'Bathrooms', 
                    description: 'Luxury vanities & spa-inspired accessories', 
                    icon: Bath,
                    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'
                  },
                  { 
                    name: 'Lighting', 
                    description: 'Designer fixtures & artisan pendants', 
                    icon: Lightbulb,
                    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
                  }
                ].map((category) => (
                  <Card key={category.name} className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden cursor-pointer" onClick={() => setSelectedCategory(category.name)}>
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div className="w-16 h-16 bg-gold-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:bg-gold-700/90 transition-all duration-300">
                          <category.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold mb-2 font-serif">{category.name}</h3>
                          <p className="text-gray-200 text-sm">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Featured Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="mb-16 py-16 bg-white">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-navy-900 mb-4 font-serif tracking-tight">
                  {searchQuery || selectedCategory || selectedBrand ? 'Search Results' : 'Artisan Collections'}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {searchQuery || selectedCategory || selectedBrand 
                    ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} matching your criteria`
                    : 'Hand-selected pieces from our most celebrated designers and craftspeople'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 bg-white cursor-pointer"
                    ref={el => { cardRefs.current[index] = el }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.3s ease'
                    }}
                    onClick={() => window.location.href = `/products/${product.slug}`}
                  >
                    <div className="relative">
                      <div className="h-80 relative overflow-hidden">
                        <img 
                          src={getProductImageUrl(product)} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            // Fallback to category image if product image fails
                            (e.target as HTMLImageElement).src = getProductImage(product.Category?.name || 'default')
                          }}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
                        
                        {/* Professional icon overlay */}
                        <div className="absolute bottom-4 right-4 w-16 h-16 bg-gold-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:bg-gold-700/90 transition-all duration-300">
                          {getCategoryIcon(product.Category?.name || 'default')}
                        </div>
                        
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.comparePrice && product.price && product.comparePrice > product.price && (
                            <Badge className="bg-red-500 hover:bg-red-600 text-white">
                              Sale
                            </Badge>
                          )}
                          {product.inStock ? (
                            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-green-200 text-green-700">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-red-200 text-red-700">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          {product.Brand && (
                            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                              {product.Brand.name}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Overlay effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="mb-2">
                        <p className="text-sm text-gold-600 uppercase tracking-wide font-medium">
                          {product.Category?.name || 'Uncategorized'}
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors font-serif line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Description */}
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-navy-900 font-serif">
                            {formatPrice(product.price)}
                          </span>
                          {product.comparePrice && product.price && product.comparePrice > product.price && (
                            <span className="text-lg text-gray-500 line-through">
                              {formatPrice(product.comparePrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          size="sm" 
                          className="bg-gold-600 hover:bg-gold-700 text-white transition-all duration-300 hover:shadow-md"
                          asChild
                        >
                          <Link href="/contact">
                            Get Quote
                          </Link>
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-300 hover:border-gold-500 hover:text-gold-600 transition-all duration-300"
                          asChild
                        >
                          <Link href={`/products/${product.slug}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Contact CTA */}
          <Card className="bg-gradient-to-r from-gold-50 via-gold-25 to-gold-50 border-gold-200 shadow-xl mb-16">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 font-serif tracking-tight">
                  Ready to Transform Your Space?
                </h3>
                <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed">
                  Get personalized pricing and expert advice from our design team. 
                  We'll help you select the perfect products for your project and provide 
                  professional installation services.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110 duration-300">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-navy-900 mb-2">Call Us</h4>
                    <p className="text-gray-600 mb-2">(707) 555-0123</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110 duration-300">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-navy-900 mb-2">Email Us</h4>
                    <p className="text-gray-600 mb-2">info@nbkb.com</p>
                    <p className="text-sm text-gray-500">Response within 24hrs</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110 duration-300">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-navy-900 mb-2">Visit Our Showroom</h4>
                    <p className="text-gray-600 mb-2">Napa Valley Location</p>
                    <p className="text-sm text-gray-500">By appointment</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gold-600 hover:bg-gold-700 text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300"
                    asChild
                  >
                    <Link href="/contact">
                      Get Free Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-gold-600 text-gold-700 hover:bg-gold-50 text-lg px-8 py-6 h-auto transition-all transform hover:-translate-y-1 duration-300"
                    asChild
                  >
                    <Link href="/design-services">
                      Book Design Consultation
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gold-200">
                  <p className="text-sm text-gray-600 flex flex-wrap justify-center gap-4">
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      Professional Installation
                    </span>
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      Trade Pricing Available
                    </span>
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      Financing Options
                    </span>
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      1-Year Warranty
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 