"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero background images
  const heroImages = [
    {
      src: '/website_images/Home Images/LakeHouse _QSWO-Cashew-Putty_01.jpg',
      alt: 'Luxury Kitchen Design - Lake House'
    },
    {
      src: '/website_images/Home Images/Peacock09.jpg',
      alt: 'Modern Kitchen Design - Peacock Project'
    },
    {
      src: '/website_images/Home Images/photos47.jpg',
      alt: 'Contemporary Kitchen Design'
    },
    {
      src: '/website_images/Home Images/Petaluma Bath8.jpg',
      alt: 'Luxury Bathroom Design - Petaluma'
    },
    {
      src: '/website_images/Home Images/GaleForce&HickoryKitchen (2)-FULL-OVERLAY.jpg',
      alt: 'Premium Kitchen Design - Gale Force'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-advance slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].alt}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/75 via-charcoal-800/50 to-transparent" />
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

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-luxury-gold-400 scale-125' 
                  : 'bg-warm-white-50/30 hover:bg-warm-white-50/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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