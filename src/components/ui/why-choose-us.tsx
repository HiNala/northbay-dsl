"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Award, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle,
  Palette,
  Wrench
} from "lucide-react";

// Icons component
type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  award: Award,
  shield: Shield,
  clock: Clock,
  users: Users,
  star: Star,
  checkCircle: CheckCircle,
  palette: Palette,
  wrench: Wrench,
};

// Gradient Text Component
interface GradientTextProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

function GradientText({
  children,
  className,
  colors = ["#d4af37", "#b8860b", "#d4af37"],
  animationSpeed = 8,
  showBorder = false,
  ...props
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center",
        "rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500",
        "overflow-hidden cursor-pointer",
        className
      )}
      {...props}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-background rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Hover Button Component
interface HoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  glowColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}

function HoverButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  glowColor = '#d4af37',
  backgroundColor = '#1a1a1a',
  textColor = '#ffffff',
  hoverTextColor = '#d4af37'
}: HoverButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGlowPosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-block px-8 py-4 border-none cursor-pointer overflow-hidden",
        "transition-colors duration-300 text-lg rounded-lg z-10 font-medium",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        backgroundColor: backgroundColor,
        color: isHovered ? hoverTextColor : textColor,
      }}
    >
      <div
        className={cn(
          "absolute w-[200px] h-[200px] rounded-full opacity-50 pointer-events-none",
          "transition-transform duration-400 ease-out -translate-x-1/2 -translate-y-1/2",
          isHovered ? "scale-120" : "scale-0"
        )}
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
          background: `radial-gradient(circle, ${glowColor} 10%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative p-8 rounded-2xl border border-gray-200/50 bg-white/50",
        "backdrop-blur-sm hover:border-gold-600/30 transition-all duration-500",
        "hover:shadow-2xl hover:shadow-gold-600/10 hover:-translate-y-2",
        "overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold-600/20 via-gold-500/20 to-gold-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold-600/20 to-gold-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-gold-600 group-hover:text-gold-500 transition-colors duration-300" />
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-xl bg-gold-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-navy-900 mb-4 group-hover:text-gold-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-navy-700/80 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Main Component
function WhyChooseUsSection() {
  const features = [
    {
      icon: Icons.palette,
      title: "Curated Products",
      description: "Exclusive, high-end selections from premier luxury brands and artisan craftspeople."
    },
    {
      icon: Icons.users,
      title: "Custom Design Services",
      description: "Full-service design consultation from concept to completion with expert guidance."
    },
    {
      icon: Icons.wrench,
      title: "Bay Area Showroom",
      description: "Visit our Napa Valley showroom to experience luxury materials and finishes firsthand."
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 via-transparent to-gold-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-600/10 border border-gold-600/20 mb-6">
            <Star className="w-4 h-4 text-gold-600" />
            <span className="text-sm font-medium text-gold-600">Premium Excellence</span>
          </div>
          
          <GradientText
            colors={["#d4af37", "#b8860b", "#d4af37"]}
            animationSpeed={6}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Why Choose North Bay
          </GradientText>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that comes with over 15 years of luxury design expertise and uncompromising craftsmanship.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-gold-600/10 via-gold-500/5 to-gold-600/10 rounded-3xl p-12 border border-gold-600/20">
            <h3 className="text-3xl font-bold text-navy-900 mb-4 font-serif">
              Ready to Transform Your Space?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let our expert team bring your vision to life with unparalleled craftsmanship and luxury materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <HoverButton
                glowColor="#d4af37"
                backgroundColor="#1a1a1a"
                textColor="#ffffff"
                hoverTextColor="#d4af37"
                className="shadow-lg border border-gold-600/30"
              >
                Schedule Consultation
              </HoverButton>
              <button className="px-8 py-4 text-lg font-medium text-gold-600 border border-gold-600/30 rounded-lg hover:bg-gold-600/10 transition-colors duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s linear infinite;
        }
        .scale-120 {
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}

export default WhyChooseUsSection; 