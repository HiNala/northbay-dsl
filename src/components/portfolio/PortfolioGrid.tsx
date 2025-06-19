"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectDetails {
  sqft: string;
  timeline: string;
  budget: string;
  rooms: string[];
}

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  featured: boolean;
  year: string;
  size: 'large' | 'medium' | 'small';
  images: string[];
  coverImage: string;
  details: ProjectDetails;
}

interface PortfolioGridProps {
  projects: PortfolioProject[];
  isLoading: boolean;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects, isLoading }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const getGridClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const getImageHeight = (size: string) => {
    switch (size) {
      case 'large':
        return 'h-96 md:h-[500px]';
      case 'medium':
        return 'h-80 md:h-96';
      case 'small':
        return 'h-64 md:h-80';
      default:
        return 'h-80 md:h-96';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-max">
        {[...Array(6)].map((_, index) => (
          <motion.div 
            key={index} 
            className="animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-stone-200 h-80 rounded-lg mb-6 shimmer"></div>
            <div className="bg-stone-200 h-6 w-3/4 rounded mb-3 shimmer"></div>
            <div className="bg-stone-200 h-4 w-1/2 rounded mb-2 shimmer"></div>
            <div className="bg-stone-200 h-3 w-1/3 rounded shimmer"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-max">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className={`group ${getGridClass(project.size)}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <Link href={`/portfolio/${project.id}`} className="block">
            <div className="relative overflow-hidden rounded-xl mb-6 shadow-md group-hover:shadow-luxury transition-shadow duration-300">
              <div className={`${getImageHeight(project.size)} relative`}>
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                {hoveredProject === project.id && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 mx-6 shadow-luxury">
                      <div className="grid grid-cols-2 gap-4 text-center text-sm">
                        <div>
                          <div className="font-semibold text-charcoal-900 text-lg">{project.details.sqft}</div>
                          <div className="text-charcoal-600 text-xs uppercase tracking-wide">Square Feet</div>
                        </div>
                        <div>
                          <div className="font-semibold text-charcoal-900 text-lg">{project.details.timeline}</div>
                          <div className="text-charcoal-600 text-xs uppercase tracking-wide">Timeline</div>
                        </div>
                        <div className="col-span-2 pt-2 border-t border-stone-200">
                          <div className="font-semibold text-charcoal-900 text-lg">{project.details.budget}</div>
                          <div className="text-charcoal-600 text-xs uppercase tracking-wide">Investment</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Project Year Badge */}
                <div className="absolute top-4 right-4 bg-luxury-gold-500/90 backdrop-blur-sm text-charcoal-900 px-3 py-1 rounded-full text-xs font-medium">
                  {project.year}
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-charcoal-900/80 backdrop-blur-sm text-warm-white-50 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                    FEATURED
                  </div>
                )}
              </div>
            </div>
            
            {/* Project Info */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
              <h3 className="text-2xl font-serif text-charcoal-900 group-hover:text-luxury-gold-600 transition-colors duration-200 leading-tight">
                {project.title}
              </h3>
              <p className="text-charcoal-600 leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.2em] uppercase text-stone-500 font-medium">
                  {project.location}
                </div>
                <div className="flex items-center space-x-1 text-luxury-gold-600 group-hover:translate-x-1 transition-transform duration-200">
                  <span className="text-xs font-medium tracking-wide">View Project</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default PortfolioGrid; 