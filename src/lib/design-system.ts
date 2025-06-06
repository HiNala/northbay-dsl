// North Bay Kitchen & Bath - Luxury Design System
// Based on analysis of RH, Studio McGee, Waterworks, and Bulthaup

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// -----------------------------------------------
// UTILITY FUNCTION
// -----------------------------------------------
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// -----------------------------------------------
// LUXURY COLOR PALETTE
// -----------------------------------------------
export const COLORS = {
  // Primary palette from design guide
  background: {
    light: "#F7F7F5",    // Warm white, keeps photos neutral
    white: "#FFFFFF",    // Pure white for cards and forms
    gray: "#E6E4DE",     // Soft gray for section separators
  },
  text: {
    primary: "#1F1F1F",  // Almost-black for legibility
    secondary: "#64748B", // Muted text
    muted: "#94A3B8",    // Very light text
  },
  accent: {
    metallic: "#B79A6B",  // Subtle brass - main luxury accent
    hover: "#9E7C0C",     // Darker brass for hover states
    light: "#F7E9C3",     // Light gold for backgrounds
  },
  // Extended luxury palette
  gold: {
    50: "#FEFCE8",
    100: "#FEF3C7", 
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#F59E0B",
    500: "#D4AF37",  // Primary gold
    600: "#B79A6B",  // Accent metallic
    700: "#92400E",
    800: "#78350F",
    900: "#451A03",
  },
  navy: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0", 
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  }
}

// -----------------------------------------------
// TYPOGRAPHY SYSTEM
// -----------------------------------------------
export const TYPOGRAPHY = {
  // Headings - Playfair Display, luxury serif
  heading: "font-serif font-light tracking-tight leading-tight",
  subheading: "font-serif font-medium tracking-wide leading-snug",
  
  // Body text - Inter, clean sans-serif
  body: "font-sans font-normal leading-relaxed",
  bodyLarge: "font-sans font-normal leading-relaxed text-lg",
  
  // UI elements
  caption: "font-sans font-light text-sm tracking-wide",
  accent: "font-sans font-medium uppercase tracking-widest text-xs",
  button: "font-sans font-medium uppercase tracking-wider text-sm",
  
  // Special cases
  hero: "font-serif font-light tracking-tight leading-none",
  quote: "font-serif font-light italic leading-relaxed",
}

// -----------------------------------------------
// SPACING SYSTEM (8pt grid)
// -----------------------------------------------
export const SPACING = {
  section: {
    desktop: "py-24", // 96px
    mobile: "py-12",  // 48px
  },
  container: {
    default: "container mx-auto px-6",
    narrow: "max-w-4xl mx-auto px-6",
    wide: "max-w-7xl mx-auto px-6",
  },
  element: {
    xs: "p-2",    // 8px
    sm: "p-4",    // 16px  
    md: "p-6",    // 24px
    lg: "p-8",    // 32px
    xl: "p-12",   // 48px
    "2xl": "p-16", // 64px
  }
}

// -----------------------------------------------
// COMPONENT VARIANTS
// -----------------------------------------------
export const VARIANTS = {
  button: {
    primary: "bg-gold-600 hover:bg-gold-700 text-white shadow-sm hover:shadow-md",
    outline: "border-2 border-gold-600 text-gold-600 hover:bg-gold-50",
    ghost: "text-gold-600 hover:bg-gold-50",
    elegant: "border border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white transform hover:-translate-y-0.5 transition-all duration-200",
  },
  card: {
    default: "bg-white rounded-lg shadow-sm border border-gray-100",
    elevated: "bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300",
    luxury: "bg-white rounded-xl shadow-xl border border-gold-100 overflow-hidden",
  },
  input: {
    default: "border border-gray-200 rounded-md px-4 py-3 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors",
    elegant: "border-b-2 border-gray-200 bg-transparent px-0 py-3 focus:border-gold-600 focus:ring-0 transition-colors",
  }
}

// -----------------------------------------------
// ANIMATION PRESETS
// -----------------------------------------------
export const ANIMATIONS = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up", 
  scaleIn: "animate-scale-in",
  hover: "transition-all duration-300 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
  bounce: "animate-bounce",
  pulse: "animate-pulse",
}

// -----------------------------------------------
// LAYOUT BREAKPOINTS 
// -----------------------------------------------
export const BREAKPOINTS = {
  sm: "640px",   // Mobile large
  md: "768px",   // Tablet
  lg: "1024px",  // Desktop
  xl: "1280px",  // Large desktop  
  "2xl": "1536px" // Extra large
}

// -----------------------------------------------
// LUXURY DESIGN PATTERNS
// -----------------------------------------------
export const PATTERNS = {
  hero: {
    fullscreen: "h-screen flex items-center justify-center relative overflow-hidden",
    overlay: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50",
    content: "relative z-10 text-center text-white max-w-6xl px-6",
  },
  section: {
    standard: "py-24 bg-white",
    alternate: "py-24 bg-gray-50", 
    dark: "py-24 bg-navy-900 text-white",
    luxury: "py-32 bg-gradient-to-b from-gray-50 to-white",
  },
  grid: {
    products: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    services: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12",
    testimonials: "grid grid-cols-1 md:grid-cols-2 gap-8",
    portfolio: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  }
}

// -----------------------------------------------
// LUXURY COMPONENT HELPERS
// -----------------------------------------------
export const createLuxuryButton = (variant: keyof typeof VARIANTS.button = "primary") => {
  return cn(
    "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all duration-200",
    TYPOGRAPHY.button,
    VARIANTS.button[variant]
  )
}

export const createLuxuryCard = (variant: keyof typeof VARIANTS.card = "default") => {
  return cn(
    "transition-all duration-300",
    VARIANTS.card[variant]
  )
}

export const createLuxuryInput = (variant: keyof typeof VARIANTS.input = "default") => {
  return cn(
    "w-full focus:outline-none",
    TYPOGRAPHY.body,
    VARIANTS.input[variant]
  )
}

// -----------------------------------------------
// SECTION HEADER HELPER
// -----------------------------------------------
export const createSectionHeader = (centered: boolean = true) => {
  return {
    container: cn("mb-16", centered ? "text-center" : ""),
    title: cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6"),
    subtitle: cn(TYPOGRAPHY.body, "text-xl text-gray-600 max-w-3xl", centered ? "mx-auto" : ""),
    divider: "w-24 h-1 bg-gold-600 mx-auto mt-8" + (centered ? "" : " ml-0")
  }
}

// -----------------------------------------------
// RESPONSIVE UTILITIES
// -----------------------------------------------
export const RESPONSIVE = {
  hide: {
    mobile: "hidden md:block",
    desktop: "block md:hidden", 
  },
  stack: {
    mobile: "flex flex-col md:flex-row",
    reverse: "flex flex-col-reverse md:flex-row",
  },
  text: {
    responsive: "text-sm md:text-base lg:text-lg",
    heroResponsive: "text-4xl md:text-6xl lg:text-7xl",
  }
}

// -----------------------------------------------
// LUXURY EFFECTS
// -----------------------------------------------
export const EFFECTS = {
  glass: "bg-white/10 backdrop-blur-md border border-white/20",
  glow: "shadow-2xl shadow-gold-500/20",
  parallax: "transform-gpu will-change-transform",
  gradient: {
    gold: "bg-gradient-to-r from-gold-400 to-gold-600",
    navy: "bg-gradient-to-r from-navy-700 to-navy-900", 
    luxury: "bg-gradient-to-br from-gold-50 via-white to-gold-50",
  }
} 