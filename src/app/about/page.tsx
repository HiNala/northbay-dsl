"use client";

import EnhancedHeader from '@/components/layout/EnhancedHeader';
import { motion } from 'framer-motion';
import { 
  Award, 
  Star, 
  Users, 
  Home, 
  Heart,
  Shield,
  Compass,
  Target,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight
} from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Lead Designer",
    image: "/images/team/sarah-mitchell.jpg",
    bio: "With over 15 years of experience in luxury design, Sarah founded North Bay Kitchen & Bath to bring sophisticated, personalized design to the Bay Area.",
    credentials: ["NCIDQ Certified", "NKBA Professional Member"],
    specialties: ["Kitchen Design", "Space Planning", "Color Theory"]
  },
  {
    name: "Michael Chen",
    role: "Senior Design Consultant",
    image: "/images/team/michael-chen.jpg", 
    bio: "Michael's background in architecture and passion for sustainable design helps clients create beautiful spaces that are both functional and environmentally conscious.",
    credentials: ["AIA Member", "LEED AP"],
    specialties: ["Sustainable Design", "Bath Design", "Project Management"]
  },
  {
    name: "Emily Rodriguez",
    role: "Project Coordinator",
    image: "/images/team/emily-rodriguez.jpg",
    bio: "Emily ensures every project runs smoothly from start to finish, coordinating with contractors and keeping clients informed throughout the process.",
    credentials: ["PMP Certified", "NKBA Associate"],
    specialties: ["Project Management", "Client Relations", "Quality Control"]
  },
  {
    name: "David Thompson",
    role: "Design Assistant",
    image: "/images/team/david-thompson.jpg",
    bio: "David brings fresh perspectives and technical expertise to our design team, specializing in 3D visualization and modern design trends.",
    credentials: ["Interior Design Degree", "3ds Max Certified"],
    specialties: ["3D Visualization", "Modern Design", "Technology Integration"]
  }
];

const companyValues = [
  {
    icon: Heart,
    title: "Client-Centered Approach",
    description: "Every decision we make is guided by what's best for our clients and their unique vision."
  },
  {
    icon: Shield,
    title: "Quality & Craftsmanship",
    description: "We partner with only the finest artisans and use premium materials to ensure lasting beauty."
  },
  {
    icon: Compass,
    title: "Innovative Design",
    description: "We stay ahead of trends while creating timeless spaces that will be cherished for years to come."
  },
  {
    icon: Target,
    title: "Attention to Detail",
    description: "From initial concept to final installation, we obsess over every detail to exceed expectations."
  }
];

const achievements = [
  {
    number: "500+",
    label: "Projects Completed",
    description: "Successfully transforming homes throughout the Bay Area"
  },
  {
    number: "15+",
    label: "Years Experience", 
    description: "Bringing expertise and refined taste to every project"
  },
  {
    number: "50+",
    label: "Design Awards",
    description: "Recognition for excellence in kitchen and bath design"
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    description: "Building lasting relationships through exceptional service"
  }
];

