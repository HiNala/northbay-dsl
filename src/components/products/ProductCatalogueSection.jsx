"use client";

import Image from 'next/image';
import Link from 'next/link';

const ProductCatalogueSection = () => {
  return (
    <section className="py-24 bg-warm-white-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <div className="text-luxury-gold-600 text-sm tracking-[0.3em] uppercase font-medium mb-6">
              Our Philosophy
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-light text-charcoal-900 mb-8">
              Curated for<br />
              <span className="text-luxury-gold-600">Extraordinary Living</span>
            </h2>
            
            <p className="text-body-large text-charcoal-600 mb-8 leading-relaxed">
              Every product in our collection is personally selected by our design team. We partner 
              exclusively with artisans and manufacturers who share our commitment to quality, 
              sustainability, and timeless beauty.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-luxury-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-2">Quality Guaranteed</h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    Each product comes with comprehensive warranties and our lifetime support commitment.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-luxury-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-2">Expert Installation</h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    Professional installation services ensure your products perform beautifully for years to come.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-luxury-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-2">Personalized Service</h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    Our design consultants work closely with you to select products that perfectly fit your vision.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/design-services"
                className="bg-luxury-gold-500 text-charcoal-900 px-8 py-4 text-sm tracking-wide font-semibold hover:bg-luxury-gold-600 transition-all duration-300 text-center"
              >
                DESIGN CONSULTATION
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-charcoal-300 text-charcoal-700 px-8 py-4 text-sm tracking-wide font-medium hover:bg-charcoal-900 hover:text-white transition-all duration-300 text-center"
              >
                REQUEST CATALOG
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Product Showcase"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold-600 mb-1">500+</div>
                <div className="text-sm text-charcoal-600">Premium Products</div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-charcoal-900 rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold-400 mb-1">15+</div>
                <div className="text-sm text-warm-white-100">Luxury Brands</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogueSection; 