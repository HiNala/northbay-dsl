"use client";

import { useState, useEffect } from 'react';
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { EnhancedTestimonials } from "@/components/ui/enhanced-testimonials";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Home, 
  Users, 
  Palette, 
  Award, 
  ArrowRight, 
  CheckCircle, 
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

// New Luxury Hero with Image Slider
const LuxuryImageHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Luxury Kitchen Design"
    },
    {
      url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      alt: "Luxury Bathroom Design"
    },
    {
      url: "https://images.unsplash.com/photo-1571508601936-de56ba93ad3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      alt: "Modern Home Interior"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              currentSlide === index ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-white">
            <div className="mb-6">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Luxury Design
              </Badge>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl tracking-tight text-white leading-[1.1] mb-6">
              <span className="block">North Bay</span>
              <span className="block text-gold-400">Kitchen & Bath</span>
            </h1>
            
            <p className="text-xl md:text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto mb-8">
              Where luxury meets functionality. Transform your most important spaces with unparalleled craftsmanship and timeless design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 px-8 py-4"
                onClick={() => window.location.href = "/contact"}
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 rounded-md font-medium transition-all duration-300 px-8 py-4 backdrop-blur-sm"
                onClick={() => window.location.href = "/portfolio"}
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-white" : "bg-white/40"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

// Transform Your Space Section (formerly LuxuryHero)
const TransformSection = () => {
  return (
    <section className="relative py-16 w-full bg-gradient-to-b from-background-light to-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 -top-28 -z-10 aspect-video h-96 w-[40rem] opacity-30 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--gold-400))_1px,transparent_1px)]"></div>
        <div className="absolute -left-28 bottom-28 -z-10 aspect-video h-96 w-[40rem] opacity-30 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--gold-400))_1px,transparent_1px)]"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
          {/* Left content column */}
          <div className="flex flex-col gap-6">
            <div>
              <Badge variant="outline" className="bg-gold-50 text-gold-600 border-gold-200 px-4 py-1.5 text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Transform Your Space
              </Badge>
            </div>
            
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-navy-900 leading-[1.1]">
                <span className="block">Luxury Design</span>
                <span className="block text-gold-600">Tailored to You</span>
              </h2>
              
              <p className="text-lg md:text-xl leading-relaxed text-navy-600 max-w-lg">
                Every project begins with understanding your unique vision. Our expert designers work closely with you to create spaces that reflect your personal style and elevate your everyday living experience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                size="lg" 
                className="bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 gap-2"
                onClick={() => window.location.href = "/design-services"}
              >
                Our Services
                <MoveRight className="w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gold-300 text-navy-800 hover:bg-gold-50 hover:text-navy-900 rounded-md font-medium transition-all duration-300 gap-2"
                onClick={() => window.location.href = "/about"}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right image grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4 h-[400px] max-h-[50vh]">
              <div className="rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
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
              <div className="rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
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

      {/* No padding needed for full-screen hero */}
      <div>
        {/* 1. New luxury image slider hero */}
        <LuxuryImageHero />

        {/* 2. Transform section (formerly hero) */}
        <TransformSection />

        {/* 3. Value-prop trio */}
        <section className={cn("py-16 bg-white", SPACING.container.default)}>
          <div className="text-center mb-12">
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-4 font-serif")}>
              Why Choose North Bay
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-lg text-gray-600 max-w-2xl mx-auto mb-4")}>
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

        {/* 4. Stats section */}
        <section className={cn("py-16 bg-gradient-to-b from-gray-50 to-white", SPACING.container.default)}>
          <div className="text-center mb-12">
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-4 font-serif")}>
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

        {/* 5. Interactive product slider */}
        <section className={cn("py-16 bg-white", SPACING.container.default)}>
          <div className="text-center mb-12">
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-4 font-serif")}>
              Featured Products
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-lg text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed")}>
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

        {/* 6. Design Services CTA block (RH split-panel style) */}
        <section className={cn("py-16 bg-gradient-to-b from-gray-50 to-gray-100", "relative overflow-hidden")}>
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

        {/* 7. Enhanced Testimonials section */}
        <EnhancedTestimonials />

        {/* 8. Final CTA section */}
        <section className={cn("py-16 bg-navy-900", SPACING.container.default, "text-center")}>
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