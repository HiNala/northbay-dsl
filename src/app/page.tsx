"use client";

import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Home, 
  Users, 
  Palette, 
  Award, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Quote, 
  MoveRight,
  ChefHat,
  Lightbulb,
  Bath,
  Wrench,
  Package,
  Hammer
} from "lucide-react";

// Function to get product images based on category
const getProductImage = (category: string) => {
  const imageMap: Record<string, string> = {
    "Kitchen Islands": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "Appliances": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "Cabinetry": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80",
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
    "Tile": <Palette className="w-8 h-8 text-white" />,
    "default": <Home className="w-8 h-8 text-white" />
  };
  return iconMap[category] || iconMap.default;
};

// Sample data for demonstration
const sampleProducts = [
  {
    id: "1",
    name: "Handcrafted Carrara Marble Island",
    price: 4500,
    comparePrice: 5200,
    images: ["/images/products/marble-island-1.jpg", "/images/products/marble-island-2.jpg"],
    description: "Imported Italian Carrara marble with integrated breakfast bar and premium brass fixtures. Each piece unique with natural veining.",
    inStock: true,
    category: "Kitchen Islands",
    brand: "North Bay Designs",
  },
  {
    id: "2", 
    name: "Professional Dual-Fuel Range",
    price: 8900,
    images: ["/images/products/range-1.jpg"],
    description: "48-inch professional series with convection ovens, precision temperature control, and commercial-grade performance.",
    inStock: true,
    category: "Appliances",
    brand: "Sub-Zero Wolf",
  },
  {
    id: "3",
    name: "Bespoke Walnut Cabinetry",
    price: 12500,
    images: ["/images/products/walnut-cabinets-1.jpg"],
    description: "Hand-crafted American black walnut with soft-close hardware, custom finishes, and lifetime warranty.",
    inStock: true,
    category: "Cabinetry",
    brand: "North Bay Designs",
  },
];

const stats = [
  { number: "500+", label: "Projects Completed", icon: Home },
  { number: "15+", label: "Years Experience", icon: Award },
  { number: "98%", label: "Client Satisfaction", icon: Users },
  { number: "50+", label: "Design Awards", icon: Palette },
];

const valueProps = [
  {
    title: "Curated Products",
    description: "Exclusive, high-end selections from premier luxury brands and artisan craftspeople.",
    icon: Palette,
  },
  {
    title: "Custom Design Services", 
    description: "Full-service design consultation from concept to completion with expert guidance.",
    icon: Users,
  },
  {
    title: "Bay Area Showroom",
    description: "Visit our Napa Valley showroom to experience luxury materials and finishes firsthand.",
    icon: Home,
  },
];

// Refined LuxuryHero component
const LuxuryHero = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden bg-gradient-to-b from-background-light to-background py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 -top-28 -z-10 aspect-video h-96 w-[40rem] opacity-30 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--gold-400))_1px,transparent_1px)]"></div>
        <div className="absolute -left-28 bottom-28 -z-10 aspect-video h-96 w-[40rem] opacity-30 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--gold-400))_1px,transparent_1px)]"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-2">
          {/* Left content column */}
          <div className="flex flex-col gap-8">
            <div>
              <Badge variant="outline" className="bg-gold-50 text-gold-600 border-gold-200 px-4 py-1.5 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Design Services
              </Badge>
            </div>
            
            <div className="flex flex-col gap-6">
              <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-navy-900 leading-[1.1]">
                <span className="block">Transform Your</span>
                <span className="block text-gold-600">Living Space</span>
              </h1>
              
              <p className="text-xl leading-relaxed text-navy-600 max-w-md">
                Luxury kitchen and bath design that reflects your unique style and elevates your everyday living experience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 mt-4">
              <Button 
                size="lg" 
                className="bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 gap-2"
                onClick={() => window.location.href = "/contact"}
              >
                Schedule Consultation
                <MoveRight className="w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gold-300 text-navy-800 hover:bg-gold-50 hover:text-navy-900 rounded-md font-medium transition-all duration-300 gap-2"
                onClick={() => window.location.href = "/portfolio"}
              >
                View Portfolio
              </Button>
            </div>
          </div>
          
          {/* Right image grid */}
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl aspect-square shadow-lg transform hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Modern Kitchen Design" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl row-span-2 shadow-lg transform hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                  alt="Luxury Bathroom Design" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl aspect-square shadow-lg transform hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80" 
                  alt="Kitchen Island Design" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-gold-300 rounded-xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-gold-300 rounded-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ProductCard component
