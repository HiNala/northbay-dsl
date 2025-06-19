import { Metadata } from 'next';
import { Suspense } from 'react';
import DynamicProductsPage from '@/components/products/DynamicProductsPage';

export const metadata: Metadata = {
  title: 'Products | Northbay Kitchen & Bath | Luxury Kitchen & Bathroom Products',
  description: 'Explore our curated collection of luxury kitchen and bathroom products. From custom cabinetry to premium appliances, discover the finest materials and craftsmanship.',
  keywords: ['luxury kitchen products', 'bathroom products', 'custom cabinetry', 'premium appliances', 'napa valley', 'kitchen design', 'bathroom design'],
  openGraph: {
    title: 'Products | Northbay Kitchen & Bath',
    description: 'Curated collection of luxury kitchen and bathroom products featuring exceptional quality and timeless design.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Luxury Kitchen Products by Northbay Kitchen & Bath',
      },
    ],
    type: 'website',
  },
};

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white-50 to-stone-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-luxury-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-charcoal-600">Loading products...</p>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <DynamicProductsPage />
    </Suspense>
  );
} 