import { Metadata } from 'next';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import HeroSection from '@/components/design-services/HeroSection';
import ServiceTiers from '@/components/design-services/ServiceTiers';
import MaterialExperience from '@/components/design-services/MaterialExperience';
import ProcessSection from '@/components/design-services/ProcessSection';
import CTASection from '@/components/design-services/CTASection';

export const metadata: Metadata = {
  title: 'Design Services | Northbay Kitchen & Bath',
  description: 'Transform your kitchen and bathroom with our comprehensive design services. From concept to completion, we create stunning, functional spaces tailored to your lifestyle.',
  keywords: ['kitchen design', 'bathroom design', 'interior design', 'renovation', 'luxury design', 'Napa Valley'],
  openGraph: {
    title: 'Design Services | Northbay Kitchen & Bath',
    description: 'Transform your kitchen and bathroom with our comprehensive design services.',
    images: ['/images/design-services-og.jpg'],
  },
};

export default function DesignServicesPage() {
  return (
    <div className="overflow-x-hidden">
      <EnhancedHeader />
      <main>
        <HeroSection />
        <ServiceTiers />
        <MaterialExperience />
        <ProcessSection />
        <CTASection />
      </main>
    </div>
  );
} 