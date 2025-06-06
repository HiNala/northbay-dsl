import React from "react";
import { cn, TYPOGRAPHY, PATTERNS, SPACING } from "@/lib/design-system";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function LuxuryHero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  badge,
  className,
}: HeroProps) {
  return (
    <section className={cn(PATTERNS.hero.fullscreen, className)}>
      {/* Luxury gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #B79A6B 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #B79A6B 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />

      {/* Hero content */}
      <div className={cn(PATTERNS.hero.content, SPACING.container.default)}>
        {/* Premium badge */}
        {badge && (
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              {badge.icon && <span className="mr-3">{badge.icon}</span>}
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                {badge.text}
              </span>
            </div>
          </div>
        )}

        {/* Main heading with luxury typography */}
        <h1 className={cn(
          TYPOGRAPHY.hero,
          "text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight font-serif"
        )}>
          {title}
          {subtitle && (
            <span className="block bg-gradient-to-r from-gold-400 to-gold-200 bg-clip-text text-transparent">
              {subtitle}
            </span>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className={cn(
            TYPOGRAPHY.bodyLarge,
            "text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed"
          )}>
            {description}
          </p>
        )}

        {/* CTA buttons */}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {primaryCTA && (
              <button
                className={cn(
                  "px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                  TYPOGRAPHY.button
                )}
                onClick={primaryCTA.onClick}
              >
                {primaryCTA.text}
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            )}
            {secondaryCTA && (
              <button
                className={cn(
                  "px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-md font-medium text-lg transition-all duration-300",
                  TYPOGRAPHY.button
                )}
                onClick={secondaryCTA.onClick}
              >
                {secondaryCTA.text}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
} 