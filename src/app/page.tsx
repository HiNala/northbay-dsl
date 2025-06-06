"use client";

import { Navigation } from "@/components/layout/navigation";
import { LuxuryHero } from "@/components/luxury/hero";
import { ProductCard } from "@/components/luxury/product-card";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { Sparkles, Home, Users, Palette, Award, Star, ArrowRight, CheckCircle, Quote } from "lucide-react";

// Sample data for demonstration
const sampleProducts = [
  {
    id: "1",
    name: "Carrara Marble Kitchen Island",
    price: 4500,
    comparePrice: 5200,
    images: ["/images/products/marble-island-1.jpg", "/images/products/marble-island-2.jpg"],
    description: "Handcrafted Italian Carrara marble island with integrated breakfast bar and premium brass fixtures.",
    inStock: true,
    category: "Kitchen Islands",
    brand: "North Bay Designs",
  },
  {
    id: "2", 
    name: "Professional Series Range",
    price: 8900,
    images: ["/images/products/range-1.jpg"],
    description: "48-inch professional dual-fuel range with convection ovens and precision temperature control.",
    inStock: true,
    category: "Appliances",
    brand: "Sub-Zero Wolf",
  },
  {
    id: "3",
    name: "Custom Walnut Cabinetry",
    price: 12500,
    images: ["/images/products/walnut-cabinets-1.jpg"],
    description: "Handcrafted American walnut cabinets with soft-close hardware and premium finishes.",
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* 1. Edge-to-edge hero (100vh) */}
      <LuxuryHero
        title="Transform Your"
        subtitle="Living Space"
        description="Luxury kitchen and bath design that reflects your unique style and elevates your everyday living experience."
        badge={{
          text: "Premium Design Services",
          icon: <Sparkles className="w-4 h-4" />,
        }}
        primaryCTA={{
          text: "Schedule Consultation",
          onClick: () => window.location.href = "/contact",
        }}
        secondaryCTA={{
          text: "View Portfolio",
          onClick: () => window.location.href = "/portfolio",
        }}
      />

      {/* 2. Value-prop trio */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Why Choose North Bay
          </h2>
          <div className="w-24 h-1 bg-gold-600 mx-auto" />
        </div>

        <div className={PATTERNS.grid.services}>
          {valueProps.map((prop, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6 group-hover:bg-gold-200 transition-colors duration-300">
                <prop.icon className="w-10 h-10 text-gold-600" />
              </div>
              <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-4 font-serif")}>
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
      <section className={cn(PATTERNS.section.alternate, SPACING.container.default)}>
        <div className={PATTERNS.grid.services}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-gold-600" />
              </div>
              <div className={cn(TYPOGRAPHY.heading, "text-4xl font-bold text-navy-900 mb-2 font-serif")}>
                {stat.number}
              </div>
              <div className={cn(TYPOGRAPHY.body, "text-navy-600 font-medium")}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive product slider */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Featured Products
          </h2>
          <p className={cn(TYPOGRAPHY.body, "text-xl text-gray-600 max-w-3xl mx-auto mb-8")}>
            Discover our curated collection of premium kitchen and bath fixtures, handpicked for their exceptional quality and timeless design.
          </p>
          <div className="w-24 h-1 bg-gold-600 mx-auto" />
        </div>

        <div className={PATTERNS.grid.products}>
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
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
      <section className={cn(PATTERNS.section.luxury, "relative overflow-hidden")}>
        <div className={cn(SPACING.container.wide, "grid lg:grid-cols-2 gap-16 items-center")}>
          {/* Left: Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-500 font-medium">Luxury Kitchen Design</p>
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
      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-gold-600 mx-auto" />
        </div>

        <div className={PATTERNS.grid.testimonials}>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gold-100">
            <div className="flex items-center mb-6">
              <Quote className="w-8 h-8 text-gold-600 mr-3" />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
            </div>
            <blockquote className={cn(TYPOGRAPHY.quote, "text-lg text-navy-700 mb-6 leading-relaxed")}>
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

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gold-100">
            <div className="flex items-center mb-6">
              <Quote className="w-8 h-8 text-gold-600 mr-3" />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
            </div>
            <blockquote className={cn(TYPOGRAPHY.quote, "text-lg text-navy-700 mb-6 leading-relaxed")}>
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
      <section className={cn(PATTERNS.section.dark, SPACING.container.default, "text-center")}>
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
  );
} 