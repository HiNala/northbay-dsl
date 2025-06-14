"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import ProductsHero from './ProductsHero';
import CategoryGrid from './CategoryGrid';
import FeaturedProducts from './FeaturedProducts';
import ProductCatalogueSection from './ProductCatalogueSection';
import ShowroomCTA from './ShowroomCTA';

// Product data - we'll create this separately
const productCategories = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Transform your culinary space with our curated kitchen collections',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      { id: 'cabinetry', name: 'Custom Cabinetry', count: 24 },
      { id: 'countertops', name: 'Countertops', count: 18 },
      { id: 'backsplashes', name: 'Backsplashes', count: 32 },
      { id: 'appliances', name: 'Premium Appliances', count: 45 },
      { id: 'kitchen-hardware', name: 'Hardware & Fixtures', count: 67 },
      { id: 'kitchen-sinks', name: 'Kitchen Sinks', count: 23 }
    ]
  },
  {
    id: 'bathroom',
    name: 'Bathroom', 
    description: 'Create your personal spa sanctuary with luxurious bathroom collections',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      { id: 'vanities', name: 'Vanities & Storage', count: 28 },
      { id: 'bathtubs', name: 'Bathtubs & Soaking Tubs', count: 15 },
      { id: 'showers', name: 'Shower Systems', count: 22 },
      { id: 'bathroom-tile', name: 'Tile & Stone', count: 89 },
      { id: 'bathroom-hardware', name: 'Hardware & Accessories', count: 54 },
      { id: 'bathroom-lighting', name: 'Bathroom Lighting', count: 31 }
    ]
  },
  {
    id: 'lighting',
    name: 'Lighting',
    description: 'Illuminate your spaces with our designer lighting collections',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      { id: 'chandeliers', name: 'Chandeliers', count: 34 },
      { id: 'pendants', name: 'Pendant Lighting', count: 67 },
      { id: 'sconces', name: 'Wall Sconces', count: 45 },
      { id: 'recessed', name: 'Recessed Lighting', count: 23 },
      { id: 'under-cabinet', name: 'Under Cabinet', count: 18 }
    ]
  },
  {
    id: 'hardware',
    name: 'Hardware',
    description: 'Premium hardware and fixtures that perfect every detail',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      { id: 'cabinet-hardware', name: 'Cabinet Hardware', count: 156 },
      { id: 'door-hardware', name: 'Door Hardware', count: 43 },
      { id: 'plumbing-fixtures', name: 'Plumbing Fixtures', count: 78 },
      { id: 'decorative-hardware', name: 'Decorative Hardware', count: 34 }
    ]
  }
];

const sampleProducts = [
  {
    id: 'carrara-marble-island',
    name: 'Handcrafted Carrara Marble Island',
    brand: 'North Bay Designs',
    category: 'kitchen',
    subcategory: 'countertops',
    price: { type: 'custom', display: 'Starting at $4,500' },
    availability: 'Made to Order',
    leadTime: '8-12 weeks',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Imported Italian Carrara marble with integrated breakfast bar and premium brass hardware. Each piece unique with natural veining.',
    features: [
      'Genuine Carrara marble from Italy',
      'Custom fabrication available',
      'Integrated breakfast bar option',
      'Premium brass hardware included',
      'Lifetime warranty on craftsmanship',
      'Professional installation included'
    ],
    specifications: {
      material: 'Carrara Marble',
      finish: 'Polished',
      thickness: '1.25 inches',
      edgeProfile: 'Eased edge standard',
      dimensions: 'Custom sizing available',
      weight: 'Approximately 18 lbs per sq ft'
    },
    careInstructions: 'Seal annually with marble sealer. Clean with pH-neutral stone cleaner only.',
    featured: true,
    newProduct: false,
    tags: ['luxury', 'natural-stone', 'custom', 'italian']
  },
  {
    id: 'professional-dual-fuel-range',
    name: 'Professional Dual-Fuel Range',
    brand: 'Sub-Zero Wolf',
    category: 'kitchen',
    subcategory: 'appliances',
    price: { type: 'msrp', display: '$8,900' },
    availability: 'In Stock',
    leadTime: '2-4 weeks',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    description: '48-inch professional series with convection ovens, precision temperature control, and commercial-grade performance for the home chef.',
    features: [
      '48-inch professional design',
      'Dual convection ovens',
      'Precision temperature control',
      'Commercial-grade BTU output',
      '10-year warranty',
      'Professional installation required'
    ],
    specifications: {
      width: '48 inches',
      height: '36 inches', 
      depth: '27 inches',
      fuel: 'Dual-fuel (gas/electric)',
      btu: '20,000 BTU sealed burners',
      ovenCapacity: '4.6 cu ft per oven'
    },
    featured: true,
    newProduct: true,
    tags: ['professional', 'wolf', 'dual-fuel', 'luxury-appliance']
  },
  {
    id: 'bespoke-walnut-cabinetry',
    name: 'Bespoke Walnut Cabinetry',
    brand: 'North Bay Designs',
    category: 'kitchen',
    subcategory: 'cabinetry',
    price: { type: 'custom', display: 'From $12,500' },
    availability: 'Made to Order',
    leadTime: '10-14 weeks',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Hand-crafted American black walnut with soft-close hardware, custom finishes, and lifetime warranty on craftsmanship.',
    features: [
      'Hand-selected American black walnut',
      'Soft-close Blum hardware',
      'Custom sizing and configuration',
      'Multiple finish options',
      'Lifetime warranty on craftsmanship',
      'Professional design consultation included'
    ],
    specifications: {
      wood: 'American Black Walnut',
      construction: 'Solid wood doors and frames',
      hardware: 'Blum soft-close hinges and slides',
      finish: 'Multiple options available',
      customization: 'Full customization available'
    },
    featured: true,
    newProduct: false,
    tags: ['custom', 'walnut', 'handcrafted', 'luxury']
  }
];

const ProductsPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Filter featured products
    setFeaturedProducts(sampleProducts.filter(product => product.featured));
  }, []);

  return (
    <div className="overflow-x-hidden">
      <EnhancedHeader />
      
      <div className="min-h-screen bg-background">
        <ProductsHero />
        
        <main>
          <CategoryGrid categories={productCategories} />
          <FeaturedProducts products={featuredProducts} />
          <ProductCatalogueSection />
          <ShowroomCTA />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage; 