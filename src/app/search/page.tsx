"use client";

import React from "react";
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { Search as SearchIcon, Filter, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");

  // Get query from URL params
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.get('q') || '';
      setQuery(searchQuery);
    }
  }, []);

  const suggestedSearches = [
    "Kitchen remodel ideas",
    "Bathroom vanities", 
    "Cabinet hardware",
    "Luxury lighting",
    "Design consultation",
    "Modern fixtures"
  ];

  const popularPages = [
    { title: "Design Services", description: "Professional design consultation and project management", href: "/design-services" },
    { title: "Product Catalog", description: "Browse our curated collection of luxury fixtures", href: "/products" },
    { title: "Portfolio", description: "View our award-winning kitchen and bathroom projects", href: "/portfolio" },
    { title: "Contact Us", description: "Get in touch for your design consultation", href: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Search Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-navy-900 to-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #B79A6B 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #B79A6B 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className={cn(SPACING.container.default, "relative z-10")}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <SearchIcon className="w-4 h-4 mr-3" />
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                Find What You're Looking For
              </span>
            </div>

            <h1 className={cn(TYPOGRAPHY.heading, "text-5xl md:text-6xl mb-6 font-serif")}>
              {query ? "Search Results" : "Search"}
            </h1>
            
            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, services, pages..."
                className="w-full pl-16 pr-6 py-6 text-lg border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
              <Button 
                size="sm" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gold-600 hover:bg-gold-700 text-white"
              >
                <SearchIcon className="w-4 h-4" />
              </Button>
            </div>

            {query && (
              <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-200")}>
                Results for "<strong className="text-gold-400">{query}</strong>"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Search Results or Suggestions */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        {query ? (
          // Search Results
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className={cn(TYPOGRAPHY.heading, "text-3xl text-navy-900 mb-4 font-serif")}>
              Search Feature Coming Soon
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-600 mb-8 max-w-2xl mx-auto")}>
              We're building an advanced search system to help you find exactly what you need. 
              In the meantime, explore our popular pages below.
            </p>
            <Button className="bg-gold-600 hover:bg-gold-700 text-white">
              Browse All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        ) : (
          // Search Suggestions
          <>
            {/* Suggested Searches */}
            <div className="mb-16">
              <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-8 text-center font-serif")}>
                Popular Searches
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-gold-300 hover:text-gold-600 hover:bg-gold-50 transition-all duration-300"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Pages */}
            <div>
              <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-8 text-center font-serif")}>
                Popular Pages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularPages.map((page, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 mb-2 group-hover:text-gold-600 transition-colors font-serif")}>
                            {page.title}
                          </h3>
                          <p className={cn(TYPOGRAPHY.body, "text-gray-600 mb-4")}>
                            {page.description}
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a href={page.href}>
                              Visit Page
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        </div>
                        <div className="ml-4">
                          <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                            <Star className="w-6 h-6 text-gold-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Quick Actions */}
      <section className={cn(PATTERNS.section.alternate, SPACING.container.default)}>
        <div className="text-center">
          <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-8 font-serif")}>
            Can't Find What You're Looking For?
          </h2>
          <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-600 mb-8 max-w-2xl mx-auto")}>
            Our design experts are here to help. Contact us directly for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white" asChild>
              <a href="/contact">
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-gold-600 text-gold-600 hover:bg-gold-50" asChild>
              <a href="/design-services">
                Schedule Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 