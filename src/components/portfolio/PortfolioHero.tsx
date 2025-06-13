"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PortfolioHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-32 pb-16 bg-warm-white-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Breadcrumb */}
          <div className="text-stone-500 text-sm tracking-[0.2em] uppercase mb-8">
            <span className="hover:text-luxury-gold-600 transition-colors duration-200 cursor-pointer">Home</span>
            <span className="mx-3">•</span>
            <span className="text-charcoal-700">Portfolio</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-light text-charcoal-900 mb-8 font-serif">
            Portfolio
          </h1>
          
          <p className="text-body-large text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            A curated collection of our most celebrated transformations, 
            each telling a unique story of luxury, craftsmanship, and timeless design.
          </p>
          
          {/* Elegant divider */}
          <div className="w-24 h-px bg-luxury-gold-500 mx-auto mt-12"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioHero; 