"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Parallax effect for hero background
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="hero-luxury relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
      }}
    >
      {/* Hero content with luxury styling */}
      <div className="hero-content">
        <h1 className="hero-title font-serif">
          Extraordinary Spaces,
          <br />
          <span className="block">Elevated Living</span>
        </h1>
        
        <p className="hero-subtitle">
          Where uncompromising craftsmanship meets timeless design
        </p>
        
        {/* CTA buttons with luxury styling */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-16">
          <Link href="/portfolio" className="btn-primary group">
            View Our Portfolio
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link href="/contact" className="btn-secondary">
            Schedule Consultation
          </Link>
        </div>
        
        {/* Luxury separator and scroll indicator */}
        <div className="flex flex-col items-center">
          <div className="w-px h-12 bg-white/30 mb-4"></div>
          <button 
            onClick={scrollToServices}
            className="group flex flex-col items-center text-white/80 hover:text-refined-gold transition-all duration-500"
            aria-label="Scroll to services section"
          >
            <span className="text-sm font-medium tracking-widest mb-3 opacity-90">
              DISCOVER MORE
            </span>
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
} 