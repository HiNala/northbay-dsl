"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TestimonialData {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  projectType: string
}

interface LuxuryTestimonialsProps {
  title?: string
  subtitle?: string
  testimonials?: TestimonialData[]
  autoRotateInterval?: number
  className?: string
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

const TestimonialCard = ({ 
  testimonial, 
  isActive 
}: { 
  testimonial: TestimonialData
  isActive: boolean 
}) => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.9,
        rotateY: isActive ? 0 : 90,
        zIndex: isActive ? 10 : 0,
      }}
      transition={{ 
        duration: 0.8, 

        opacity: { duration: 0.5 }
      }}
    >
      <Card className="h-full bg-gradient-to-br from-background via-background to-muted/20 border-border/50 shadow-2xl backdrop-blur-sm">
        <CardContent className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="secondary" className="bg-gold-600/10 text-gold-700 border-gold-600/20">
              {testimonial.projectType}
            </Badge>
            <StarRating rating={testimonial.rating} />
          </div>

          <div className="relative mb-8 flex-1">
            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gold-600/20 rotate-180" />
            <blockquote className="relative z-10 text-lg font-medium leading-relaxed text-navy-900/90 italic mt-6">
              "{testimonial.content}"
            </blockquote>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="h-14 w-14 border-2 border-gold-600/20 shadow-lg">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className="bg-gold-600/10 text-gold-700 font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">
                {testimonial.role}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {testimonial.company}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function EnhancedTestimonials({
  title = "What Our Clients Say",
  subtitle = "Discover why homeowners trust us to transform their kitchens and bathrooms into luxurious spaces that exceed expectations.",
  testimonials = [],
  autoRotateInterval = 5000,
  className = "",
}: LuxuryTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section 
      ref={sectionRef} 
      className={`py-16 bg-gradient-to-br from-gray-50 via-white to-gold-50/20 overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gold-600/10 text-gold-700 border border-gold-600/20"
              >
                <Star className="mr-2 h-4 w-4 fill-current" />
                <span className="text-sm font-medium">5-Star Rated</span>
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-navy-900 to-navy-700 bg-clip-text text-transparent font-serif"
              >
                {title}
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-600 leading-relaxed max-w-lg"
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    activeIndex === index 
                      ? "w-12 bg-gold-600 shadow-lg shadow-gold-600/25" 
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900 font-serif">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900 font-serif">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900 font-serif">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="relative h-[500px] perspective-1000"
          >
            <div className="relative h-full w-full">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={activeIndex === index}
                />
              ))}
            </div>

            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gold-600/5 blur-3xl"></div>
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gold-600/5 blur-3xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const defaultTestimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    company: "Napa Valley",
    content: "North Bay Kitchen & Bath transformed our outdated kitchen into a stunning centerpiece. Their attention to detail and quality craftsmanship exceeded our expectations. The team's professionalism made the entire process seamless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    projectType: "Kitchen Renovation"
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Client",
    company: "Sonoma",
    content: "The team's expertise and professionalism made our renovation stress-free. The finished kitchen is both beautiful and functional. Every detail was carefully considered and executed to perfection.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    projectType: "Bathroom Design"
  },
  {
    id: 3,
    name: "Elena Martinez",
    role: "Homeowner",
    company: "St. Helena",
    content: "From concept to completion, North Bay delivered exceptional results. The luxury materials and custom design elements created exactly the spa-like bathroom we envisioned. Outstanding quality throughout.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    projectType: "Full Home Renovation"
  },
  {
    id: 4,
    name: "David Chen",
    role: "Homeowner", 
    company: "Calistoga",
    content: "Working with North Bay was an absolute pleasure. Their design team understood our vision perfectly and brought it to life with incredible attention to detail. The result is a kitchen that's both stunning and highly functional.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    projectType: "Kitchen Island Design"
  }
]

export default function EnhancedTestimonialsDemo() {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedTestimonials testimonials={defaultTestimonials} />
    </div>
  )
} 