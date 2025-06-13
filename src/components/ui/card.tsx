import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-nb-neutral-200 bg-white shadow-sm hover:shadow-md",
        luxury: "border-nb-neutral-200 bg-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
        dashboard: "border-gray-200 bg-white shadow-sm hover:shadow-md",
        gradient: "bg-gradient-to-br from-white to-nb-neutral-50 border-nb-neutral-200 shadow-lg",
        glass: "bg-white/80 backdrop-blur-sm border-white/20 shadow-lg",
        elevated: "border-nb-neutral-200 bg-white shadow-xl hover:shadow-2xl",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
        scale: "hover:scale-[1.02]",
        shadow: "hover:shadow-lg",
        luxury: "hover:-translate-y-1 hover:shadow-xl hover:border-nb-gold-200",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: "none",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    if (asChild) {
      return <React.Fragment {...props} />
    }
    
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, padding, hover }), className)}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-nb-neutral-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-nb-neutral-600", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Specialized card variants for different use cases
const ProductCard = React.forwardRef<
  HTMLDivElement,
  CardProps & { 
    image?: string
    title?: string
    price?: string
    onQuickView?: () => void
  }
>(({ className, image, title, price, onQuickView, children, ...props }, ref) => (
  <Card
    ref={ref}
    variant="luxury"
    hover="luxury"
    padding="none"
    className={cn("group cursor-pointer overflow-hidden", className)}
    {...props}
  >
    {image && (
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )}
    <div className="p-6">
      {title && (
        <h3 className="font-semibold text-nb-neutral-900 mb-2">{title}</h3>
      )}
      {price && (
        <p className="text-nb-gold-600 font-medium">{price}</p>
      )}
      {children}
      {onQuickView && (
        <button
          onClick={onQuickView}
          className="mt-4 text-sm text-nb-gold-600 hover:text-nb-gold-700 transition-colors"
        >
          Quick View →
        </button>
      )}
    </div>
  </Card>
))
ProductCard.displayName = "ProductCard"

const StatsCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    title: string
    value: string | number
    change?: string
    changeType?: "positive" | "negative" | "neutral"
    icon?: React.ReactNode
  }
>(({ className, title, value, change, changeType = "neutral", icon, ...props }, ref) => (
  <Card
    ref={ref}
    variant="dashboard"
    hover="shadow"
    className={cn("", className)}
    {...props}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={cn(
              "text-xs",
              changeType === "positive" && "text-green-600",
              changeType === "negative" && "text-red-600",
              changeType === "neutral" && "text-gray-600"
            )}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="h-8 w-8 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
))
StatsCard.displayName = "StatsCard"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  ProductCard,
  StatsCard,
  cardVariants,
} 