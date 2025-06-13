"use client";

import { serviceTiers } from '@/data/designServicesData';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ServiceTiers = () => {
  return (
    <section className="min-h-screen py-20 bg-warm-brown-800 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            OUR DESIGN SERVICES
          </motion.h2>
          <motion.p 
            className="text-xl text-cream/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose the service level that best fits your project scope and budget
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {serviceTiers.map((tier, index) => (
            <motion.div 
              key={tier.id}
              className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:transform hover:scale-105 ${
                tier.highlighted 
                  ? 'bg-warm-brown-600/60 border-2 border-accent-gold/50 shadow-2xl' 
                  : 'bg-warm-brown-700/40 border border-cream/10'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-gold text-warm-brown-900 px-6 py-2 rounded-full text-xs font-semibold tracking-widest">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="text-xs tracking-widest text-cream/70 mb-3">
                {tier.option}
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-light mb-4 text-cream font-serif">
                {tier.title}
              </h3>
              
              <div className="text-sm text-cream/80 mb-8 font-medium">
                {tier.subtitle}
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-cream/90 flex items-start">
                    <span className="text-accent-gold mr-3 mt-1 text-xs">●</span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-4 text-sm tracking-widest transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-accent-gold text-warm-brown-900 hover:bg-accent-gold/90'
                    : 'border border-cream/30 text-cream hover:bg-cream hover:text-warm-brown-900 bg-transparent'
                }`}
              >
                GET STARTED
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTiers; 