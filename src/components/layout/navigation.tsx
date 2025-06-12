"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn, TYPOGRAPHY, SPACING } from "@/lib/design-system";
import { Search, Menu, X, Phone, MapPin } from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Design Services", href: "/design-services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Unified Navigation - Top Bar + Main Nav */}
      <header className="fixed w-full z-50 bg-navy-900 shadow-lg transition-all duration-300">
        {/* Top contact bar - disappears on scroll */}
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 opacity-0" : "h-12 opacity-100"
        )}>
          <div className="hidden lg:block h-12">
            <div className={cn(SPACING.container.default, "flex justify-between items-center py-3 text-sm border-b border-white/10")}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-white" />
                  <span className="text-white">
                    (707) 555-0123
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-white" />
                  <span className="text-white">
                    Napa Valley Showroom
                  </span>
                </div>
              </div>
              <div className="text-gold-400">
                <span className={TYPOGRAPHY.accent}>PREMIUM DESIGN SERVICES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation - seamlessly connected */}
        <nav className="relative">
          <div className={cn(SPACING.container.default, "flex items-center h-20")}>
            {/* Logo - Fixed width for consistent centering */}
            <div className="w-1/4">
              <Link 
                href="/" 
                className="flex items-center group transition-opacity duration-200 hover:opacity-80"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold-600 to-gold-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-serif font-bold text-xl">NB</span>
                </div>
                <div className="hidden md:block ml-3">
                  <div className="text-xl font-serif font-medium leading-tight text-white">
                    North Bay
                  </div>
                  <div className="text-sm font-medium tracking-wide leading-tight text-gold-400">
                    Kitchen & Bath
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center space-x-8 w-1/2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    TYPOGRAPHY.body,
                    "font-medium transition-colors duration-300 hover:text-gold-400 relative group text-white"
                  )}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right side actions - Fixed width for consistent centering */}
            <div className="w-1/4 flex items-center justify-end space-x-4">
              {/* Search button */}
              <button
                className="p-2 rounded-full transition-colors duration-300 text-white hover:bg-white/10"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* CTA button */}
              <Link
                href="/contact"
                className={cn(
                  "hidden md:inline-flex px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                  TYPOGRAPHY.button
                )}
              >
                Schedule Consultation
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md transition-colors duration-300 text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl">
            <div className="p-6 pt-24">
              {/* Mobile navigation links */}
              <div className="space-y-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      TYPOGRAPHY.bodyLarge,
                      "block text-navy-700 hover:text-gold-600 transition-colors duration-200 pb-2 border-b border-gray-100"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile contact info */}
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                <div className="flex items-center text-navy-700">
                  <Phone className="w-5 h-5 mr-3 text-gold-600" />
                  <span>(707) 555-0123</span>
                </div>
                <div className="flex items-center text-navy-700">
                  <MapPin className="w-5 h-5 mr-3 text-gold-600" />
                  <span>Napa Valley Showroom</span>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="mt-8">
                <Link
                  href="/contact"
                  className={cn(
                    "block w-full text-center px-6 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-colors duration-300",
                    TYPOGRAPHY.button
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 