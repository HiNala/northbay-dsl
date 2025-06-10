"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Home, 
  Palette, 
  Users, 
  Shield, 
  Compass, 
  Target, 
  Crown, 
  Gem, 
  Calendar, 
  Phone, 
  Mail,
  ChevronRight
} from "lucide-react";

// Service Tiers - RH Inspired
const serviceTiers = [
  {
    name: "FOUNDATIONAL",
    subtitle: "EXPEDITED AND ELEVATED DESIGN FOR ONE-ROOM PROJECTS",
    price: "Starting at $3,500",
    description: "Perfect for single-room transformations with professional guidance and curated selections.",
    features: [
      "Assistance with selecting North Bay and premium brand products, materials, colors and finishes",
      "Includes design concepts, AutoCAD floor plans and material swatches",
      "Support from our Design Consultants, virtually or at our Napa location", 
      "Design turnaround in 1-3 days",
      "All interior design services complimentary for North Bay Members"
    ],
    icon: Home,
    popular: false,
    level: "OPTION 1"
  },
  {
    name: "COMPREHENSIVE", 
    subtitle: "HOLISTIC DESIGN FOR TWO ROOMS TO AN ENTIRE HOME",
    price: "Starting at $8,500",
    description: "Complete design service for multiple rooms with detailed planning and coordination.",
    features: [
      "Assistance with selecting products, materials, colors and finishes, including premium fixtures and fittings",
      "Includes design concepts, floor plans, site measurement, swatches, detailed AutoCAD schematic designs, elevations and comprehensive design presentations",
      "Project coordination",
      "Support from our Designers, in-home, virtually or at our Napa location",
      "All interior design services complimentary for North Bay Members"
    ],
    icon: Palette,
    popular: true,
    level: "OPTION 2"
  },
  {
    name: "BESPOKE",
    subtitle: "FULL-SERVICE DESIGN FOR WHOLE-HOME TRANSFORMATIONS", 
    price: "Starting at $25,000",
    description: "White-glove luxury service for discerning clients seeking complete home transformation.",
    features: [
      "Entire home projects, from concept to completion, with a minimum investment of $300K in North Bay furnishings",
      "Assistance with selecting products, materials, colors and finishes",
      "Includes entire suite of support: design concepts, floor plans, site measurement, swatches, detailed AutoCAD schematic designs, elevations, 3D renderings and comprehensive design presentations",
      "Includes specialized interior architecture and finish selections, fine-art curation and premium custom kitchen and bathroom design, décor and styling via our exclusive partnerships",
      "Project coordination, installation and styling support",
      "Support from our most tenured Designers, in-home, virtually or at our Napa location",
      "All interior design services complimentary for North Bay Members"
    ],
    icon: Crown,
    popular: false,
    level: "OPTION 3"
  }
];

// North Bay Membership Benefits (RH-inspired)
const membershipBenefits = [
  {
    title: "NORTH BAY MEMBERS PROGRAM",
    subtitle: "SAVE 30% ON EVERYTHING NORTH BAY*",
    additionalSave: "SAVE 35% ON OUTDOOR FOR A LIMITED TIME",
    annualFee: "FOR $200 ANNUALLY, MEMBER BENEFITS INCLUDE:",
    benefits: [
      "30% SAVINGS ON ALL FULL-PRICED ITEMS", 
      "ADDITIONAL 20% SAVINGS ON ALL SALE ITEMS",
      "COMPLIMENTARY SERVICES WITH NORTH BAY INTERIOR DESIGN",
      "SPECIAL FINANCING AVAILABLE WITH THE NORTH BAY CREDIT CARD*"
    ],
    ctaText: "JOIN NOW"
  }
];

// Design Experience Process
const designProcess = [
  {
    phase: "IDEATION",
    title: "Discovery & Vision",
    description: "We begin by understanding your lifestyle, preferences, and vision for your space.",
    image: "/images/process/ideation.jpg"
  },
  {
    phase: "DEVELOPMENT", 
    title: "Design & Planning",
    description: "Our team creates detailed plans, 3D renderings, and curated material selections.",
    image: "/images/process/development.jpg"
  },
  {
    phase: "CURATION",
    title: "Sourcing & Coordination", 
    description: "We source premium materials and coordinate with our network of skilled artisans.",
    image: "/images/process/curation.jpg"
  },
  {
    phase: "INSTALLATION",
    title: "Completion & Styling",
    description: "Professional installation with meticulous attention to detail and final styling.",
    image: "/images/process/installation.jpg"
  }
];

