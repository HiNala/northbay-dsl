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
// TYPOGRAPHY SYSTEM (Enhanced with proper spacing)
// -----------------------------------------------
export const TYPOGRAPHY = {
  // Headings - Playfair Display, luxury serif with proper spacing
  heading: "font-serif font-light tracking-tight leading-[1.1] mb-6",
  subheading: "font-serif font-medium tracking-wide leading-[1.3] mb-4",
  
  // Body text - Inter, clean sans-serif with optimal line height
  body: "font-sans font-normal leading-[1.7] mb-4",
  bodyLarge: "font-sans font-normal leading-[1.6] text-lg mb-6",
  
  // UI elements
  caption: "font-sans font-light text-sm tracking-wide leading-[1.5] mb-2",
  accent: "font-sans font-medium uppercase tracking-widest text-xs mb-2",
  button: "font-sans font-medium uppercase tracking-wider text-sm",
  
  // Special cases
  hero: "font-serif font-light tracking-tight leading-[0.9] mb-8",
  quote: "font-serif font-light italic leading-[1.6] mb-6",
}

// -----------------------------------------------
// ENHANCED SPACING SYSTEM (8pt grid + breathing room)
// -----------------------------------------------
export const SPACING = {
  // Vertical rhythm for sections (much more generous)
  section: {
    hero: "py-32 lg:py-40",           // 128px-160px for hero sections
    large: "py-28 lg:py-36",         // 112px-144px for major sections
    standard: "py-20 lg:py-28",      // 80px-112px for regular sections
    medium: "py-16 lg:py-20",        // 64px-80px for smaller sections
    small: "py-12 lg:py-16",         // 48px-64px for compact sections
    minimal: "py-8 lg:py-12",        // 32px-48px for tight sections
  },
  
  // Container spacing with better responsive margins
  container: {
    default: "container mx-auto px-6 lg:px-8",
    narrow: "max-w-4xl mx-auto px-6 lg:px-8",
    wide: "max-w-7xl mx-auto px-6 lg:px-8",
    full: "w-full px-6 lg:px-8",
  },
  
  // Component spacing (internal padding)
  component: {
    xs: "p-3",      // 12px
    sm: "p-4",      // 16px  
    md: "p-6",      // 24px
    lg: "p-8",      // 32px
    xl: "p-12",     // 48px
    "2xl": "p-16",  // 64px
    "3xl": "p-20",  // 80px
  },
  
  // Margin spacing for better separation
  margin: {
    xs: "mb-2",     // 8px
    sm: "mb-4",     // 16px
    md: "mb-6",     // 24px
    lg: "mb-8",     // 32px
    xl: "mb-12",    // 48px
    "2xl": "mb-16", // 64px
    "3xl": "mb-20", // 80px
    "4xl": "mb-24", // 96px
  },
  
  // Content spacing for text elements
  content: {
    paragraph: "mb-6",              // Space between paragraphs
    heading: "mb-6 mt-12",          // Space around headings
    subheading: "mb-4 mt-8",        // Space around subheadings
    list: "mb-6 space-y-3",         // Space for lists
    card: "mb-8",                   // Space between cards
    button: "mt-8 mb-4",            // Space around buttons
  },
  
  // Grid gaps for different layouts
  grid: {
    tight: "gap-4",                 // 16px
    normal: "gap-6",                // 24px
    comfortable: "gap-8",           // 32px
    spacious: "gap-12",             // 48px
    luxury: "gap-16",               // 64px
  }
}

// -----------------------------------------------
// COMPONENT VARIANTS (Enhanced)
// -----------------------------------------------
export const VARIANTS = {
  button: {
    primary: "bg-gold-600 hover:bg-gold-700 text-white shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300",
    outline: "border-2 border-gold-600 text-gold-600 hover:bg-gold-50 transition-all duration-300",
    ghost: "text-gold-600 hover:bg-gold-50 transition-all duration-300",
    elegant: "border border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white transform hover:-translate-y-0.5 transition-all duration-300",
  },
  card: {
    default: "bg-white rounded-lg shadow-sm border border-gray-100 p-6",
    elevated: "bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8",
    luxury: "bg-white rounded-xl shadow-xl border border-gold-100 overflow-hidden p-8",
  },
  input: {
    default: "border border-gray-200 rounded-md px-4 py-3 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 transition-all duration-300",
    elegant: "border-b-2 border-gray-200 bg-transparent px-0 py-3 focus:border-gold-600 focus:ring-0 transition-all duration-300",
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
// LUXURY DESIGN PATTERNS (Enhanced with better spacing)
// -----------------------------------------------
export const PATTERNS = {
  hero: {
    fullscreen: "min-h-screen flex items-center justify-center relative overflow-hidden",
    overlay: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50",
    content: "relative z-10 text-center text-white max-w-6xl px-6 py-20",
  },
  section: {
    hero: "py-32 lg:py-40 bg-gradient-to-b from-navy-900 to-navy-800 text-white",
    standard: "py-32 lg:py-40 bg-white",
    alternate: "py-32 lg:py-40 bg-gray-50", 
    dark: "py-32 lg:py-40 bg-navy-900 text-white",
    luxury: "py-40 lg:py-48 bg-gradient-to-b from-gray-50 to-white",
    spacious: "py-44 lg:py-52 bg-white",
    premium: "py-48 lg:py-56 bg-white",
  },
  // Section Separators and Accents
  separator: {
    default: "h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent my-20 lg:my-28",
    bold: "h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400 my-24 lg:my-32",
    minimal: "h-px bg-gray-200 my-16 lg:my-20",
  },
  accent: {
    divider: "w-24 h-1 bg-gold-600 mx-auto mb-8",
    line: "w-16 h-0.5 bg-gold-400",
    dots: "flex justify-center space-x-2 my-12",
  },
  grid: {
    products: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12",
    services: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16",
    testimonials: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12",
    portfolio: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12",
    features: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12",
  },
  // Content structure patterns
  structure: {
    sectionHeader: "text-center mb-16 lg:mb-20",
    sectionContent: "space-y-12 lg:space-y-16",
    cardGrid: "grid gap-8 lg:gap-12 mb-16 lg:mb-20",
    textContent: "space-y-6 lg:space-y-8",
  }
}

// -----------------------------------------------
// LUXURY COMPONENT HELPERS
// -----------------------------------------------
export const createLuxuryButton = (variant: keyof typeof VARIANTS.button = "primary") => {
  return cn(
    "inline-flex items-center justify-center px-8 py-4 rounded-md font-medium",
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
// SECTION HEADER HELPER (Enhanced)
// -----------------------------------------------
export const createSectionHeader = (centered: boolean = true) => {
  return {
    container: cn("mb-16 lg:mb-20", centered ? "text-center" : ""),
    title: cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl lg:text-6xl text-navy-900 mb-6"),
    subtitle: cn(TYPOGRAPHY.bodyLarge, "text-xl lg:text-2xl text-gray-600 max-w-4xl", centered ? "mx-auto" : "", "mb-8"),
    divider: cn("w-24 h-1 bg-gold-600 mt-8", centered ? "mx-auto" : "")
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
    mobile: "flex flex-col md:flex-row gap-6 md:gap-8",
    reverse: "flex flex-col-reverse md:flex-row gap-6 md:gap-8",
  },
  text: {
    responsive: "text-sm md:text-base lg:text-lg",
    heroResponsive: "text-4xl md:text-6xl lg:text-7xl xl:text-8xl",
  },
  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-6 lg:px-8",
    gap: "gap-4 md:gap-6 lg:gap-8",
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