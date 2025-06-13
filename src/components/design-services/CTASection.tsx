"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const stats = [
    { number: '15+', label: 'YEARS EXPERIENCE' },
    { number: '500+', label: 'PROJECTS COMPLETED' },
    { number: '100%', label: 'SATISFACTION RATE' }
  ];

  return (
    <section className="min-h-screen flex items-center bg-warm-brown-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-transparent" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-light text-cream mb-8 leading-tight font-serif"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          BEGIN YOUR DESIGN<br />
          <span className="text-accent-gold">JOURNEY TODAY</span>
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-cream/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to transform your space? Let's discuss your vision and create 
          something extraordinary together.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg"
            className="bg-accent-gold text-warm-brown-900 px-12 py-5 text-sm tracking-widest hover:bg-accent-gold/90 transition-all duration-300 font-semibold min-w-72 border-0"
          >
            SCHEDULE FREE CONSULTATION
          </Button>
          
          <Button 
            size="lg"
            className="border-2 border-cream/50 text-cream bg-transparent px-12 py-5 text-sm tracking-widest hover:bg-cream hover:text-warm-brown-900 transition-all duration-300 min-w-72"
          >
            CALL (707) 555-0123
          </Button>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-light text-accent-gold mb-2 font-serif group-hover:text-accent-gold/80 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-sm tracking-wide text-cream/70 group-hover:text-cream/90 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional trust indicators */}
        <motion.div 
          className="mt-16 pt-8 border-t border-cream/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-cream/60 tracking-wide">
            Licensed • Insured • Award-Winning Design Team
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 