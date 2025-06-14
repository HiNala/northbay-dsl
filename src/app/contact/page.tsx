"use client";

import EnhancedHeader from '@/components/layout/EnhancedHeader';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  MessageCircle,
  Home,
  User,
  Send,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { useState } from 'react';

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Showroom",
    content: [
      "1234 Main Street",
      "Napa, CA 94559"
    ],
    action: "Get Directions"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: [
      "(707) 555-0123",
      "Mon-Fri: 9am-6pm"
    ],
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    content: [
      "hello@northbaykitchenbath.com",
      "We respond within 24 hours"
    ],
    action: "Send Email"
  },
  {
    icon: Calendar,
    title: "Schedule Consultation",
    content: [
      "Free in-home consultation",
      "Available 7 days a week"
    ],
    action: "Book Now"
  }
];

const services = [
  "Kitchen Design & Remodeling",
  "Bathroom Design & Renovation", 
  "Custom Cabinetry",
  "Countertop Installation",
  "Fixture & Hardware Selection",
  "Space Planning & Layout",
  "Project Management",
  "Design Consultation"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <EnhancedHeader />

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 bg-gradient-to-b from-muted to-background text-foreground overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <MessageCircle className="w-4 h-4 mr-3 text-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">
                Let's Create Together
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl mb-6 font-serif font-light text-foreground">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Ready to transform your space? We'd love to hear about your project and discuss how 
              we can bring your vision to life with exceptional design and craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              How to Reach Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Multiple ways to connect with our design team and start your project.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-xl p-8 shadow-sm border border-border text-center hover:shadow-md transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <info.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl text-foreground mb-4 font-serif font-medium">
                  {info.title}
                </h3>
                
                <div className="space-y-2 mb-6">
                  {info.content.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>

                <button className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300">
                  {info.action}
                  <ChevronRight className="ml-2 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Services */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-20">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl text-foreground mb-6 font-serif font-light">
                  Start Your Project
                </h2>
                <div className="w-24 h-1 bg-primary mb-8" />
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Tell us about your project and we'll schedule a free consultation to discuss your vision, 
                  timeline, and budget. Our team will provide personalized recommendations tailored to your needs.
                </p>

                {isSubmitted ? (
                  <motion.div 
                    className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl text-green-800 mb-2 font-serif font-medium">
                      Thank You!
                    </h3>
                    <p className="text-green-700">
                      We've received your message and will get back to you within 24 hours to schedule your consultation.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-foreground font-medium mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-foreground font-medium mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label className="block text-foreground font-medium mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      {/* Service */}
                      <div>
                        <label className="block text-foreground font-medium mb-2">
                          Service Interested In *
                        </label>
                        <div className="relative">
                          <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <select
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-300 appearance-none"
                          >
                            <option value="">Select a service</option>
                            <option value="kitchen">Kitchen Design & Remodeling</option>
                            <option value="bathroom">Bathroom Design & Renovation</option>
                            <option value="both">Kitchen & Bathroom</option>
                            <option value="consultation">Design Consultation</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-foreground font-medium mb-2">
                        Project Timeline
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-300 appearance-none"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Start immediately</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6months+">6+ months</option>
                          <option value="planning">Just planning</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-foreground font-medium mb-2">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-300 resize-none"
                        placeholder="Tell us about your project goals, style preferences, budget range, and any specific requirements..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-3" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-3 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Services List */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl text-foreground mb-6 font-serif font-light">
                  Our Services
                </h3>
                <div className="w-16 h-1 bg-primary mb-8" />
                
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center p-4 bg-card rounded-lg border border-border hover:shadow-sm transition-shadow duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{service}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Info Summary */}
                <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <h4 className="text-xl text-foreground mb-4 font-serif font-medium">
                    Prefer to Talk?
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-primary mr-3" />
                      <span className="text-muted-foreground">(707) 555-0123</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-primary mr-3" />
                      <span className="text-muted-foreground text-sm">hello@northbaykitchenbath.com</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-primary mr-3" />
                      <span className="text-muted-foreground text-sm">Mon-Fri: 9am-6pm</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Location/Map */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              Visit Our Showroom
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Located in the heart of Napa Valley, our showroom features curated displays of premium 
              fixtures, finishes, and design inspiration.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Map Placeholder */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">Interactive Map</p>
                  <p className="text-muted-foreground text-sm mt-2">1234 Main Street, Napa, CA</p>
                </div>
              </div>
            </motion.div>

            {/* Location Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl text-foreground mb-6 font-serif font-light">
                Showroom Details
              </h3>
              <div className="w-16 h-1 bg-primary mb-8" />
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-foreground font-medium mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      1234 Main Street<br />
                      Napa, CA 94559
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-foreground font-medium mb-1">Hours</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9:00am - 6:00pm</p>
                      <p>Saturday: 10:00am - 4:00pm</p>
                      <p>Sunday: By appointment only</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Home className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-foreground font-medium mb-1">Parking</h4>
                    <p className="text-muted-foreground">
                      Free parking available in our private lot. Wheelchair accessible entrance on Main Street.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Appointment recommended</strong> - While walk-ins are welcome, 
                  scheduling ensures dedicated time with our design team.
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-300">
                  Schedule Visit
                  <Calendar className="ml-2 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 