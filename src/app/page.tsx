import { Metadata } from 'next'
import EnhancedHeader from '@/components/layout/EnhancedHeader'
import HeroSection from '@/components/home/HeroSection'
import ServicesShowcase from '@/components/home/ServicesShowcase'
import StatsSection from '@/components/home/StatsSection'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import FinalCTA from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'Northbay Kitchen & Bath | Luxury Kitchen & Bathroom Design | Napa Valley',
  description: 'Transform your Napa Valley home with luxury kitchen and bathroom designs. 15+ years of experience, 500+ completed projects, 98% client satisfaction. Schedule your consultation today.',
  keywords: ['luxury kitchen design', 'bathroom renovation', 'napa valley', 'kitchen remodel', 'custom cabinetry', 'interior design'],
  openGraph: {
    title: 'Northbay Kitchen & Bath | Luxury Design Services',
    description: 'Napa Valley\'s premier kitchen and bathroom design studio. Creating extraordinary spaces since 2008.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Luxury Kitchen Design by Northbay Kitchen & Bath',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northbay Kitchen & Bath | Luxury Design Services',
    description: 'Napa Valley\'s premier kitchen and bathroom design studio. Creating extraordinary spaces since 2008.',
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <EnhancedHeader />
      
      <main>
        <HeroSection />
        <ServicesShowcase />
        <StatsSection />
        <PortfolioPreview />
        <FinalCTA />
      </main>
    </div>
  );
} 