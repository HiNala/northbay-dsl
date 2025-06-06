import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react'

export function QuoteContactCTA() {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Transform Your Space?
        </h3>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Get personalized pricing and expert advice from our design team. 
          We'll help you select the perfect products for your project.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <Phone className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
            <p className="text-sm text-gray-600">(707) 555-0123</p>
          </div>
          
          <div className="text-center">
            <Mail className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
            <p className="text-sm text-gray-600">info@nbkb.com</p>
          </div>
          
          <div className="text-center">
            <MessageSquare className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900 mb-1">Visit Our Showroom</h4>
            <p className="text-sm text-gray-600">Schedule a consultation</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
            <Link href="/contact">
              Get Free Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50" asChild>
            <Link href="/design-services">
              Book Design Consultation
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Professional installation available • Trade pricing for contractors • Financing options
        </p>
      </CardContent>
    </Card>
  )
} 