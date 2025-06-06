"use client"

import React, { useState } from 'react'
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

export default function ProductsManagement() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter products based on selections
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || product.status === selectedStatus.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesStatus && matchesSearch
  })

  const stats = {
    total: mockProducts.length,
    active: mockProducts.filter(p => p.status === 'active').length,
    draft: mockProducts.filter(p => p.status === 'draft').length,
    outOfStock: mockProducts.filter(p => p.stock === 0).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Products
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Badge className="h-4 w-4 rounded-full p-0 text-[10px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Live in catalog
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Products</CardTitle>
            <Badge variant="secondary" className="h-4 w-4 rounded-full p-0 text-[10px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
            <p className="text-xs text-muted-foreground">
              Being prepared
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Badge variant="destructive" className="h-4 w-4 rounded-full p-0 text-[10px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.outOfStock}</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, SKUs, or brands..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px]">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[100px]">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {stats.total} products
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Button variant="outline" size="sm">Grid</Button>
            <Button variant="outline" size="sm">List</Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                No products match your current filters. Try adjusting your search criteria or add some new products.
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 