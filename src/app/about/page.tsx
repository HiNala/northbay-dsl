"use client";

import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
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
  Clock
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
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 bg-gradient-to-b from-navy-900 to-navy-800 text-white overflow-hidden">

        <div className={cn(SPACING.container.default, "relative z-10")}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Award className="w-4 h-4 mr-3" />
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                Award-Winning Design Studio
              </span>
            </div>

            <h1 className={cn(TYPOGRAPHY.heading, "text-5xl md:text-6xl mb-6 font-serif")}>
              Crafting Exceptional Spaces
            </h1>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-200 leading-relaxed max-w-3xl mx-auto")}>
              For over 15 years, North Bay Kitchen & Bath has been transforming homes throughout the Bay Area 
              with sophisticated design, premium materials, and uncompromising attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story - Smooth gradient transition from hero */}
      <section className="py-32 bg-gradient-to-b from-navy-800 via-white to-white">
        <div className={cn(SPACING.container.default)}>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content */}
            <div>
              <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
                Our Story
              </h2>
              <div className="w-24 h-1 bg-gold-600 mb-8" />
              
              <div className="space-y-6">
                <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-700 leading-relaxed")}>
                  North Bay Kitchen & Bath was born from a simple belief: that your home should be a reflection 
                  of your personal style and a sanctuary that enhances your daily life. Founded in 2008 by 
                  interior designer Sarah Mitchell, our studio has grown from a boutique consultancy to the 
                  Bay Area's premier destination for luxury kitchen and bath design.
                </p>
                
                <p className={cn(TYPOGRAPHY.body, "text-gray-600 leading-relaxed")}>
                  What started as a passion project in Sarah's Napa Valley studio has evolved into a full-service 
                  design firm, trusted by discerning homeowners who appreciate the finest things in life. We've 
                  had the privilege of transforming over 500 homes, each one a unique expression of our client's 
                  vision brought to life through our expertise and craftsmanship.
                </p>

                <p className={cn(TYPOGRAPHY.body, "text-gray-600 leading-relaxed")}>
                  Today, we continue to push the boundaries of design excellence, combining timeless sophistication 
                  with innovative solutions to create spaces that are both beautiful and functional. Our commitment 
                  to quality, sustainability, and exceptional service remains unwavering as we look toward the future.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-500 font-medium">Our Design Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values - Elegant gradient spacer */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className={cn(SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
              Our Values
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed")}>
              The principles that guide everything we do and every space we create.
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          <div className={PATTERNS.grid.services}>
            {companyValues.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6 group-hover:bg-gold-200 transition-colors duration-300">
                  <value.icon className="w-10 h-10 text-gold-600" />
                </div>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-4 font-serif")}>
                  {value.title}
                </h3>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600 leading-relaxed")}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Seamless white background */}
      <section className="py-32 bg-white">
        <div className={cn(SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
              Meet Our Team
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed")}>
              Passionate designers and craftspeople dedicated to bringing your vision to life.
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gold-100">
                <div className="flex items-start space-x-6">
                  {/* Profile Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>

                  {/* Member Info */}
                  <div className="flex-1">
                    <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 mb-1 font-serif")}>
                      {member.name}
                    </h3>
                    <p className={cn(TYPOGRAPHY.accent, "text-gold-600 mb-4")}>
                      {member.role}
                    </p>
                    
                    <p className={cn(TYPOGRAPHY.body, "text-gray-600 mb-4 leading-relaxed")}>
                      {member.bio}
                    </p>

                    {/* Credentials */}
                    <div className="mb-4">
                      <h4 className={cn(TYPOGRAPHY.body, "font-semibold text-navy-700 mb-2")}>
                        Credentials:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.credentials.map((credential, credIndex) => (
                          <span 
                            key={credIndex}
                            className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm"
                          >
                            {credential}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className={cn(TYPOGRAPHY.body, "font-semibold text-navy-700 mb-2")}>
                        Specialties:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <span 
                            key={specIndex}
                            className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Subtle gradient transition */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className={cn(SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
              Our Journey
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed")}>
              Key milestones in our growth and evolution as a design studio.
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gold-200" />

            <div className="space-y-16">
              {timeline.map((event, index) => (
                <div key={index} className={cn(
                  "relative flex items-center",
                  index % 2 === 0 ? "justify-start" : "justify-end"
                )}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold-600 rounded-full z-10" />

                  <div className={cn(
                    "w-5/12 bg-white rounded-xl p-6 shadow-lg border border-gold-100",
                    index % 2 === 0 ? "mr-auto" : "ml-auto"
                  )}>
                    <div className="text-2xl font-bold text-gold-600 mb-2 font-serif">{event.year}</div>
                    <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 mb-3 font-serif")}>
                      {event.title}
                    </h3>
                    <p className={cn(TYPOGRAPHY.body, "text-gray-600 leading-relaxed")}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements - Elegant gradient */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className={cn(SPACING.container.default)}>
          <div className="text-center mb-20">
            <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-8 font-serif")}>
              By the Numbers
            </h2>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed")}>
              The results of our commitment to excellence and client satisfaction.
            </p>
            <div className="w-24 h-1 bg-gold-600 mx-auto" />
          </div>

          <div className={PATTERNS.grid.services}>
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className={cn(TYPOGRAPHY.heading, "text-5xl font-bold text-gold-600 mb-2 font-serif")}>
                  {achievement.number}
                </div>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 mb-3 font-serif")}>
                  {achievement.label}
                </h3>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600 leading-relaxed")}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Showroom - Seamless dark transition */}
      <section className="py-32 bg-gradient-to-b from-white to-navy-900">
        <div className={cn(SPACING.container.default)}>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-500 font-medium">Napa Valley Showroom</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-white mb-6 font-serif")}>
                Visit Our Showroom
              </h2>
              <div className="w-24 h-1 bg-gold-600 mb-8" />
              
              <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-300 mb-8 leading-relaxed")}>
                Experience our curated collection of luxury fixtures, finishes, and materials in person. 
                Our Napa Valley showroom features beautifully designed vignettes that showcase the 
                quality and craftsmanship of our preferred brands.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gold-600 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-gray-300")}>
                    1234 Main Street, Napa, CA 94559
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gold-600 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-gray-300")}>
                    (707) 555-0123
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gold-600 mr-3 flex-shrink-0" />
                  <span className={cn(TYPOGRAPHY.body, "text-gray-300")}>
                    Mon-Fri: 9am-6pm, Sat: 10am-4pm
                  </span>
                </div>
              </div>

              <button className={cn(
                "inline-flex items-center px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                TYPOGRAPHY.button
              )}>
                Schedule Showroom Visit
                <MapPin className="ml-3 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 