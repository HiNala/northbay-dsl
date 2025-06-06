"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { cn, SPACING, TYPOGRAPHY, PATTERNS } from "@/lib/design-system";
import { 
  Users, 
  Palette, 
  Home, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Award,
  Calendar,
  DollarSign,
  MapPin,
  Clock
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We discuss your vision, needs, and budget to create a personalized design plan.",
    details: [
      "In-home or virtual consultation",
      "Style preference assessment", 
      "Budget and timeline discussion",
      "Space measurement and analysis"
    ],
    icon: Users,
    timeline: "1-2 hours"
  },
  {
    number: "02", 
    title: "Design Development",
    description: "Our team creates detailed 3D renderings and material selections for your approval.",
    details: [
      "3D visualization and renderings",
      "Material and finish selection",
      "Detailed project specifications",
      "Initial design presentation"
    ],
    icon: Palette,
    timeline: "1-2 weeks"
  },
  {
    number: "03",
    title: "Project Curation",
    description: "We source premium materials and coordinate with trusted craftspeople.",
    details: [
      "Product sourcing and ordering",
      "Contractor coordination",
      "Project timeline finalization",
      "Permit assistance if needed"
    ],
    icon: Award,
    timeline: "2-4 weeks"
  },
  {
    number: "04",
    title: "Installation & Completion", 
    description: "Professional installation with quality craftsmanship and attention to detail.",
    details: [
      "Professional installation oversight",
      "Quality control inspections",
      "Final walkthrough and approval",
      "1-year warranty activation"
    ],
    icon: Home,
    timeline: "2-8 weeks"
  },
];

const servicePackages = [
  {
    name: "Design Consultation",
    price: "Starting at $500",
    description: "Perfect for homeowners who want professional guidance on their project direction.",
    features: [
      "2-hour in-home consultation",
      "Style assessment and recommendations", 
      "Project scope and budget guidance",
      "Resource list and next steps"
    ],
    popular: false
  },
  {
    name: "Complete Design Service",
    price: "Starting at $5,000",
    description: "Full-service design from concept to completion with 3D visualization.",
    features: [
      "Everything in Design Consultation",
      "3D renderings and floor plans",
      "Detailed specifications and materials list",
      "Project coordination and oversight",
      "1-year warranty on workmanship"
    ],
    popular: true
  },
  {
    name: "Luxury Concierge Service",
    price: "Starting at $15,000", 
    description: "White-glove service for discerning clients who want a seamless experience.",
    features: [
      "Everything in Complete Design Service",
      "Dedicated project manager",
      "Premium material sourcing",
      "Express timeline (when possible)",
      "Post-project maintenance service"
    ],
    popular: false
  }
];

interface FormData {
  projectType: string;
  stylePreference: string;
  budget: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  projectDescription: string;
}

