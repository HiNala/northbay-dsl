"use client";

import React from "react";
import { motion } from 'framer-motion';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <EnhancedHeader />

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 bg-gradient-to-b from-muted to-background text-foreground overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Award className="w-4 h-4 mr-3 text-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">
                Professional Design Services
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl mb-6 font-serif font-light text-foreground">
              Design Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Transform your space with expert design and exceptional craftsmanship. 
              Our comprehensive services cover every aspect of your luxury renovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              Service Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Choose the level of service that best fits your project needs and budget.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`relative hover:shadow-xl transition-all duration-300 h-full ${
                  service.popular ? "border-2 border-primary transform scale-105" : "border border-border"
                }`}>
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl text-foreground mb-2 font-serif font-medium">
                        {service.title}
                      </h3>
                      <div className="text-3xl text-primary mb-2 font-serif font-bold">
                        {service.price}
                      </div>
                      <div className="flex items-center justify-center text-muted-foreground text-sm mb-4">
                        <Clock className="w-4 h-4 mr-2" />
                        {service.duration}
                      </div>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className={`w-full transition-all duration-300 ${
                      service.popular 
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              Our Specialties
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              We excel in creating luxurious, functional spaces that reflect your personal style.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                      <specialty.icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl text-foreground mb-4 font-serif font-medium">
                      {specialty.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {specialty.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {specialty.features.map((feature, featureIndex) => (
                        <span 
                          key={featureIndex}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center bg-card rounded-2xl shadow-lg p-12 border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl text-foreground mb-4 font-serif font-light">
              Ready to Start Your Project?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Schedule a complimentary consultation to discuss your vision and explore how we can bring it to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              
              <a href="/design-services">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center">
                  View Full Process
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 