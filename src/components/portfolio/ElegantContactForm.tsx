"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  // Step 1: Essentials
  name: string;
  email: string;
  phone: string;
  projectType: string;
  
  // Step 2: Project Details
  budget: string;
  timeline: string;
  startDate: string;
  completionDate: string;
  
  // Step 3: Inspiration
  designStyle: string;
  inspirationProjects: string;
  pinterestBoard: string;
  specialRequests: string;
  
  // Step 4: Final Details
  propertyType: string;
  currentStage: string;
  additionalInfo: string;
}

const ElegantContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Essentials
    name: '',
    email: '',
    phone: '',
    projectType: '',
    
    // Step 2: Project Details
    budget: '',
    timeline: '',
    startDate: '',
    completionDate: '',
    
    // Step 3: Inspiration
    designStyle: '',
    inspirationProjects: '',
    pinterestBoard: '',
    specialRequests: '',
    
    // Step 4: Final Details
    propertyType: '',
    currentStage: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: 'The Essentials', description: 'Tell us about yourself' },
    { number: 2, title: 'Project Scope', description: 'Define your project parameters' },
    { number: 3, title: 'Design Inspiration', description: 'Share your vision with us' },
    { number: 4, title: 'Final Details', description: 'Complete your consultation request' }
  ];

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <section className="py-24 bg-warm-white-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-serif text-charcoal-900 mb-8 font-light">
            Book Consultation
          </h2>
          <p className="text-body-large text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Ready to explore our design services? Connect with our team by completing 
            the form below, and we'll guide you towards the best solution for your space.
          </p>
          
          {/* Elegant divider */}
          <div className="w-24 h-px bg-luxury-gold-500 mx-auto mt-12"></div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`flex flex-col items-center transition-all duration-300 ${
                  currentStep >= step.number ? 'text-luxury-gold-600' : 'text-stone-400'
                }`}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium mb-3 border-2 transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-luxury-gold-500 text-white border-luxury-gold-500' 
                      : 'bg-white text-stone-500 border-stone-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </motion.div>
                <div className="text-xs text-center max-w-24">
                  <div className="font-medium mb-1">{step.title}</div>
                  <div className="text-stone-500 leading-tight">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-luxury border border-stone-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: The Essentials */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-serif text-charcoal-900 mb-6">
                    1. The Essentials
                  </h3>
                  <p className="text-charcoal-600 mb-8">
                    Let's start with the basics. We'll use this information to match you with the right design expert.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select Project Type</option>
                      <option value="kitchen">Kitchen Design</option>
                      <option value="bathroom">Bathroom Design</option>
                      <option value="both">Kitchen & Bathroom</option>
                      <option value="full-home">Full Home Design</option>
                      <option value="consultation">Design Consultation</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Scope */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-serif text-charcoal-900 mb-6">
                    2. Project Scope
                  </h3>
                  <p className="text-charcoal-600 mb-8">
                    Help us understand the scale and timeline of your project.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Investment Budget (Approx)
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-200k">$100,000 - $200,000</option>
                      <option value="200k-400k">$200,000 - $400,000</option>
                      <option value="400k+">$400,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Preferred Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6-12months">6-12 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Preferred Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Desired Completion
                    </label>
                    <input
                      type="date"
                      name="completionDate"
                      value={formData.completionDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Design Inspiration */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-serif text-charcoal-900 mb-6">
                    3. Design Inspiration
                  </h3>
                  <p className="text-charcoal-600 mb-8">
                    Share your style preferences and inspiration to help us understand your vision.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                    Preferred Design Style
                  </label>
                  <select
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Design Style</option>
                    <option value="modern">Modern</option>
                    <option value="contemporary">Contemporary</option>
                    <option value="traditional">Traditional</option>
                    <option value="transitional">Transitional</option>
                    <option value="farmhouse">Modern Farmhouse</option>
                    <option value="industrial">Industrial</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="mixed">Mixed/Eclectic</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                    Which Northbay Projects Best Align With Your Vision?
                  </label>
                  <textarea
                    name="inspirationProjects"
                    value={formData.inspirationProjects}
                    onChange={handleInputChange}
                    placeholder="Reference specific projects from our portfolio that resonate with your style..."
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                  />
                  <div className="mt-2 text-sm text-charcoal-500">
                    Don't know the project names? 
                    <span className="text-luxury-gold-600 hover:underline ml-1 cursor-pointer">
                      Browse our portfolio here
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                    Pinterest Board or Inspiration Links
                  </label>
                  <input
                    type="url"
                    name="pinterestBoard"
                    value={formData.pinterestBoard}
                    onChange={handleInputChange}
                    placeholder="https://pinterest.com/your-board or other inspiration links"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                    Special Requirements or Considerations
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Accessibility needs, sustainability preferences, family considerations, etc."
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Final Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-serif text-charcoal-900 mb-6">
                    4. Final Details
                  </h3>
                  <p className="text-charcoal-600 mb-8">
                    Just a few more details to help us prepare for our consultation.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Property Type</option>
                      <option value="single-family">Single Family Home</option>
                      <option value="condo">Condominium</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="estate">Estate Property</option>
                      <option value="vacation">Vacation Home</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                      Current Project Stage
                    </label>
                    <select
                      name="currentStage"
                      value={formData.currentStage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Current Stage</option>
                      <option value="planning">Planning/Dreaming</option>
                      <option value="budgeting">Setting Budget</option>
                      <option value="contractors">Finding Contractors</option>
                      <option value="permits">Obtaining Permits</option>
                      <option value="ready">Ready to Start</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3 tracking-wide uppercase">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Anything else you'd like us to know about your project or preferences?"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-stone-200 mt-12">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 text-sm tracking-wide transition-all duration-200 ${
                currentStep === 1 
                  ? 'text-stone-400 cursor-not-allowed' 
                  : 'text-charcoal-700 hover:text-luxury-gold-600'
              }`}
              whileHover={currentStep > 1 ? { x: -5 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
            >
              ← Previous
            </motion.button>

            <div className="flex space-x-2">
              {steps.map((step) => (
                <div 
                  key={step.number}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentStep >= step.number ? 'bg-luxury-gold-500' : 'bg-stone-300'
                  }`} 
                />
              ))}
            </div>

            {currentStep < 4 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="bg-luxury-gold-500 text-white px-8 py-3 text-sm tracking-wide hover:bg-luxury-gold-600 transition-all duration-300 rounded-lg"
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next →
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="bg-luxury-gold-500 text-white px-8 py-3 text-sm tracking-wide hover:bg-luxury-gold-600 transition-all duration-300 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Inquiry
              </motion.button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ElegantContactForm; 