import { LuxuryHero } from "@/components/luxury/hero";
import { LuxuryDivider } from "@/components/luxury/divider";
import { ProductCard } from "@/components/luxury/product-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-system";

// Sample data for demonstration
const sampleProducts = [
  {
    id: "1",
    name: "Carrara Marble Kitchen Island",
    price: 4500,
    comparePrice: 5200,
    images: ["/images/products/marble-island-1.jpg", "/images/products/marble-island-2.jpg"],
    description: "Handcrafted Italian Carrara marble island with integrated breakfast bar and premium brass fixtures.",
    inStock: true,
    category: "Kitchen Islands",
    brand: "North Bay Designs",
  },
  {
    id: "2", 
    name: "Professional Series Range",
    price: 8900,
    images: ["/images/products/range-1.jpg"],
    description: "48-inch professional dual-fuel range with convection ovens and precision temperature control.",
    inStock: true,
    category: "Appliances",
    brand: "Wolf",
  },
  {
    id: "3",
    name: "Custom Walnut Cabinetry",
    price: 12500,
    images: ["/images/products/cabinets-1.jpg"],
    description: "Handcrafted solid walnut cabinetry with soft-close hinges and integrated LED lighting.",
    inStock: false,
    category: "Cabinetry",
    brand: "North Bay Designs",
  },
];

const designServices = [
  {
    title: "Kitchen Design",
    description: "Transform your kitchen into a culinary masterpiece with our complete design and renovation services.",
    features: ["3D Design Visualization", "Premium Material Selection", "Professional Installation", "1-Year Warranty"],
    icon: "🏠",
  },
  {
    title: "Bathroom Design",
    description: "Create your personal spa retreat with luxury bathroom designs that combine function and elegance.",
    features: ["Spa-Inspired Layouts", "Premium Fixtures", "Custom Vanities", "Lifetime Support"],
    icon: "🛁",
  },
  {
    title: "Whole Home",
    description: "Complete home transformations that reflect your unique style and enhance your living experience.",
    features: ["Full Home Planning", "Cohesive Design Language", "Project Management", "Concierge Service"],
    icon: "✨",
  },
];

export default function Home() {
  const handleScheduleConsultation = () => {
    // Navigate to design services page or open contact form
    console.log("Schedule consultation clicked");
  };

  const handleViewPortfolio = () => {
    // Navigate to portfolio page
    console.log("View portfolio clicked");
  };

  const handleProductDetails = (productId: string) => {
    console.log("View product details:", productId);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log("Add to wishlist:", productId);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <LuxuryHero
        title="Transform Your"
        subtitle="Living Space"
        description="Luxury kitchen and bath design that reflects your unique style and elevates your everyday living experience."
        primaryCTA={{
          text: "Schedule Consultation",
          onClick: handleScheduleConsultation,
        }}
        secondaryCTA={{
          text: "View Portfolio", 
          onClick: handleViewPortfolio,
        }}
        badge={{
          text: "Premium Design Services",
          icon: <span className="text-[#d4af37]">⭐</span>,
        }}
      />

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "15+", label: "Years Experience" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "50+", label: "Design Awards" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-slate-900 mb-6`}>
              Featured Products
            </h2>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 max-w-3xl mx-auto`}>
              Discover our curated selection of premium kitchen and bath products from the world&apos;s finest manufacturers.
            </p>
          </div>

          <LuxuryDivider variant="ornate" color="gold" width="center" withIcon />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleProductDetails}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" color="gold" size="lg">
              View All Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Design Services Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl text-slate-900 mb-6`}>
              Design Services
            </h2>
            <p className={`${TYPOGRAPHY.body} text-xl text-slate-600 max-w-3xl mx-auto`}>
              From concept to completion, we guide you through every step of your transformation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designServices.map((service, index) => (
              <Card key={index} variant="elevated" className="text-center hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className={TYPOGRAPHY.subheading}>{service.title}</CardTitle>
                  <CardDescription className={TYPOGRAPHY.body}>
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-700">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" color="gold" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" color="gold" size="lg" onClick={handleScheduleConsultation}>
              Schedule Free Consultation
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`${TYPOGRAPHY.heading} text-4xl md:text-5xl mb-6`}>
            Ready to Transform Your Space?
          </h2>
          <p className={`${TYPOGRAPHY.body} text-xl text-slate-300 max-w-3xl mx-auto mb-12`}>
            Let our award-winning design team bring your vision to life with uncompromising quality and attention to detail.
          </p>

          <LuxuryDivider variant="minimal" color="gold" width="center" withIcon />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" color="gold" size="lg" onClick={handleScheduleConsultation}>
              Get Started Today
            </Button>
            <Button variant="outline" color="gold" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Visit Our Showroom
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 