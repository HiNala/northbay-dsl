import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function Loading({ size = "md", className, text }: LoadingProps) {
  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn("animate-spin rounded-full border-2 border-amber-200 border-t-amber-600", sizeStyles[size])} />
      {text && (
        <p className="text-gray-600 text-sm animate-pulse">{text}</p>
      )}
    </div>
  )
}

export function LoadingSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600 mb-6 mx-auto"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading</h2>
        <p className="text-gray-600">Please wait while we prepare your experience...</p>
      </div>
    </div>
  )
} 