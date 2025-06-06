"use client";

import React from "react";
import { ProductCard } from "@/components/luxury/product-card";
import { LuxuryDivider } from "@/components/luxury/divider";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-system";

// Sample product data - would come from database in real app
const sampleProducts = [
  {
    id: "1",
    name: "Carrara Marble Kitchen Island",
    price: 4500,
    comparePrice: 5200,
    images: ["/images/products/marble-island-1.jpg", "/images/products/marble-island-2.jpg"],
    description: "Handcrafted Italian Carrara marble island with integrated breakfast bar and premium brass fixtures.",
    inStock: true,
    category: "Kitchen Islands",
    brand: "North Bay Designs",
  },
  {
    id: "2", 
    name: "Professional Series Range",
    price: 8900,
    images: ["/images/products/range-1.jpg"],
    description: "48-inch professional dual-fuel range with convection ovens and precision temperature control.",
    inStock: true,
    category: "Appliances",
    brand: "Wolf",
  },
  {
    id: "3",
    name: "Custom Walnut Cabinetry",
    price: 12500,
    images: ["/images/products/cabinets-1.jpg"],
    description: "Handcrafted solid walnut cabinetry with soft-close hinges and integrated LED lighting.",
    inStock: false,
    category: "Cabinetry",
    brand: "North Bay Designs",
  },
  {
    id: "4",
    name: "Luxury Brass Faucet",
    price: 1299,
    comparePrice: 1499,
    images: ["/images/products/faucet-1.jpg"],
    description: "Professional-grade kitchen faucet with pull-down sprayer and ceramic disc valves.",
    inStock: true,
    category: "Fixtures",
    brand: "Waterworks",
  },
  {
    id: "5",
    name: "Marble Farmhouse Sink",
    price: 3200,
    images: ["/images/products/sink-1.jpg"],
    description: "Single-bowl farmhouse sink carved from solid Carrara marble with integrated drainboard.",
    inStock: true,
    category: "Sinks",
    brand: "North Bay Designs",
  },
  {
    id: "6",
    name: "Designer Bar Stools",
    price: 450,
    images: ["/images/products/stools-1.jpg"],
    description: "Set of 2 leather and walnut bar stools with adjustable height and swivel function.",
    inStock: true,
    category: "Seating",
    brand: "RH",
  },
];

const categories = [
  "All Products",
  "Kitchen Islands", 
  "Appliances",
  "Cabinetry",
  "Fixtures",
  "Sinks",
  "Seating",
];

const brands = [
  "All Brands",
  "North Bay Designs",
  "Wolf",
  "Sub-Zero", 
  "Waterworks",
  "RH",
  "Bulthaup",
];

const priceRanges = [
  "All Prices",
  "Under $1,000",
  "$1,000 - $5,000", 
  "$5,000 - $10,000",
  "Over $10,000",
];

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = React.useState(sampleProducts);
  const [selectedCategory, setSelectedCategory] = React.useState("All Products");
  const [selectedBrand, setSelectedBrand] = React.useState("All Brands");
  const [selectedPriceRange, setSelectedPriceRange] = React.useState("All Prices");
  const [searchQuery, setSearchQuery] = React.useState("");
  // const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Filter products based on selected filters
  React.useEffect(() => {
    let filtered = sampleProducts;

    // Category filter
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Brand filter  
    if (selectedBrand !== "All Brands") {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Price range filter
    if (selectedPriceRange !== "All Prices") {
      filtered = filtered.filter(product => {
        const price = product.price || 0;
        switch (selectedPriceRange) {
          case "Under $1,000":
            return price < 1000;
          case "$1,000 - $5,000":
            return price >= 1000 && price <= 5000;
          case "$5,000 - $10,000":
            return price >= 5000 && price <= 10000;
          case "Over $10,000":
            return price > 10000;
          default:
            return true;
        }
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, selectedPriceRange, searchQuery]);

  const handleProductDetails = (productId: string) => {
    console.log("View product details:", productId);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log("Add to wishlist:", productId);
  };

  const clearFilters = () => {
    setSelectedCategory("All Products");
    setSelectedBrand("All Brands");
    setSelectedPriceRange("All Prices");
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`${TYPOGRAPHY.heading} text-5xl md:text-6xl text-slate-900 mb-6`}>
              Premium Products
            </h1>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 mb-8`}>
              Discover our curated collection of luxury kitchen and bath products from the world&apos;s finest manufacturers.
            </p>
            
            <LuxuryDivider variant="ornate" color="gold" width="center" withIcon />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-none focus:border-[#d4af37] focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-none focus:border-[#d4af37] focus:outline-none"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-none focus:border-[#d4af37] focus:outline-none"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* View Toggle & Clear */}
            <div className="flex items-center gap-4">
              <button
                onClick={clearFilters}
                className="text-sm text-slate-600 hover:text-[#d4af37] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
            <span>
              Showing {filteredProducts.length} of {sampleProducts.length} products
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className={`${TYPOGRAPHY.subheading} text-2xl text-slate-900 mb-2`}>
                No products found
              </h3>
              <p className={`${TYPOGRAPHY.body} text-slate-600 mb-6`}>
                Try adjusting your filters or search terms
              </p>
              <Button variant="outline" color="gold" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleProductDetails}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`${TYPOGRAPHY.heading} text-3xl md:text-4xl mb-6`}>
            Need Help Choosing?
          </h2>
          <p className={`${TYPOGRAPHY.body} text-xl text-slate-300 max-w-2xl mx-auto mb-8`}>
            Our design experts are here to help you select the perfect products for your project.
          </p>
          <Button variant="primary" color="gold" size="lg">
            Schedule Design Consultation
          </Button>
        </div>
      </section>
    </main>
  );
} 