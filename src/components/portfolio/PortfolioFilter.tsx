"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterCategory {
  id: string;
  label: string;
}

interface PortfolioFilterProps {
  categories: FilterCategory[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ categories, activeFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const activeCategory = categories.find(cat => cat.id === activeFilter);

  return (
    <div className="mb-16">
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 text-charcoal-900 hover:text-luxury-gold-600 transition-colors duration-200 group"
        >
          <span className="text-sm tracking-[0.2em] uppercase font-medium">
            Filter Projects
          </span>
          <motion.svg 
            className="w-4 h-4 transition-colors duration-200"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute top-full left-0 mt-4 bg-white border border-stone-200 rounded-lg shadow-luxury z-20 min-w-56"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      onFilterChange(category.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3 text-sm hover:bg-stone-50 transition-colors duration-200 relative ${
                      activeFilter === category.id 
                        ? 'text-luxury-gold-600 font-medium bg-luxury-gold-50' 
                        : 'text-charcoal-700'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: index * 0.05 }}
                  >
                    {category.label}
                    {activeFilter === category.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-luxury-gold-500"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Active Filter Display */}
      {activeFilter !== 'all' && (
        <motion.div 
          className="mt-6 inline-flex items-center space-x-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm text-charcoal-600">
            Showing: 
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-luxury-gold-100 text-luxury-gold-700 border border-luxury-gold-200">
            {activeCategory?.label}
            <button
              onClick={() => onFilterChange('all')}
              className="ml-2 hover:text-luxury-gold-900 transition-colors duration-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioFilter; 