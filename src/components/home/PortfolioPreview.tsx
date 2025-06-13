"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PortfolioPreview = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "Pacific Heights Penthouse",
      category: "Kitchen & Bath Renovation",
      description: "A stunning transformation featuring custom millwork, premium finishes, and breathtaking city views.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { sqft: "2,500", timeline: "8 months", budget: "$180K" }
    },
    {
      title: "Napa Valley Estate", 
      category: "Full Home Design",
      description: "Luxury estate featuring wine country elegance with modern sophistication throughout.",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { sqft: "5,000", timeline: "12 months", budget: "$400K" }
    },
    {
      title: "Sonoma Retreat",
      category: "Master Suite Design", 
      description: "A serene master suite transformation creating the ultimate private sanctuary.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { sqft: "800", timeline: "4 months", budget: "$85K" }
    }
  ];

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-luxury-gold-600 text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Featured Work
          </div>
          <h2 className="text-display text-charcoal-900 mb-6 font-light font-serif">
            Recent <span className="text-luxury-gold-600">Transformations</span>
          </h2>
          <p className="text-body-large text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            Each project tells a unique story of transformation, crafted with meticulous attention 
            to detail and an unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Project Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Project Image */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden group">
              <Image
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
              
              {/* Project Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-charcoal-900">
                        {projects[activeProject].stats.sqft}
                      </div>
                      <div className="text-xs text-charcoal-600 uppercase tracking-wide">
                        Square Feet
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-charcoal-900">
                        {projects[activeProject].stats.timeline}
                      </div>
                      <div className="text-xs text-charcoal-600 uppercase tracking-wide">
                        Timeline
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-charcoal-900">
                        {projects[activeProject].stats.budget}
                      </div>
                      <div className="text-xs text-charcoal-600 uppercase tracking-wide">
                        Investment
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Navigation */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer transition-all duration-500 ${
                    activeProject === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                  }`}
                  onClick={() => setActiveProject(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`p-8 rounded-2xl transition-all duration-500 ${
                    activeProject === index 
                      ? 'bg-luxury-gold-50 border border-luxury-gold-200 transform scale-105' 
                      : 'bg-white border border-stone-200 hover:border-luxury-gold-200'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-subheading text-charcoal-900 font-light mb-2 font-serif">
                          {project.title}
                        </h3>
                        <div className="text-luxury-gold-600 text-sm tracking-wide font-medium">
                          {project.category}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeProject === index ? 'bg-luxury-gold-500 ring-4 ring-luxury-gold-200' : 'bg-stone-300'
                      }`} />
                    </div>
                    
                    <p className="text-charcoal-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button 
                variant="outline"
                className="border-2 border-luxury-gold-500 text-luxury-gold-600 px-8 py-3 text-sm tracking-wide font-medium hover:bg-luxury-gold-500 hover:text-white transition-all duration-300 bg-transparent"
              >
                VIEW FULL PORTFOLIO
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview; 