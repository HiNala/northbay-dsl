import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Phone, Mail, MessageSquare } from 'lucide-react'

export default function ProductsPageSimple() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">Products</li>
            </ol>
          </nav>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Luxury Kitchen & Bath Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover our curated collection of premium fixtures, finishes, and accessories. 
              Contact us for pricing and availability.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              Get personalized pricing and expert advice from our design team. 
              We'll help you select the perfect products for your project.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 