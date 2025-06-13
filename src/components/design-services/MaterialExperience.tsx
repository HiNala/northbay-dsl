"use client";

import { materialImages } from '@/data/designServicesData';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const MaterialExperience = () => {
  return (
    <section className="min-h-screen flex items-center bg-warm-brown-700 py-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-8 font-serif"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            MATERIAL EXPERIENCE
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-cream/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Touch, feel, and visualize your selections in our comprehensive showroom. 
            Every material tells a story of quality and craftsmanship.
          </motion.p>
        </div>
        
        {/* Material grid - responsive masonry layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {materialImages.map((image, index) => {
            const heights = ['h-72', 'h-56', 'h-48', 'h-64'];
            const height = heights[index % heights.length];
            
            return (
              <motion.div 
                key={index}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${height}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={image.src} 
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-sm font-medium tracking-wide">{image.alt}</p>
                </div>
                
                {/* Overlay effect on hover */}
                <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/10 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg"
            className="border-2 border-cream bg-transparent px-12 py-4 text-sm tracking-widest text-cream hover:bg-cream hover:text-warm-brown-700 transition-all duration-300"
          >
            VISIT OUR SHOWROOM
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialExperience; 