"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedProducts = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-luxury-gold-600 text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Featured Collection
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">
            Designer <span className="text-luxury-gold-600">Favorites</span>
          </h2>
          <p className="text-body-large text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked by our design team, these exceptional pieces represent 
            the pinnacle of luxury and craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/item/${product.id}`}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                {/* Product Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.newProduct && (
                      <span className="bg-luxury-gold-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                    {product.featured && (
                      <span className="bg-charcoal-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Brand Logo */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-charcoal-700">
                      {product.brand}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 bg-charcoal-900/80 flex items-center justify-center transition-all duration-300">
                      <div className="text-center text-white">
                        <div className="text-sm font-medium mb-2">Learn More</div>
                        <div className="text-xs opacity-80">Call for pricing & availability</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-2 group-hover:text-luxury-gold-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing & Availability */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-lg font-semibold text-charcoal-900">
                        {product.price.display}
                      </div>
                      <div className="text-xs text-charcoal-600">
                        {product.availability}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-stone-500">Lead Time</div>
                      <div className="text-sm font-medium text-charcoal-700">
                        {product.leadTime}
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="border-t border-stone-100 pt-4">
                    <div className="text-xs text-stone-500 mb-2 uppercase tracking-wide">
                      Key Features
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, featureIndex) => (
                        <span 
                          key={featureIndex}
                          className="text-xs bg-stone-100 text-charcoal-600 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/products/all"
            className="border-2 border-luxury-gold-500 text-luxury-gold-600 px-10 py-4 text-sm tracking-wide font-medium hover:bg-luxury-gold-500 hover:text-white transition-all duration-300"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 