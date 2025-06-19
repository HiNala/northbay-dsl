"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ArrowRight } from 'lucide-react';

const MaterialExperience = () => {
  const [activeCategory, setActiveCategory] = useState('showroom');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const featuredExperience = {
    title: 'Immersive Showroom Experience',
    subtitle: 'Touch, Feel, Discover',
    description: 'Step into our world-class showroom where every material tells a story of quality and craftsmanship. Experience textures, colors, and finishes in person with personalized guidance from our design experts.',
    image: '/website_images/Design Services/Showroom_InKitchenDisplay (1).JPG',
    stats: [
      { value: '500+', label: 'Premium Materials' },
      { value: '25+', label: 'Years of Expertise' },
      { value: '100%', label: 'Luxury Brands' }
    ]
  };

  const materialCategories = [
    {
      id: 'showroom',
      title: 'Showroom Experience',
      description: 'Full-scale kitchen and bathroom displays',
      image: '/website_images/Design Services/Showroom_BathroomPlanning (2).JPG',
      features: ['Live Displays', 'Expert Consultation', 'Material Library']
    },
    {
      id: 'consultation',
      title: 'Design Consultation',
      description: 'One-on-one design planning sessions',
      image: '/website_images/Design Services/Photo Jun 16 2025, 1 39 36 PM.jpg',
      features: ['Personal Designer', 'Custom Solutions', 'Project Planning']
    },
    {
      id: 'materials',
      title: 'Premium Materials',
      description: 'Curated selection of luxury finishes',
      image: '/website_images/Design Services/Design Services Website (1).jpeg',
      features: ['Natural Stone', 'Custom Cabinetry', 'Designer Hardware']
    },
    {
      id: 'process',
      title: 'Design Process',
      description: 'Comprehensive design development',
      image: '/website_images/Design Services/Design Services Website (3).jpeg',
      features: ['3D Visualization', 'Material Boards', 'Technical Drawings']
    }
  ];

  const galleryImages = [
    {
      src: '/website_images/Design Services/Design Services Website (4).jpeg',
      title: 'Luxury Fixtures',
      category: 'Hardware & Fixtures'
    },
    {
      src: '/website_images/Design Services/Design Services Website (5).jpeg',
      title: 'Custom Solutions',
      category: 'Bespoke Design'
    },
    {
      src: '/website_images/Design Services/Design Services Website (6).jpeg',
      title: 'Material Selection',
      category: 'Premium Finishes'
    },
    {
      src: '/website_images/Design Services/Brochures (3).JPG',
      title: 'Design Planning',
      category: 'Project Development'
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 bg-gradient-to-br from-warm-white-50 to-stone-100 relative overflow-hidden"
    >
      {/* Luxury background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,175,121,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(217,175,121,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-luxury-gold-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-luxury-gold-400/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-luxury-gold-600 text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Material Experience
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-charcoal-900 mb-8 font-serif tracking-tight">
            Touch, Feel, <span className="text-luxury-gold-600 italic">Visualize</span>
          </h2>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            Experience our comprehensive showroom where every material tells a story of quality and craftsmanship. 
            From concept to creation, discover the finest selections for your dream space.
          </p>
        </motion.div>

        {/* Featured Experience Hero */}
        <motion.div 
          className="mb-28"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Featured Image */}
            <div className="relative h-[400px] lg:h-[560px] rounded-2xl overflow-hidden group">
              <Image
                src={featuredExperience.image}
                alt={featuredExperience.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-900/40 via-transparent to-luxury-gold-500/10" />
              
              {/* Floating stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-md border border-luxury-gold-200/20 shadow-xl rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 divide-x divide-stone-200">
                    {featuredExperience.stats.map((stat, index) => (
                      <div key={index} className="py-5 px-4 text-center">
                        <div className="text-xl font-light text-luxury-gold-600 mb-1">{stat.value}</div>
                        <div className="text-xs text-charcoal-600 tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-luxury-gold-600 text-sm tracking-wide uppercase font-medium mb-4">
                {featuredExperience.subtitle}
              </div>
              <h3 className="text-3xl lg:text-4xl font-light text-charcoal-900 mb-6 font-serif tracking-tight">
                {featuredExperience.title}
              </h3>
              <p className="text-lg text-charcoal-600 leading-relaxed mb-10">
                {featuredExperience.description}
              </p>
              <Button 
                size="lg"
                className="bg-luxury-gold-600 hover:bg-luxury-gold-700 text-white px-8 py-6 text-sm tracking-wide font-medium transition-all duration-300 border-0 rounded-md h-auto group"
              >
                SCHEDULE SHOWROOM VISIT
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Categories Grid */}
        <motion.div 
          className="mb-28"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl lg:text-3xl font-light text-charcoal-900 mb-4 font-serif tracking-tight">
              Explore Our Design Services
            </h3>
            <div className="w-20 h-px bg-luxury-gold-400/50 mx-auto mb-4"></div>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Discover the comprehensive design journey we offer to bring your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {materialCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={fadeInUpVariants}
                custom={index}
                className={`cursor-pointer transition-all duration-500 ${
                  activeCategory === category.id ? 'opacity-100' : 'opacity-80 hover:opacity-95'
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ y: -8 }}
              >
                <div className={`h-full border-0 bg-transparent overflow-hidden rounded-xl ${
                  activeCategory === category.id ? 'ring-1 ring-luxury-gold-400/50' : ''
                }`}>
                  <div className="relative h-64 overflow-hidden rounded-xl">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      loading="lazy"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/30 to-transparent" />
                    
                    {/* Category overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-medium text-lg mb-1">{category.title}</h4>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="p-5 bg-white border-t border-stone-200/30 rounded-b-xl">
                    <div className="space-y-3">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-charcoal-600">
                          <div className="w-1.5 h-1.5 bg-luxury-gold-500 rounded-full mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl lg:text-3xl font-light text-charcoal-900 mb-4 font-serif tracking-tight">
              Curated Material Gallery
            </h3>
            <div className="w-20 h-px bg-luxury-gold-400/50 mx-auto mb-4"></div>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Explore our carefully selected materials and finishes that define luxury living
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {galleryImages.map((item, index) => (
              <motion.div
                key={index}
                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className={`object-cover transition-all duration-1000 ${
                    hoveredImage === index ? 'scale-110 blur-[2px]' : 'scale-100'
                  }`}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  loading="lazy"
                  quality={90}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent transition-opacity duration-500 ${
                  hoveredImage === index ? 'opacity-100' : 'opacity-0'
                }`} />
                
                {/* Hover content */}
                <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                  hoveredImage === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-luxury-gold-400 text-xs tracking-wide uppercase mb-1">
                    {item.category}
                  </div>
                  <h4 className="text-white font-medium text-lg mb-4">{item.title}</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-fit border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-luxury-gold-600 text-luxury-gold-600 px-12 py-6 text-sm tracking-wide font-medium hover:bg-luxury-gold-600 hover:text-white transition-all duration-300 bg-transparent h-auto rounded-md group"
            >
              VISIT OUR SHOWROOM
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialExperience; 