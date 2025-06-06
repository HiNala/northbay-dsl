"use client";

import React from "react";
import { cn, TYPOGRAPHY } from "@/lib/design-system";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "product" | "page" | "service";
  href: string;
  image?: string;
  price?: number;
}

interface SearchProps {
  className?: string;
  placeholder?: string;
  onResultClick?: (result: SearchResult) => void;
}

// Mock search data - would come from API/database in real app
const searchData: SearchResult[] = [
  {
    id: "1",
    title: "Carrara Marble Kitchen Island",
    description: "Handcrafted Italian Carrara marble island with integrated breakfast bar",
    type: "product",
    href: "/products/carrara-marble-island",
    image: "/images/products/marble-island-thumb.jpg",
    price: 4500
  },
  {
    id: "2", 
    title: "Professional Series Range",
    description: "48-inch professional dual-fuel range with convection ovens",
    type: "product",
    href: "/products/professional-range",
    image: "/images/products/range-thumb.jpg",
    price: 8900
  },
  {
    id: "3",
    title: "Design Consultation",
    description: "Professional design guidance and space planning recommendations",
    type: "service",
    href: "/services#consultation",
    price: 299
  },
  {
    id: "4",
    title: "Portfolio",
    description: "View our collection of award-winning kitchen and bathroom designs",
    type: "page",
    href: "/portfolio"
  },
  {
    id: "5",
    title: "About North Bay",
    description: "Learn about our team, values, and design philosophy",
    type: "page", 
    href: "/about"
  },
  {
    id: "6",
    title: "Luxury Brass Faucet",
    description: "Professional-grade kitchen faucet with pull-down sprayer",
    type: "product",
    href: "/products/luxury-brass-faucet",
    image: "/images/products/faucet-thumb.jpg",
    price: 1299
  }
];

export function Search({ className, placeholder = "Search products, services...", onResultClick }: SearchProps) {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Perform search
  React.useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6); // Limit to 6 results

    setResults(searchResults);
    setIsOpen(searchResults.length > 0);
    setSelectedIndex(-1);
  }, [query]);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : results.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    onResultClick?.(result);
    
    // Navigate to result
    window.location.href = result.href;
  };

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "service":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
          </svg>
        );
      case "page":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "product": return "Product";
      case "service": return "Service";
      case "page": return "Page";
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
    <div ref={searchRef} className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none bg-white"
        />
        
        {/* Search Icon */}
        <svg 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors",
                selectedIndex === index && "bg-slate-50"
              )}
            >
              <div className="flex items-start space-x-3">
                {/* Result Image or Icon */}
                {result.image ? (
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-12 h-12 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center flex-shrink-0 text-slate-500">
                    {getTypeIcon(result.type)}
                  </div>
                )}

                {/* Result Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={cn(TYPOGRAPHY.subheading, "text-sm text-slate-900 truncate")}>
                      {result.title}
                    </h4>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex-shrink-0">
                      {getTypeLabel(result.type)}
                    </span>
                  </div>
                  <p className={cn(TYPOGRAPHY.body, "text-sm text-slate-600 line-clamp-2")}>
                    {result.description}
                  </p>
                  {result.price && (
                    <div className="mt-1">
                      <span className="text-sm font-medium text-[#d4af37]">
                        {formatPrice(result.price)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow Icon */}
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}

          {/* View All Results Link */}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
            <button 
              onClick={() => {
                setQuery("");
                setIsOpen(false);
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
              }}
              className="text-sm text-[#d4af37] hover:text-[#b8941f] font-medium"
            >
              View all results for &quot;{query}&quot;
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-xl z-50 px-4 py-6 text-center">
          <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className={cn(TYPOGRAPHY.body, "text-slate-500 mb-2")}>
            No results found for &quot;{query}&quot;
          </p>
          <p className="text-sm text-slate-400">
            Try searching for products, services, or pages
          </p>
        </div>
      )}
    </div>
  );
} 