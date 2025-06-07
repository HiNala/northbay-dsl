import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Phone, Mail, MessageSquare, Star, ArrowRight, CheckCircle } from 'lucide-react'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-12">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">Products</li>
            </ol>
          </nav>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 font-serif">
              Luxury Kitchen & Bath Products
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our curated collection of premium fixtures, finishes, and accessories from the world's finest brands. 
              Each piece is handpicked for exceptional quality and timeless design.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Enhanced Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search premium products..."
                className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg"
              />
            </div>
            
            <select className="px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg bg-white">
              <option>All Categories</option>
              <option>Kitchen Fixtures</option>
              <option>Bathroom Vanities</option>
              <option>Cabinet Hardware</option>
              <option>Luxury Lighting</option>
              <option>Premium Tile</option>
            </select>
            
            <select className="px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg bg-white">
              <option>All Brands</option>
              <option>Waterworks</option>
              <option>Restoration Hardware</option>
              <option>Emtek</option>
              <option>Visual Comfort</option>
              <option>Porcelanosa</option>
            </select>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-serif">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Kitchen', image: 'kitchen', description: 'Premium fixtures & appliances' },
              { name: 'Bathroom', image: 'bathroom', description: 'Luxury vanities & accessories' },
              { name: 'Hardware', image: 'hardware', description: 'Designer knobs & handles' }
            ].map((category) => (
              <Card key={category.name} className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200">{category.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selections from our most popular luxury collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
                features: ["Handcrafted Italian Carrara marble", "Integrated breakfast bar", "Premium brass fixtures"]
              },
              {
                id: 2,
                name: "Professional Series Range",
                category: "Appliances", 
                brand: "Sub-Zero Wolf",
                price: 8900,
                rating: 5,
                inStock: true,
                features: ["48-inch professional dual-fuel", "Convection ovens", "Precision temperature control"]
              },
              {
                id: 3,
                name: "Custom Walnut Cabinetry",
                category: "Cabinetry",
                brand: "North Bay Designs", 
                price: 12500,
                rating: 5,
                inStock: true,
                features: ["Handcrafted American walnut", "Soft-close hardware", "Premium finishes"]
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
                features: ["Hand-forged iron construction", "Crystal accents", "Dimmable LED compatibility"]
              },
              {
                id: 5,
                name: "Luxury Spa Vanity",
                category: "Bathroom",
                brand: "Waterworks",
                price: 5799,
                rating: 5,
                inStock: true,
                features: ["Marble countertop", "Soft-close drawers", "Under-mount lighting"]
              },
              {
                id: 6,
                name: "Artisan Backsplash Tile",
                category: "Tile",
                brand: "Porcelanosa",
                price: 189,
                rating: 5,
                inStock: true,
                features: ["Handmade ceramic", "Unique glazing", "Multiple finish options"]
              }
            ].map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  {/* Product Image Placeholder */}
                  <div className="h-80 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl text-gray-300 transform group-hover:scale-110 transition-transform duration-500">
                      🏺
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.badge && (
                        <Badge className={product.badge === 'Sale' ? 'bg-red-500' : 'bg-green-500'}>
                          {product.badge}
                        </Badge>
                      )}
                      {product.inStock && (
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-green-200 text-green-700">
                          In Stock
                        </Badge>
                      )}
                    </div>
                    
                    {/* Brand Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                        {product.brand}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="mb-3">
                    <p className="text-sm text-amber-600 uppercase tracking-wide font-medium">
                      {product.category}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.rating}.0)</span>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
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
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      asChild
                    >
                      <Link href="/contact">
                        Get Quote
                      </Link>
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-300 hover:border-amber-500 hover:text-amber-600"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Contact CTA */}
        <Card className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-amber-200 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
                Ready to Transform Your Space?
              </h3>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                Get personalized pricing and expert advice from our design team. 
                We'll help you select the perfect products for your project and provide 
                professional installation services.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h4>
                  <p className="text-gray-600 mb-2">(707) 555-0123</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h4>
                  <p className="text-gray-600 mb-2">info@nbkb.com</p>
                  <p className="text-sm text-gray-500">Response within 24hrs</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Visit Our Showroom</h4>
                  <p className="text-gray-600 mb-2">Napa Valley Location</p>
                  <p className="text-sm text-gray-500">By appointment</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
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
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 text-lg px-8 py-4"
                  asChild
                >
                  <Link href="/design-services">
                    Book Design Consultation
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-amber-200">
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