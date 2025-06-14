'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-luxury" style={{
      backgroundImage: `url('/images/hero-luxury-kitchen.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Luxury overlay */}
      <div className="hero-content">
        <h1 className="hero-title">
          Extraordinary Spaces,<br />
          <span className="block">Elevated Living</span>
        </h1>
        
        <p className="hero-subtitle">
          Where uncompromising craftsmanship meets timeless design
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <Link href="/portfolio" className="btn-primary">
            View Our Portfolio
          </Link>
          
          <Link href="/contact" className="btn-secondary">
            Schedule Consultation
          </Link>
        </div>
        
        {/* Luxury separator */}
        <div className="mt-16 flex flex-col items-center">
          <div className="w-px h-8 bg-white opacity-40 mb-4"></div>
          <button 
            onClick={scrollToServices}
            className="group flex flex-col items-center text-white hover:text-yellow-300 transition-all duration-300"
            aria-label="Scroll to services section"
          >
            <span className="text-sm font-light letter-spacing-wider mb-2 opacity-80">
              DISCOVER MORE
            </span>
            <ChevronDown 
              className="w-5 h-5 animate-bounce group-hover:transform group-hover:scale-110 transition-transform" 
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 