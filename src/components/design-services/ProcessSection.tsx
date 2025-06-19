"use client";

import { processSteps } from '@/data/designServicesData';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ProcessSection = () => {
  return (
    <section className="bg-warm-brown-600 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-8 font-serif"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            OUR PROCESS
          </motion.h2>
          <motion.p 
            className="text-xl text-cream/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From concept to completion, we guide you through every step of your transformation
          </motion.p>
        </div>
        
        <div className="space-y-20">
          {processSteps.map((step, index) => (
            <motion.div 
              key={step.id} 
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-1 lg:max-w-lg">
                <motion.div 
                  className="text-6xl lg:text-7xl font-light text-cream/20 mb-6 leading-none font-serif"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {String(step.id).padStart(2, '0')}
                </motion.div>
                
                <motion.h3 
                  className="text-2xl lg:text-3xl font-light text-cream mb-6 font-serif"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="text-cream/80 leading-relaxed text-lg mb-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
                
                {index === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      className="border border-cream/50 bg-transparent px-8 py-3 text-sm tracking-widest text-cream hover:bg-cream hover:text-warm-brown-600 transition-all duration-300"
                    >
                      SCHEDULE CONSULTATION
                    </Button>
                  </motion.div>
                )}
              </div>
              
              <motion.div 
                className="flex-1 relative w-full max-w-lg"
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden group">
                  <Image
                    src={step.image} 
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-brown-900/20 to-transparent" />
                  
                  {/* Subtle overlay effect */}
                  <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/5 transition-all duration-500" />
                  
                  {/* Step number overlay */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-cream/90 rounded-full flex items-center justify-center">
                    <span className="text-warm-brown-900 font-bold text-lg">{step.id}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 