import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn, TYPOGRAPHY } from "@/lib/design-system";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
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
  backgroundImage = "/images/luxury-kitchen-hero.jpg",
  primaryCTA,
  secondaryCTA,
  badge,
  className,
}: HeroProps) {
  return (
    <section className={cn("relative h-screen flex items-center justify-center overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Luxury Kitchen & Bath Design"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-6xl px-6">
        {/* Badge */}
        {badge && (
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              {badge.icon && <span className="mr-2">{badge.icon}</span>}
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                {badge.text}
              </span>
            </div>
          </div>
        )}

        {/* Main Heading */}
        <h1 className={cn(
          TYPOGRAPHY.heading,
          "text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
        )}>
          {title}
          {subtitle && (
            <span className="block bg-gradient-to-r from-[#d4af37] to-[#f7e9c3] bg-clip-text text-transparent">
              {subtitle}
            </span>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className={cn(
            TYPOGRAPHY.body,
            "text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto"
          )}>
            {description}
          </p>
        )}

        {/* Call-to-Action Buttons */}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Button
                size="lg"
                variant="primary"
                color="gold"
                className="px-8 py-4 text-lg"
                onClick={primaryCTA.onClick}
              >
                {primaryCTA.text}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            )}
            {secondaryCTA && (
              <Button
                size="lg"
                variant="outline"
                color="gold"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                onClick={secondaryCTA.onClick}
              >
                {secondaryCTA.text}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
} 