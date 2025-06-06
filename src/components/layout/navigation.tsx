"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { cn, TYPOGRAPHY } from "@/lib/design-system";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Products", href: "/products" },
    { name: "Design Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50" 
        : "bg-transparent",
      className
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#d4af37] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">NB</span>
            </div>
            <div className="hidden sm:block">
              <div className={cn(
                TYPOGRAPHY.subheading,
                isScrolled ? "text-slate-900" : "text-white",
                "text-lg"
              )}>
                North Bay Kitchen & Bath
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  TYPOGRAPHY.body,
                  "transition-colors duration-300 hover:text-[#d4af37]",
                  isScrolled ? "text-slate-700" : "text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Search 
              className="w-64" 
              placeholder="Search..." 
            />
            <Button
              variant={isScrolled ? "outline" : "elegant"}
              color="gold"
              size="sm"
              className={!isScrolled ? "border-white/30 text-white hover:bg-white/10" : ""}
            >
              Schedule Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className={cn(
                "w-6 h-6 transition-colors",
                isScrolled ? "text-slate-900" : "text-white"
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-md">
            <div className="py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    TYPOGRAPHY.body,
                    "block px-4 py-2 text-slate-700 hover:text-[#d4af37] transition-colors"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Button
                  variant="primary"
                  color="gold"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 