"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryGrid = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section id="categories" className="py-24 bg-warm-white-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-luxury-gold-600 text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Product Categories
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">
            Explore Our <span className="text-luxury-gold-600">Collections</span>
          </h2>
          <p className="text-body-large text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            From custom cabinetry to premium fixtures, each category represents 
            our commitment to luxury and exceptional craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products/${category.id}`}
              className="group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                {/* Category Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/20 group-hover:bg-charcoal-900/10 transition-colors duration-300" />
                  
                  {/* Product Count */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-medium text-charcoal-700">
                      {category.subcategories.reduce((total, sub) => total + sub.count, 0)} Products
                    </span>
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-3 group-hover:text-luxury-gold-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>

                  {/* Subcategories Preview */}
                  <div className="space-y-1">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <div key={sub.id} className="flex justify-between items-center text-xs">
                        <span className="text-charcoal-600">{sub.name}</span>
                        <span className="text-stone-500">{sub.count}</span>
                      </div>
                    ))}
                    {category.subcategories.length > 3 && (
                      <div className="text-xs text-luxury-gold-600 font-medium pt-1">
                        +{category.subcategories.length - 3} more categories
                      </div>
                    )}
                  </div>

                  {/* View All Button */}
                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <span className="text-sm font-medium text-luxury-gold-600 group-hover:text-luxury-gold-700 transition-colors duration-200">
                      View All {category.name} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid; 