"use client";

import React from "react";
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  ArrowRight, 
  Star, 
  MapPin, 
  Calendar,
  Home,
  Palette,
  Eye
} from "lucide-react";

const featuredProjects = [
  {
    title: "Modern Napa Valley Kitchen",
    location: "Napa, CA",
    category: "Kitchen Design",
    year: "2024",
    description: "Complete kitchen renovation featuring custom cabinetry, quartzite countertops, and professional-grade appliances.",
    features: ["Custom Cabinetry", "Quartzite Countertops", "Professional Appliances"],
    awards: ["NKBA Excellence Award"],
    image: "/portfolio/napa-kitchen.jpg"
  },
  {
    title: "Luxury Master Bathroom",
    location: "Sonoma, CA", 
    category: "Bathroom Design",
    year: "2024",
    description: "Spa-inspired master bathroom with freestanding tub, walk-in shower, and custom vanity.",
    features: ["Freestanding Tub", "Walk-in Shower", "Custom Vanity"],
    awards: ["Design Excellence"],
    image: "/portfolio/sonoma-bath.jpg"
  },
  {
    title: "Transitional Kitchen Remodel",
    location: "St. Helena, CA",
    category: "Kitchen Design", 
    year: "2023",
    description: "Elegant transitional kitchen blending classic and contemporary elements.",
    features: ["Transitional Style", "Premium Finishes", "Smart Storage"],
    awards: ["Regional Design Award"],
    image: "/portfolio/helena-kitchen.jpg"
  }
];

const categories = [
  { name: "All Projects", count: 50, active: true },
  { name: "Kitchen Design", count: 28, active: false },
  { name: "Bathroom Design", count: 18, active: false },
  { name: "Whole Home", count: 4, active: false }
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-20 bg-gradient-to-b from-navy-900 to-navy-800 text-white overflow-hidden">

        <div className={cn(SPACING.container.default, "relative z-10")}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Award className="w-4 h-4 mr-3" />
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                Award-Winning Projects
              </span>
            </div>

            <h1 className={cn(TYPOGRAPHY.heading, "text-5xl md:text-6xl mb-6 font-serif")}>
              Our Portfolio
            </h1>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-200 leading-relaxed max-w-3xl mx-auto")}>
              Explore our collection of luxury kitchen and bathroom transformations. 
              Each project represents our commitment to exceptional design and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Smooth gradient transition from hero */}
      <section className="py-32 bg-gradient-to-b from-navy-800 via-white to-white">
        <div className={cn(SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-8 font-serif")}>
              Browse Our Work
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-12")}>
              Filter by project type to see examples of our craftsmanship in each specialty
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={cn(
                    "px-8 py-4 rounded-full font-medium transition-all duration-300 hover:transform hover:-translate-y-1",
                    category.active
                      ? "bg-gold-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gold-300 hover:text-gold-600 hover:shadow-md"
                  )}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Featured Projects Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  {/* Project Image Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Home className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-500 font-medium">{project.category}</p>
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                        <Eye className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>
                  
                  {/* Award Badge */}
                  {project.awards && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gold-600 hover:bg-gold-700">
                        <Award className="w-3 h-3 mr-1" />
                        Award Winner
                      </Badge>
                    </div>
                  )}
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                      {project.year}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-2">
                    <p className="text-sm text-gold-600 uppercase tracking-wide font-medium">
                      {project.category}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                    <Calendar className="w-4 h-4 ml-4 mr-1" />
                    {project.year}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.slice(0, 2).map((feature, featureIndex) => (
                      <span key={featureIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    View Full Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-12 border border-gold-100">
            <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Palette className="w-10 h-10 text-gold-600" />
            </div>
            
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-4 font-serif")}>
              Full Portfolio Coming Soon
            </h2>
            
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-600 mb-8 max-w-2xl mx-auto")}>
              We're curating our complete collection of luxury transformations to showcase our design excellence. 
              In the meantime, we'd love to share more examples during a personal consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button size="lg" variant="outline" className="border-gold-600 text-gold-600 hover:bg-gold-50">
                Contact for Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Elegant gradient spacer */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className={cn(SPACING.container.default)}>
          <div className="text-center mb-16">
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-6 font-serif")}>
              Trusted by Napa Valley Homeowners
            </h2>
            <div className="w-24 h-1 bg-gold-600 mx-auto mb-8" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "500+", label: "Projects Completed", icon: Home },
              { number: "50+", label: "Design Awards", icon: Award },
              { number: "15+", label: "Years Experience", icon: Star },
              { number: "98%", label: "Client Satisfaction", icon: Palette }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6 group-hover:bg-gold-200 transition-all duration-300 group-hover:transform group-hover:scale-110">
                  <stat.icon className="w-10 h-10 text-gold-600" />
                </div>
                <div className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-serif")}>
                  {stat.number}
                </div>
                <div className={cn(TYPOGRAPHY.body, "text-gray-600 font-medium text-lg")}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Seamless dark transition */}
      <section className="py-32 bg-gradient-to-b from-white to-navy-900">
        <div className={cn(SPACING.container.default, "text-center")}>
          <div className="max-w-4xl mx-auto">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-white mb-8 font-serif")}>
              Ready to Create Your Dream Space?
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-300 mb-12 leading-relaxed")}>
              Let's discuss your vision and create a space that exceeds your expectations.
            </p>
            <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white text-lg px-10 py-5 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 