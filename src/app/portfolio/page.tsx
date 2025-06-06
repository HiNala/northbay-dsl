"use client";

import React from "react";
import { LuxuryDivider } from "@/components/luxury/divider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-system";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`${TYPOGRAPHY.heading} text-5xl md:text-6xl text-slate-900 mb-6`}>
              Portfolio
            </h1>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 mb-8`}>
              Explore our collection of award-winning kitchen and bathroom designs.
            </p>
            
            <LuxuryDivider variant="ornate" color="gold" width="center" withIcon />
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`${TYPOGRAPHY.heading} text-3xl md:text-4xl text-slate-900 mb-6`}>
            Portfolio Coming Soon
          </h2>
          <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 mb-8`}>
            We&apos;re preparing our stunning project showcase for you.
          </p>
          <Button variant="primary" color="gold" size="lg">
            Contact Us for Examples
          </Button>
        </div>
      </section>
    </main>
  );
} 