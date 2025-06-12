"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LuxuryProductCardProps {
  name?: string;
  price?: string;
  originalPrice?: string;
  image?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  badge?: string;
  onAdd?: () => void;
  onFavorite?: () => void;
  className?: string;
}

function LuxuryProductCard({
  name = "Premium Kitchen Faucet",
  price = "$1,299",
  originalPrice = "$1,599",
  image = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
  description = "Handcrafted premium kitchen faucet with brushed gold finish and advanced water filtration system.",
  rating = 4.9,
  reviewCount = 87,
  category = "Kitchen Fixtures",
  badge = "New",
  onAdd,
  onFavorite,
  className,
}: LuxuryProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotationX = (y - centerY) / 20;
      const rotationY = -(x - centerX) / 20;
      
      setRotation({ x: rotationX, y: rotationY });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  const containerVariants = {
    rest: { 
      scale: 1,
      y: 0,
    },
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
      }
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const overlayVariants = {
    rest: { 
      y: "100%", 
      opacity: 0,
    },
    hover: { 
      y: "0%", 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    rest: { 
      opacity: 0, 
      y: 20,
    },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        initial="rest"
        whileHover="hover"
        variants={containerVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        className={cn(
          "relative w-80 rounded-2xl border border-gold-200/50 bg-white text-navy-900 overflow-hidden",
          "shadow-xl shadow-black/10 cursor-pointer group transition-all duration-300",
          "backdrop-blur-sm bg-white/95",
          className
        )}
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="h-64 w-full object-cover"
            variants={imageVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Favorite Button */}
          <motion.button
            onClick={handleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300",
              isFavorite 
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25" 
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </motion.button>

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {badge}
            </div>
          )}

          {/* Category */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4 transition-colors duration-200",
                    i < Math.floor(rating) 
                      ? "text-gold-400 fill-current" 
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {rating} ({reviewCount} reviews)
            </span>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-navy-900 group-hover:text-gold-600 transition-colors duration-300">
              {name}
            </h3>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gold-600">{price}</span>
              {originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Reveal Overlay */}
        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-white/98 backdrop-blur-xl flex flex-col justify-end border border-gold-200/50 rounded-2xl"
        >
          <div className="p-6 space-y-4">
            {/* Product Description */}
            <motion.div variants={contentVariants}>
              <h4 className="font-semibold mb-2 text-navy-900">Product Details</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={contentVariants}>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gold-50 rounded-lg p-3 text-center border border-gold-200/30">
                  <div className="font-semibold text-navy-900">Premium Finish</div>
                  <div className="text-gray-600">Brushed Gold</div>
                </div>
                <div className="bg-gold-50 rounded-lg p-3 text-center border border-gold-200/30">
                  <div className="font-semibold text-navy-900">Warranty</div>
                  <div className="text-gray-600">Lifetime</div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={contentVariants} className="space-y-3">
              <motion.button
                onClick={onAdd}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 font-medium bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white rounded-lg shadow-lg shadow-gold-600/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-10 font-medium border border-gold-300 bg-white hover:bg-gold-50 text-navy-900 rounded-lg transition-all duration-300"
              >
                View Details
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface FeaturedProductsSectionProps {
  title?: string;
  subtitle?: string;
  products?: LuxuryProductCardProps[];
}

export function FeaturedProductsSection({
  title = "Featured Premium Fixtures",
  subtitle = "Discover our curated collection of luxury kitchen and bath fixtures, designed to elevate your space with unmatched elegance and functionality.",
  products = [
    {
      name: "Venetian Gold Kitchen Faucet",
      price: "$1,299",
      originalPrice: "$1,599",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
      description: "Handcrafted premium kitchen faucet with brushed gold finish and advanced water filtration system. Features pull-down spray head and ceramic disc valves.",
      rating: 4.9,
      reviewCount: 87,
      category: "Kitchen Fixtures",
      badge: "New",
    },
    {
      name: "Marble Vessel Sink",
      price: "$899",
      originalPrice: "$1,199",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
      description: "Exquisite Carrara marble vessel sink with natural veining patterns. Each piece is unique and adds timeless elegance to any bathroom.",
      rating: 4.8,
      reviewCount: 124,
      category: "Bath Fixtures",
      badge: "Bestseller",
    },
    {
      name: "Crystal Chandelier Light",
      price: "$2,499",
      originalPrice: "$3,299",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop",
      description: "Stunning crystal chandelier with LED technology and smart home integration. Perfect centerpiece for luxury dining rooms and entryways.",
      rating: 5.0,
      reviewCount: 56,
      category: "Lighting",
      badge: "Exclusive",
    },
  ],
}: FeaturedProductsSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gold-50/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-gold-600" />
            <span className="text-sm font-medium text-gold-600 uppercase tracking-wider">Premium Collection</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight font-serif"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              <LuxuryProductCard
                {...product}
                onAdd={() => console.log(`Added ${product.name} to cart`)}
                onFavorite={() => console.log(`Toggled favorite for ${product.name}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-white font-medium rounded-lg shadow-lg shadow-gold-600/25 hover:shadow-xl hover:shadow-gold-600/30 transition-all duration-300"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default function LuxuryFeaturedProducts() {
  return <FeaturedProductsSection />;
} 