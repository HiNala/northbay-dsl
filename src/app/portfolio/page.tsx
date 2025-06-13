import { Metadata } from 'next';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import PortfolioPage from '@/components/portfolio/PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio | Northbay Kitchen & Bath | Luxury Design Projects',
  description: 'Explore our portfolio of luxury kitchen and bathroom designs throughout Napa Valley and the Bay Area. Award-winning transformations that blend elegance with functionality.',
  keywords: ['portfolio', 'luxury kitchen design', 'bathroom design', 'napa valley', 'bay area', 'interior design', 'kitchen remodel'],
  openGraph: {
    title: 'Portfolio | Northbay Kitchen & Bath',
    description: 'Explore our luxury design portfolio featuring stunning kitchen and bathroom transformations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Luxury Portfolio by Northbay Kitchen & Bath',
      },
    ],
    type: 'website',
  },
};

export default function Portfolio() {
  return (
    <div className="overflow-x-hidden">
      <EnhancedHeader />
      <PortfolioPage />
    </div>
  );
} 