import React from "react";
import { cn, COLORS } from "@/lib/design-system";

interface DividerProps {
  className?: string;
  variant?: "classic" | "minimal" | "ornate" | "double";
  color?: "gold" | "navy" | "walnut";
  width?: "full" | "center";
  withIcon?: boolean;
  icon?: React.ReactNode;
}

export function LuxuryDivider({
  className,
  variant = "classic",
  color = "gold",
  width = "center",
  withIcon = false,
  icon,
}: DividerProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: COLORS.gold.medium,
    navy: COLORS.navy.medium,
    walnut: COLORS.walnut.medium,
  };

  const selectedColor = colorMap[color];

  // Width classes
  const widthClasses = {
    full: "w-full",
    center: "w-1/2 mx-auto",
  };

  // Base divider styles
  const baseStyles = cn("relative my-12", widthClasses[width], className);

  // Default diamond icon
  const DiamondIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L8 8h8L12 2zm-8 6l4 10 4-10H4zm12 0l4 10 4-10h-8z" />
    </svg>
  );

  // Render different divider variants
  switch (variant) {
    case "minimal":
      return (
        <div className={baseStyles}>
          <div
            className="h-px"
            style={{ background: `linear-gradient(to right, transparent, ${selectedColor}, transparent)` }}
          />
          {withIcon && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
              <div style={{ color: selectedColor }}>
                {icon || <DiamondIcon />}
              </div>
            </div>
          )}
        </div>
      );

    case "ornate":
      return (
        <div className={baseStyles}>
          <div className="flex items-center justify-center">
            <div
              className="flex-grow h-px bg-transparent"
              style={{ background: `linear-gradient(to right, transparent, ${selectedColor})` }}
            />
            <div className="mx-4 flex items-center">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: selectedColor }} />
              <div className="w-2 h-2 mx-2 rounded-full" style={{ backgroundColor: selectedColor }} />
              {withIcon ? (
                <div className="mx-2" style={{ color: selectedColor }}>
                  {icon || <DiamondIcon />}
                </div>
              ) : (
                <div className="w-3 h-3 mx-2 rounded-full" style={{ backgroundColor: selectedColor }} />
              )}
              <div className="w-2 h-2 mx-2 rounded-full" style={{ backgroundColor: selectedColor }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: selectedColor }} />
            </div>
            <div
              className="flex-grow h-px bg-transparent"
              style={{ background: `linear-gradient(to left, transparent, ${selectedColor})` }}
            />
          </div>
        </div>
      );

    case "double":
      return (
        <div className={baseStyles}>
          <div className="relative">
            <div
              className="h-px mb-1.5"
              style={{ background: `linear-gradient(to right, transparent, ${selectedColor}, transparent)` }}
            />
            <div
              className="h-px"
              style={{ background: `linear-gradient(to right, transparent, ${selectedColor}, transparent)` }}
            />
            {withIcon && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                <div style={{ color: selectedColor }}>
                  {icon || <DiamondIcon />}
                </div>
              </div>
            )}
          </div>
        </div>
      );

    // Classic is default
    default:
      return (
        <div className={baseStyles}>
          <div className="flex items-center">
            <div className="flex-grow">
              <div className="h-0.5" style={{ backgroundColor: selectedColor }} />
            </div>
            {withIcon && (
              <div className="mx-4" style={{ color: selectedColor }}>
                {icon || <DiamondIcon />}
              </div>
            )}
            <div className="flex-grow">
              <div className="h-0.5" style={{ backgroundColor: selectedColor }} />
            </div>
          </div>
        </div>
      );
  }
} 