import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "rounded-md border-nb-neutral-300 focus:border-nb-gold-500 focus:ring-nb-gold-500/20",
        luxury: "rounded-lg border-nb-neutral-300 bg-white shadow-sm focus:border-nb-gold-500 focus:ring-nb-gold-500/20 focus:shadow-md",
        dashboard: "rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500/20",
        minimal: "border-0 border-b-2 border-nb-neutral-300 rounded-none bg-transparent focus:border-nb-gold-500 focus:ring-0 px-0",
      },
      inputSize: {
        default: "h-10",
        sm: "h-9 px-2 text-sm",
        lg: "h-12 px-4 text-base",
        xl: "h-14 px-6 text-lg",
      },
      state: {
        default: "",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        success: "border-green-500 focus:border-green-500 focus:ring-green-500/20",
        warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      state: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  success?: string
  warning?: string
  helper?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    inputSize,
    state,
    type,
    label,
    error,
    success,
    warning,
    helper,
    leftIcon,
    rightIcon,
    leftAddon,
    rightAddon,
    id,
    ...props
  }, ref) => {
    const inputId = id || React.useId()
    
    // Determine state based on props
    const currentState = error ? "error" : success ? "success" : warning ? "warning" : state
    
    const message = error || success || warning || helper

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none text-nb-neutral-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {/* Left addon */}
          {leftAddon && (
            <div className="absolute left-0 top-0 h-full flex items-center bg-nb-neutral-50 border border-r-0 border-nb-neutral-300 rounded-l-md px-3">
              <span className="text-sm text-nb-neutral-500">{leftAddon}</span>
            </div>
          )}
          
          {/* Left icon */}
          {leftIcon && !leftAddon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-nb-neutral-400">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, state: currentState }),
              leftIcon && !leftAddon && "pl-10",
              rightIcon && !rightAddon && "pr-10",
              leftAddon && "pl-16 rounded-l-none",
              rightAddon && "pr-16 rounded-r-none",
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />
          
          {/* Right icon */}
          {rightIcon && !rightAddon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-nb-neutral-400">
              {rightIcon}
            </div>
          )}
          
          {/* Right addon */}
          {rightAddon && (
            <div className="absolute right-0 top-0 h-full flex items-center bg-nb-neutral-50 border border-l-0 border-nb-neutral-300 rounded-r-md px-3">
              <span className="text-sm text-nb-neutral-500">{rightAddon}</span>
            </div>
          )}
        </div>
        
        {/* Message */}
        {message && (
          <p className={cn(
            "text-sm",
            error && "text-red-600",
            success && "text-green-600", 
            warning && "text-yellow-600",
            !error && !success && !warning && "text-nb-neutral-600"
          )}>
            {message}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants } 