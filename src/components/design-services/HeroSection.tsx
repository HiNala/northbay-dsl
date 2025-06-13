"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-warm-brown-900 text-cream relative overflow-hidden">
      {/* Background texture/pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-brown-800 to-warm-brown-900" />
      </div>
      
      <div className={`max-w-5xl mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-8 leading-tight font-serif"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          KITCHEN & BATH<br />
          <span className="text-accent-gold">DESIGN SERVICES</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 opacity-90 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          We create stunning, functional spaces tailored to your lifestyle. 
          From initial concept to final installation, our comprehensive approach 
          ensures your vision becomes reality.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="group border-2 border-cream bg-transparent px-12 py-4 text-sm tracking-widest hover:bg-cream hover:text-warm-brown-900 transition-all duration-300 min-w-64 text-cream"
          >
            <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
              START YOUR PROJECT
            </span>
          </Button>
          
          <button className="text-sm tracking-widest text-cream/80 hover:text-cream transition-colors duration-300 underline underline-offset-8">
            VIEW OUR PORTFOLIO
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="w-px h-16 bg-cream/30 relative">
          <motion.div 
            className="absolute top-0 w-px h-8 bg-cream"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="text-xs tracking-widest text-cream/60 mt-4">SCROLL</p>
      </motion.div>
    </section>
  );
};

export default HeroSection; 