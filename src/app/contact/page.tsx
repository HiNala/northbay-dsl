"use client";

import React from "react";
import { LuxuryDivider } from "@/components/luxury/divider";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-system";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`${TYPOGRAPHY.heading} text-5xl md:text-6xl text-slate-900 mb-6`}>
              Contact Us
            </h1>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 mb-8`}>
              Ready to transform your space? We&apos;d love to hear about your project.
            </p>
            
            <LuxuryDivider variant="ornate" color="gold" width="center" withIcon />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`${TYPOGRAPHY.heading} text-3xl md:text-4xl text-slate-900 mb-8`}>
            Get in Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className={`${TYPOGRAPHY.subheading} text-xl text-slate-900 mb-2`}>Phone</h3>
              <p className={`${TYPOGRAPHY.body} text-slate-600`}>(415) 555-0123</p>
            </div>
            <div>
              <h3 className={`${TYPOGRAPHY.subheading} text-xl text-slate-900 mb-2`}>Email</h3>
              <p className={`${TYPOGRAPHY.body} text-slate-600`}>info@northbaykitchenbath.com</p>
            </div>
            <div>
              <h3 className={`${TYPOGRAPHY.subheading} text-xl text-slate-900 mb-2`}>Address</h3>
              <p className={`${TYPOGRAPHY.body} text-slate-600`}>123 Design Boulevard<br />San Rafael, CA 94901</p>
            </div>
          </div>

          <Button variant="primary" color="gold" size="lg">
            Schedule Consultation
          </Button>
        </div>
      </section>
    </main>
  );
} 