import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "minimal" | "elegant" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
  color?: "gold" | "navy" | "walnut";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", color = "gold", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const baseStyles = cn(
      "inline-flex items-center justify-center transition-all duration-300 font-medium rounded-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "focus:outline-none focus:ring-2 focus:ring-offset-2"
    );

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base", 
      lg: "px-8 py-4 text-lg",
      icon: "h-10 w-10 p-0",
    };

    const colorStyles = {
      gold: {
        primary: "bg-[#d4af37] hover:bg-[#9e7c0c] text-white focus:ring-[#d4af37]",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-300",
        outline: "border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white",
        minimal: "text-[#d4af37] hover:underline",
        elegant: "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow",
      },
      navy: {
        primary: "bg-[#212A3E] hover:bg-[#0F1729] text-white focus:ring-[#212A3E]",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-300",
        outline: "border-2 border-[#212A3E] text-[#212A3E] hover:bg-[#212A3E] hover:text-white",
        minimal: "text-[#212A3E] hover:underline", 
        elegant: "border border-[#212A3E] text-[#212A3E] hover:bg-[#212A3E] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow",
      },
      walnut: {
        primary: "bg-[#8B4513] hover:bg-[#3A2410] text-white focus:ring-[#8B4513]",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-300",
        outline: "border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white",
        minimal: "text-[#8B4513] hover:underline",
        elegant: "border border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow",
      },
    };

    return (
      <Comp
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