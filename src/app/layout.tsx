import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Initialize luxury fonts from design system
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "North Bay Kitchen & Bath - Luxury Kitchen & Bath Design",
  description: "Transform your living space with North Bay Kitchen & Bath. Luxury kitchen and bathroom design that reflects your unique style and elevates your everyday living experience.",
  keywords: "luxury kitchen design, bathroom renovation, North Bay, custom cabinetry, interior design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className={`${inter.className} antialiased bg-background-light text-text-primary`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
