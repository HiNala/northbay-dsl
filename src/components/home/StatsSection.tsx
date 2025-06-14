"use client";

import React, { useState, useEffect } from "react";

const stats = [
  {
    number: 500,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful transformations across Napa Valley"
  },
  {
    number: 15,
    suffix: "+",
    label: "Years Experience",
    description: "Decades of design excellence and craftsmanship"
  },
  {
    number: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Consistently exceeding expectations"
  },
  {
    number: 25,
    suffix: "+",
    label: "Design Awards",
    description: "Recognition for outstanding design work"
  }
];

// Custom hook for counting animation
function useCountAnimation(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, startAnimation: () => setHasStarted(true) };
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id="stats-section" className="luxury-section-alt">
      <div className="luxury-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif mb-6">
            Excellence in Numbers
          </h2>
          <p className="lead-text max-w-3xl mx-auto">
            Our commitment to quality and client satisfaction is reflected in every project we complete.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { count, startAnimation } = useCountAnimation(stat.number);
            
            // Start animation when section becomes visible
            useEffect(() => {
              if (isVisible) {
                const timer = setTimeout(() => startAnimation(), index * 200);
                return () => clearTimeout(timer);
              }
            }, [isVisible, index, startAnimation]);

            return (
              <div key={index} className="text-center group">
                {/* Large number display */}
                <div className="mb-4">
                  <span className="stat-number">
                    {isVisible ? count : 0}{stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="stat-label mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sophisticated-gray text-sm leading-relaxed max-w-xs mx-auto">
                  {stat.description}
                </p>

                {/* Decorative element */}
                <div className="w-12 h-px bg-refined-gold/30 mx-auto mt-6 group-hover:bg-refined-gold transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-subtle-border">
          <p className="text-sophisticated-gray mb-6">
            Ready to join our growing list of satisfied clients?
          </p>
          <a 
            href="/contact" 
            className="btn-secondary"
          >
            Start Your Project Today
          </a>
        </div>
      </div>
    </section>
  );
} 