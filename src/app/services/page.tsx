"use client";

import React from "react";
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Palette, 
  Home, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Award,
  Clock,
  DollarSign
} from "lucide-react";

const services = [
  {
    title: "Design Consultation",
    price: "Starting at $500",
    description: "Professional guidance to kickstart your project with expert recommendations.",
    features: [
      "2-hour in-home consultation",
      "Style assessment and recommendations",
      "Project scope and budget guidance",
      "Resource list and next steps"
    ],
    icon: Users,
    duration: "2 hours",
    popular: false
  },
  {
    title: "Complete Design Service",
    price: "Starting at $5,000",
    description: "Full-service design from concept to completion with professional oversight.",
    features: [
      "Everything in Design Consultation",
      "3D renderings and floor plans",
      "Detailed specifications and materials",
      "Project coordination and oversight",
      "1-year warranty on workmanship"
    ],
    icon: Palette,
    duration: "8-12 weeks",
    popular: true
  },
  {
    title: "Luxury Concierge Service",
    price: "Starting at $15,000",
    description: "White-glove service for discerning clients who want a seamless experience.",
    features: [
      "Everything in Complete Design Service",
      "Dedicated project manager",
      "Premium material sourcing",
      "Express timeline (when possible)",
      "Post-project maintenance service"
    ],
    icon: Award,
    duration: "6-10 weeks",
    popular: false
  }
];

const specialties = [
  {
    title: "Kitchen Design",
    description: "Complete kitchen transformations with premium appliances and custom cabinetry.",
    icon: Home,
    features: ["Custom Cabinetry", "Premium Appliances", "Stone Countertops", "Designer Lighting"]
  },
  {
    title: "Bathroom Design",
    description: "Luxury bathroom renovations creating spa-like retreats in your home.",
    icon: Star,
    features: ["Custom Vanities", "Premium Fixtures", "Natural Stone", "Heated Floors"]
  },
  {
    title: "Whole Home Design",
    description: "Comprehensive design services for complete home transformations.",
    icon: Palette,
    features: ["Space Planning", "Material Coordination", "Lighting Design", "Color Consultation"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-navy-900 to-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #B79A6B 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #B79A6B 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className={cn(SPACING.container.default, "relative z-10")}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Award className="w-4 h-4 mr-3" />
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                Professional Design Services
              </span>
            </div>

            <h1 className={cn(TYPOGRAPHY.heading, "text-5xl md:text-6xl mb-6 font-serif")}>
              Design Services
            </h1>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-200 leading-relaxed max-w-3xl mx-auto")}>
              Transform your space with expert design and exceptional craftsmanship. 
              Our comprehensive services cover every aspect of your luxury renovation.
            </p>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Service Packages
          </h2>
          <p className={cn(TYPOGRAPHY.body, "text-xl text-gray-600 max-w-3xl mx-auto")}>
            Choose the level of service that best fits your project needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={cn(
                "relative hover:shadow-xl transition-all duration-300",
                service.popular ? "border-2 border-gold-600 transform scale-105" : "border border-gray-200"
              )}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gold-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                    <service.icon className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-2 font-serif")}>
                    {service.title}
                  </h3>
                  <div className={cn(TYPOGRAPHY.heading, "text-3xl text-gold-600 mb-2 font-serif")}>
                    {service.price}
                  </div>
                  <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {service.duration}
                  </div>
                  <p className={cn(TYPOGRAPHY.body, "text-gray-600")}>
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className={cn(TYPOGRAPHY.body, "text-gray-700")}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className={cn(
                  "w-full transition-all duration-300",
                  service.popular 
                    ? "bg-gold-600 hover:bg-gold-700 text-white shadow-md hover:shadow-lg"
                    : "border-2 border-gold-600 text-gold-600 hover:bg-gold-50"
                )}>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section className={cn(PATTERNS.section.alternate, SPACING.container.default)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Our Specialties
          </h2>
          <p className={cn(TYPOGRAPHY.body, "text-xl text-gray-600 max-w-3xl mx-auto")}>
            We excel in creating luxurious, functional spaces that reflect your personal style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6 group-hover:bg-gold-200 transition-colors">
                  <specialty.icon className="w-10 h-10 text-gold-600" />
                </div>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-4 font-serif")}>
                  {specialty.title}
                </h3>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600 mb-6 leading-relaxed")}>
                  {specialty.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {specialty.features.map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 border border-gold-100">
          <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-gold-600" />
          </div>
          
          <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-4 font-serif")}>
            Ready to Start Your Project?
          </h2>
          
          <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-600 mb-8 max-w-2xl mx-auto")}>
            Schedule a complimentary consultation to discuss your vision and explore how we can bring it to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white" asChild>
              <a href="/contact">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            
            <Button size="lg" variant="outline" className="border-gold-600 text-gold-600 hover:bg-gold-50" asChild>
              <a href="/design-services">
                View Full Process
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 