"use client";

import React from "react";
import { Search } from "@/components/ui/search";
import { LuxuryDivider } from "@/components/luxury/divider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-system";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "product" | "page" | "service";
  href: string;
  image?: string;
  price?: number;
  category?: string;
}

// Extended search data for the search page
const searchData: SearchResult[] = [
  {
    id: "1",
    title: "Carrara Marble Kitchen Island",
    description: "Handcrafted Italian Carrara marble island with integrated breakfast bar and premium brass fixtures.",
    type: "product",
    href: "/products/carrara-marble-island",
    image: "/images/products/marble-island-thumb.jpg",
    price: 4500,
    category: "Kitchen Islands"
  },
  {
    id: "2", 
    title: "Professional Series Range",
    description: "48-inch professional dual-fuel range with convection ovens and precision temperature control.",
    type: "product",
    href: "/products/professional-range",
    image: "/images/products/range-thumb.jpg",
    price: 8900,
    category: "Appliances"
  },
  {
    id: "3",
    title: "Design Consultation",
    description: "Professional design guidance and space planning recommendations for your project.",
    type: "service",
    href: "/services#consultation",
    price: 299,
    category: "Design Services"
  },
  {
    id: "4",
    title: "Portfolio",
    description: "View our collection of award-winning kitchen and bathroom designs that showcase our expertise.",
    type: "page",
    href: "/portfolio",
    category: "Information"
  },
  {
    id: "5",
    title: "About North Bay",
    description: "Learn about our team, values, and design philosophy that drives our luxury approach.",
    type: "page", 
    href: "/about",
    category: "Information"
  },
  {
    id: "6",
    title: "Luxury Brass Faucet",
    description: "Professional-grade kitchen faucet with pull-down sprayer and ceramic disc valves.",
    type: "product",
    href: "/products/luxury-brass-faucet",
    image: "/images/products/faucet-thumb.jpg",
    price: 1299,
    category: "Fixtures"
  },
  {
    id: "7",
    title: "Custom Walnut Cabinetry",
    description: "Handcrafted solid walnut cabinetry with soft-close hinges and integrated LED lighting.",
    type: "product",
    href: "/products/walnut-cabinetry",
    image: "/images/products/cabinets-thumb.jpg",
    price: 12500,
    category: "Cabinetry"
  },
  {
    id: "8",
    title: "Complete Design Package",
    description: "Full-service design with 3D renderings, material specifications, and project management.",
    type: "service",
    href: "/services#design-package",
    price: 2999,
    category: "Design Services"
  },
  {
    id: "9",
    title: "Contact Us",
    description: "Get in touch with our design team to start your luxury kitchen or bathroom project.",
    type: "page",
    href: "/contact",
    category: "Information"
  }
];

const typeFilters = ["All Types", "Products", "Services", "Pages"];
const categoryFilters = ["All Categories", "Kitchen Islands", "Appliances", "Fixtures", "Cabinetry", "Design Services", "Information"];
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" }
];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = React.useState<SearchResult[]>([]);
  const [typeFilter, setTypeFilter] = React.useState("All Types");
  const [categoryFilter, setCategoryFilter] = React.useState("All Categories");
  const [sortBy, setSortBy] = React.useState("relevance");

  // Get query from URL params
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    setQuery(searchQuery);
  }, []);

  // Perform search
  React.useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchResults = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );

    setResults(searchResults);
  }, [query]);

  // Apply filters and sorting
  React.useEffect(() => {
    let filtered = [...results];

    // Type filter
    if (typeFilter !== "All Types") {
      const filterType = typeFilter.toLowerCase().slice(0, -1); // Remove 's' from end
      filtered = filtered.filter(item => item.type === filterType);
    }

    // Category filter
    if (categoryFilter !== "All Categories") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "relevance":
      default:
        // Keep original order (relevance)
        break;
    }

    setFilteredResults(filtered);
  }, [results, typeFilter, categoryFilter, sortBy]);

  const clearFilters = () => {
    setTypeFilter("All Types");
    setCategoryFilter("All Categories");
    setSortBy("relevance");
  };

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "service":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
          </svg>
        );
      case "page":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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