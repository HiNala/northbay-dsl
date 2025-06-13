"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Upload,
  Copy,
  Archive,
} from "lucide-react"

interface Product {
  id: string;
  name: string;
  description: string | null;
  status: string;
  price: number | null;
  brand: { name: string } | null;
  category: { name: string } | null;
  aiGeneratedDescription: boolean;
  lastAiUpdate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AIGenerationOptions {
  type: 'short' | 'detailed' | 'seo' | 'luxury';
  tone: 'professional' | 'luxury' | 'technical' | 'friendly';
  length: 'brief' | 'medium' | 'detailed';
  includeFeatures: boolean;
  includeBenefits: boolean;
  seoKeywords?: string[];
}

// Mock product data - will be replaced with Prisma queries
const mockProducts = [
  {
    id: "prod-001",
    name: "Modern Kitchen Faucet",
    sku: "KF-001",
    category: "Kitchen",
    brand: "Waterworks",
    price: 1299.00,
    comparePrice: 1599.00,
    stock: 15,
    status: "active",
    image: "/api/placeholder/400/400",
    createdAt: "2024-01-15",
  },
  {
    id: "prod-002",
    name: "Luxury Bathroom Vanity",
    sku: "BV-002",
    category: "Bathroom",
    brand: "Restoration Hardware",
    price: 2499.00,
    comparePrice: 2899.00,
    stock: 3,
    status: "active",
    image: "/api/placeholder/400/400",
    createdAt: "2024-01-14",
  },
  {
    id: "prod-003",
    name: "Cabinet Hardware Set",
    sku: "CH-003",
    category: "Hardware",
    brand: "Emtek",
    price: 299.00,
    comparePrice: null,
    stock: 0,
    status: "draft",
    image: "/api/placeholder/400/400",
    createdAt: "2024-01-13",
  },
  {
    id: "prod-004",
    name: "Designer Light Fixture",
    sku: "LF-004",
    category: "Lighting",
    brand: "Visual Comfort",
    price: 1899.00,
    comparePrice: 2199.00,
    stock: 8,
    status: "active",
    image: "/api/placeholder/400/400",
    createdAt: "2024-01-12",
  },
  {
    id: "prod-005",
    name: "Custom Backsplash Tile",
    sku: "BT-005",
    category: "Tile",
    brand: "Porcelanosa",
    price: 89.00,
    comparePrice: 120.00,
    stock: 245,
    status: "active",
    image: "/api/placeholder/400/400",
    createdAt: "2024-01-11",
  },
]

const categories = ["All", "Kitchen", "Bathroom", "Hardware", "Lighting", "Tile"]
const statuses = ["All", "Active", "Draft", "Archived"]

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant={
              product.status === 'active' ? 'default' :
              product.status === 'draft' ? 'secondary' : 'outline'
            }
          >
            {product.status}
          </Badge>
        </div>
        {product.stock === 0 && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
            <CardDescription>
              {product.brand} • {product.category}
            </CardDescription>
            <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Product actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${product.price}</span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.comparePrice}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Stock: {product.stock} units
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              Created {product.createdAt}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiGenerating, setAiGenerating] = useState<Set<string>>(new Set());
  const [showAiOptions, setShowAiOptions] = useState<string | null>(null);
  const [aiOptions, setAiOptions] = useState<AIGenerationOptions>({
    type: 'luxury',
    tone: 'luxury',
    length: 'medium',
    includeFeatures: true,
    includeBenefits: true,
  });

  // Check authentication and permissions
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user) {
      router.push('/auth/login');
      return;
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'employee', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      router.push('/');
      return;
    }
    
    fetchProducts();
  }, [session, status, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?include=brand,category&admin=true');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIDescription = async (productId: string, options?: AIGenerationOptions) => {
    setAiGenerating(prev => new Set(prev).add(productId));
    
    try {
      const response = await fetch('/api/products/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          options: options || aiOptions,
          updateProduct: true,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update the product in the local state
        setProducts(prev => prev.map(p => 
          p.id === productId 
            ? { 
                ...p, 
                description: result.data.description,
                aiGeneratedDescription: true,
                lastAiUpdate: new Date().toISOString()
              }
            : p
        ));
        
        alert(`✨ AI description generated successfully! Quality Score: ${result.data.quality_score}/100`);
      } else {
        const error = await response.json();
        alert(`Failed to generate description: ${error.error}`);
      }
    } catch (error) {
      console.error('AI generation error:', error);
      alert('Failed to generate description. Please try again.');
    } finally {
      setAiGenerating(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      setShowAiOptions(null);
    }
  };

  const updateProductStatus = async (productId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setProducts(prev => prev.map(p => 
          p.id === productId ? { ...p, status: newStatus } : p
        ));
      }
    } catch (error) {
      console.error('Failed to update product status:', error);
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedProducts.size === 0) return;
    
    const updates = Array.from(selectedProducts).map(productId =>
      updateProductStatus(productId, newStatus)
    );
    
    await Promise.all(updates);
    setSelectedProducts(new Set());
  };

  const handleBulkAIGeneration = async () => {
    if (selectedProducts.size === 0) return;
    
    const confirmGenerate = confirm(
      `Generate AI descriptions for ${selectedProducts.size} selected products? This will overwrite existing descriptions.`
    );
    
    if (!confirmGenerate) return;
    
    for (const productId of selectedProducts) {
      await generateAIDescription(productId);
      // Add delay between requests to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setSelectedProducts(new Set());
  };

  const toggleProductSelection = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const selectAllProducts = () => {
    const filteredProductIds = filteredProducts.map(p => p.id);
    setSelectedProducts(new Set(filteredProductIds));
  };

  const deselectAllProducts = () => {
    setSelectedProducts(new Set());
  };

  // Filter products based on status and search
  const filteredProducts = products.filter(product => {
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🤖 AI Product Management</h1>
          <p className="text-gray-600">Manage your product catalog with AI-powered descriptions</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedProducts.size > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusUpdate('published')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  📢 Publish ({selectedProducts.size})
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('draft')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  📝 Draft ({selectedProducts.size})
                </button>
                <button
                  onClick={handleBulkAIGeneration}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  🤖 Bulk AI ({selectedProducts.size})
                </button>
                <button
                  onClick={deselectAllProducts}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Selection Controls */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={selectAllProducts}
              className="text-sm text-amber-600 hover:text-amber-700"
            >
              Select All ({filteredProducts.length})
            </button>
            <span className="text-sm text-gray-500">
              {selectedProducts.size} selected
            </span>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                      onChange={selectedProducts.size === filteredProducts.length ? deselectAllProducts : selectAllProducts}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className={selectedProducts.has(product.id) ? 'bg-amber-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.brand?.name} • {product.category?.name}
                        </div>
                        {product.price && (
                          <div className="text-sm font-semibold text-green-600">
                            ${Number(product.price).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {product.description ? (
                          <div>
                            <p className="text-sm text-gray-900 truncate">{product.description}</p>
                            {product.aiGeneratedDescription && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 mt-1">
                                🤖 AI Generated
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">No description</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.status}
                        onChange={(e) => updateProductStatus(product.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-amber-500 ${
                          product.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : product.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => generateAIDescription(product.id)}
                          disabled={aiGenerating.has(product.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            aiGenerating.has(product.id)
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : process.env.NEXT_PUBLIC_AI_ENABLED === 'true'
                              ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                          title={process.env.NEXT_PUBLIC_AI_ENABLED === 'true' 
                            ? 'Generate AI description' 
                            : 'AI not configured - will use fallback description'}
                        >
                          {aiGenerating.has(product.id) ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600 mr-1"></div>
                              Generating...
                            </>
                          ) : process.env.NEXT_PUBLIC_AI_ENABLED === 'true' ? (
                            <>🤖 AI Generate</>
                          ) : (
                            <>⚡ Generate</>
                          )}
                        </button>
                        
                        <button
                          onClick={() => setShowAiOptions(showAiOptions === product.id ? null : product.id)}
                          className="text-gray-400 hover:text-gray-600"
                          title="AI Options"
                        >
                          ⚙️
                        </button>
                      </div>
                      
                      {/* AI Options Panel */}
                      {showAiOptions === product.id && (
                        <div className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 right-0">
                          <h4 className="font-medium text-gray-900 mb-3">🤖 AI Generation Options</h4>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                              <select
                                value={aiOptions.type}
                                onChange={(e) => setAiOptions(prev => ({ ...prev, type: e.target.value as any }))}
                                className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                              >
                                <option value="luxury">✨ Luxury</option>
                                <option value="detailed">📖 Detailed</option>
                                <option value="seo">🔍 SEO Focused</option>
                                <option value="short">⚡ Short</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                              <select
                                value={aiOptions.length}
                                onChange={(e) => setAiOptions(prev => ({ ...prev, length: e.target.value as any }))}
                                className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                              >
                                <option value="brief">Brief (50-100 words)</option>
                                <option value="medium">Medium (100-200 words)</option>
                                <option value="detailed">Detailed (200-300 words)</option>
                              </select>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={aiOptions.includeFeatures}
                                  onChange={(e) => setAiOptions(prev => ({ ...prev, includeFeatures: e.target.checked }))}
                                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Features</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={aiOptions.includeBenefits}
                                  onChange={(e) => setAiOptions(prev => ({ ...prev, includeBenefits: e.target.checked }))}
                                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Benefits</span>
                              </label>
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                              <button
                                onClick={() => generateAIDescription(product.id, aiOptions)}
                                disabled={aiGenerating.has(product.id)}
                                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50"
                              >
                                Generate with Options
                              </button>
                              <button
                                onClick={() => setShowAiOptions(null)}
                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                        className="text-amber-600 hover:text-amber-900 mr-3"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this product?')) {
                            // Add delete functionality
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📦 No products found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </div>
  );
} 