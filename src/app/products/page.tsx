"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { ProductCard } from "@/components/luxury/product-card";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { Search, Filter, Grid3X3, List, ArrowRight, ChevronDown } from "lucide-react";

// Sample product data
const allProducts = [
  {
    id: "1",
    name: "Carrara Marble Kitchen Island",
    price: 4500,
    comparePrice: 5200,
    images: ["/images/products/marble-island-1.jpg"],
    description: "Handcrafted Italian Carrara marble island with integrated breakfast bar.",
    inStock: true,
    category: "Kitchen Islands",
    brand: "North Bay Designs",
    finish: "Natural Stone",
  },
  {
    id: "2",
    name: "Professional Series Range",
    price: 8900,
    images: ["/images/products/range-1.jpg"],
    description: "48-inch professional dual-fuel range with convection ovens.",
    inStock: true,
    category: "Appliances",
    brand: "Sub-Zero Wolf",
    finish: "Stainless Steel",
  },
  {
    id: "3",
    name: "Custom Walnut Cabinetry",
    price: 12500,
    images: ["/images/products/walnut-cabinets-1.jpg"],
    description: "Handcrafted American walnut cabinets with soft-close hardware.",
    inStock: true,
    category: "Cabinetry",
    brand: "North Bay Designs",
    finish: "Natural Wood",
  },
  {
    id: "4",
    name: "Luxury Bathroom Vanity",
    price: 6800,
    images: ["/images/products/vanity-1.jpg"],
    description: "Double vanity with marble countertop and gold fixtures.",
    inStock: true,
    category: "Bathroom Vanities",
    brand: "Waterworks",
    finish: "Natural Stone",
  },
  {
    id: "5",
    name: "Designer Pendant Lighting",
    price: 1200,
    comparePrice: 1500,
    images: ["/images/products/pendant-1.jpg"],
    description: "Artisan-crafted brass pendant lights with glass shades.",
    inStock: false,
    category: "Lighting",
    brand: "Visual Comfort",
    finish: "Brass",
  },
  {
    id: "6",
    name: "Farmhouse Kitchen Sink",
    price: 2800,
    images: ["/images/products/sink-1.jpg"],
    description: "Apron-front fireclay sink with luxury faucet package.",
    inStock: true,
    category: "Kitchen Sinks",
    brand: "Rohl",
    finish: "Fireclay",
  },
];

const categories = [
  "All Products",
  "Kitchen Islands",
  "Appliances", 
  "Cabinetry",
  "Bathroom Vanities",
  "Lighting",
  "Kitchen Sinks",
];

const finishes = [
  "All Finishes",
  "Natural Stone",
  "Stainless Steel",
  "Natural Wood",
  "Brass",
  "Fireclay",
];

const priceRanges = [
  "All Prices",
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "Over $10,000",
];

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedFinish, setSelectedFinish] = useState("All Finishes");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter products based on selections
  const filterProducts = () => {
    let filtered = allProducts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Finish filter
    if (selectedFinish !== "All Finishes") {
      filtered = filtered.filter(product => product.finish === selectedFinish);
    }

    // Price filter
    if (selectedPriceRange !== "All Prices") {
      filtered = filtered.filter(product => {
        const price = product.price;
        switch (selectedPriceRange) {
          case "Under $2,000":
            return price < 2000;
          case "$2,000 - $5,000":
            return price >= 2000 && price <= 5000;
          case "$5,000 - $10,000":
            return price >= 5000 && price <= 10000;
          case "Over $10,000":
            return price > 10000;
          default:
            return true;
        }
      });
    }

    setFilteredProducts(filtered);
  };

  // Apply filters when any filter changes
  useState(() => {
    filterProducts();
  });

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-navy-900 to-navy-800 text-white">
        <div className={cn(SPACING.container.default)}>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={cn(TYPOGRAPHY.heading, "text-5xl md:text-6xl mb-6 font-serif")}>
              Premium Products
            </h1>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-200 leading-relaxed")}>
              Discover our curated collection of luxury kitchen and bath fixtures, handpicked for their 
              exceptional quality, timeless design, and superior craftsmanship.
            </p>
          </div>
        </div>
      </section>

      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className={cn(
            "lg:w-80 flex-shrink-0",
            showMobileFilters ? "block" : "hidden lg:block"
          )}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 font-serif")}>
                  Filters
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-navy-900"
                >
                  ×
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, brand, or description..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      filterProducts();
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    filterProducts();
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Finish Filter */}
              <div className="mb-6">
                <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                  Finish
                </label>
                <select
                  value={selectedFinish}
                  onChange={(e) => {
                    setSelectedFinish(e.target.value);
                    filterProducts();
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                >
                  {finishes.map((finish) => (
                    <option key={finish} value={finish}>
                      {finish}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                  Price Range
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => {
                    setSelectedPriceRange(e.target.value);
                    filterProducts();
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Products");
                  setSelectedFinish("All Finishes");
                  setSelectedPriceRange("All Prices");
                  setFilteredProducts(allProducts);
                }}
                className="w-full px-4 py-3 text-gold-600 border border-gold-600 rounded-md hover:bg-gold-50 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with view controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className={cn(TYPOGRAPHY.heading, "text-2xl text-navy-900 font-serif mb-2")}>
                  {filteredProducts.length} Products Found
                </h2>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600")}>
                  Showing results for {selectedCategory !== "All Products" ? selectedCategory : "all categories"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>

                {/* View mode toggle */}
                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "grid" 
                        ? "bg-gold-600 text-white" 
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "list" 
                        ? "bg-gold-600 text-white" 
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                  : "space-y-6"
              )}>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === "list" ? "flex flex-row" : ""}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 mb-2 font-serif")}>
                  No products found
                </h3>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600 mb-6")}>
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Products");
                    setSelectedFinish("All Finishes");
                    setSelectedPriceRange("All Prices");
                    setFilteredProducts(allProducts);
                  }}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More / Pagination */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className={cn(
                  "inline-flex items-center px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                  TYPOGRAPHY.button
                )}>
                  Load More Products
                  <ArrowRight className="ml-3 w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={cn(PATTERNS.section.dark, SPACING.container.default, "text-center")}>
        <div className="max-w-4xl mx-auto">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-white mb-6 font-serif")}>
            Need Help Choosing?
          </h2>
          <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-300 mb-8 leading-relaxed")}>
            Our design experts are here to help you select the perfect products for your project.
          </p>
          <button className={cn(
            "px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
            TYPOGRAPHY.button
          )}>
            Schedule Design Consultation
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
} 