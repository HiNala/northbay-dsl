"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, MapPin, Calendar, DollarSign, Home } from 'lucide-react';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import { portfolioProjects } from '@/data/portfolioData';

interface PageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = portfolioProjects.find(p => p.id === params.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!project) {
    notFound();
  }

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex(prev => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex(prev => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <>
      <EnhancedHeader />
      
      <div className="min-h-screen bg-warm-white-50 pt-20">
        {/* Back to Portfolio */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-charcoal-600 hover:text-luxury-gold-600 transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm tracking-[0.2em] uppercase text-luxury-gold-600 font-medium">
                    {project.category.replace('-', ' ')}
                  </span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                  <span className="text-sm text-charcoal-600">{project.year}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal-900 leading-tight">
                  {project.title}
                </h1>
                
                <p className="text-lg text-charcoal-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center text-charcoal-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm tracking-wide">{project.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <Home className="w-5 h-5 text-luxury-gold-600 mr-2" />
                  <span className="text-sm text-charcoal-600 uppercase tracking-wide">Square Feet</span>
                </div>
                <div className="text-2xl font-serif text-charcoal-900">{project.details.sqft}</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-luxury-gold-600 mr-2" />
                  <span className="text-sm text-charcoal-600 uppercase tracking-wide">Timeline</span>
                </div>
                <div className="text-2xl font-serif text-charcoal-900">{project.details.timeline}</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-luxury-gold-600 mr-2" />
                  <span className="text-sm text-charcoal-600 uppercase tracking-wide">Investment</span>
                </div>
                <div className="text-2xl font-serif text-charcoal-900">{project.details.budget}</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <Home className="w-5 h-5 text-luxury-gold-600 mr-2" />
                  <span className="text-sm text-charcoal-600 uppercase tracking-wide">Rooms</span>
                </div>
                <div className="text-sm text-charcoal-900">
                  {project.details.rooms.slice(0, 2).join(', ')}
                  {project.details.rooms.length > 2 && ` +${project.details.rooms.length - 2} more`}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-serif text-charcoal-900 mb-12 text-center">
              Project Gallery
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl shadow-md group-hover:shadow-luxury transition-shadow duration-300">
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <div className="bg-charcoal-900 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-serif text-warm-white-50 mb-6">
                Ready to Transform Your Space?
              </h3>
              <p className="text-lg text-warm-white-50/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can create a custom design solution that reflects your unique style and elevates your living experience.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-luxury-gold-500 text-charcoal-900 px-8 py-4 rounded-full font-medium hover:bg-luxury-gold-600 transition-colors duration-200"
              >
                Start Your Project
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-luxury-gold-500 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-luxury-gold-500 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-luxury-gold-500 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-full">
            <Image
              src={project.images[selectedImageIndex]}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedImageIndex + 1} of {project.images.length}
          </div>
        </motion.div>
      )}
    </>
  );
} 