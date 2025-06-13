"use client";

import { useState, useEffect } from 'react';
import PortfolioHero from './PortfolioHero';
import PortfolioFilter from './PortfolioFilter';
import PortfolioGrid from './PortfolioGrid';
import ComingSoonSection from './ComingSoonSection';
import ElegantContactForm from './ElegantContactForm';
import SocialFeed from './SocialFeed';
import { portfolioProjects, filterCategories } from '@/data/portfolioData';

const PortfolioPage = () => {
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (filterId: string) => {
    setIsLoading(true);
    setActiveFilter(filterId);
    
    setTimeout(() => {
      if (filterId === 'all') {
        setFilteredProjects(portfolioProjects);
      } else if (filterId === 'featured') {
        setFilteredProjects(portfolioProjects.filter(project => project.featured));
      } else {
        setFilteredProjects(portfolioProjects.filter(project => project.category === filterId));
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-warm-white-50">
      <PortfolioHero />
      
      <main className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <PortfolioFilter 
            categories={filterCategories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          
          <PortfolioGrid 
            projects={filteredProjects}
            isLoading={isLoading}
          />
        </div>
        
        <ComingSoonSection />
        <ElegantContactForm />
        <SocialFeed />
      </main>
    </div>
  );
};

export default PortfolioPage; 