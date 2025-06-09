"use client";

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionSeparator } from '@/components/ui/section-separator'
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
  Sparkles
} from 'lucide-react'
// Advanced filtering components will be added when available

// Product and Filter interfaces
interface Product {
  id: number
  name: string
  category: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  inStock: boolean
  badge?: string
  emoji: string
  features: string[]
}

export default function ProductsPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  
  // Ref for card hover effects
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Carrara Marble Kitchen Island",
      category: "Kitchen Islands",
      brand: "North Bay Designs",
      price: 4500,
      originalPrice: 5200,
      rating: 5,
      inStock: true,
      badge: "Sale",
      emoji: "🏺",
      features: ["Handcrafted Italian Carrara marble", "Integrated breakfast bar"]
    },
    {
      id: 2,
      name: "Professional Series Range",
      category: "Appliances", 
      brand: "Sub-Zero Wolf",
      price: 8900,
      rating: 5,
      inStock: true,
      emoji: "🔥",
      features: ["48-inch professional dual-fuel", "Convection ovens"]
    },
    {
      id: 3,
      name: "Custom Walnut Cabinetry",
      category: "Cabinetry",
      brand: "North Bay Designs", 
      price: 12500,
      rating: 5,
      inStock: true,
      emoji: "🚪",
      features: ["Handcrafted American walnut", "Soft-close hardware"]
    },
    {
      id: 4,
      name: "Designer Crystal Chandelier",
      category: "Lighting",
      brand: "Visual Comfort",
      price: 3299,
      originalPrice: 3899,
      rating: 5,
      inStock: true,
      badge: "New",
      emoji: "💎",
      features: ["Hand-forged iron construction", "Crystal accents"]
    },
    {
      id: 5,
      name: "Luxury Spa Vanity",
      category: "Bathroom",
      brand: "Waterworks",
      price: 5799,
      rating: 5,
      inStock: true,
      emoji: "🛁",
      features: ["Marble countertop", "Soft-close drawers"]
    },
    {
      id: 6,
      name: "Artisan Backsplash Tile",
      category: "Tile",
      brand: "Porcelanosa",
      price: 189,
      rating: 5,
      inStock: true,
      emoji: "🎨",
      features: ["Handmade ceramic", "Unique glazing"]
    }
  ]

  // Filter products based on search, category, and brand
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory
    const matchesBrand = selectedBrand === '' || product.brand === selectedBrand
    
    return matchesSearch && matchesCategory && matchesBrand
  })

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
  }, [filteredProducts.length])

  return (
    <div className="min-h-screen bg-background-light">
      {/* Enhanced Header */}
      <div className="bg-white border-b shadow-sm">
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
              Luxury Kitchen & Bath Products
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Discover our curated collection of premium fixtures, finishes, and accessories from the world's finest brands. 
              Each piece is handpicked for exceptional quality and timeless design.
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
                placeholder="Search premium products..."
                className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all text-lg bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="px-6 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-lg bg-white transition-all duration-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Kitchen Islands">Kitchen Islands</option>
              <option value="Appliances">Appliances</option>
              <option value="Cabinetry">Cabinetry</option>
              <option value="Lighting">Lighting</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Tile">Tile</option>
            </select>
            
            <select 
              className="px-6 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-lg bg-white transition-all duration-300"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              <option value="North Bay Designs">North Bay Designs</option>
              <option value="Sub-Zero Wolf">Sub-Zero Wolf</option>
              <option value="Visual Comfort">Visual Comfort</option>
              <option value="Waterworks">Waterworks</option>
              <option value="Porcelanosa">Porcelanosa</option>
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

        <SectionSeparator variant="minimal" />

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-serif">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Kitchen', description: 'Premium fixtures & appliances', emoji: '🍳' },
              { name: 'Bathroom', description: 'Luxury vanities & accessories', emoji: '🛁' },
              { name: 'Hardware', description: 'Designer knobs & handles', emoji: '🔧' }
            ].map((category) => (
              <Card key={category.name} className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4">{category.emoji}</div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* No results message */}
          {filteredProducts.length === 0 && (
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
        </div>

        <SectionSeparator variant="dots" />

        {/* Featured Products Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy-900 mb-4 font-serif tracking-tight">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selections from our most popular luxury collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 bg-white"
                ref={el => { cardRefs.current[index] = el }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="relative">
                  <div className="h-80 bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center relative overflow-hidden">
                    <div className="text-8xl transform group-hover:scale-110 transition-transform duration-700 ease-out">
                      {product.emoji}
                    </div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.badge && (
                        <Badge className={product.badge === 'Sale' 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-green-500 hover:bg-green-600 text-white'
                        }>
                          {product.badge}
                        </Badge>
                      )}
                      {product.inStock && (
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-green-200 text-green-700">
                          In Stock
                        </Badge>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                        {product.brand}
                      </Badge>
                    </div>
                    
                    {/* Overlay effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="mb-2">
                    <p className="text-sm text-gold-600 uppercase tracking-wide font-medium">
                      {product.category}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors font-serif">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-gold-400">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.rating}.0)</span>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-navy-900 font-serif">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice.toLocaleString()}
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
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <SectionSeparator variant="bold" />

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
  )
} 