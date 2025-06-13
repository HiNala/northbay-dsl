import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        // Primary luxury gold button
        default: "bg-nb-gold-500 text-white hover:bg-nb-gold-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200",
        
        // Secondary charcoal button
        secondary: "bg-nb-neutral-800 text-white hover:bg-nb-neutral-900 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200",
        
        // Outline style for secondary actions
        outline: "border-2 border-nb-gold-500 text-nb-gold-600 hover:bg-nb-gold-50 hover:border-nb-gold-600 transition-all duration-200",
        
        // Ghost style for tertiary actions
        ghost: "text-nb-neutral-700 hover:bg-nb-neutral-100 hover:text-nb-neutral-900 transition-all duration-200",
        
        // Destructive actions
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-200",
        
        // Dashboard-specific variants
        dashboard: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200",
        
        // Luxury link style
        link: "text-nb-gold-600 underline-offset-4 hover:underline hover:text-nb-gold-700 transition-colors duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        
        <div className={cn("flex items-center gap-2", loading && "invisible")}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </div>
        
        {/* Luxury shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 