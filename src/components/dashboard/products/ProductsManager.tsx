"use client";

import { useState, useMemo } from 'react';
import { sampleProducts, productCategories } from '@/data/productsData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductGridSkeleton, LoadingOverlay } from '@/components/ui/loading';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Package,
  Eye,
  Archive,
  CheckCircle
} from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: string;
  availability: string;
  leadTime: string;
  status: 'draft' | 'published' | 'archived';
  image: string;
  description: string;
  features: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const ProductsManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Transform products data to match our interface
  const products: Product[] = useMemo(() => {
    return sampleProducts.map((product: any) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      price: product.price.display,
      availability: product.availability,
      leadTime: product.leadTime,
      status: 'published' as const,
      image: product.images[0],
      description: product.description,
      features: product.features,
      tags: product.tags || [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    }));
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'brand':
          comparison = a.brand.localeCompare(b.brand);
          break;
        case 'updatedAt':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Delete product:', productId);
    setIsLoading(false);
  };

  const handleBulkAction = async (action: string) => {
    if (selectedProducts.length === 0) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Bulk action:', action, 'on products:', selectedProducts);
    setSelectedProducts([]);
    setIsLoading(false);
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Save product:', productData);
    setShowProductModal(false);
    setEditingProduct(null);
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { 
        class: 'bg-green-100 text-green-800 border-green-200', 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      draft: { 
        class: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: <Edit className="h-3 w-3" /> 
      },
      archived: { 
        class: 'bg-gray-100 text-gray-800 border-gray-200', 
        icon: <Archive className="h-3 w-3" /> 
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${config.class}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-nb-gold-100 rounded-lg">
              <Package className="h-6 w-6 text-nb-gold-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-nb-neutral-900">Products</h1>
              <p className="text-sm text-nb-neutral-600">
                Manage your product catalog and inventory
              </p>
            </div>
          </div>
          
          <div className="bg-nb-neutral-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-nb-neutral-700">
              {filteredProducts.length} products
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {selectedProducts.length > 0 && (
            <Card padding="sm" className="flex items-center space-x-3">
              <span className="text-sm text-nb-neutral-600">
                {selectedProducts.length} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('publish')}
                  loading={isLoading}
                >
                  Publish
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('archive')}
                  loading={isLoading}
                >
                  Archive
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  loading={isLoading}
                >
                  Delete
                </Button>
              </div>
            </Card>
          )}
          
          <Button
            onClick={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search products, brands, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                variant="luxury"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-nb-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-nb-gold-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-nb-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-nb-gold-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              
              <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <LoadingOverlay isLoading={isLoading}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Products ({filteredProducts.length})
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-nb-neutral-600">View:</span>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <ProductGridSkeleton count={pageSize} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    variant="luxury" 
                    hover="lift" 
                    padding="none"
                    className="group cursor-pointer overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-nb-neutral-900 line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-sm text-nb-neutral-600">{product.brand}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-nb-gold-600">
                          {product.price}
                        </span>
                        {getStatusBadge(product.status)}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-nb-neutral-100">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                            leftIcon={<Edit className="h-3 w-3" />}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Eye className="h-3 w-3" />}
                          >
                            View
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-nb-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-nb-neutral-900 mb-2">
                  No products found
                </h3>
                <p className="text-nb-neutral-600 mb-6">
                  {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Get started by adding your first product'
                  }
                </p>
                {(!searchQuery && selectedCategory === 'all' && selectedStatus === 'all') && (
                  <Button
                    onClick={() => setShowProductModal(true)}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Your First Product
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </LoadingOverlay>

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <Card>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-nb-neutral-600">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <span className="px-3 py-1 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Modal - Enhanced placeholder */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-nb-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-nb-neutral-900 mb-2">
                  Product Form Coming Soon
                </h3>
                <p className="text-nb-neutral-600">
                  Advanced product management features will be available here.
                </p>
                
                {editingProduct && (
                  <div className="mt-6 space-y-2 text-left bg-nb-neutral-50 p-4 rounded-lg">
                    <p><strong>Name:</strong> {editingProduct.name}</p>
                    <p><strong>Category:</strong> {editingProduct.category}</p>
                    <p><strong>Brand:</strong> {editingProduct.brand}</p>
                    <p><strong>Price:</strong> {editingProduct.price}</p>
                    <p><strong>Status:</strong> {editingProduct.status}</p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <div className="p-6 border-t border-nb-neutral-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowProductModal(false);
                  setEditingProduct(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSaveProduct({})}
                loading={isLoading}
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductsManager; 