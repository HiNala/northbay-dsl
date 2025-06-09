"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { SectionSeparator } from "@/components/ui/section-separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Calendar,
  MessageSquare,
  CheckCircle,
  Send,
  ArrowRight,
  Home,
  Award,
  Star
} from "lucide-react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceType: string;
  budget: string;
  timeline: string;
}

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our design team",
    primary: "(707) 555-0123",
    secondary: "Mon-Fri: 9am-6pm",
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us your project details",
    primary: "hello@northbaykb.com",
    secondary: "Response within 24 hours",
    action: "Send Email"
  },
  {
    icon: Calendar,
    title: "Schedule Consultation",
    description: "Book a free design consultation",
    primary: "Free 60-minute session",
    secondary: "In-home or virtual",
    action: "Book Now"
  },
  {
    icon: MapPin,
    title: "Visit Showroom",
    description: "See our luxury collections in person",
    primary: "Napa Valley Location",
    secondary: "By appointment preferred",
    action: "Get Directions"
  }
];

const faqs = [
  {
    question: "What is included in a design consultation?",
    answer: "Our consultation includes a thorough assessment of your space, discussion of your style preferences and budget, initial design recommendations, and a detailed proposal for your project."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope, but most kitchen renovations take 8-12 weeks from start to finish, while bathroom projects typically take 6-8 weeks."
  },
  {
    question: "Do you work with my existing contractor?",
    answer: "Yes, we can work with your preferred contractor or recommend trusted professionals from our network of vetted craftspeople and installers."
  },
  {
    question: "What is your design fee structure?",
    answer: "Our design fees vary based on project scope. Consultations start at $500, with full design services typically ranging from $5,000-$15,000 depending on complexity."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
    budget: "",
    timeline: ""
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navigation />
        
        <section className="pt-32 pb-20">
          <div className={cn(SPACING.container.default)}>
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
                Thank You!
              </h1>
              
              <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-600 mb-8 leading-relaxed")}>
                We've received your message and will get back to you within 24 hours. 
                In the meantime, feel free to explore our portfolio or schedule a showroom visit.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = "/portfolio"}
                  className={cn(
                    "px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-colors",
                    TYPOGRAPHY.button
                  )}
                >
                  View Portfolio
                </button>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className={cn(
                    "px-8 py-3 border-2 border-gold-600 text-gold-600 hover:bg-gold-50 rounded-md font-medium transition-colors",
                    TYPOGRAPHY.button
                  )}
                >
                  Send Another Message
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-navy-900 to-navy-800 text-white overflow-hidden">

        <div className={cn(SPACING.container.default, "relative z-10")}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <MessageSquare className="w-4 h-4 mr-3" />
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                Let's Start the Conversation
              </span>
            </div>

            <h1 className={cn(TYPOGRAPHY.heading, "text-5xl md:text-6xl mb-6 font-serif")}>
              Get in Touch
            </h1>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-200 leading-relaxed max-w-3xl mx-auto")}>
              Ready to transform your space? We'd love to hear about your project and help bring your vision to life. 
              Contact us today to schedule your complimentary design consultation.
            </p>
          </div>
        </div>
      </section>

      <SectionSeparator variant="default" />

      {/* Contact Methods */}
      <section className={cn(PATTERNS.section.spacious, SPACING.container.default)}>
        <div className="text-center mb-20">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
            How Can We Help?
          </h2>
          <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed")}>
            Choose the method that works best for you. We're here to answer questions and discuss your project needs.
          </p>
          <div className="w-24 h-1 bg-gold-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gold-100 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-6 group-hover:bg-gold-200 transition-colors">
                <method.icon className="w-8 h-8 text-gold-600" />
              </div>
              
              <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 mb-2 font-serif")}>
                {method.title}
              </h3>
              
              <p className={cn(TYPOGRAPHY.body, "text-gray-600 mb-4")}>
                {method.description}
              </p>
              
              <div className="mb-4">
                <div className={cn(TYPOGRAPHY.body, "font-semibold text-navy-700")}>
                  {method.primary}
                </div>
                <div className={cn(TYPOGRAPHY.caption, "text-gray-500")}>
                  {method.secondary}
                </div>
              </div>
              
              <button className={cn(
                "w-full py-2 border-2 border-gold-600 text-gold-600 hover:bg-gold-50 rounded-md font-medium transition-colors text-sm",
                TYPOGRAPHY.button
              )}>
                {method.action}
              </button>
            </div>
          ))}
        </div>
      </section>

      <SectionSeparator variant="dots" />

      {/* Contact Form & Info */}
      <section className={cn(PATTERNS.section.luxury, SPACING.container.default)}>
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div>
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
              Send Us a Message
            </h2>
            <p className={cn(TYPOGRAPHY.body, "text-gray-600 mb-8")}>
              Fill out the form below and we'll get back to you within 24 hours with answers to your questions 
              and next steps for your project.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                  What type of project are you planning?
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange("serviceType", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="kitchen-remodel">Kitchen Remodel</option>
                  <option value="bathroom-renovation">Bathroom Renovation</option>
                  <option value="whole-home-design">Whole Home Design</option>
                  <option value="consultation-only">Design Consultation Only</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  >
                    <option value="">Select budget</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $200,000">$100,000 - $200,000</option>
                    <option value="$200,000+">$200,000+</option>
                  </select>
                </div>
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description of your inquiry"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                  Tell us about your project *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Share your vision, any specific requirements, or questions you have..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center px-8 py-4 bg-gold-600 hover:bg-gold-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none",
                  TYPOGRAPHY.button
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
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
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Office Info */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gold-100">
              <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-6 font-serif")}>
                Visit Our Showroom
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gold-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className={cn(TYPOGRAPHY.body, "font-semibold text-navy-700")}>
                      North Bay Kitchen & Bath
                    </div>
                    <div className={cn(TYPOGRAPHY.body, "text-gray-600")}>
                      1234 Main Street<br />
                      Napa, CA 94559
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gold-600 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-navy-700")}>
                    (707) 555-0123
                  </span>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gold-600 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-navy-700")}>
                    hello@northbaykb.com
                  </span>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gold-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className={cn(TYPOGRAPHY.body, "text-navy-700")}>
                      Monday - Friday: 9:00am - 6:00pm<br />
                      Saturday: 10:00am - 4:00pm<br />
                      Sunday: By appointment only
                    </div>
                  </div>
                </div>
              </div>

              <button className={cn(
                "w-full py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-colors",
                TYPOGRAPHY.button
              )}>
                Get Directions
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gold-100">
              <div className="aspect-video bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-500 font-medium">Interactive Map</p>
                  <p className="text-gray-400 text-sm">Located in the heart of Napa Valley</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-navy-900 rounded-xl p-8 text-white">
              <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-white mb-6 font-serif")}>
                Why Choose North Bay?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-gray-200")}>
                    Award-winning design team
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-gray-200")}>
                    98% client satisfaction rate
                  </span>
                </div>
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-gray-200")}>
                    500+ projects completed
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-gray-200")}>
                    1-year warranty on all work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.narrow)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Frequently Asked Questions
          </h2>
          <p className={cn(TYPOGRAPHY.body, "text-xl text-gray-600")}>
            Get answers to common questions about our design process and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gold-100 overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gold-50 transition-colors"
              >
                <h3 className={cn(TYPOGRAPHY.subheading, "text-lg text-navy-900 font-serif")}>
                  {faq.question}
                </h3>
                <div className={cn(
                  "transform transition-transform duration-200",
                  expandedFaq === index ? "rotate-180" : ""
                )}>
                  <ArrowRight className="w-5 h-5 text-gold-600 transform rotate-90" />
                </div>
              </button>
              
              {expandedFaq === index && (
                <div className="px-8 pb-6">
                  <p className={cn(TYPOGRAPHY.body, "text-gray-600 leading-relaxed")}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 