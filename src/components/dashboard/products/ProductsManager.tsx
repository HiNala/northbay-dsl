"use client";

import { useState, useMemo } from 'react';
import { useProducts, type Product, type ProductFilters } from '@/hooks/useProducts';
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

const ProductsManager = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  });
  
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Use the real API hook
  const {
    data: productsData,
    loading,
    error,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkUpdateProducts,
  } = useProducts(filters);

  const products = productsData?.products || [];
  const pagination = productsData?.pagination;

  // Get unique categories for filter - from API data
  const categories = useMemo(() => {
    if (!products.length) return [];
    const uniqueCategories = [...new Set(products.map(p => p.Category?.name).filter(Boolean))];
    return uniqueCategories.sort();
  }, [products]);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      search: value || undefined,
      page: 1
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category,
      page: 1
    }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: status === 'all' ? undefined : status,
      page: 1
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        // Remove from selected if it was selected
        setSelectedProducts(prev => prev.filter(id => id !== productId));
      } catch (error) {
        // Error handled by the hook
      }
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedProducts.length === 0) return;
    
    const actionLabels = {
      publish: 'publish',
      archive: 'archive',
      delete: 'delete'
    };
    
    const actionLabel = actionLabels[action as keyof typeof actionLabels] || action;
    
    if (window.confirm(`Are you sure you want to ${actionLabel} ${selectedProducts.length} product(s)?`)) {
      try {
        await bulkUpdateProducts(selectedProducts, action);
        setSelectedProducts([]);
      } catch (error) {
        // Error handled by the hook
      }
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      setShowProductModal(false);
      setEditingProduct(null);
    } catch (error) {
      // Error handled by the hook
    }
  };

  const handleSelectProduct = (productId: string, selected: boolean) => {
    setSelectedProducts(prev => 
      selected 
        ? [...prev, productId]
        : prev.filter(id => id !== productId)
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedProducts(selected ? products.map(p => p.id) : []);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PUBLISHED: { 
        class: 'bg-green-100 text-green-800 border-green-200', 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      DRAFT: { 
        class: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: <Edit className="h-3 w-3" /> 
      },
      PENDING_APPROVAL: {
        class: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <Eye className="h-3 w-3" />
      },
      ARCHIVED: { 
        class: 'bg-gray-100 text-gray-800 border-gray-200', 
        icon: <Archive className="h-3 w-3" /> 
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${config.class}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace('_', ' ')}
      </span>
    );
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
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
          
          {pagination && (
            <div className="bg-nb-neutral-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-nb-neutral-700">
                {pagination.totalCount} products
              </span>
            </div>
          )}
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
                  loading={loading}
                >
                  Publish
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('archive')}
                  loading={loading}
                >
                  Archive
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  loading={loading}
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
                value={filters.search || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                variant="luxury"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={filters.category || 'all'}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-3 py-2 border border-nb-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-nb-gold-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={filters.status || 'all'}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-2 border border-nb-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-nb-gold-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="PENDING_APPROVAL">Pending Approval</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              
              <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <LoadingOverlay isLoading={loading}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Products {pagination && `(${pagination.totalCount})`}
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
            {loading ? (
              <ProductGridSkeleton count={filters.limit || 12} />
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card 
                    key={product.id} 
                    variant="luxury" 
                    hover="lift" 
                    padding="none"
                    className="group cursor-pointer overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden relative">
                      {product.Images && product.Images.length > 0 ? (
                        <img
                          src={product.Images[0].url}
                          alt={product.Images[0].alt || product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-nb-neutral-100 flex items-center justify-center">
                          <Package className="h-12 w-12 text-nb-neutral-400" />
                        </div>
                      )}
                      
                      {/* Selection checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                          className="h-4 w-4 text-nb-gold-600 rounded border-nb-neutral-300 focus:ring-nb-gold-500"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-nb-neutral-900 line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-sm text-nb-neutral-600">
                          {product.Brand?.name || 'No Brand'} • {product.Category?.name || 'Uncategorized'}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-nb-gold-600">
                          {formatPrice(product.price)}
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
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-nb-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-nb-neutral-900 mb-2">
                  No products found
                </h3>
                <p className="text-nb-neutral-600 mb-6">
                  {filters.search || filters.category || filters.status
                    ? 'Try adjusting your search or filters'
                    : 'Get started by adding your first product'
                  }
                </p>
                {(!filters.search && !filters.category && !filters.status) && (
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
      {pagination && pagination.totalPages > 1 && !loading && (
        <Card>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-nb-neutral-600">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of {pagination.totalCount} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
              >
                Previous
              </Button>
              
              <span className="px-3 py-1 text-sm font-medium">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
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
                    <p><strong>Category:</strong> {editingProduct.Category?.name}</p>
                    <p><strong>Brand:</strong> {editingProduct.Brand?.name}</p>
                    <p><strong>Price:</strong> {formatPrice(editingProduct.price)}</p>
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
                loading={loading}
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