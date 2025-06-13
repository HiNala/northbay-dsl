import * as React from "react"
import { cn } from "@/lib/utils"

// Skeleton Loading Components
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "animate-shimmer bg-gradient-to-r from-nb-neutral-200 via-nb-neutral-100 to-nb-neutral-200 bg-[length:200%_100%] rounded-md",
      className
    )}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

// Loading Spinner
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "gold" | "neutral" | "blue"
  className?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ size = "md", color = "gold", className }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6", 
      lg: "h-8 w-8",
      xl: "h-12 w-12"
    }
    
    const colorClasses = {
      gold: "border-nb-gold-500 border-t-transparent",
      neutral: "border-nb-neutral-400 border-t-transparent",
      blue: "border-blue-500 border-t-transparent"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-2",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      />
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

// Loading Dots
const LoadingDots = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div ref={ref} className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 bg-nb-gold-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
)
LoadingDots.displayName = "LoadingDots"

// Card Loading Skeleton
const CardSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div ref={ref} className={cn("space-y-4 p-6 border rounded-lg", className)}>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  )
)
CardSkeleton.displayName = "CardSkeleton"

// Table Row Skeleton
const TableRowSkeleton = React.forwardRef<HTMLTableRowElement, { columns?: number }>(
  ({ columns = 4 }, ref) => (
    <tr ref={ref} className="border-b">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
)
TableRowSkeleton.displayName = "TableRowSkeleton"

// Product Grid Skeleton
const ProductGridSkeleton = React.forwardRef<HTMLDivElement, { count?: number }>(
  ({ count = 6 }, ref) => (
    <div 
      ref={ref} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
)
ProductGridSkeleton.displayName = "ProductGridSkeleton"

// Dashboard Stats Skeleton
const StatsCardSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div ref={ref} className={cn("p-6 bg-white rounded-lg border", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  )
)
StatsCardSkeleton.displayName = "StatsCardSkeleton"

// Loading Overlay
interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  text?: string
}

const LoadingOverlay = ({ isLoading, children, className, text = "Loading..." }: LoadingOverlayProps) => (
  <div className={cn("relative", className)}>
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-nb-neutral-600 font-medium">{text}</p>
        </div>
      </div>
    )}
  </div>
)

// Page Loading Screen
const PageLoading = ({ text = "Loading..." }: { text?: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-nb-neutral-50">
    <div className="text-center space-y-6">
      <div className="w-16 h-16 mx-auto">
        <LoadingSpinner size="xl" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-nb-neutral-900">
          Northbay Kitchen & Bath
        </h2>
        <p className="text-sm text-nb-neutral-600">{text}</p>
      </div>
    </div>
  </div>
)

export {
  Skeleton,
  LoadingSpinner,
  LoadingDots,
  CardSkeleton,
  TableRowSkeleton,
  ProductGridSkeleton,
  StatsCardSkeleton,
  LoadingOverlay,
  PageLoading,
} 