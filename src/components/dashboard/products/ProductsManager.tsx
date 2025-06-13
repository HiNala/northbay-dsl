"use client";

import { useState, useMemo } from 'react';
import { sampleProducts, productCategories } from '@/data/productsData';
// import ProductsTable from './ProductsTable';
// import ProductFilters from './ProductFilters';
// import ProductModal from './ProductModal';

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
  const [pageSize, setPageSize] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
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

  const handleDeleteProduct = (productId: string) => {
    // In real implementation, this would call an API
    console.log('Delete product:', productId);
    // Show confirmation dialog, then remove from state
  };

  const handleBulkAction = (action: string) => {
    // In real implementation, this would call an API
    console.log('Bulk action:', action, 'on products:', selectedProducts);
    setSelectedProducts([]);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    // In real implementation, this would call an API
    console.log('Save product:', productData);
    setShowProductModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-charcoal-900">Products</h2>
          <div className="bg-stone-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-stone-700">
              {filteredProducts.length} products
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {selectedProducts.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-stone-600">
                {selectedProducts.length} selected
              </span>
              <select
                onChange={(e) => handleBulkAction(e.target.value)}
                className="px-3 py-2 border border-stone-300 rounded-lg text-sm"
                defaultValue=""
              >
                <option value="" disabled>Bulk Actions</option>
                <option value="publish">Publish</option>
                <option value="archive">Archive</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          )}
          
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            className="px-4 py-2 bg-luxury-gold-500 text-charcoal-900 rounded-lg hover:bg-luxury-gold-600 transition-colors font-medium"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Filters and Search - TODO: Implement */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Products Grid - Simple view for now */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200">
          <h3 className="text-lg font-semibold text-charcoal-900">Products ({filteredProducts.length})</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-charcoal-900 mb-2">{product.name}</h4>
                <p className="text-sm text-stone-600 mb-2">{product.brand}</p>
                <p className="text-sm text-luxury-gold-600 font-medium mb-2">{product.price}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'published' ? 'bg-green-100 text-green-800' :
                    product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-stone-100 text-stone-800'
                  }`}>
                    {product.status}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-luxury-gold-600 hover:text-luxury-gold-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Simple Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            <div className="text-sm text-stone-600">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-stone-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-stone-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Simple Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-charcoal-900">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-stone-600">Product form will be implemented here...</p>
              {editingProduct && (
                <div className="mt-4">
                  <p><strong>Name:</strong> {editingProduct.name}</p>
                  <p><strong>Category:</strong> {editingProduct.category}</p>
                  <p><strong>Price:</strong> {editingProduct.price}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-stone-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowProductModal(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 border border-stone-300 rounded-lg text-charcoal-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveProduct({})}
                className="px-4 py-2 bg-luxury-gold-500 text-charcoal-900 rounded-lg hover:bg-luxury-gold-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager; 