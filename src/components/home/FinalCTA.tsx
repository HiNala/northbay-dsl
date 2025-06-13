"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury Interior"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-charcoal-900/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-luxury-gold-400 text-sm tracking-[0.3em] uppercase font-medium mb-6">
              Begin Your Journey
            </div>
            
            <h2 className="text-display text-warm-white-50 mb-8 font-light font-serif">
              Ready to Transform<br />
              <span className="text-luxury-gold-400">Your Space?</span>
            </h2>
            
            <p className="text-body-large text-warm-white-100/90 mb-12 leading-relaxed">
              Schedule a complimentary consultation to discuss your vision and discover 
              how we can bring your dream space to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-luxury-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-warm-white-50 font-medium">(707) 555-0123</div>
                  <div className="text-warm-white-100/60 text-sm">Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-luxury-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-warm-white-50 font-medium">Napa Valley Showroom</div>
                  <div className="text-warm-white-100/60 text-sm">1234 Main Street, Napa, CA 94559</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-subheading text-warm-white-50 mb-6 font-light font-serif">
              Schedule Your Consultation
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-warm-white-50 placeholder-warm-white-100/60 focus:outline-none focus:border-luxury-gold-400 transition-colors duration-200"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-warm-white-50 placeholder-warm-white-100/60 focus:outline-none focus:border-luxury-gold-400 transition-colors duration-200"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-warm-white-50 placeholder-warm-white-100/60 focus:outline-none focus:border-luxury-gold-400 transition-colors duration-200"
                />
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-warm-white-50 focus:outline-none focus:border-luxury-gold-400 transition-colors duration-200"
                >
                  <option value="" className="text-charcoal-900">Project Type</option>
                  <option value="kitchen" className="text-charcoal-900">Kitchen Design</option>
                  <option value="bathroom" className="text-charcoal-900">Bathroom Design</option>
                  <option value="both" className="text-charcoal-900">Kitchen & Bathroom</option>
                  <option value="consultation" className="text-charcoal-900">Design Consultation</option>
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-warm-white-50 placeholder-warm-white-100/60 focus:outline-none focus:border-luxury-gold-400 transition-colors duration-200 resize-none"
              />

              <Button
                type="submit"
                className="w-full bg-luxury-gold-500 text-charcoal-900 py-4 text-sm tracking-wide font-semibold hover:bg-luxury-gold-600 transition-all duration-300 transform hover:scale-105 rounded-lg border-0"
              >
                SCHEDULE FREE CONSULTATION
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA; 