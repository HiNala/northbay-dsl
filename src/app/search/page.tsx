"use client";

import React from "react";
import { Search } from "@/components/ui/search";
import { LuxuryDivider } from "@/components/luxury/divider";
import { TYPOGRAPHY } from "@/lib/design-system";

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

  return (
    <main className="min-h-screen pt-20">
      {/* Search Header */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-slate-900 mb-6 text-center`}>
              Search Results
            </h1>
            
            {/* Search Bar */}
            <Search 
              className="mb-6"
              placeholder="Search products, services, pages..."
            />

            {query && (
              <div className="text-center">
                <p className={`${TYPOGRAPHY.body} text-lg text-slate-600`}>
                  Results for &quot;<strong>{query}</strong>&quot;
                </p>
              </div>
            )}
            
            <LuxuryDivider variant="classic" color="gold" width="center" className="mt-8" />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center py-16">
            <h2 className={`${TYPOGRAPHY.heading} text-3xl text-slate-900 mb-4`}>
              Search functionality ready
            </h2>
            <p className={`${TYPOGRAPHY.body} text-slate-600`}>
              Use the search bar above to find products, services, and pages.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 