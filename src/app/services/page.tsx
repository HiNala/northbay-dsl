"use client";

import React from "react";
import { LuxuryDivider } from "@/components/luxury/divider";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-system";

export default function DesignServicesPage() {

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`${TYPOGRAPHY.heading} text-5xl md:text-6xl text-slate-900 mb-6`}>
              Design Services
            </h1>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 mb-8`}>
              Transform your space with expert design and exceptional craftsmanship.
            </p>
            
            <LuxuryDivider variant="ornate" color="gold" width="center" withIcon />
          </div>
        </div>
      </section>

      {/* Services Coming Soon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`${TYPOGRAPHY.heading} text-3xl md:text-4xl text-slate-900 mb-6`}>
            Design Services Coming Soon
          </h2>
          <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 mb-8`}>
            Our comprehensive design service packages are being finalized.
          </p>
          <Button variant="primary" color="gold" size="lg">
            Contact Us Today
          </Button>
        </div>
      </section>
    </main>
  );
} 