const timeline = [
  {
    year: "2008",
    title: "Company Founded",
    description: "Sarah Mitchell established North Bay Kitchen & Bath with a vision to bring luxury design to Napa Valley."
  },
  {
    year: "2012", 
    title: "Showroom Opening",
    description: "Opened our flagship showroom in Napa Valley, featuring curated displays of premium fixtures and finishes."
  },
  {
    year: "2016",
    title: "NKBA Recognition",
    description: "Received National Kitchen & Bath Association's Excellence in Design award for innovative kitchen solutions."
  },
  {
    year: "2020",
    title: "Sustainable Focus",
    description: "Launched our sustainable design initiative, partnering with eco-conscious brands and artisans."
  },
  {
    year: "2024",
    title: "Digital Innovation",
    description: "Introduced advanced 3D visualization and virtual reality tools for enhanced client experience."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <EnhancedHeader />

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 bg-gradient-to-b from-muted to-background text-foreground overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Award className="w-4 h-4 mr-3 text-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">
                Award-Winning Design Studio
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl mb-6 font-serif font-light text-foreground">
              Crafting Exceptional Spaces
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              For over 15 years, North Bay Kitchen & Bath has been transforming homes throughout the Bay Area 
              with sophisticated design, premium materials, and uncompromising attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-foreground mb-6 font-serif font-light">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-primary mb-8" />
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  North Bay Kitchen & Bath was born from a simple belief: that your home should be a reflection 
                  of your personal style and a sanctuary that enhances your daily life. Founded in 2008 by 
                  interior designer Sarah Mitchell, our studio has grown from a boutique consultancy to the 
                  Bay Area's premier destination for luxury kitchen and bath design.
                </p>
                
                <p className="text-base text-muted-foreground leading-relaxed">
                  What started as a passion project in Sarah's Napa Valley studio has evolved into a full-service 
                  design firm, trusted by discerning homeowners who appreciate the finest things in life. We've 
                  had the privilege of transforming over 500 homes, each one a unique expression of our client's 
                  vision brought to life through our expertise and craftsmanship.
                </p>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Today, we continue to push the boundaries of design excellence, combining timeless sophistication 
                  with innovative solutions to create spaces that are both beautiful and functional. Our commitment 
                  to quality, sustainability, and exceptional service remains unwavering as we look toward the future.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Home className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">Our Design Studio</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              The principles that guide everything we do and every space we create.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {companyValues.map((value, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl text-foreground mb-4 font-serif font-medium">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Passionate designers and craftspeople dedicated to bringing your vision to life.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="bg-card rounded-xl shadow-sm border border-border p-8 hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-6">
                  {/* Profile Image */}
                  <div className="w-24 h-24 bg-primary rounded-full flex-shrink-0 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>

                  {/* Member Info */}
                  <div className="flex-1">
                    <h3 className="text-xl text-foreground mb-1 font-serif font-medium">
                      {member.name}
                    </h3>
                    <p className="text-primary mb-4 text-sm tracking-wide">
                      {member.role}
                    </p>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {member.bio}
                    </p>

                    {/* Credentials */}
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2 text-sm">
                        Credentials:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.credentials.map((credential, credIndex) => (
                          <span 
                            key={credIndex}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                          >
                            {credential}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 text-sm">
                        Specialties:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <span 
                            key={specIndex}
                            className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Key milestones in our growth and evolution as a design studio.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border" />

            <div className="space-y-16">
              {timeline.map((event, index) => (
                <motion.div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10" />

                  <div className={`w-5/12 bg-card rounded-xl p-6 shadow-sm border border-border ${
                    index % 2 === 0 ? "mr-auto" : "ml-auto"
                  }`}>
                    <div className="text-2xl font-bold text-primary mb-2 font-serif">{event.year}</div>
                    <h3 className="text-xl text-foreground mb-3 font-serif font-medium">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-serif font-light">
              By the Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              The results of our commitment to excellence and client satisfaction.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-primary mb-2 font-serif">
                  {achievement.number}
                </div>
                <h3 className="text-xl text-foreground mb-3 font-serif font-medium">
                  {achievement.label}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Showroom */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">Napa Valley Showroom</p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-foreground mb-6 font-serif font-light">
                Visit Our Showroom
              </h2>
              <div className="w-24 h-1 bg-primary mb-8" />
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Experience our curated collection of luxury fixtures, finishes, and materials in person. 
                Our Napa Valley showroom features beautifully designed vignettes that showcase the 
                quality and craftsmanship of our preferred brands.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    1234 Main Street, Napa, CA 94559
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    (707) 555-0123
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Mon-Fri: 9am-6pm, Sat: 10am-4pm
                  </span>
                </div>
              </div>

              <button className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Schedule Showroom Visit
                <ChevronRight className="ml-3 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 