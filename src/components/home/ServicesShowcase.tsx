"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      title: "Kitchen Design",
      subtitle: "Culinary Sanctuaries",
      description: "Transform your kitchen into a sophisticated culinary sanctuary where form meets function in perfect harmony.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Custom Cabinetry", "Premium Appliances", "Stone Countertops"]
    },
    {
      title: "Bathroom Design", 
      subtitle: "Spa-Like Retreats",
      description: "Create a luxurious bathroom retreat that serves as your personal spa sanctuary for daily rejuvenation.",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Walk-in Showers", "Freestanding Tubs", "Heated Floors"]
    },
    {
      title: "Design Consultation",
      subtitle: "Expert Guidance", 
      description: "Comprehensive design consultation to bring your vision to life with expert guidance and attention to detail.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["3D Visualization", "Material Selection", "Project Planning"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-warm-white-50">
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
            Our Expertise
          </div>
          <h2 className="text-display text-charcoal-900 mb-6 font-light font-serif">
            Transforming Spaces,<br />
            <span className="text-luxury-gold-600">Elevating Lives</span>
          </h2>
          <p className="text-body-large text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            Every project begins with understanding your lifestyle, preferences, and dreams. 
            We craft spaces that reflect your personality while enhancing your daily experience.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Service Navigation */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer transition-all duration-500 ${
                  activeService === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`}
                onClick={() => setActiveService(index)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: activeService === index ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`p-8 rounded-2xl transition-all duration-500 ${
                  activeService === index 
                    ? 'bg-luxury-gold-50 border border-luxury-gold-200' 
                    : 'bg-white border border-stone-200 hover:border-luxury-gold-200'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-headline text-charcoal-900 font-light mb-2 font-serif">
                        {service.title}
                      </h3>
                      <div className="text-luxury-gold-600 text-sm tracking-wide font-medium">
                        {service.subtitle}
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeService === index ? 'bg-luxury-gold-500' : 'bg-stone-300'
                    }`} />
                  </div>
                  
                  <p className="text-charcoal-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="text-xs tracking-wide text-charcoal-700 bg-stone-100 px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Service Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden group">
              <Image
                src={services[activeService].image}
                alt={services[activeService].title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent" />
              
              {/* Service title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-charcoal-900 mb-2 font-serif">
                    {services[activeService].title}
                  </h4>
                  <p className="text-charcoal-600 text-sm">
                    {services[activeService].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase; 