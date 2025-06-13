"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury Kitchen Design"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/70 via-charcoal-800/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-left">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="text-luxury-gold-400 text-sm tracking-[0.3em] uppercase font-medium mb-6">
              Napa Valley's Premier Design Studio
            </div>
            
            <h1 className="text-hero font-light text-warm-white-50 mb-8 leading-none font-serif">
              Luxury Kitchens<br />
              & <span className="text-luxury-gold-400">Bathrooms</span>
            </h1>
            
            <p className="text-body-large text-warm-white-100/90 max-w-2xl mb-12 font-light leading-relaxed">
              We create extraordinary spaces that blend timeless elegance with modern sophistication. 
              From concept to completion, every detail reflects your unique lifestyle and vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg"
                className="group bg-luxury-gold-500 text-charcoal-900 px-10 py-4 text-sm tracking-wide font-semibold hover:bg-luxury-gold-600 transition-all duration-300 transform hover:scale-105 border-0"
              >
                <span className="flex items-center justify-center">
                  START YOUR PROJECT
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-warm-white-50/30 text-warm-white-50 px-10 py-4 text-sm tracking-wide font-medium hover:bg-warm-white-50 hover:text-charcoal-900 transition-all duration-300 bg-transparent"
              >
                VIEW PORTFOLIO
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-warm-white-50/20 relative">
            <div className="absolute top-0 w-px h-8 bg-warm-white-50 animate-pulse" />
          </div>
        </motion.div>
        <div className="text-xs tracking-[0.2em] text-warm-white-50/60 mt-4 uppercase text-center">
          Scroll
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 