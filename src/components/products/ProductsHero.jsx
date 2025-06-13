"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ProductsHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Luxury Kitchen Products"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/60 via-charcoal-800/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-left">
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-luxury-gold-400 text-sm tracking-[0.3em] uppercase font-medium mb-6">
            Curated Collections
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-light text-warm-white-50 mb-8 leading-tight">
            Luxury Products for<br />
            <span className="text-luxury-gold-400">Exceptional Spaces</span>
          </h1>
          
          <p className="text-body-large text-warm-white-100/90 max-w-2xl mb-12 font-light leading-relaxed">
            Discover our carefully curated collection of premium kitchen and bathroom products. 
            Each piece selected for its exceptional quality, timeless design, and superior craftsmanship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a 
              href="#categories"
              className="bg-luxury-gold-500 text-charcoal-900 px-10 py-4 text-sm tracking-wide font-semibold hover:bg-luxury-gold-600 transition-all duration-300 text-center"
            >
              EXPLORE COLLECTIONS
            </a>
            
            <a 
              href="/contact"
              className="border-2 border-warm-white-50/30 text-warm-white-50 px-10 py-4 text-sm tracking-wide font-medium hover:bg-warm-white-50 hover:text-charcoal-900 transition-all duration-300 text-center"
            >
              VISIT SHOWROOM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero; 