const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gold-100">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={getProductImage(product.category)} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
        
        {/* Professional icon overlay */}
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-gold-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:bg-gold-700/90 transition-all duration-300">
          {getCategoryIcon(product.category)}
        </div>
        
        {product.comparePrice && (
          <div className="absolute top-4 right-4 bg-gold-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            SALE
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 group-hover:text-gold-600 transition-colors duration-300 font-serif")}>
            {product.name}
          </h3>
        </div>
        <p className={cn(TYPOGRAPHY.caption, "text-gray-600 mb-4 line-clamp-2")}>
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className={cn(TYPOGRAPHY.subheading, "text-xl font-medium text-navy-900")}>
              ${product.price.toLocaleString()}
            </span>
            {product.comparePrice && (
              <span className={cn(TYPOGRAPHY.caption, "ml-2 text-gray-500 line-through")}>
                ${product.comparePrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className={cn(TYPOGRAPHY.caption, "text-gold-600 font-medium")}>
            {product.brand}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Add top padding to account for fixed unified header */}
      <div className="pt-24 lg:pt-32">
        {/* 1. Edge-to-edge hero (100vh) - Refined */}
        <LuxuryHero />

        {/* 2. Value-prop trio */}
        <section className={cn("py-32 bg-white", SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
              Why Choose North Bay
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8")}>
              Experience the difference that comes with over 15 years of luxury design expertise
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          <div className={cn(PATTERNS.grid.services, "mb-8")}>
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-8 group-hover:bg-gold-200 transition-colors duration-300">
                  <prop.icon className="w-10 h-10 text-gold-600" />
                </div>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-6 font-serif")}>
                  {prop.title}
                </h3>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600 leading-relaxed max-w-sm mx-auto")}>
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Stats section */}
        <section className={cn("py-32 bg-gradient-to-b from-gray-50 to-white", SPACING.container.default)}>
          <div className="text-center mb-16">
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-6 font-serif")}>
              Trusted by Napa Valley Homeowners
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6">
                  <stat.icon className="w-10 h-10 text-gold-600" />
                </div>
                <div className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-serif")}>
                  {stat.number}
                </div>
                <div className={cn(TYPOGRAPHY.body, "text-navy-600 font-medium text-lg")}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Interactive product slider */}
        <section className={cn("py-32 bg-white", SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
              Featured Products
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed")}>
              Discover our curated collection of premium kitchen and bath fixtures, handpicked for their exceptional quality and timeless design.
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          <div className={cn(PATTERNS.grid.products, "mb-16")}>
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <button className={cn(
              "inline-flex items-center px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
              TYPOGRAPHY.button
            )}>
              View All Products
              <ArrowRight className="ml-3 w-5 h-5" />
            </button>
          </div>
        </section>

        {/* 5. Design Services CTA block (RH split-panel style) */}
        <section className={cn("py-32 bg-gradient-to-b from-gray-50 to-gray-100", "relative overflow-hidden")}>
          <div className={cn(SPACING.container.wide, "grid lg:grid-cols-2 gap-16 items-center")}>
            {/* Left: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Luxury Kitchen Design" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-medium text-lg">Luxury Kitchen Design</p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gold-100 rounded-full mb-6">
                <Award className="w-4 h-4 mr-2 text-gold-600" />
                <span className={cn(TYPOGRAPHY.accent, "text-gold-600")}>
                  Full Service Design
                </span>
              </div>

              <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
                From Concept to Completion
              </h2>

              <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-600 mb-8 leading-relaxed")}>
                Our expert design team guides you through every step of your transformation journey. 
                From initial consultation to final installation, we ensure every detail exceeds your expectations.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "3D Design Visualization",
                  "Premium Material Selection", 
                  "Professional Installation",
                  "1-Year Warranty"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className={cn(TYPOGRAPHY.body, "text-navy-700")}>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                "inline-flex items-center px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                TYPOGRAPHY.button
              )}>
                Start Your Project
                <ArrowRight className="ml-3 w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* 6. Testimonial section */}
        <section className={cn("py-32 bg-white", SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
              What Our Clients Say
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8")}>
              Real stories from homeowners who've transformed their spaces with North Bay
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          <div className={cn(PATTERNS.grid.testimonials, "gap-8 lg:gap-12")}>
            <div className="bg-white rounded-xl shadow-lg p-10 border border-gold-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <Quote className="w-8 h-8 text-gold-600 mr-3" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>
              <blockquote className={cn(TYPOGRAPHY.quote, "text-lg text-navy-700 mb-8 leading-relaxed")}>
                "North Bay Kitchen & Bath transformed our outdated kitchen into a stunning centerpiece. 
                Their attention to detail and quality craftsmanship exceeded our expectations."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mr-4" />
                <div>
                  <div className={cn(TYPOGRAPHY.body, "font-semibold text-navy-900")}>Sarah Johnson</div>
                  <div className={cn(TYPOGRAPHY.caption, "text-gray-600")}>Homeowner, Napa Valley</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-10 border border-gold-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <Quote className="w-8 h-8 text-gold-600 mr-3" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>
              <blockquote className={cn(TYPOGRAPHY.quote, "text-lg text-navy-700 mb-8 leading-relaxed")}>
                "The team's expertise and professionalism made our renovation stress-free. 
                The finished kitchen is both beautiful and functional."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mr-4" />
                <div>
                  <div className={cn(TYPOGRAPHY.body, "font-semibold text-navy-900")}>Michael Roberts</div>
                  <div className={cn(TYPOGRAPHY.caption, "text-gray-600")}>Client, Sonoma</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Final CTA section */}
        <section className={cn("py-32 bg-navy-900", SPACING.container.default, "text-center")}>
          <div className="max-w-4xl mx-auto">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-white mb-6 font-serif")}>
              Ready to Start Your Dream Project?
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-300 mb-8 leading-relaxed")}>
              Schedule a free consultation with our design experts and discover how we can transform your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className={cn(
                "px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                TYPOGRAPHY.button
              )}>
                Schedule Free Consultation
                <ArrowRight className="ml-3 w-5 h-5" />
              </button>
              <button className={cn(
                "px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-md font-medium transition-all duration-300",
                TYPOGRAPHY.button
              )}>
                (707) 555-0123
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 