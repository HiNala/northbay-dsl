"use client";

import React from 'react';
import { cn } from '@/lib/design-system';

interface SectionSeparatorProps {
  variant?: 'default' | 'bold' | 'minimal' | 'dots';
  className?: string;
}

export function SectionSeparator({ variant = 'default', className }: SectionSeparatorProps) {
  if (variant === 'dots') {
    return (
      <div className={cn("flex justify-center space-x-2 my-20 lg:my-28", className)}>
        <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
        <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gold-600 rounded-full"></div>
      </div>
    );
  }

  const variants = {
    default: "h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent my-20 lg:my-28",
    bold: "h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400 my-24 lg:my-32",
    minimal: "h-px bg-gray-200 my-16 lg:my-20",
  };

  return (
    <div className={cn(variants[variant], className)} />
  );
} 