export default function DesignServicesPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    stylePreference: "",
    budget: "",
    timeline: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    projectDescription: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-navy-900 to-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #B79A6B 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #B79A6B 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className={cn(SPACING.container.default, "relative z-10")}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Award className="w-4 h-4 mr-3" />
              <span className={cn(TYPOGRAPHY.accent, "text-white text-xs")}>
                Award-Winning Design Team
              </span>
            </div>

            <h1 className={cn(TYPOGRAPHY.heading, "text-5xl md:text-6xl mb-6 font-serif")}>
              From Concept to Completion
            </h1>
            <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-200 leading-relaxed max-w-3xl mx-auto")}>
              Our expert design team guides you through every step of your transformation journey. 
              From initial consultation to final installation, we ensure every detail exceeds your expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.default)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Our Design Process
          </h2>
          <p className={cn(TYPOGRAPHY.body, "text-xl text-gray-600 max-w-3xl mx-auto mb-8")}>
            A proven methodology that transforms your vision into reality with precision and care.
          </p>
          <div className="w-24 h-1 bg-gold-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group">
              <div 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gold-100"
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-600 rounded-full mb-6">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl font-bold text-gold-600/20 mb-4 font-serif">{step.number}</div>
                  <h3 className={cn(TYPOGRAPHY.subheading, "text-xl text-navy-900 mb-4 font-serif")}>
                    {step.title}
                  </h3>
                  <p className={cn(TYPOGRAPHY.body, "text-gray-600 mb-4")}>
                    {step.description}
                  </p>
                  <div className="flex items-center justify-center text-gold-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className={cn(TYPOGRAPHY.caption, "font-medium")}>{step.timeline}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedStep === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className={cn(TYPOGRAPHY.caption, "text-gray-600")}>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gold-600/30 transform -translate-y-1/2 z-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Service Packages */}
      <section className={cn(PATTERNS.section.alternate, SPACING.container.default)}>
        <div className="text-center mb-16">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Service Packages
          </h2>
          <p className={cn(TYPOGRAPHY.body, "text-xl text-gray-600 max-w-3xl mx-auto")}>
            Choose the level of service that best fits your project needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicePackages.map((pkg, index) => (
            <div 
              key={index} 
              className={cn(
                "relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300",
                pkg.popular ? "border-2 border-gold-600 transform scale-105" : "border border-gray-200"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gold-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-2 font-serif")}>
                  {pkg.name}
                </h3>
                <div className={cn(TYPOGRAPHY.heading, "text-3xl text-gold-600 mb-4 font-serif")}>
                  {pkg.price}
                </div>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600")}>
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className={cn(TYPOGRAPHY.body, "text-gray-700")}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-3 rounded-md font-medium transition-all duration-300",
                TYPOGRAPHY.button,
                pkg.popular 
                  ? "bg-gold-600 hover:bg-gold-700 text-white shadow-md hover:shadow-lg"
                  : "border-2 border-gold-600 text-gold-600 hover:bg-gold-50"
              )}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Step Form */}
      <section className={cn(PATTERNS.section.standard, SPACING.container.narrow)}>
        <div className="text-center mb-12">
          <h2 className={cn(TYPOGRAPHY.heading, "text-4xl md:text-5xl text-navy-900 mb-6 font-serif")}>
            Start Your Project
          </h2>
          <p className={cn(TYPOGRAPHY.body, "text-xl text-gray-600")}>
            Tell us about your vision and we'll create a custom proposal for your project.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                    step === currentStep 
                      ? "bg-gold-600 text-white" 
                      : step < currentStep 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-500"
                  )}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gold-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Project Details</span>
              <span>Style & Budget</span>
              <span>Timeline</span>
              <span>Contact Info</span>
            </div>
          </div>

          {/* Form Steps */}
          <form className="space-y-6">
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-6 font-serif")}>
                  Tell us about your project
                </h3>
                
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                    What type of project are you planning?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Kitchen Remodel", "Bathroom Renovation", "Whole Home Design", "Other"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleInputChange("projectType", type)}
                        className={cn(
                          "p-4 border-2 rounded-lg text-left transition-colors",
                          formData.projectType === type 
                            ? "border-gold-600 bg-gold-50 text-gold-700" 
                            : "border-gray-200 hover:border-gold-300"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                    Describe your project vision
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                    placeholder="Tell us about your dream space..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>
              </>
            )}

            {/* Step 2: Style & Budget */}
            {currentStep === 2 && (
              <>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-6 font-serif")}>
                  Style preferences and budget
                </h3>
                
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                    What style appeals to you most?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Modern Luxury", "Classic Traditional", "Contemporary", "Transitional"].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleInputChange("stylePreference", style)}
                        className={cn(
                          "p-4 border-2 rounded-lg text-left transition-colors",
                          formData.stylePreference === style 
                            ? "border-gold-600 bg-gold-50 text-gold-700" 
                            : "border-gray-200 hover:border-gold-300"
                        )}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                    What's your budget range?
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $200,000">$100,000 - $200,000</option>
                    <option value="$200,000 - $500,000">$200,000 - $500,000</option>
                    <option value="$500,000+">$500,000+</option>
                  </select>
                </div>
              </>
            )}

            {/* Step 3: Timeline */}
            {currentStep === 3 && (
              <>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-6 font-serif")}>
                  Project timeline
                </h3>
                
                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-3 font-medium")}>
                    When would you like to start?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["ASAP", "Within 3 months", "3-6 months", "6+ months"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleInputChange("timeline", time)}
                        className={cn(
                          "p-4 border-2 rounded-lg text-left transition-colors",
                          formData.timeline === time 
                            ? "border-gold-600 bg-gold-50 text-gold-700" 
                            : "border-gray-200 hover:border-gold-300"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Contact Info */}
            {currentStep === 4 && (
              <>
                <h3 className={cn(TYPOGRAPHY.subheading, "text-2xl text-navy-900 mb-6 font-serif")}>
                  Contact information
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>

                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>

                <div>
                  <label className={cn(TYPOGRAPHY.body, "block text-navy-700 mb-2 font-medium")}>
                    Project Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Street address, City, State"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                  />
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={cn(
                  "px-6 py-3 rounded-md font-medium transition-colors",
                  TYPOGRAPHY.button,
                  currentStep === 1 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                )}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={cn(
                    "px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-colors shadow-md hover:shadow-lg",
                    TYPOGRAPHY.button
                  )}
                >
                  Next Step
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className={cn(
                    "px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                    TYPOGRAPHY.button
                  )}
                >
                  Submit Project Request
                  <Calendar className="ml-2 w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={cn(PATTERNS.section.alternate, SPACING.container.default)}>
        <div className="text-center mb-12">
          <h2 className={cn(TYPOGRAPHY.heading, "text-3xl md:text-4xl text-navy-900 mb-6 font-serif")}>
            Trusted by Bay Area Homeowners
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Award, title: "NKBA Certified", subtitle: "Professional Members" },
            { icon: Star, title: "5-Star Rating", subtitle: "98% Client Satisfaction" },
            { icon: Home, title: "500+ Projects", subtitle: "Completed Successfully" },
            { icon: CheckCircle, title: "1-Year Warranty", subtitle: "On All Workmanship" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                <item.icon className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className={cn(TYPOGRAPHY.subheading, "text-lg text-navy-900 mb-1 font-serif")}>
                {item.title}
              </h3>
              <p className={cn(TYPOGRAPHY.caption, "text-gray-600")}>
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 