import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price?: number;
    comparePrice?: number;
    images: string[];
    description?: string;
    inStock?: boolean;
    category?: string;
    brand?: string;
  };
  onAddToWishlist?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
  className?: string;
}

export function ProductCard({
  product,
  onAddToWishlist,
  onViewDetails,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Placeholder */}
      <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM5 4h14v8.36l-2.59-2.59a1 1 0 0 0-1.41 0L12 12.77l-2.59-2.59a1 1 0 0 0-1.41 0L5 13.18V4zM5 16v-1.82l4-4 2.59 2.59a1 1 0 0 0 1.41 0L16 9.77l3 3V16H5z"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
              </svg>
            </div>
            <p className="text-slate-500 text-sm font-medium">{product.category}</p>
          </div>
        </div>
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Badge */}
        {product.comparePrice && product.price && product.comparePrice > product.price && (
          <div className="absolute top-4 right-4">
            <div className="bg-gold-500 text-white px-2 py-1 text-xs font-medium rounded">
              Sale
            </div>
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute top-4 left-4">
            <div className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
              Out of Stock
            </div>
          </div>
        )}

        {/* Hover Actions */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex gap-2">
            <button
              className="flex-1 px-4 py-2 bg-gold-500 text-white rounded-lg font-semibold hover:bg-gold-600 transition-colors"
              onClick={() => onViewDetails?.(product.id)}
            >
              View Details →
            </button>
            <button
              className="px-4 py-2 bg-white/90 text-gray-700 rounded-lg hover:bg-white transition-colors"
              onClick={() => onAddToWishlist?.(product.id)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-3">
          {product.category && (
            <span className="text-gold-500 text-sm font-medium">
              {product.category}
            </span>
          )}
          {product.brand && (
            <span className="text-xs text-slate-500 font-medium">
              {product.brand}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-gold-500 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.price && (
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(product.price)}
              </span>
            )}
            {product.comparePrice && product.comparePrice > (product.price || 0) && (
              <span className="text-lg text-slate-500 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center">
            {product.inStock ? (
              <div className="flex items-center text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                In Stock
              </div>
            ) : (
              <div className="flex items-center text-red-600 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 