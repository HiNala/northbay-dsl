import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useToastActions } from '@/components/ui/toast';

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  description?: string;
  price?: number;
  comparePrice?: number;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  priority: number;
  availability?: string;
  leadTime?: string;
  tags: string[];
  Category?: {
    id: string;
    name: string;
    slug: string;
  };
  Brand?: {
    id: string;
    name: string;
    slug: string;
  };
  Images?: {
    id: string;
    url: string;
    alt?: string;
    position: number;
  }[];
  Creator?: {
    Profile?: {
      fullName?: string;
    };
  };
  ApprovedBy?: {
    Profile?: {
      fullName?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ProductFilters {
  search?: string;
  category?: string;
  status?: string;
  brand?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useProducts(filters: ProductFilters = {}) {
  const { data: session } = useSession();
  const { error: showError, success: showSuccess } = useToastActions();
  
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (currentFilters: ProductFilters) => {
    if (!session) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (currentFilters.search) params.set('search', currentFilters.search);
      if (currentFilters.category) params.set('category', currentFilters.category);
      if (currentFilters.status) params.set('status', currentFilters.status);
      if (currentFilters.brand) params.set('brand', currentFilters.brand);
      if (currentFilters.page) params.set('page', currentFilters.page.toString());
      if (currentFilters.limit) params.set('limit', currentFilters.limit.toString());
      if (currentFilters.sortBy) params.set('sortBy', currentFilters.sortBy);
      if (currentFilters.sortOrder) params.set('sortOrder', currentFilters.sortOrder);

      const response = await fetch(`/api/dashboard/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProductsResponse = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [session, showError]);

  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  const refetch = useCallback(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  const createProduct = useCallback(async (productData: Partial<Product>) => {
    if (!session) return;

    setLoading(true);
    try {
      const response = await fetch('/api/dashboard/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      const newProduct = await response.json();
      showSuccess('Product created successfully!');
      refetch();
      return newProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create product';
      showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, showError, showSuccess, refetch]);

  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    if (!session) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/dashboard/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      const updatedProduct = await response.json();
      showSuccess('Product updated successfully!');
      refetch();
      return updatedProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, showError, showSuccess, refetch]);

  const deleteProduct = useCallback(async (id: string) => {
    if (!session) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/dashboard/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete product');
      }

      showSuccess('Product deleted successfully!');
      refetch();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
      showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, showError, showSuccess, refetch]);

  const bulkUpdateProducts = useCallback(async (productIds: string[], action: string, actionData?: any) => {
    if (!session) return;

    setLoading(true);
    try {
      const response = await fetch('/api/dashboard/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds,
          action,
          data: actionData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update products');
      }

      const result = await response.json();
      showSuccess(result.message);
      refetch();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update products';
      showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, showError, showSuccess, refetch]);

  return {
    data,
    loading,
    error,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkUpdateProducts,
  };
}
