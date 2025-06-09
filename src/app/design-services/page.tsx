"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { SectionSeparator } from "@/components/ui/section-separator";
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

      {/* Hero Section - RH Inspired */}
      <section className="relative min-h-[80vh] bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 text-white overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/textures/wood-grain.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div className={cn(SPACING.container.default, "text-center")}>
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center px-6 py-3 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20 mb-12">
                <Award className="w-4 h-4 mr-3" />
                <span className={cn(TYPOGRAPHY.accent, "text-white tracking-wider")}>
                  LUXURY DESIGN SERVICES
                </span>
              </div>

              <h1 className="font-light text-6xl md:text-8xl tracking-wide text-white mb-8 leading-[0.9]">
                OUR DESIGN SERVICES
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-16">
                We offer three levels of service that are tailored to your needs and 
                the scope, timeline and budget of your project. This structure is 
                flexible and allows us to scale to any project size – big or small, 
                indoors or outdoors – working at the pace you require, anywhere 
                in the world. All interior design services are complimentary for North Bay 
                Members.
              </p>

              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-12 py-4 text-lg tracking-wider"
              >
                REQUEST A DESIGN CONSULTATION
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator variant="default" />

      {/* Service Tiers Section */}
      <section className={cn(PATTERNS.section.luxury, SPACING.container.default)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {serviceTiers.map((tier, index) => (
            <div 
              key={index}
              className={cn(
                "relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden",
                tier.popular ? "ring-2 ring-gold-600 transform scale-105" : ""
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gold-600 text-white text-center py-2 text-sm font-medium tracking-wide">
                  MOST POPULAR
                </div>
              )}
              
              <div className={cn("p-10", tier.popular ? "pt-16" : "pt-10")}>
                {/* Tier Level */}
                <div className="text-center mb-8">
                  <div className="text-sm font-medium text-gray-500 tracking-widest mb-2">
                    {tier.level}
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full mb-6">
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Tier Name & Subtitle */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-light tracking-wide text-navy-900 mb-4">
                    {tier.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 tracking-wide leading-relaxed mb-6">
                    {tier.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {tier.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-gold-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button 
                    className={cn(
                      "w-full py-4 text-sm tracking-wider font-medium transition-all duration-300",
                      tier.popular 
                        ? "bg-gold-600 hover:bg-gold-700 text-white"
                        : "border-2 border-gold-600 text-gold-600 hover:bg-gold-50"
                    )}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    REQUEST A DESIGN CONSULTATION
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionSeparator variant="dots" />

      {/* Membership Program Section */}
      <section className="relative py-32 bg-gradient-to-b from-amber-900 to-amber-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/textures/luxury-pattern.jpg')] bg-repeat"></div>
        </div>
        
        <div className={cn(SPACING.container.default, "relative z-10")}>
          {membershipBenefits.map((membership, index) => (
            <div key={index} className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-light tracking-wide mb-8">
                {membership.title}
              </h2>
              
              <div className="space-y-6 mb-12">
                <h3 className="text-2xl md:text-3xl font-light tracking-wide">
                  {membership.subtitle}
                </h3>
                <h4 className="text-xl md:text-2xl font-light tracking-wide">
                  {membership.additionalSave}
                </h4>
                <p className="text-lg tracking-wide">
                  {membership.annualFee}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                {membership.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start">
                    <Crown className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-white/90 text-left text-sm font-medium tracking-wide">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <Button 
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-900 px-12 py-4 text-lg tracking-wider font-medium"
              >
                {membership.ctaText}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <SectionSeparator variant="default" />

      {/* Design Experience Section */}
      <section className={cn(PATTERNS.section.spacious, SPACING.container.default)}>
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-wide text-navy-900 mb-6">
            YOUR DESIGN EXPERIENCE
          </h2>
          <p className="text-xl text-gray-600 tracking-wide">
            FROM IDEATION TO INSTALLATION
          </p>
        </div>

        {/* Design Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {designProcess.map((phase, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-lg">
                <div className="aspect-square bg-gradient-to-br from-amber-100 via-amber-50 to-gold-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium text-sm tracking-wide">
                      {phase.phase}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-light text-navy-900 mb-4 tracking-wide">
                {phase.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Materials & Textures Showcase */}
        <div className="relative h-96 bg-gradient-to-r from-amber-100 via-gold-50 to-amber-100 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="grid grid-cols-6 gap-4 mb-8">
                {/* Material swatches placeholder */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "w-16 h-16 rounded-lg shadow-md",
                      i % 3 === 0 ? "bg-gradient-to-br from-amber-800 to-amber-900" :
                      i % 3 === 1 ? "bg-gradient-to-br from-gold-200 to-gold-300" :
                      "bg-gradient-to-br from-navy-700 to-navy-800"
                    )}
                  />
                ))}
              </div>
              <h3 className="text-2xl font-light text-navy-900 mb-4 tracking-wide">
                Premium Materials & Finishes
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Experience our curated collection of luxury materials, finishes, and textures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator variant="bold" />

      {/* Final CTA Section */}
      <section className={cn(PATTERNS.section.dark, SPACING.container.default, "text-center")}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light tracking-wide text-white mb-8">
            BEGIN YOUR DESIGN JOURNEY TODAY
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed tracking-wide">
            Schedule a complimentary consultation with our design experts and 
            discover how we can transform your space into something extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gold-600 hover:bg-gold-700 text-white px-12 py-4 text-lg tracking-wider transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              REQUEST A DESIGN CONSULTATION
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-12 py-4 text-lg tracking-wider transition-all duration-300"
            >
              (707) 555-0123
              <Phone className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 