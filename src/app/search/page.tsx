"use client";

import React from "react";
import { motion } from 'framer-motion';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import { Search as SearchIcon, Filter, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Temporary fix for React.Children.only issues

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
    <div className="min-h-screen bg-background">
      <EnhancedHeader />

      {/* Search Header */}
      <section className="relative pt-20 lg:pt-32 pb-16 bg-gradient-to-b from-muted to-background text-foreground overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <SearchIcon className="w-4 h-4 mr-3 text-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">
                Find What You're Looking For
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl mb-6 font-serif font-light text-foreground">
              {query ? "Search Results" : "Search"}
            </h1>
            
            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, services, pages..."
                className="w-full pl-16 pr-6 py-6 text-lg border border-border rounded-2xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <Button 
                size="sm" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <SearchIcon className="w-4 h-4" />
              </Button>
            </div>

            {query && (
              <p className="text-lg text-muted-foreground">
                Results for "<strong className="text-primary">{query}</strong>"
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Search Results or Suggestions */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          {query ? (
            // Search Results
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-3xl text-foreground mb-4 font-serif font-light">
                Search Feature Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                We're building an advanced search system to help you find exactly what you need. 
                In the meantime, explore our popular pages below.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          ) : (
            // Search Suggestions
            <>
              {/* Suggested Searches */}
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl text-foreground mb-8 text-center font-serif font-light">
                    Popular Searches
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    {suggestedSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="px-4 py-2 bg-card border border-border rounded-full text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Popular Pages */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl text-foreground mb-8 text-center font-serif font-light">
                    Popular Pages
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {popularPages.map((page, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl text-foreground mb-2 group-hover:text-primary transition-colors font-serif font-medium">
                                  {page.title}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                  {page.description}
                                </p>
                                <a href={page.href}>
                                  <Button variant="outline" size="sm" className="flex items-center">
                                    Visit Page
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </a>
                              </div>
                              <div className="ml-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <Star className="w-6 h-6 text-primary" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl text-foreground mb-8 font-serif font-light">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Our design experts are here to help. Contact us directly for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="/design-services">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center">
                  Schedule Consultation
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 