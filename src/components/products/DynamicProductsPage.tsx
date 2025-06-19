"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  Package,
  ArrowRight,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import EnhancedHeader from '@/components/layout/EnhancedHeader';

// Types
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  comparePrice: number | null;
  inStock: boolean;
  status: string;
  tags: string[];
  featured: boolean;
  availability?: string;
  leadTime?: string;
  Brand?: { name: string; slug: string } | null;
  Category?: { name: string; slug: string } | null;
  Images?: Array<{
    url: string;
    alt: string | null;
    isHero: boolean;
  }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
}

interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const DynamicProductsPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0
  });

  // Fetch data
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [searchParams, searchQuery, selectedCategory, selectedBrand, sortBy, pagination.page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: '12',
        include: 'brand,category,images',
        sortBy: sortBy === 'featured' ? 'priority' : sortBy,
        sortOrder: sortBy === 'price-low' ? 'asc' : 'desc'
      });

      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedBrand) params.append('brand', selectedBrand);

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const data: ProductsResponse = await response.json();
        setProducts(data.products);
        setPagination(prev => ({
          ...prev,
          totalPages: data.pagination.totalPages,
          totalCount: data.pagination.totalCount
        }));
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      if (response.ok) {
        const data = await response.json();
        setBrands(data.brands || []);
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getHeroImage = (product: Product) => {
    return product.Images?.find(img => img.isHero)?.url || 
           product.Images?.[0]?.url || 
           '/images/placeholder-product.jpg';
  };

  const formatPrice = (price: number | null, comparePrice: number | null) => {
    if (!price) return 'Custom Pricing';
    
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-charcoal-900">
          ${price.toLocaleString()}
        </span>
        {comparePrice && comparePrice > price && (
          <span className="text-sm text-charcoal-500 line-through">
            ${comparePrice.toLocaleString()}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white-50 to-stone-100">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-charcoal-900 to-charcoal-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold-500/10 to-transparent" />
        <div className="absolute inset-0 bg-[url('/website_images/Kenwood Project/photos21.jpg')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 font-serif">
                Curated <span className="text-luxury-gold-400 italic">Collections</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                Discover our handpicked selection of luxury kitchen and bathroom products, 
                featuring the finest materials and exceptional craftsmanship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4 sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-full sm:max-w-md order-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-stone-300 focus:border-luxury-gold-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 order-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-stone-300 hover:border-luxury-gold-500 flex-1 sm:flex-none"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              {/* View Mode */}
              <div className="hidden sm:flex border border-stone-300 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-stone-300 rounded-md bg-white focus:border-luxury-gold-500 text-sm min-w-0 flex-1 sm:flex-none"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="createdAt">Newest</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-stone-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:border-luxury-gold-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brands */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:border-luxury-gold-500"
                    >
                      <option value="">All Brands</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.slug}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                        setSelectedBrand('');
                        setSortBy('featured');
                      }}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-charcoal-900">
                {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
              </h2>
              <p className="text-sm sm:text-base text-charcoal-600 mt-1">
                {pagination.totalCount} products found
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square bg-stone-200 animate-pulse" />
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-stone-200 rounded animate-pulse" />
                      <div className="h-3 bg-stone-200 rounded w-2/3 animate-pulse" />
                      <div className="h-5 bg-stone-200 rounded w-1/2 animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-4 sm:gap-6 lg:gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-white">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={getHeroImage(product)}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        loading="lazy"
                        quality={85}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {product.featured && (
                          <Badge className="bg-luxury-gold-500 text-charcoal-900">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge variant="destructive">
                            Out of Stock
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="bg-white text-charcoal-900 hover:bg-luxury-gold-500">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-4">
                        {/* Brand & Category */}
                        <div className="flex items-center gap-2 text-sm text-charcoal-500">
                          {product.Brand && (
                            <>
                              <span>{product.Brand.name}</span>
                              {product.Category && <span>•</span>}
                            </>
                          )}
                          {product.Category && <span>{product.Category.name}</span>}
                        </div>

                        {/* Product Name */}
                        <h3 className="text-lg font-medium text-charcoal-900 line-clamp-2 group-hover:text-luxury-gold-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Description */}
                        {product.description && (
                          <p className="text-sm text-charcoal-600 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          {formatPrice(product.price, product.comparePrice)}
                        </div>

                        {/* Availability */}
                        <div className="flex items-center gap-4 text-xs text-charcoal-500">
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            <span>{product.availability || 'In Stock'}</span>
                          </div>
                          {product.leadTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{product.leadTime}</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {product.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!loading && products.length === 0 && (
            <div className="text-center py-16">
              <div className="text-charcoal-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-charcoal-900 mb-2">
                No products found
              </h3>
              <p className="text-charcoal-600 mb-6">
                Try adjusting your search criteria or browse our categories
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setSelectedBrand('');
                }}
                className="bg-luxury-gold-500 text-charcoal-900 hover:bg-luxury-gold-600"
              >
                View All Products
              </Button>
            </div>
          )}

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </Button>
                
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={pagination.page === i + 1 ? 'default' : 'outline'}
                    onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                    className="w-10 h-10"
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DynamicProductsPage; 