// Core luxury design system constants for North Bay Kitchen & Bath
// Based on RH and Studio McGee design principles

export const COLORS = {
  gold: {
    light: "#f7e9c3",
    medium: "#d4af37", 
    dark: "#9e7c0c",
  },
  navy: {
    light: "#394867",
    medium: "#212A3E",
    dark: "#0F1729",
  },
  ivory: {
    light: "#FFFBF5",
    medium: "#F8F0E5", 
    dark: "#EADBC8",
  },
  walnut: {
    light: "#A27B5C",
    medium: "#8B4513",
    dark: "#3A2410",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9", 
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  }
} as const;

export const TYPOGRAPHY = {
  heading: "font-light tracking-tight",
  subheading: "font-medium tracking-wide", 
  body: "font-normal leading-relaxed",
  caption: "font-light text-sm tracking-wide",
  accent: "font-medium uppercase tracking-widest text-xs",
} as const;

export const SPACING = {
  xs: "p-2",
  sm: "p-4", 
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
  "2xl": "p-16",
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px", 
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Utility function to get color values
export const getColor = (color: keyof typeof COLORS, shade: string = "medium") => {
  return COLORS[color][shade as keyof typeof COLORS[typeof color]];
};

// CN utility for class merging (simplified version)
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
}; 