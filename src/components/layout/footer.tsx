"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

interface ContactInfo {
  type: string;
  value: string;
  icon: React.ReactNode;
}

interface FooterProps {
  companyName?: string;
  tagline?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo[];
  businessHours?: string;
  address?: string;
  showNewsletter?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  companyName = "North Bay Kitchen & Bath",
  tagline = "Transforming Luxury Spaces Since 2008",
  sections = [
    {
      title: "Services",
      links: [
        { label: "Kitchen Design", href: "/services/kitchen-design" },
        { label: "Bathroom Renovation", href: "/services/bathroom-renovation" },
        { label: "Custom Cabinetry", href: "/services/custom-cabinetry" },
        { label: "Design Consultation", href: "/services/consultation" },
        { label: "3D Visualization", href: "/services/3d-visualization" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Design Services", href: "/design-services" },
        { label: "Products", href: "/products" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Design Blog", href: "/blog" },
        { label: "Inspiration Gallery", href: "/gallery" },
        { label: "Care & Maintenance", href: "/care-guide" },
        { label: "Warranty", href: "/warranty" },
        { label: "Careers", href: "/careers" }
      ]
    }
  ],
  socialLinks = [
    { platform: "Facebook", href: "https://facebook.com", icon: <Facebook className="w-5 h-5" /> },
    { platform: "Instagram", href: "https://instagram.com", icon: <Instagram className="w-5 h-5" /> },
    { platform: "Twitter", href: "https://twitter.com", icon: <Twitter className="w-5 h-5" /> },
    { platform: "Linkedin", href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> }
  ],
  contactInfo = [
    { type: "Phone", value: "(707) 555-0123", icon: <Phone className="w-4 h-4" /> },
    { type: "Email", value: "info@nbkb.com", icon: <Mail className="w-4 h-4" /> },
    { type: "Address", value: "Napa Valley Showroom, CA", icon: <MapPin className="w-4 h-4" /> }
  ],
  businessHours = "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
  showNewsletter = true
}) => {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-white text-navy-900 relative overflow-hidden border-t border-gray-200">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

            {/* Company info and contact */}
            <div className="lg:col-span-4 space-y-4">
              {/* Logo */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-600 to-gold-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-serif font-bold text-xl">NB</span>
                </div>
                <div className="ml-3">
                  <div className="text-xl font-serif font-medium leading-tight text-navy-900">
                    North Bay
                  </div>
                  <div className="text-sm font-medium tracking-wide leading-tight text-gold-600">
                    Kitchen & Bath
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gold-600 font-medium mb-4 text-lg">{tagline}</p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Transform your home with our award-winning kitchen and bathroom designs.
                  We specialize in creating luxurious, functional spaces that reflect your unique style and elevate your everyday living experience.
                </p>
              </div>
            </div>

            {/* Navigation sections */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-navy-900 mb-3 relative">
                    {section.title}
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gold-600" />
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-gold-600 transition-colors duration-200 flex items-center group text-sm sm:text-base"
                        >
                          <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {link.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact info - moved here and made full width */}
          <h3 className="text-xl font-semibold text-navy-900 mt-8 mb-5 relative text-center">
            Contact Us
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gold-600" />
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-gold-600 flex-shrink-0">
                    {info.icon}
                  </div>
                  <span className="text-navy-700 text-base font-medium">{info.value}</span>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <div className="text-gold-600 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-navy-700 text-base font-medium">{businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">

              {/* Copyright */}
              <div className="text-gray-600 text-sm text-center lg:text-left">
                © {new Date().getFullYear()} {companyName}. All rights reserved.
              </div>

              {/* Social links */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-gray-600 text-sm">Follow us:</span>
                <div className="flex space-x-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={`Follow us on ${social.platform}`}
                      className="text-gray-500 hover:text-gold-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-2 focus:ring-offset-white"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Legal links */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <a
                  href="/auth/login"
                  className="text-gray-600 hover:text-gold-600 transition-colors duration-200 font-medium"
                >
                  Client Login
                </a>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-gold-600 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-gray-600 hover:text-gold-600 transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="/accessibility"
                  className="text-gray-600 hover:text-gold-600 transition-colors duration-200"
                >
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 