"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, years: 0, satisfaction: 0, awards: 0 });
  const sectionRef = useRef(null);

  const finalStats = {
    projects: 500,
    years: 15,
    satisfaction: 98,
    awards: 50
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start counting animation
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setCounts({
        projects: Math.round(finalStats.projects * easeOut),
        years: Math.round(finalStats.years * easeOut),
        satisfaction: Math.round(finalStats.satisfaction * easeOut),
        awards: Math.round(finalStats.awards * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(finalStats);
      }
    }, stepDuration);
  };

  const stats = [
    { 
      icon: '🏡',
      number: counts.projects, 
      suffix: '+', 
      label: 'Projects Completed',
      description: 'Luxury transformations across Napa Valley'
    },
    { 
      icon: '⭐',
      number: counts.years, 
      suffix: '+', 
      label: 'Years Experience',
      description: 'Decades of design excellence'
    },
    { 
      icon: '💯',
      number: counts.satisfaction, 
      suffix: '%', 
      label: 'Client Satisfaction',
      description: 'Exceeding expectations consistently'
    },
    { 
      icon: '🏆',
      number: counts.awards, 
      suffix: '+', 
      label: 'Design Awards',
      description: 'Recognition for exceptional work'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-charcoal-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-luxury-gold-400 text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Trusted Excellence
          </div>
          <h2 className="text-display text-warm-white-50 mb-6 font-light font-serif">
            Napa Valley's<br />
            <span className="text-luxury-gold-400">Premier Choice</span>
          </h2>
          <p className="text-body-large text-warm-white-100/80 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that comes with over 15 years of luxury design expertise 
            and unwavering commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-5xl lg:text-6xl font-light text-luxury-gold-400 mb-2 font-serif">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-sm tracking-wide text-warm-white-100/70 uppercase font-medium mb-2">
                {stat.label}
              </div>
              <div className="text-xs text-warm-white-100/50 leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 