export default function DesignServicesPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Add top padding to account for fixed navigation */}
              <div className="pt-24 lg:pt-32">
        {/* Hero Section - Clean & Elegant */}
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
                    <Award className="w-4 h-4 mr-2" />
                    Premium Design Services
                  </Badge>
                </div>
                
                <div className="flex flex-col gap-6">
                  <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-navy-900 leading-[1.1]">
                    <span className="block">Our Design</span>
                    <span className="block text-gold-600">Services</span>
                  </h1>
                  
                  <p className="text-xl leading-relaxed text-navy-600 max-w-md">
                    We offer three levels of service tailored to your needs, timeline, and budget. 
                    All interior design services are complimentary for North Bay Members.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5 mt-4">
                  <Button 
                    size="lg" 
                    className="bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 gap-2"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-gold-300 text-navy-800 hover:bg-gold-50 hover:text-navy-900 rounded-md font-medium transition-all duration-300 gap-2"
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>
              
              {/* Right image */}
              <div className="relative hidden md:block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Luxury Kitchen Design Process" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-gold-300 rounded-xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-gold-300 rounded-xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-16 bg-gradient-to-b from-background to-gray-50"></div>

        {/* Service Tiers Section */}
        <section className={cn("py-32 bg-gradient-to-b from-gray-50 to-white", SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-8">
              Our Service Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the design service level that best fits your project scope, timeline, and budget. 
              Each option is carefully structured to deliver exceptional results.
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto mt-8" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceTiers.map((tier, index) => (
              <div 
                key={index}
                className={cn(
                  "relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gold-100",
                  tier.popular ? "ring-2 ring-gold-500 transform scale-105" : ""
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gold-600 text-white text-center py-3 text-sm font-medium tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={cn("p-8", tier.popular ? "pt-16" : "pt-8")}>
                  {/* Tier Icon */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                      <tier.icon className="w-8 h-8 text-gold-600" />
                    </div>
                    <div className="text-xs font-medium text-gray-500 tracking-wider mb-2">
                      {tier.level}
                    </div>
                  </div>

                  {/* Tier Name & Description */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-serif text-navy-900 mb-3">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {tier.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {tier.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <Button 
                      size="sm"
                      className={cn(
                        "w-full py-3 text-sm font-medium transition-all duration-300",
                        tier.popular 
                          ? "bg-gold-600 hover:bg-gold-700 text-white"
                          : "border border-gold-600 text-gold-600 hover:bg-gold-50"
                      )}
                      onClick={() => setSelectedTier(tier.name)}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer */}
        <div className="h-16 bg-gradient-to-b from-white to-navy-900"></div>

        {/* Membership Program Section */}
        <section className="py-32 bg-navy-900 text-white">
          <div className={cn(SPACING.container.default)}>
            {membershipBenefits.map((membership, index) => (
              <div key={index} className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif mb-8">
                  North Bay Members Program
                </h2>
                
                <div className="space-y-4 mb-12">
                  <h3 className="text-2xl md:text-3xl font-light">
                    Save 30% on Everything North Bay
                  </h3>
                  <p className="text-lg text-gray-300">
                    For $200 annually, member benefits include:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                  {membership.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-white/90 text-left text-sm leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg"
                  className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Join Now
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer */}
        <div className="h-16 bg-gradient-to-b from-navy-900 to-white"></div>

        {/* Design Experience Section */}
        <section className={cn("py-32 bg-white", SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-8">
              Your Design Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From ideation to installation, we guide you through every step of your transformation journey
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          {/* Design Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {designProcess.map((phase, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8 overflow-hidden rounded-xl">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-gold-50 group-hover:to-gold-100 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gold-100 group-hover:bg-gold-600 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300">
                        <Palette className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="text-gray-600 font-medium text-sm">
                        {phase.phase}
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-serif text-navy-900 mb-4">
                  {phase.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Request Design Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-16 bg-gradient-to-b from-white to-navy-900"></div>

        {/* Final CTA Section */}
        <section className={cn("py-32 bg-navy-900", SPACING.container.default, "text-center")}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Ready to Start Your Dream Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Schedule a free consultation with our design experts and discover how we can transform your space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 font-medium transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 font-medium transition-all duration-300"
              >
                (707) 555-0123
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 