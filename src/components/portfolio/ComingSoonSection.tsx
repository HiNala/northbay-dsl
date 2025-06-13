"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { comingSoonProjects } from '@/data/portfolioData';

const ComingSoonSection = () => {
  return (
    <section className="py-24 bg-stone-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold-500/20 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-serif text-warm-white-50 mb-8 font-light">
            Coming Soon
          </h2>
          <p className="text-warm-white-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Exciting new projects currently in development. 
            Each representing our commitment to exceptional design and craftsmanship.
          </p>
          
          {/* Elegant divider */}
          <div className="w-24 h-px bg-luxury-gold-400 mx-auto mt-12"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {comingSoonProjects.map((project, index) => (
            <motion.div 
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-80 mb-6 overflow-hidden rounded-xl shadow-luxury">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-charcoal-900/40 group-hover:bg-charcoal-900/20 transition-colors duration-500" />
                
                {/* Expected Completion Badge */}
                <div className="absolute bottom-6 left-6 bg-luxury-gold-500/90 backdrop-blur-sm text-charcoal-900 px-4 py-2 rounded-full text-sm font-medium">
                  {project.expectedCompletion}
                </div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 mx-6">
                    <div className="text-luxury-gold-600 text-sm font-medium tracking-wide uppercase mb-2">
                      Coming Soon
                    </div>
                    <div className="text-charcoal-900 font-serif text-lg">
                      Follow our progress
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-serif text-warm-white-50 group-hover:text-luxury-gold-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-warm-white-100/70 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="group border-2 border-warm-white-50/30 text-warm-white-50 px-8 py-4 text-sm tracking-wide hover:bg-warm-white-50 hover:text-stone-600 transition-all duration-300 rounded-lg">
            <span className="flex items-center space-x-2">
              <span>VIEW ALL UPDATES</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonSection; 