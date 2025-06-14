"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Palette, Wrench, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Kitchen Design",
    description: "Transform your kitchen into a culinary masterpiece with custom cabinetry, premium finishes, and thoughtful layouts that enhance both beauty and functionality.",
    features: ["Custom Cabinetry", "Premium Appliances", "Stone Countertops", "Lighting Design"],
    href: "/services/kitchen-design"
  },
  {
    icon: Wrench,
    title: "Bathroom Renovation",
    description: "Create a spa-like retreat with luxurious materials, elegant fixtures, and innovative storage solutions that maximize space and comfort.",
    features: ["Luxury Fixtures", "Custom Vanities", "Tile & Stone", "Smart Technology"],
    href: "/services/bathroom-renovation"
  },
  {
    icon: Lightbulb,
    title: "Design Consultation",
    description: "Collaborate with our expert designers to bring your vision to life with personalized design solutions tailored to your lifestyle and aesthetic preferences.",
    features: ["3D Renderings", "Material Selection", "Space Planning", "Project Management"],
    href: "/services/design-consultation"
  }
];

export default function ServicesShowcase() {
  return (
    <section id="services" className="luxury-section">
      <div className="luxury-container">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-serif mb-6">
            Our Design Services
          </h2>
          <p className="lead-text max-w-3xl mx-auto">
            From initial concept to final installation, we provide comprehensive design services 
            that transform your vision into extraordinary living spaces.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="luxury-card group cursor-pointer">
              {/* Service icon */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-refined-gold/10 rounded-lg flex items-center justify-center group-hover:bg-refined-gold group-hover:scale-110 transition-all duration-400">
                  <service.icon className="w-8 h-8 text-refined-gold group-hover:text-deep-charcoal transition-colors duration-400" />
                </div>
              </div>

              {/* Service content */}
              <h3 className="font-serif mb-4 group-hover:text-refined-gold transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-sophisticated-gray mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Service features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-sophisticated-gray">
                    <div className="w-1.5 h-1.5 bg-refined-gold rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn more link */}
              <Link 
                href={service.href}
                className="inline-flex items-center text-refined-gold font-medium hover:text-deep-charcoal transition-colors duration-300 group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center bg-soft-cream rounded-lg p-12">
          <h3 className="font-serif mb-4">
            Ready to Transform Your Space?
          </h3>
          <p className="text-sophisticated-gray mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our design experts to discuss your project 
            and discover how we can bring your vision to life.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
} 