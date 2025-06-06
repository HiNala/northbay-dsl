import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "North Bay Kitchen & Bath | Luxury Kitchen & Bath Design",
  description: "Transform your space with luxury kitchen and bath design. Expert craftsmanship, premium materials, and personalized service in the North Bay area.",
  keywords: "luxury kitchen design, bathroom renovation, North Bay, custom cabinetry, interior design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
