"use client";

import React from "react";
import { LuxuryDivider } from "@/components/luxury/divider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-system";

const teamMembers = [
  {
    name: "Sarah Richardson",
    role: "Founder & Principal Designer",
    bio: "With over 15 years of experience in luxury residential design, Sarah founded North Bay Kitchen & Bath to bring timeless elegance to Bay Area homes.",
    image: "/images/team/sarah-richardson.jpg",
    credentials: ["NKBA Certified", "Interior Design Institute Graduate"]
  },
  {
    name: "Michael Chen",
    role: "Senior Kitchen Designer",
    bio: "Michael specializes in creating functional and beautiful kitchen spaces that blend modern convenience with classic design principles.",
    image: "/images/team/michael-chen.jpg",
    credentials: ["NKBA Certified", "20+ Years Experience"]
  },
  {
    name: "Elena Martinez",
    role: "Bathroom Design Specialist",
    bio: "Elena transforms ordinary bathrooms into spa-like retreats, focusing on luxury materials and innovative space planning.",
    image: "/images/team/elena-martinez.jpg",
    credentials: ["NKBA Certified", "Certified Aging-in-Place Specialist"]
  }
];

const values = [
  {
    title: "Quality Craftsmanship",
    description: "We partner only with the finest artisans and use premium materials to ensure lasting beauty and functionality.",
    icon: "🔨"
  },
  {
    title: "Personalized Service",
    description: "Every project is unique. We listen carefully to understand your vision and lifestyle to create spaces that truly reflect you.",
    icon: "💎"
  },
  {
    title: "Timeless Design",
    description: "Our designs transcend trends, creating sophisticated spaces that remain beautiful and relevant for years to come.",
    icon: "⏰"
  },
  {
    title: "Exceptional Experience",
    description: "From initial consultation to final installation, we ensure a seamless, stress-free experience with clear communication.",
    icon: "✨"
  }
];

const achievements = [
  { number: "500+", label: "Projects Completed" },
  { number: "15+", label: "Years of Experience" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Industry Awards" }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`${TYPOGRAPHY.heading} text-5xl md:text-6xl text-slate-900 mb-6`}>
              About North Bay
            </h1>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 mb-8`}>
              Creating luxury kitchen and bathroom spaces that enhance your lifestyle and bring your vision to life through thoughtful design and exceptional craftsmanship.
            </p>
            
            <LuxuryDivider variant="ornate" color="gold" width="center" withIcon />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-slate-900 mb-6`}>
                Our Story
              </h2>
              <p className={`${TYPOGRAPHY.body} text-lg text-slate-600 mb-6`}>
                Founded in 2009, North Bay Kitchen & Bath began with a simple vision: to create extraordinary spaces that blend luxury with functionality. What started as a small design studio has grown into the Bay Area&apos;s premier destination for custom kitchen and bathroom design.
              </p>
              <p className={`${TYPOGRAPHY.body} text-lg text-slate-600 mb-6`}>
                Our team of award-winning designers brings together decades of experience, working with discerning clients who value quality, craftsmanship, and timeless design. We believe that your home should be a reflection of your personal style and support your unique lifestyle.
              </p>
              <Button variant="primary" color="gold" size="lg">
                View Our Portfolio
              </Button>
            </div>
            <div className="relative">
              <img
                src="/images/about/our-story.jpg"
                alt="North Bay Kitchen & Bath Design Studio"
                className="w-full h-96 object-cover rounded shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#d4af37] rounded opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-slate-900 mb-6`}>
              Our Values
            </h2>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 max-w-3xl mx-auto`}>
              These core principles guide everything we do, from the initial consultation to the final reveal.
            </p>
            <LuxuryDivider variant="classic" color="gold" width="center" className="mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-0">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className={`${TYPOGRAPHY.subheading} text-xl text-slate-900 mb-3`}>
                    {value.title}
                  </h3>
                  <p className={`${TYPOGRAPHY.body} text-slate-600`}>
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl mb-6`}>
              By the Numbers
            </h2>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-300 max-w-2xl mx-auto`}>
              Our track record speaks to our commitment to excellence and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-[#d4af37] mb-2`}>
                  {achievement.number}
                </div>
                <div className={`${TYPOGRAPHY.body} text-slate-300`}>
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-slate-900 mb-6`}>
              Meet Our Team
            </h2>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 max-w-3xl mx-auto`}>
              Our passionate team of designers and craftspeople bring decades of experience and an unwavering commitment to excellence.
            </p>
            <LuxuryDivider variant="ornate" color="gold" width="center" className="mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-6">
                  <h3 className={`${TYPOGRAPHY.subheading} text-2xl text-slate-900 mb-2`}>
                    {member.name}
                  </h3>
                  <p className="text-[#d4af37] font-medium mb-4">{member.role}</p>
                  <p className={`${TYPOGRAPHY.body} text-slate-600 mb-4`}>
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.credentials.map((credential, credIndex) => (
                      <span 
                        key={credIndex}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-slate-900 mb-6`}>
              Our Design Process
            </h2>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 max-w-3xl mx-auto`}>
              We&apos;ve refined our process over years of experience to ensure every project exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className={`${TYPOGRAPHY.subheading} text-2xl text-slate-900 mb-4`}>
                Discovery & Planning
              </h3>
              <p className={`${TYPOGRAPHY.body} text-slate-600`}>
                We start by understanding your vision, lifestyle, and functional needs through detailed consultations and site analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className={`${TYPOGRAPHY.subheading} text-2xl text-slate-900 mb-4`}>
                Design Development
              </h3>
              <p className={`${TYPOGRAPHY.body} text-slate-600`}>
                Our team creates detailed plans, 3D renderings, and material specifications that bring your vision to life.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className={`${TYPOGRAPHY.subheading} text-2xl text-slate-900 mb-4`}>
                Expert Installation
              </h3>
              <p className={`${TYPOGRAPHY.body} text-slate-600`}>
                Our experienced craftspeople and trusted contractors ensure flawless execution with attention to every detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`${TYPOGRAPHY.heading} text-3xl md:text-4xl mb-6`}>
            Ready to Begin Your Journey?
          </h2>
          <p className={`${TYPOGRAPHY.body} text-xl text-slate-300 max-w-2xl mx-auto mb-8`}>
            Let&apos;s discuss your vision and create a space that perfectly reflects your style and enhances your daily life.
          </p>
          <Button variant="primary" color="gold" size="lg">
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </main>
  );
} 