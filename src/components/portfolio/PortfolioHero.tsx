"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';


const PortfolioHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-36 pb-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Breadcrumb */}
          <div className="w-full mb-16 flex items-center text-sm text-muted-foreground">
            <span className="hover:text-foreground transition-colors duration-200 cursor-pointer">
              Home
            </span>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-foreground font-medium">Portfolio</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-8 tracking-tight text-center font-serif">
            Our Portfolio
          </h1>
          
          <div className="w-16 h-px bg-primary/30 my-8"></div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center font-light">
            A curated collection of our most celebrated transformations, 
            each telling a unique story of luxury, craftsmanship, and timeless design.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioHero; 