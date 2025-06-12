import React from 'react';
import { Check, Shield, Award, Sparkles } from 'lucide-react';

interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
}

interface LuxuryServicesProps {
  title?: string;
  subtitle?: string;
  services?: ServiceFeature[];
}

const LuxuryDesignServices: React.FC<LuxuryServicesProps> = ({
  title = "From Concept to Completion",
  subtitle = "Our expert design team guides you through every step of your transformation journey. From initial consultation to final installation, we ensure every detail exceeds your expectations.",
  services = [
    {
      id: "premium-materials",
      title: "Premium Material Selection",
      description: "Handpicked luxury materials sourced from the world's finest suppliers, ensuring exceptional quality and timeless elegance in every detail.",
      icon: <Sparkles className="w-8 h-8" />,
      highlights: [
        "Exclusive designer collections",
        "Sustainable luxury materials",
        "Custom texture combinations",
        "Limited edition finishes"
      ]
    },
    {
      id: "professional-installation",
      title: "Professional Installation",
      description: "Master craftsmen with decades of experience deliver flawless installation with precision and attention to every intricate detail.",
      icon: <Award className="w-8 h-8" />,
      highlights: [
        "Certified master installers",
        "White-glove service",
        "Precision measurement",
        "Zero-damage guarantee"
      ]
    },
    {
      id: "warranty",
      title: "1-Year Comprehensive Warranty",
      description: "Complete peace of mind with our comprehensive warranty coverage, backed by dedicated support and premium maintenance services.",
      icon: <Shield className="w-8 h-8" />,
      highlights: [
        "Full coverage protection",
        "24/7 priority support",
        "Complimentary maintenance",
        "Lifetime consultation"
      ]
    }
  ]
}) => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-navy-900 to-navy-700 rounded-2xl mb-8 shadow-xl">
            <Award className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 bg-clip-text text-transparent mb-6 tracking-tight font-serif">
            {title}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ease-out hover:-translate-y-2 border border-slate-200/50 hover:border-slate-300/50"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-navy-900 group-hover:to-navy-700 rounded-2xl mb-6 transition-all duration-500 shadow-md group-hover:shadow-xl text-slate-700 group-hover:text-white">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-navy-900 mb-3 group-hover:text-navy-800 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed text-base font-light">
                  {service.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                  {service.highlights.map((highlight, highlightIndex) => (
                    <div
                      key={highlightIndex}
                      className="flex items-center space-x-3 group/item"
                      style={{
                        animationDelay: `${(index * 150) + (highlightIndex * 100)}ms`
                      }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors duration-200 text-sm">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Premium Badge - Only for first service */}
                {index === 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-200/50">
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full border border-amber-200/50">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-amber-800">Premium Service</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900 rounded-t-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <span className="text-lg font-semibold">Start Your Project</span>
            <div className="w-2 h-2 bg-white rounded-full group-hover:animate-pulse" />
          </div>
          
          <p className="text-slate-500 mt-4 text-sm font-light">
            Consultation available by appointment • White-glove service included
          </p>
        </div>
      </div>
    </section>
  );
};

export default LuxuryDesignServices; 