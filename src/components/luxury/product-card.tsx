import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, TYPOGRAPHY } from "@/lib/design-system";

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
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card 
      variant="elevated" 
      className={cn("group overflow-hidden hover:shadow-2xl transition-all duration-500", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <Image
          src={product.images[currentImageIndex] || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge */}
        {product.comparePrice && product.price && product.comparePrice > product.price && (
          <div className="absolute top-4 right-4">
            <div className="bg-[#d4af37] text-white px-2 py-1 text-xs font-medium rounded">
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
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button
              variant="primary"
              color="gold"
              className="flex-1"
              onClick={() => onViewDetails?.(product.id)}
            >
              View Details
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button
              variant="outline"
              color="gold"
              className="bg-white/90 backdrop-blur-sm"
              onClick={() => onAddToWishlist?.(product.id)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <CardContent className="p-6">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-3">
          {product.category && (
            <span className={cn(TYPOGRAPHY.accent, "text-[#d4af37]")}>
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
        <h3 className={cn(
          TYPOGRAPHY.subheading,
          "text-xl text-slate-900 mb-2 group-hover:text-[#d4af37] transition-colors line-clamp-2"
        )}>
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className={cn(TYPOGRAPHY.body, "text-slate-600 text-sm mb-4 line-clamp-2")}>
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
      </CardContent>
    </Card>
  );
} 