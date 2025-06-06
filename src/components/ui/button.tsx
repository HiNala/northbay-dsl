import { cn } from "@/lib/design-system";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "minimal" | "elegant";
  size?: "sm" | "md" | "lg";
  color?: "gold" | "navy" | "walnut";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", color = "gold", ...props }, ref) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center transition-all duration-300 font-medium rounded-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "focus:outline-none focus:ring-2 focus:ring-offset-2"
    );

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base", 
      lg: "px-8 py-4 text-lg",
    };

    const colorStyles = {
      gold: {
        primary: "bg-[#d4af37] hover:bg-[#9e7c0c] text-white focus:ring-[#d4af37]",
        outline: "border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white",
        minimal: "text-[#d4af37] hover:underline",
        elegant: "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow",
      },
      navy: {
        primary: "bg-[#212A3E] hover:bg-[#0F1729] text-white focus:ring-[#212A3E]",
        outline: "border-2 border-[#212A3E] text-[#212A3E] hover:bg-[#212A3E] hover:text-white",
        minimal: "text-[#212A3E] hover:underline", 
        elegant: "border border-[#212A3E] text-[#212A3E] hover:bg-[#212A3E] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow",
      },
      walnut: {
        primary: "bg-[#8B4513] hover:bg-[#3A2410] text-white focus:ring-[#8B4513]",
        outline: "border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white",
        minimal: "text-[#8B4513] hover:underline",
        elegant: "border border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow",
      },
    };

    return (
      <button
        className={cn(
          baseStyles,
          sizeStyles[size],
          colorStyles[color][variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button }; 