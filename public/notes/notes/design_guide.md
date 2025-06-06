Below is a complete blueprint that combines lessons from **Restoration Hardware (RH)**, **Studio McGee**, **Waterworks**, **Sub‑Zero | Wolf | Cove**, **Bulthaup**, **Porcelanosa**, and proven conversion research. It tells you **what pages to build, how to stack the content from top‑to‑bottom, and the exact visual/UX rules that signal “luxury” to Bay‑Area, high‑ticket kitchen‑and‑bath buyers.**

---

## 1. What the best luxury sites do right

Analysis of the reference sites reveals four evergreen patterns:

| Pattern                                        | Examples                                                                                                                                      | Impact                                                                   |                                              |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
| **Cinematic hero + restrained navigation**     | RH’s full‑bleed lifestyle photography with a two‑item top bar (“Shop / Interior Design”) ([rh.com][1])                                        | Immediate emotional hook; no cognitive overload                          |                                              |
| **Story‑first product discovery**              | Studio McGee’s magazine‑style grid that alternates editorial stories with “Shop the Look” CTAs ([studio-mcgee.com][2], [studio-mcgee.com][3]) | Builds brand authority before asking for money                           |                                              |
| **Appointment funnels above the fold**         | Bulthaup’s “Arrange a non‑binding consultation” form lives in the first viewport ([bulthaup.com][4])                                          | Converts ready‑to‑buy visitors fast                                      |                                              |
| **Inspiration galleries that double as proof** | Sub‑Zero                                                                                                                                      |  Wolf’s filterable award‑winning kitchen gallery ([subzero-wolf.com][5]) | Social proof + SEO juice + long‑tail traffic |

Add research‑backed tactics—sticky CTAs, whitespace, cohesive color palettes—to lift conversions further. ([infiniti7.com][6], [originalbox.co][7], [miliamarketing.com][8])

---

## 2. Page‑by‑page, top‑to‑bottom layout

### 2.1 Home

1. **Edge‑to‑edge hero (100 vh)**

   * One product glamour shot or completed remodel.
   * Overlay: logo, minimal nav, single “Explore Catalogue” button.
2. **Value‑prop trio** – 3 icon cards: “Curated Products”, “Custom Design Services”, “Bay‑Area Showroom”.
3. **Interactive product slider** – 8‑12 best‑sellers with hover zoom.
4. **Project highlight** – link to portfolio; masonry teaser.
5. **Design Services CTA block** – replicate RH’s split‑panel (image left, copy right, gold accent button). ([rh.com][9])
6. **Press & review bar** – logos of Houzz, Yelp rating, local magazines.
7. **Email capture / showroom appointment** – minimalist form, promise of “VIP mood‑board”.
8. **Footer** – slim, three columns, dark background.

### 2.2 Product Catalogue

* **Sticky filter sidebar** (category, finish, availability, price).
* **3‑column grid cards**: 4:5 ratio images, hover shows alternate angle.
* **Quick‑view drawer** with “Add to Wishlist” (for future e‑commerce).
* **Breadcrumbs** for SEO; JSON‑LD product schema.

### 2.3 Design Services (lead funnel)

1. **Hero** – aspirational full‑width photo, headline: “From Concept to Completion”.
2. **Process steps** – 4 horizontal cards (Consult → Concept → Curate → Complete), each opens accordion details.
3. **Portfolio proof strip** – auto‑scrolling project thumbnails.
4. **Multi‑step form** – progressive disclosure (project scope › style › budget › contact). Autofocus, inline validation, 4‑step progress bar.
5. **Trust badges** – NKBA membership, manufacturer partnerships (e.g., Sub‑Zero).

### 2.4 Project Portfolio

* **Masonry gallery** (lazy‑loaded).
* Detail page: hero carousel, before/after slider, specs list with linked products, testimonial quote.

### 2.5 About & Showroom

* Founders’ story (solo portrait + candid workshop image).
* Map embed, showroom hours, “Book Private Appointment” CTA.

### 2.6 Blog / Resources

* Evergreen guides (“Choosing the Right Quartzite”) + case‑studies. Optimize for long‑tail search and email list growth.

### 2.7 Contact / Appointment

* Inline calendar picker (Calendly API) + phone, showroom WhatsApp link.
* Secondary location details for service radius (North Bay suburbs).

---

## 3. Visual Style Guide

### 3.1 Color Palette

| Role                  | Hex       | Note                                                                            |
| --------------------- | --------- | ------------------------------------------------------------------------------- |
| **Background light**  | `#F7F7F5` | Warm white, keeps photos neutral.                                               |
| **Text primary**      | `#1F1F1F` | Almost‑black for legibility.                                                    |
| **Accent metallic**   | `#B79A6B` | Subtle brass, mirrors luxury fixtures (Waterworks & RH). ([waterworks.com][10]) |
| **Callout soft gray** | `#E6E4DE` | Section separators.                                                             |

### 3.2 Typography

* **Headings**: Playfair Display, 600‑700 weight, ‑1 % tracking.
* **Body**: Inter or Helvetica Neue, 400 weight, 1.5 rem line‑height.
* **Button/Label**: Upper‑case, letter‑spacing 2 px, 14 px size.

### 3.3 Imagery & Video

* Professional 4K, natural light.
* Composition: rule of thirds, negative space for text overlays.
* Use muted background video loops sparingly (sub‑2 MB, auto‑plays muted).

### 3.4 Spacing & Grid

* **8‑pt baseline**; desktop max‑width 1440 px.
* Section padding: 96 px desktop / 48 px mobile.
* 12‑column CSS grid; collapse to 4‑column on ≤768 px.

### 3.5 Components

| Component          | Spec                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **Primary button** | 48 px height, 24 px padding, accent background, 0.2 s ease opacity hover. |
| **Card**           | 2 xl radius, shadow‑sm, image top, text bottom.                           |
| **Form field**     | Border ‑ `1 px` accent on focus, floating label.                          |

### 3.6 Micro‑interactions

* Subtle parallax on hero scroll (RH style).
* Wishlist icon animates to heart‑filled on click.
* Form step progress bar transitions with `scaleY` motion (Framer Motion).

---

## 4. Conversion & UX Checklist

| Area         | Best Practice                                      | Source                  |
| ------------ | -------------------------------------------------- | ----------------------- |
| Navigation   | ≤5 top‑level links; sticky on scroll               | ([rh.com][1])           |
| Primary CTA  | Present every 1200 px scroll distance              |                         |
| Forms        | Multi‑step > single long form for complex asks     | ([bulthaup.com][4])     |
| Social Proof | At least one testimonial or review widget per page | ([subzero-wolf.com][5]) |
| Speed        | Core Web Vitals: LCP < 2.5 s, CLS < 0.1            |                         |
| SEO          | Schema.org product & service markup                | ([infiniti7.com][6])    |
| Local intent | Embed Google Map + “Directions” deep‑link          |                         |

---

## 5. Technical & Performance Notes

* **Next.js** Server Components + `next/image` for automatic AVIF/WEBP.
* Tailwind + @layer utilities for maintainable theme.
* Supabase Edge Functions for form submissions → `design_leads` table; fire Slack webhook to sales.
* Incremental Static Regeneration for catalogue & portfolio.
* `<link rel="preload">` hero images; use `priority` prop.
* Cloudflare or Vercel Image Optimization; set DPR‑aware sizes for Retina.
* Accessibility: color contrast ≥4.5:1, focus rings, aria‑labels on icons.

---

## 6. Launch & Beyond

1. **Soft‑launch** to VIP list → collect feedback.
2. **Heat‑map session tools** (Hotjar) to fine‑tune hero and Design Services form.
3. Post‑launch content cadence: 2 blog posts/month targeting “kitchen renovation Bay Area cost” etc.
4. Consider 360‑VR showroom tour and on‑site chatbot with project‑budget estimator.

---

Crafting pages with this structure and visual language will position NBKB alongside RH and Studio McGee, speak to affluent North‑Bay homeowners, and turn inspiration into booked consultations and, later, direct online sales.

[1]: https://rh.com/us/en/interior-design?utm_source=chatgpt.com "RH Interior Design - Restoration Hardware"
[2]: https://studio-mcgee.com/?utm_source=chatgpt.com "Studio McGee: Beautiful Interior Design & Home Decor"
[3]: https://studio-mcgee.com/design/?utm_source=chatgpt.com "Studio McGee Design - Inspiration & Style For Your Home"
[4]: https://bulthaup.com/en/?utm_source=chatgpt.com "bulthaup | premium kitchen | High-quality kitchen concepts"
[5]: https://www.subzero-wolf.com/inspiration/kitchens?utm_source=chatgpt.com "Kitchen Gallery | Inspiration | Sub-Zero, Wolf, and Cove"
[6]: https://infiniti7.com/9-secrets-to-creating-a-high-converting-interior-design-website/?utm_source=chatgpt.com "9 Secrets to Creating a High-Converting Interior Design Website"
[7]: https://originalbox.co/blog/your-interior-design-website-doesnt-work?utm_source=chatgpt.com "Why Your Website is Not Converting: Key Tips for Interior Designers ..."
[8]: https://miliamarketing.com/how-to-generate-effective-kitchen-remodeling-leads/?utm_source=chatgpt.com "How to Generate Effective Kitchen Remodeling Leads + Tips"
[9]: https://rh.com/us/en/interior-design/services?utm_source=chatgpt.com "RH Interior Design - Our Services - Restoration Hardware"
[10]: https://www.waterworks.com/us_en/?utm_source=chatgpt.com "Luxury Bath and Kitchen - Complete Design Destination | Waterworks"




# Luxury Kitchen & Bath Website Design Guide

*A complete blueprint for creating high-converting luxury home design websites*

---

## 1. Core Luxury Design Principles

### The Four Pillars of Luxury Web Design

**1. Cinematic Visual Impact**
- Full-bleed, edge-to-edge imagery that fills the viewport
- Professional 4K photography with natural lighting
- Minimal text overlays to avoid cluttering stunning visuals
- Restrained navigation (maximum 5 top-level items)

**2. Story-First Approach**
- Lead with brand narrative and lifestyle before product features
- Magazine-style editorial layouts that build authority
- "Shop the Look" integration within inspirational content
- Process storytelling that demonstrates expertise

**3. Immediate Conversion Opportunities**
- Appointment booking forms above the fold
- Multiple touchpoints for high-intent visitors
- Progressive form disclosure for complex service inquiries
- Sticky CTAs every 1200px of scroll distance

**4. Social Proof Integration**
- Award-winning project galleries as dual inspiration/proof
- Client testimonials prominently featured
- Industry certifications and partnerships displayed
- Press mentions and review highlights

---

## 2. Page Structure & Content Strategy

### Homepage Layout (Top to Bottom)

#### **Hero Section (100vh)**
```
Edge-to-edge hero image or video
├── Minimal logo placement (top-left)
├── Simplified navigation bar
├── Single primary CTA button
└── Optional: Scroll indicator
```

**Best Practices:**
- Use lifestyle photography showing completed spaces in use
- Overlay text should be minimal and high-contrast
- Hero button should lead to either catalog or design services
- Consider subtle parallax effect on scroll

#### **Value Proposition Trio**
Three icon-based cards highlighting core offerings:
- **Curated Products** - Exclusive, high-end selections
- **Custom Design Services** - Full-service design consultation
- **Showroom Experience** - Physical location for touch and feel

#### **Interactive Product Showcase**
- Horizontal slider with 8-12 hero products
- Hover effects reveal alternate angles or details
- Direct links to product detail pages
- Consider "Recently Viewed" or "Trending" categories

#### **Featured Project Highlight**
- Large hero image from recent portfolio piece
- Brief project description with key details
- Clear CTA to full portfolio
- Consider before/after slider integration

#### **Design Services CTA Block**
Split-panel layout:
- **Left:** Aspirational lifestyle image
- **Right:** Service description with benefits
- **Button:** Schedule consultation (primary accent color)

#### **Trust & Social Proof Bar**
- Industry logos (Houzz, NKBA, manufacturer partnerships)
- Star ratings and review snippets
- Local press mentions or awards

#### **Email/Appointment Capture**
- Minimal form design with clear value proposition
- Offer exclusive content (mood boards, trend reports)
- Optional: Showroom appointment scheduler

### Product Catalog Page

#### **Filter & Navigation System**
```
Sticky Sidebar Filters:
├── Category (Kitchen, Bath, Hardware, etc.)
├── Finish Options (with color swatches)
├── Price Range (slider)
├── Availability Status
├── Brand Selection
└── Style Categories
```

#### **Product Grid Layout**
- 3-column desktop grid with 4:5 aspect ratio images
- Hover states reveal secondary images or quick details
- Quick-view overlay option for fast browsing
- Wishlist functionality for future e-commerce

#### **SEO Optimization**
- Breadcrumb navigation for category hierarchy
- JSON-LD structured data for products
- Optimized meta descriptions and titles
- Filter URLs that are indexable

### Design Services Landing Page

#### **Conversion-Optimized Structure**

**1. Hero Section**
- Full-width aspirational photography
- Headline: "From Concept to Completion"
- Subheadline highlighting unique value proposition

**2. Process Visualization**
Four-step horizontal cards with accordion details:
```
Consult → Concept → Curate → Complete
```
Each step should include:
- Icon or illustration
- Brief description
- Expandable details
- Timeline expectations

**3. Portfolio Proof Strip**
- Auto-scrolling thumbnail gallery
- Diverse project types and styles
- Click-through to detailed case studies

**4. Multi-Step Lead Form**
Progressive disclosure approach:
```
Step 1: Project Scope (Kitchen/Bath/Whole Home)
Step 2: Style Preferences (Visual style quiz)
Step 3: Budget Range (Comfortable ranges, not exact)
Step 4: Contact Information & Timing
```

**Form UX Best Practices:**
- Progress bar showing completion
- Autofocus on current field
- Inline validation with helpful messaging
- Mobile-optimized with large touch targets

**5. Trust Indicators**
- Professional certifications (NKBA, NARI)
- Manufacturer partnerships (Sub-Zero, Wolf, etc.)
- Years in business and project count
- Client testimonial highlights

---

## 3. Visual Design System

### Color Palette

| Purpose | Hex Code | Usage |
|---------|----------|-------|
| **Primary Background** | `#F7F7F5` | Main page background, warm white that doesn't compete with photography |
| **Text Primary** | `#1F1F1F` | Headlines, body text, high-contrast elements |
| **Accent Metallic** | `#B79A6B` | CTAs, links, luxury accent color (brass inspiration) |
| **Soft Gray** | `#E6E4DE` | Section dividers, subtle backgrounds |
| **Pure White** | `#FFFFFF` | Card backgrounds, form fields |

### Typography Scale

#### **Headings**
- **Font:** Playfair Display (serif for luxury feel)
- **Weight:** 600-700
- **Letter Spacing:** -1%
- **Line Height:** 1.2-1.3

#### **Body Text**
- **Font:** Inter or Helvetica Neue
- **Weight:** 400 (regular)
- **Line Height:** 1.5
- **Size:** 16px base (responsive scaling)

#### **UI Elements**
- **Font:** Inter (consistency with body)
- **Style:** UPPERCASE for buttons/labels
- **Letter Spacing:** 2px
- **Size:** 14px for buttons

### Spacing System

**8-Point Grid System:**
- Base unit: 8px
- Section padding: 96px (desktop) / 48px (mobile)
- Element margins: Multiples of 8px (16px, 24px, 32px, etc.)
- Max content width: 1440px

### Component Library

#### **Primary Button**
```css
.btn-primary {
  height: 48px;
  padding: 0 24px;
  background: #B79A6B;
  color: white;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}
```

#### **Product/Project Cards**
```css
.card {
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}
```

#### **Form Fields**
```css
.form-field {
  position: relative;
  border: 1px solid #E6E4DE;
  border-radius: 4px;
  padding: 16px;
  transition: border-color 0.2s ease;
}

.form-field:focus {
  border-color: #B79A6B;
  outline: none;
}
```

### Imagery Guidelines

#### **Photography Standards**
- **Resolution:** Minimum 2000px width for hero images
- **Aspect Ratios:** 
  - Hero: 16:9 or 21:9
  - Product cards: 4:5
  - Project thumbnails: 1:1 or 4:3
- **Lighting:** Natural light preferred, consistent color temperature
- **Composition:** Rule of thirds, generous negative space for text overlays

#### **Video Content**
- **Format:** MP4 with WEBM fallback
- **Size:** Under 2MB for background videos
- **Settings:** Auto-play muted, loop enabled
- **Accessibility:** Provide pause controls

---

## 4. User Experience & Conversion Optimization

### Navigation Strategy

#### **Primary Navigation**
Maximum 5 top-level items:
1. **Products** (with mega-menu for categories)
2. **Design Services**
3. **Portfolio**
4. **About**
5. **Contact**

#### **Mobile Navigation**
- Hamburger menu with full-screen overlay
- Large touch targets (minimum 44px)
- Clear hierarchy with section dividers

### Conversion Rate Optimization

#### **Form Optimization**
- **Multi-step over single long forms** for complex inquiries
- **Progressive disclosure** reveals information as needed
- **Inline validation** with helpful error messages
- **Smart defaults** and autocomplete where appropriate

#### **Trust Building Elements**
- **Security badges** on forms
- **Clear privacy policy** links
- **Response time promises** ("We'll respond within 24 hours")
- **Phone number prominently displayed** for immediate contact

#### **Social Proof Placement**
- Homepage: Trust bar and featured testimonials
- Product pages: Customer reviews and project examples
- Service pages: Case studies and success metrics
- Contact pages: Response time and satisfaction stats

### Accessibility Standards

#### **Color & Contrast**
- Minimum 4.5:1 contrast ratio for text
- Color cannot be the only way to convey information
- Focus indicators visible on all interactive elements

#### **Keyboard Navigation**
- Tab order follows logical page flow
- Skip links for screen readers
- All interactive elements keyboard accessible

#### **Screen Reader Support**
- Alt text for all meaningful images
- ARIA labels for icon-only buttons
- Semantic HTML structure with proper headings

---

## 5. Technical Implementation

### Performance Optimization

#### **Image Optimization**
```javascript
// Next.js Image component example
<Image
  src="/hero-kitchen.jpg"
  alt="Modern luxury kitchen design"
  width={1920}
  height={1080}
  priority // For above-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### **Core Web Vitals Targets**
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **FID (First Input Delay):** < 100 milliseconds
- **CLS (Cumulative Layout Shift):** < 0.1

#### **Loading Strategy**
- Critical CSS inlined
- Non-critical CSS loaded asynchronously
- Images lazy-loaded below the fold
- Preload hero images and critical fonts

### SEO Implementation

#### **Structured Data Examples**
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Luxury Kitchen Faucet",
  "image": "https://example.com/faucet.jpg",
  "description": "Professional-grade kitchen faucet with...",
  "brand": {
    "@type": "Brand",
    "name": "Waterworks"
  },
  "offers": {
    "@type": "Offer",
    "price": "1299.00",
    "priceCurrency": "USD"
  }
}
```

#### **Local SEO Optimization**
- Google My Business optimization
- Local schema markup for showroom
- Location-specific landing pages
- Local directory submissions

### Integration Points

#### **CRM & Lead Management**
- Form submissions to Supabase database
- Slack notifications for new leads
- Email automation for follow-ups
- Calendar integration for appointments

#### **Analytics & Tracking**
- Google Analytics 4 with enhanced e-commerce
- Heat mapping tools (Hotjar/Clarity)
- A/B testing capability
- Conversion funnel tracking

---

## 6. Content Strategy

### Blog Content Calendar

#### **Evergreen Content Topics**
- "Complete Guide to Kitchen Renovation Costs in [Location]"
- "Choosing the Right Countertop Material: Quartz vs. Granite vs. Marble"
- "2024 Kitchen Design Trends That Will Last"
- "How to Maximize Storage in Small Bathrooms"

#### **SEO-Focused Content**
Target long-tail keywords:
- "luxury kitchen designers [city name]"
- "custom bathroom renovation [area]"
- "high-end kitchen appliances showroom"
- "interior design consultation [location]"

#### **Content Distribution**
- 2 blog posts per month minimum
- Social media content calendar
- Email newsletter with project highlights
- Video content for YouTube and social

### Photography & Asset Planning

#### **Required Photography Shoots**
1. **Showroom Photography**
   - Wide establishing shots
   - Detail shots of key products
   - Staff portraits
   - Customer interaction shots

2. **Project Documentation**
   - Before/during/after sequences
   - Detail shots highlighting craftsmanship
   - Lifestyle shots with family/entertaining
   - Aerial/architectural shots if applicable

3. **Product Photography**
   - Hero shots on neutral backgrounds
   - Lifestyle context shots
   - Detail shots showing quality/features
   - Finish/color variation shots

---

## 7. Launch Strategy & Ongoing Optimization

### Pre-Launch Checklist

#### **Technical Testing**
- [ ] Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsiveness on various devices
- [ ] Form submission testing
- [ ] Page load speed optimization
- [ ] SSL certificate and security headers
- [ ] Analytics and tracking implementation

#### **Content Review**
- [ ] All copy proofread and approved
- [ ] Images optimized and properly attributed
- [ ] SEO meta tags complete
- [ ] Social media og: tags configured
- [ ] Legal pages (privacy, terms) in place

#### **User Testing**
- [ ] Internal team review
- [ ] Client stakeholder approval
- [ ] Third-party usability testing
- [ ] Accessibility audit completed

### Post-Launch Optimization

#### **Month 1: Data Collection**
- Monitor user behavior with analytics
- Collect heat map data on key pages
- Track form completion rates
- Gather initial customer feedback

#### **Month 2-3: Initial Optimizations**
- A/B test headline variations
- Optimize high-traffic page load times
- Refine form flows based on drop-off data
- Adjust content based on search performance

#### **Ongoing: Continuous Improvement**
- Monthly performance reviews
- Quarterly design updates
- Annual brand refresh considerations
- Regular content updates and additions

---

## 8. Budget & Timeline Considerations

### Development Phases

#### **Phase 1: Core Site (4-6 weeks)**
- Homepage and key landing pages
- Basic product catalog
- Contact and service pages
- Mobile optimization

#### **Phase 2: Enhanced Features (2-3 weeks)**
- Advanced filtering and search
- Portfolio gallery with case studies
- Blog/content management
- SEO optimization

#### **Phase 3: Conversion Optimization (2-3 weeks)**
- A/B testing implementation
- Advanced analytics setup
- Performance optimization
- User experience refinements

### Ongoing Costs

#### **Monthly Expenses**
- Hosting and CDN: $50-200/month
- Analytics and testing tools: $100-300/month
- Photography/content creation: $500-2000/month
- SEO/marketing tools: $200-500/month

---

This comprehensive guide provides the blueprint for creating a luxury kitchen and bath website that converts browsers into qualified leads and positions your brand alongside industry leaders like RH and Studio McGee. The key is balancing stunning visual presentation with strategic conversion optimization throughout the user journey.






component examples:


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Award,
  Users,
  Palette,
  Home,
  Sparkles,
  CheckCircle,
  Quote,
} from "lucide-react"

// Hero Section Component
export function LuxuryHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 text-center text-white max-w-6xl px-6">
        <div className="mb-6">
          <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Design Services
          </Badge>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight">
          Transform Your
          <span className="block bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            Living Space
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Luxury kitchen and bath design that reflects your unique style and elevates your everyday living experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg">
            Schedule Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
          >
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  )
}

// Stats Section
export function StatsSection() {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: Home },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Client Satisfaction", icon: Users },
    { number: "50+", label: "Design Awards", icon: Palette },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-amber-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Product Card Component
export function ProductCard({ product }: { product: any }) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white">
      <div className="relative overflow-hidden">
        <img
          src="/placeholder.svg?height=300&width=400"
          alt={product?.name || "Product"}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-amber-600 text-white">Featured</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <Button className="w-full bg-white text-slate-900 hover:bg-gray-100">
            View Details
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
            {product?.name || "Premium Kitchen Cabinet"}
          </h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        <p className="text-slate-600 mb-4 line-clamp-2">
          {product?.description ||
            "Handcrafted with premium materials and attention to detail, perfect for modern luxury kitchens."}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-900">${product?.price || "2,499"}</span>
          <Badge variant="outline" className="text-green-600 border-green-200">
            In Stock
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Testimonial Component
export function TestimonialCard() {
  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <Quote className="w-8 h-8 text-amber-600 mr-3" />
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        <blockquote className="text-lg text-slate-700 mb-6 leading-relaxed">
          "North Bay Kitchen & Bath transformed our outdated kitchen into a stunning centerpiece. Their attention to
          detail and quality craftsmanship exceeded our expectations."
        </blockquote>
        <div className="flex items-center">
          <img src="/placeholder.svg?height=60&width=60" alt="Client" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <div className="font-semibold text-slate-900">Sarah Johnson</div>
            <div className="text-slate-600">Homeowner, Napa Valley</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Contact Form Component
export function ContactForm() {
  return (
    <Card className="bg-white shadow-2xl border-0">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold text-slate-900 mb-2">Start Your Dream Project</CardTitle>
        <p className="text-slate-600 text-lg">Get a free consultation with our design experts</p>
      </CardHeader>
      <CardContent className="p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <Input
                placeholder="Enter your first name"
                className="border-slate-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
              <Input
                placeholder="Enter your last name"
                className="border-slate-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              className="border-slate-200 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              className="border-slate-200 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:ring-amber-500">
              <option>Kitchen Remodel</option>
              <option>Bathroom Renovation</option>
              <option>Full Home Design</option>
              <option>Consultation Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Project Details</label>
            <Textarea
              placeholder="Tell us about your vision..."
              rows={4}
              className="border-slate-200 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg">
            Schedule Free Consultation
            <Calendar className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// Service Card Component
export function ServiceCard({
  title,
  description,
  icon: Icon,
  features,
}: {
  title: string
  description: string
  icon: any
  features: string[]
}) {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="relative p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6 group-hover:bg-amber-200 transition-colors">
          <Icon className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-amber-700 transition-colors">{title}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-slate-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          className="group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all"
        >
          Learn More
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Process Steps Component
export function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We discuss your vision, needs, and budget to create a personalized design plan.",
      icon: Users,
    },
    {
      number: "02",
      title: "Design Development",
      description: "Our team creates detailed 3D renderings and material selections for your approval.",
      icon: Palette,
    },
    {
      number: "03",
      title: "Project Execution",
      description: "Professional installation with quality craftsmanship and attention to detail.",
      icon: Home,
    },
    {
      number: "04",
      title: "Final Walkthrough",
      description: "We ensure every detail meets our high standards and your complete satisfaction.",
      icon: CheckCircle,
    },
  ]

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Design Process</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From concept to completion, we guide you through every step of your transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 rounded-full mb-6">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-6xl font-bold text-amber-600/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-amber-600/30 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
export function LuxuryFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-amber-400">North Bay Kitchen & Bath</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Transforming homes with luxury kitchen and bath design for over 15 years.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Mail className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Kitchen Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Bathroom Renovation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Custom Cabinetry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Design Consultation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-amber-400" />
                <span>(707) 555-0123</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-amber-400" />
                <span>info@nbkb.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-amber-400" />
                <span>Napa Valley, CA</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-amber-400" />
                <span>Mon-Fri 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 North Bay Kitchen & Bath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Demo Component
export default function ComponentsLibrary() {
  const sampleProduct = {
    name: "Premium Kitchen Cabinet",
    description: "Handcrafted with premium materials and attention to detail, perfect for modern luxury kitchens.",
    price: "2,499",
  }

  const serviceFeatures = [
    "3D Design Visualization",
    "Premium Material Selection",
    "Professional Installation",
    "1-Year Warranty",
  ]

  return (
    <div className="min-h-screen bg-white">
      <LuxuryHero />
      <StatsSection />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard product={sampleProduct} />
            <ProductCard product={sampleProduct} />
            <ProductCard product={sampleProduct} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Kitchen Design"
              description="Complete kitchen transformations with custom cabinetry and premium finishes."
              icon={Home}
              features={serviceFeatures}
            />
            <ServiceCard
              title="Bathroom Renovation"
              description="Luxury bathroom designs that combine functionality with elegant aesthetics."
              icon={Sparkles}
              features={serviceFeatures}
            />
            <ServiceCard
              title="Design Consultation"
              description="Expert guidance to help you visualize and plan your perfect space."
              icon={Users}
              features={serviceFeatures}
            />
          </div>
        </div>
      </section>

      <ProcessSteps />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-2xl">
          <ContactForm />
        </div>
      </section>

      <LuxuryFooter />
    </div>
  )
}



import { Sparkles, Diamond, Crown, Circle, Square, Triangle, Hexagon } from "lucide-react"

// Artistic Line Separators
export function ArtisticSeparators() {
  return (
    <div className="space-y-16 py-20">
      {/* Golden Ratio Spiral Separator */}
      <div className="flex justify-center">
        <div className="relative w-64 h-16">
          <svg viewBox="0 0 256 64" className="w-full h-full">
            <defs>
              <linearGradient id="goldSpiral" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
            </defs>
            <path
              d="M20 32 Q40 16, 80 32 T160 32 Q200 16, 236 32"
              stroke="url(#goldSpiral)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <circle cx="128" cy="32" r="3" fill="#d97706" className="animate-ping" />
          </svg>
        </div>
      </div>

      {/* Geometric Diamond Chain */}
      <div className="flex justify-center items-center space-x-4">
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative">
            <div
              className="w-3 h-3 bg-amber-400 rotate-45 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          </div>
        ))}
        <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
      </div>

      {/* Marble Texture Divider */}
      <div className="relative h-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 400 32" className="w-full h-full">
            <path d="M0,16 Q100,8 200,16 T400,16" stroke="#94a3b8" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M0,20 Q150,12 300,20 T400,20" stroke="#cbd5e1" strokeWidth="0.5" fill="none" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Art Deco Separator */}
      <div className="flex justify-center">
        <div className="relative">
          <svg width="200" height="40" viewBox="0 0 200 40">
            <defs>
              <linearGradient id="artDeco" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            <polygon points="100,5 110,15 100,25 90,15" fill="url(#artDeco)" />
            <polygon points="80,10 90,15 80,20 70,15" fill="url(#artDeco)" opacity="0.7" />
            <polygon points="120,10 130,15 120,20 110,15" fill="url(#artDeco)" opacity="0.7" />
            <polygon points="60,12 70,15 60,18 50,15" fill="url(#artDeco)" opacity="0.5" />
            <polygon points="140,12 150,15 140,18 130,15" fill="url(#artDeco)" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Flowing Ribbon */}
      <div className="relative h-12 overflow-hidden">
        <svg viewBox="0 0 800 48" className="w-full h-full">
          <defs>
            <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M0,24 Q200,8 400,24 T800,24"
            stroke="url(#ribbon)"
            strokeWidth="8"
            fill="none"
            className="animate-pulse"
          />
          <path d="M0,24 Q200,40 400,24 T800,24" stroke="url(#ribbon)" strokeWidth="4" fill="none" opacity="0.5" />
        </svg>
      </div>
    </div>
  )
}

// Decorative Corner Accents
export function CornerAccents() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
      {/* Ornate Corner */}
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <defs>
            <linearGradient id="ornate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
          <path
            d="M8,8 L8,32 Q8,40 16,40 L32,40 Q40,40 40,32 L40,16 Q40,8 32,8 L16,8 Q8,8 8,8"
            stroke="url(#ornate)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="24" cy="24" r="3" fill="#d97706" />
          <path d="M16,16 Q24,20 32,16 Q28,24 32,32 Q24,28 16,32 Q20,24 16,16" fill="url(#ornate)" opacity="0.3" />
        </svg>
      </div>

      {/* Geometric Corner */}
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-500"></div>
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300"></div>
        <div className="absolute top-4 left-4 w-2 h-2 bg-amber-200"></div>
      </div>

      {/* Floral Corner */}
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <g transform="translate(8,8)">
            <path d="M0,0 Q20,10 40,0 Q30,20 40,40 Q20,30 0,40 Q10,20 0,0" fill="#f59e0b" opacity="0.6" />
            <circle cx="20" cy="20" r="8" fill="#d97706" opacity="0.4" />
            <circle cx="20" cy="20" r="4" fill="#92400e" />
          </g>
        </svg>
      </div>

      {/* Modern Minimal Corner */}
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-transparent"></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute top-4 left-4 w-4 h-4 border border-amber-400 rotate-45"></div>
      </div>
    </div>
  )
}

// Textural Background Elements
export function TexturalBackgrounds() {
  return (
    <div className="space-y-8">
      {/* Marble Texture */}
      <div className="relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="marble" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q25,25 50,50 T100,50" stroke="#94a3b8" strokeWidth="1" fill="none" />
              <path d="M0,30 Q30,60 60,30 T120,30" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
              <path d="M0,70 Q40,40 80,70 T160,70" stroke="#e2e8f0" strokeWidth="0.3" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#marble)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-light text-slate-700">Marble Texture Background</h3>
        </div>
      </div>

      {/* Geometric Pattern */}
      <div className="relative h-64 overflow-hidden rounded-lg bg-slate-900">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="hexagon" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,4 52,16 52,40 30,52 8,40 8,16" stroke="#f59e0b" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-light text-white">Geometric Pattern</h3>
        </div>
      </div>

      {/* Organic Flow */}
      <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 to-orange-100">
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <radialGradient id="organic">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <circle cx="20%" cy="30%" r="80" fill="url(#organic)" />
          <circle cx="80%" cy="70%" r="120" fill="url(#organic)" />
          <circle cx="60%" cy="20%" r="60" fill="url(#organic)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-light text-slate-700">Organic Flow</h3>
        </div>
      </div>
    </div>
  )
}

// Decorative Icons and Emblems
export function DecorativeEmblems() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
      {/* Luxury Crest */}
      <div className="flex justify-center">
        <div className="relative w-20 h-24">
          <svg viewBox="0 0 80 96" className="w-full h-full">
            <defs>
              <linearGradient id="crest" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
            </defs>
            <path
              d="M40,8 L60,24 L60,60 Q60,72 40,80 Q20,72 20,60 L20,24 Z"
              fill="url(#crest)"
              stroke="#92400e"
              strokeWidth="2"
            />
            <Crown className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 text-yellow-300" />
            <circle cx="40" cy="48" r="8" fill="#fbbf24" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Art Deco Emblem */}
      <div className="flex justify-center">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <defs>
              <radialGradient id="artDecoEmblem">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </radialGradient>
            </defs>
            <circle cx="40" cy="40" r="35" fill="url(#artDecoEmblem)" />
            <polygon points="40,15 50,30 40,45 30,30" fill="#1e293b" opacity="0.8" />
            <polygon points="40,35 50,50 40,65 30,50" fill="#1e293b" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Geometric Badge */}
      <div className="flex justify-center">
        <div className="relative w-20 h-20">
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
              <Diamond className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Monogram Style */}
      <div className="flex justify-center">
        <div className="relative w-20 h-20">
          <div className="w-full h-full border-4 border-amber-500 rounded-full flex items-center justify-center bg-white">
            <div className="text-2xl font-serif font-bold text-amber-700">NB</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated Accent Elements
export function AnimatedAccents() {
  return (
    <div className="space-y-16 py-20">
      {/* Floating Particles */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <div className="w-full h-full animate-ping bg-amber-300 rounded-full"></div>
            </div>
          ))}
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h3 className="text-xl font-light text-slate-700">Floating Particles Effect</h3>
        </div>
      </div>

      {/* Pulsing Rings */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-2 border-amber-300 rounded-full animate-ping"></div>
          <div
            className="absolute inset-2 border-2 border-amber-400 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute inset-4 border-2 border-amber-500 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute inset-8 bg-amber-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
        </div>
      </div>

      {/* Morphing Shapes */}
      <div className="flex justify-center space-x-8">
        {[Circle, Square, Triangle, Hexagon].map((Shape, i) => (
          <div key={i} className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <Shape className="w-8 h-8 text-white animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Gradient Waves */}
      <div className="relative h-24 overflow-hidden">
        <svg viewBox="0 0 1200 96" className="w-full h-full">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d97706" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M0,48 Q300,16 600,48 T1200,48 L1200,96 L0,96 Z" fill="url(#wave1)" className="animate-pulse" />
          <path
            d="M0,64 Q400,32 800,64 T1600,64 L1600,96 L0,96 Z"
            fill="url(#wave2)"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>
    </div>
  )
}

// Luxury Border Frames
export function LuxuryFrames() {
  return (
    <div className="space-y-8 p-8">
      {/* Ornate Frame */}
      <div className="relative p-8">
        <div className="absolute inset-0 border-4 border-amber-500"></div>
        <div className="absolute inset-2 border-2 border-amber-300"></div>
        <div className="absolute top-0 left-0 w-8 h-8 bg-amber-600 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rotate-45"></div>
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 bg-amber-600 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rotate-45"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-amber-600 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rotate-45"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-amber-600 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rotate-45"></div>
        </div>
        <div className="relative bg-white p-8 text-center">
          <h3 className="text-2xl font-light text-slate-700">Ornate Luxury Frame</h3>
          <p className="text-slate-600 mt-2">Perfect for highlighting premium content</p>
        </div>
      </div>

      {/* Minimalist Frame */}
      <div className="relative p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200 to-transparent h-px top-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200 to-transparent h-px bottom-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-200 to-transparent w-px left-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-200 to-transparent w-px right-0"></div>
        <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 text-center">
          <h3 className="text-2xl font-light text-slate-700">Minimalist Frame</h3>
          <p className="text-slate-600 mt-2">Clean and sophisticated</p>
        </div>
      </div>
    </div>
  )
}

// Main Demo Component
export default function LuxuryAccents() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-slate-900 mb-6">Luxury Design Accents</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A collection of sophisticated decorative elements and artistic accents for premium interior design websites
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-light text-slate-800 mb-8 text-center">Artistic Separators</h2>
          <ArtisticSeparators />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-light text-slate-800 mb-8 text-center">Corner Accents</h2>
          <CornerAccents />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-light text-slate-800 mb-8 text-center">Textural Backgrounds</h2>
          <TexturalBackgrounds />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-light text-slate-800 mb-8 text-center">Decorative Emblems</h2>
          <DecorativeEmblems />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-light text-slate-800 mb-8 text-center">Animated Accents</h2>
          <AnimatedAccents />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-light text-slate-800 mb-8 text-center">Luxury Frames</h2>
          <LuxuryFrames />
        </section>
      </div>
    </div>
  )
}



"use client"

import { Calendar } from "@/components/ui/calendar"

import type React from "react"
import { cn } from "@/lib/utils"
import { Diamond, Crown, ChevronRight, Star, Feather, Gem, Award, Flower, Palette } from "lucide-react"

// -----------------------------------------------
// LUXURY DESIGN SYSTEM - NORTH BAY KITCHEN & BATH
// -----------------------------------------------

// Core color palette constants
const COLORS = {
  gold: {
    light: "#f7e9c3",
    medium: "#d4af37",
    dark: "#9e7c0c",
  },
  navy: {
    light: "#394867",
    medium: "#212A3E",
    dark: "#0F1729",
  },
  ivory: {
    light: "#FFFBF5",
    medium: "#F8F0E5",
    dark: "#EADBC8",
  },
  walnut: {
    light: "#A27B5C",
    medium: "#8B4513",
    dark: "#3A2410",
  },
}

// Typography scale
const TYPOGRAPHY = {
  heading: "font-light tracking-tight",
  subheading: "font-medium tracking-wide",
  body: "font-normal leading-relaxed",
  caption: "font-light text-sm tracking-wide",
  accent: "font-medium uppercase tracking-widest text-xs",
}

// Spacing scale (in rem)
const SPACING = {
  xs: "p-2",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
  "2xl": "p-16",
}

// -----------------------------------------------
// 1. DIVIDERS & SEPARATORS
// -----------------------------------------------

interface DividerProps {
  className?: string
  variant?: "classic" | "minimal" | "ornate" | "double"
  color?: "gold" | "navy" | "walnut"
  width?: "full" | "center"
  withIcon?: boolean
  icon?: React.ReactNode
}

export function LuxuryDivider({
  className,
  variant = "classic",
  color = "gold",
  width = "center",
  withIcon = false,
  icon,
}: DividerProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: COLORS.gold.medium,
    navy: COLORS.navy.medium,
    walnut: COLORS.walnut.medium,
  }

  const selectedColor = colorMap[color]

  // Width classes
  const widthClasses = {
    full: "w-full",
    center: "w-1/2 mx-auto",
  }

  // Base divider styles
  const baseStyles = cn("relative my-12", widthClasses[width], className)

  // Render different divider variants
  switch (variant) {
    case "minimal":
      return (
        <div className={baseStyles}>
          <div
            className="h-px"
            style={{ background: `linear-gradient(to right, transparent, ${selectedColor}, transparent)` }}
          />
          {withIcon && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
              {icon || <Diamond className={`w-4 h-4`} style={{ color: selectedColor }} />}
            </div>
          )}
        </div>
      )

    case "ornate":
      return (
        <div className={baseStyles}>
          <div className="flex items-center justify-center">
            <div
              className="flex-grow h-px bg-transparent"
              style={{ background: `linear-gradient(to right, transparent, ${selectedColor})` }}
            />
            <div className="mx-4 flex items-center">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: selectedColor }} />
              <div className="w-2 h-2 mx-2 rounded-full" style={{ backgroundColor: selectedColor }} />
              {withIcon ? (
                <div className="mx-2">{icon || <Diamond className={`w-4 h-4`} style={{ color: selectedColor }} />}</div>
              ) : (
                <div className="w-3 h-3 mx-2 rounded-full" style={{ backgroundColor: selectedColor }} />
              )}
              <div className="w-2 h-2 mx-2 rounded-full" style={{ backgroundColor: selectedColor }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: selectedColor }} />
            </div>
            <div
              className="flex-grow h-px bg-transparent"
              style={{ background: `linear-gradient(to left, transparent, ${selectedColor})` }}
            />
          </div>
        </div>
      )

    case "double":
      return (
        <div className={baseStyles}>
          <div className="relative">
            <div
              className="h-px mb-1.5"
              style={{ background: `linear-gradient(to right, transparent, ${selectedColor}, transparent)` }}
            />
            <div
              className="h-px"
              style={{ background: `linear-gradient(to right, transparent, ${selectedColor}, transparent)` }}
            />
            {withIcon && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                {icon || <Diamond className={`w-4 h-4`} style={{ color: selectedColor }} />}
              </div>
            )}
          </div>
        </div>
      )

    // Classic is default
    default:
      return (
        <div className={baseStyles}>
          <div className="flex items-center">
            <div className="flex-grow">
              <div className="h-0.5" style={{ backgroundColor: selectedColor }} />
            </div>
            {withIcon && (
              <div className="mx-4">{icon || <Diamond className={`w-4 h-4`} style={{ color: selectedColor }} />}</div>
            )}
            <div className="flex-grow">
              <div className="h-0.5" style={{ backgroundColor: selectedColor }} />
            </div>
          </div>
        </div>
      )
  }
}

// -----------------------------------------------
// 2. DECORATIVE CORNERS & FRAMES
// -----------------------------------------------

interface FrameProps {
  children: React.ReactNode
  className?: string
  variant?: "classic" | "minimal" | "ornate" | "accent"
  color?: "gold" | "navy" | "walnut"
  cornerSize?: "sm" | "md" | "lg"
}

export function LuxuryFrame({
  children,
  className,
  variant = "classic",
  color = "gold",
  cornerSize = "md",
}: FrameProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: COLORS.gold.medium,
    navy: COLORS.navy.medium,
    walnut: COLORS.walnut.medium,
  }

  const selectedColor = colorMap[color]

  // Corner size classes
  const cornerSizeMap = {
    sm: { size: "w-8 h-8", inset: "top-2 right-2 bottom-2 left-2" },
    md: { size: "w-12 h-12", inset: "top-3 right-3 bottom-3 left-3" },
    lg: { size: "w-16 h-16", inset: "top-4 right-4 bottom-4 left-4" },
  }

  const cornerClasses = cornerSizeMap[cornerSize]

  // Base frame styles
  const baseStyles = cn("relative p-8", className)

  // Render different frame variants
  switch (variant) {
    case "minimal":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0">
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, ${selectedColor}, transparent, ${selectedColor})` }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, ${selectedColor}, transparent, ${selectedColor})` }}
            />
            <div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(to bottom, ${selectedColor}, transparent, ${selectedColor})` }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(to bottom, ${selectedColor}, transparent, ${selectedColor})` }}
            />
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      )

    case "ornate":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0 border border-opacity-30" style={{ borderColor: selectedColor }}></div>
          <div className="absolute inset-4 border border-opacity-60" style={{ borderColor: selectedColor }}></div>

          {/* Ornate corners */}
          <div className={`absolute top-0 left-0 ${cornerClasses.size}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0,0 L80,0 C40,0 0,40 0,80 L0,0 Z" fill="none" stroke={selectedColor} strokeWidth="2" />
              <path d="M0,0 L40,0 C20,0 0,20 0,40 L0,0 Z" fill="none" stroke={selectedColor} strokeWidth="1" />
            </svg>
          </div>

          <div className={`absolute top-0 right-0 ${cornerClasses.size}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M100,0 L20,0 C60,0 100,40 100,80 L100,0 Z" fill="none" stroke={selectedColor} strokeWidth="2" />
              <path d="M100,0 L60,0 C80,0 100,20 100,40 L100,0 Z" fill="none" stroke={selectedColor} strokeWidth="1" />
            </svg>
          </div>

          <div className={`absolute bottom-0 left-0 ${cornerClasses.size}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0,100 L0,20 C0,60 40,100 80,100 L0,100 Z" fill="none" stroke={selectedColor} strokeWidth="2" />
              <path d="M0,100 L0,60 C0,80 20,100 40,100 L0,100 Z" fill="none" stroke={selectedColor} strokeWidth="1" />
            </svg>
          </div>

          <div className={`absolute bottom-0 right-0 ${cornerClasses.size}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M100,100 L100,20 C100,60 60,100 20,100 L100,100 Z"
                fill="none"
                stroke={selectedColor}
                strokeWidth="2"
              />
              <path
                d="M100,100 L100,60 C100,80 80,100 60,100 L100,100 Z"
                fill="none"
                stroke={selectedColor}
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="relative z-10 p-8">{children}</div>
        </div>
      )

    case "accent":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0 border" style={{ borderColor: selectedColor }}></div>

          {/* Accent corners */}
          <div
            className={`absolute top-0 left-0 ${cornerClasses.size} border-b border-r`}
            style={{ borderColor: selectedColor }}
          >
            <div
              className="absolute bottom-0 right-0 w-1/2 h-1/2 border-t border-l"
              style={{ borderColor: selectedColor }}
            ></div>
          </div>

          <div
            className={`absolute top-0 right-0 ${cornerClasses.size} border-b border-l`}
            style={{ borderColor: selectedColor }}
          >
            <div
              className="absolute bottom-0 left-0 w-1/2 h-1/2 border-t border-r"
              style={{ borderColor: selectedColor }}
            ></div>
          </div>

          <div
            className={`absolute bottom-0 left-0 ${cornerClasses.size} border-t border-r`}
            style={{ borderColor: selectedColor }}
          >
            <div
              className="absolute top-0 right-0 w-1/2 h-1/2 border-b border-l"
              style={{ borderColor: selectedColor }}
            ></div>
          </div>

          <div
            className={`absolute bottom-0 right-0 ${cornerClasses.size} border-t border-l`}
            style={{ borderColor: selectedColor }}
          >
            <div
              className="absolute top-0 left-0 w-1/2 h-1/2 border-b border-r"
              style={{ borderColor: selectedColor }}
            ></div>
          </div>

          <div className="relative z-10 p-8">{children}</div>
        </div>
      )

    // Classic is default
    default:
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0 border-2" style={{ borderColor: selectedColor }}></div>

          {/* Classic corners */}
          <div
            className={`absolute top-0 left-0 ${cornerClasses.size}`}
            style={{ borderRight: `2px solid ${selectedColor}`, borderBottom: `2px solid ${selectedColor}` }}
          ></div>
          <div
            className={`absolute top-0 right-0 ${cornerClasses.size}`}
            style={{ borderLeft: `2px solid ${selectedColor}`, borderBottom: `2px solid ${selectedColor}` }}
          ></div>
          <div
            className={`absolute bottom-0 left-0 ${cornerClasses.size}`}
            style={{ borderRight: `2px solid ${selectedColor}`, borderTop: `2px solid ${selectedColor}` }}
          ></div>
          <div
            className={`absolute bottom-0 right-0 ${cornerClasses.size}`}
            style={{ borderLeft: `2px solid ${selectedColor}`, borderTop: `2px solid ${selectedColor}` }}
          ></div>

          <div className="relative z-10 p-4">{children}</div>
        </div>
      )
  }
}

// -----------------------------------------------
// 3. DECORATIVE ACCENTS & EMBLEMS
// -----------------------------------------------

interface EmblemProps {
  className?: string
  variant?: "crest" | "medallion" | "monogram" | "badge"
  color?: "gold" | "navy" | "walnut"
  size?: "sm" | "md" | "lg"
  letter?: string
  icon?: React.ReactNode
}

export function LuxuryEmblem({
  className,
  variant = "crest",
  color = "gold",
  size = "md",
  letter = "N",
  icon,
}: EmblemProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: {
      primary: COLORS.gold.medium,
      secondary: COLORS.gold.light,
      accent: COLORS.gold.dark,
    },
    navy: {
      primary: COLORS.navy.medium,
      secondary: COLORS.navy.light,
      accent: COLORS.navy.dark,
    },
    walnut: {
      primary: COLORS.walnut.medium,
      secondary: COLORS.walnut.light,
      accent: COLORS.walnut.dark,
    },
  }

  const selectedColor = colorMap[color]

  // Size classes
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  }

  // Base emblem styles
  const baseStyles = cn("relative", sizeClasses[size], className)

  // Render different emblem variants
  switch (variant) {
    case "medallion":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0 rounded-full" style={{ backgroundColor: selectedColor.secondary }}></div>
          <div className="absolute inset-1 rounded-full border-2" style={{ borderColor: selectedColor.primary }}></div>
          <div className="absolute inset-3 rounded-full flex items-center justify-center">
            {icon || (
              <div className="text-2xl font-serif" style={{ color: selectedColor.primary }}>
                {letter}
              </div>
            )}
          </div>
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: selectedColor.accent }}></div>
        </div>
      )

    case "monogram":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0 border-2" style={{ borderColor: selectedColor.primary }}></div>
          <div className="absolute inset-2 border" style={{ borderColor: selectedColor.accent }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {icon || (
              <div className="text-3xl font-serif" style={{ color: selectedColor.primary }}>
                {letter}
              </div>
            )}
          </div>
        </div>
      )

    case "badge":
      return (
        <div className={baseStyles}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 95,25 95,75 50,95 5,75 5,25"
              fill={selectedColor.secondary}
              stroke={selectedColor.primary}
              strokeWidth="2"
            />
            <polygon
              points="50,15 85,30 85,70 50,85 15,70 15,30"
              fill="none"
              stroke={selectedColor.accent}
              strokeWidth="1"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {icon || (
              <div className="text-2xl font-serif" style={{ color: selectedColor.primary }}>
                {letter}
              </div>
            )}
          </div>
        </div>
      )

    // Crest is default
    default:
      return (
        <div className={baseStyles}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50,5 L80,20 L80,60 C80,75 65,90 50,95 C35,90 20,75 20,60 L20,20 Z"
              fill={selectedColor.secondary}
              stroke={selectedColor.primary}
              strokeWidth="2"
            />
            <path
              d="M50,15 L70,25 L70,55 C70,65 60,80 50,85 C40,80 30,65 30,55 L30,25 Z"
              fill="none"
              stroke={selectedColor.accent}
              strokeWidth="1"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pt-2">
            {icon || (
              <div className="text-2xl font-serif" style={{ color: selectedColor.primary }}>
                {letter}
              </div>
            )}
          </div>
        </div>
      )
  }
}

// -----------------------------------------------
// 4. DECORATIVE BACKGROUNDS & PATTERNS
// -----------------------------------------------

interface PatternProps {
  className?: string
  variant?: "marble" | "geometric" | "organic" | "classic"
  color?: "gold" | "navy" | "walnut" | "ivory"
  opacity?: number
  children?: React.ReactNode
}

export function LuxuryPattern({
  className,
  variant = "marble",
  color = "gold",
  opacity = 0.1,
  children,
}: PatternProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: {
      primary: COLORS.gold.medium,
      secondary: COLORS.gold.light,
    },
    navy: {
      primary: COLORS.navy.medium,
      secondary: COLORS.navy.light,
    },
    walnut: {
      primary: COLORS.walnut.medium,
      secondary: COLORS.walnut.light,
    },
    ivory: {
      primary: COLORS.ivory.medium,
      secondary: COLORS.ivory.light,
    },
  }

  const selectedColor = colorMap[color]

  // Base pattern styles
  const baseStyles = cn("relative overflow-hidden", className)

  // Render different pattern variants
  switch (variant) {
    case "geometric":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0" style={{ opacity }}>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="geometric-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="10" height="10" fill={selectedColor.secondary} />
                  <rect x="10" y="10" width="10" height="10" fill={selectedColor.secondary} />
                  <rect x="20" y="0" width="10" height="10" fill={selectedColor.secondary} />
                  <rect x="30" y="10" width="10" height="10" fill={selectedColor.secondary} />
                  <rect x="0" y="20" width="10" height="10" fill={selectedColor.secondary} />
                  <rect x="10" y="30" width="10" height="10" fill={selectedColor.secondary} />
                  <rect x="20" y="20" width="10" height="10" fill={selectedColor.secondary} />
                  <rect x="30" y="30" width="10" height="10" fill={selectedColor.secondary} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
            </svg>
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      )

    case "organic":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0" style={{ opacity }}>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="organic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="8" fill={selectedColor.secondary} />
                  <circle cx="40" cy="30" r="12" fill={selectedColor.secondary} />
                  <circle cx="70" cy="15" r="10" fill={selectedColor.secondary} />
                  <circle cx="20" cy="60" r="15" fill={selectedColor.secondary} />
                  <circle cx="60" cy="70" r="10" fill={selectedColor.secondary} />
                  <circle cx="90" cy="50" r="8" fill={selectedColor.secondary} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#organic-pattern)" />
            </svg>
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      )

    case "classic":
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0" style={{ opacity }}>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="classic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M0,0 L60,0 L60,60 L0,60 Z" fill="none" stroke={selectedColor.primary} strokeWidth="1" />
                  <path
                    d="M15,15 L45,15 L45,45 L15,45 Z"
                    fill="none"
                    stroke={selectedColor.primary}
                    strokeWidth="0.5"
                  />
                  <circle cx="30" cy="30" r="3" fill={selectedColor.primary} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#classic-pattern)" />
            </svg>
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      )

    // Marble is default
    default:
      return (
        <div className={baseStyles}>
          <div className="absolute inset-0" style={{ opacity }}>
            <svg width="100%" height="100%">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" fill="none" />
              <rect width="100%" height="100%" fill={selectedColor.secondary} style={{ mixBlendMode: "multiply" }} />
            </svg>
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      )
  }
}

// -----------------------------------------------
// 5. SECTION HEADERS WITH ACCENTS
// -----------------------------------------------

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  variant?: "centered" | "underlined" | "framed" | "elegant"
  color?: "gold" | "navy" | "walnut"
  icon?: React.ReactNode
  align?: "left" | "center" | "right"
}

export function LuxurySectionHeader({
  title,
  subtitle,
  className,
  variant = "centered",
  color = "gold",
  icon,
  align = "center",
}: SectionHeaderProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: COLORS.gold.medium,
    navy: COLORS.navy.medium,
    walnut: COLORS.walnut.medium,
  }

  const selectedColor = colorMap[color]

  // Alignment classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  // Base header styles
  const baseStyles = cn("mb-12", alignClasses[align], className)

  // Render different header variants
  switch (variant) {
    case "underlined":
      return (
        <div className={baseStyles}>
          <div className="inline-block">
            {icon && <div className="mb-4 flex justify-center">{icon}</div>}
            <h2 className={`text-3xl md:text-4xl ${TYPOGRAPHY.heading} mb-2`}>{title}</h2>
            {subtitle && <p className={`${TYPOGRAPHY.body} text-slate-600 mb-4`}>{subtitle}</p>}
            <div
              className="h-1 bg-gradient-to-r from-transparent via-current to-transparent"
              style={{ color: selectedColor }}
            ></div>
          </div>
        </div>
      )

    case "framed":
      return (
        <div className={baseStyles}>
          <div className="inline-block relative px-8 py-4">
            <div
              className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
              style={{ borderColor: selectedColor }}
            ></div>
            <div
              className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
              style={{ borderColor: selectedColor }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
              style={{ borderColor: selectedColor }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
              style={{ borderColor: selectedColor }}
            ></div>

            {icon && <div className="mb-2 flex justify-center">{icon}</div>}
            <h2 className={`text-3xl md:text-4xl ${TYPOGRAPHY.heading}`}>{title}</h2>
            {subtitle && <p className={`${TYPOGRAPHY.body} text-slate-600 mt-2`}>{subtitle}</p>}
          </div>
        </div>
      )

    case "elegant":
      return (
        <div className={baseStyles}>
          <div className="flex items-center justify-center mb-4">
            <div
              className="h-px w-12 bg-gradient-to-r from-transparent to-current"
              style={{ color: selectedColor }}
            ></div>
            {icon || <Diamond className="mx-4" style={{ color: selectedColor }} />}
            <div
              className="h-px w-12 bg-gradient-to-l from-transparent to-current"
              style={{ color: selectedColor }}
            ></div>
          </div>
          <h2 className={`text-3xl md:text-4xl ${TYPOGRAPHY.heading} mb-2`}>{title}</h2>
          {subtitle && <p className={`${TYPOGRAPHY.body} text-slate-600`}>{subtitle}</p>}
        </div>
      )

    // Centered is default
    default:
      return (
        <div className={baseStyles}>
          {icon && <div className="mb-4 flex justify-center">{icon}</div>}
          <h2 className={`text-3xl md:text-4xl ${TYPOGRAPHY.heading} mb-2`}>{title}</h2>
          {subtitle && <p className={`${TYPOGRAPHY.body} text-slate-600`}>{subtitle}</p>}
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-0.5" style={{ backgroundColor: selectedColor }}></div>
            <div className="w-2 h-2 mx-2 rotate-45" style={{ backgroundColor: selectedColor }}></div>
            <div className="w-16 h-0.5" style={{ backgroundColor: selectedColor }}></div>
          </div>
        </div>
      )
  }
}

// -----------------------------------------------
// 6. DECORATIVE QUOTES & TESTIMONIALS
// -----------------------------------------------

interface QuoteProps {
  quote: string
  author?: string
  role?: string
  className?: string
  variant?: "classic" | "modern" | "elegant" | "minimal"
  color?: "gold" | "navy" | "walnut"
}

export function LuxuryQuote({ quote, author, role, className, variant = "classic", color = "gold" }: QuoteProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: COLORS.gold.medium,
    navy: COLORS.navy.medium,
    walnut: COLORS.walnut.medium,
  }

  const selectedColor = colorMap[color]

  // Base quote styles
  const baseStyles = cn("relative my-12", className)

  // Render different quote variants
  switch (variant) {
    case "modern":
      return (
        <div className={baseStyles}>
          <div className="absolute top-0 left-0 text-6xl leading-none opacity-20" style={{ color: selectedColor }}>
            "
          </div>
          <div className="pt-8 pl-8">
            <p className={`text-lg ${TYPOGRAPHY.body} mb-4 italic`}>{quote}</p>
            {author && (
              <div className="flex items-center">
                <div className="w-8 h-0.5 mr-3" style={{ backgroundColor: selectedColor }}></div>
                <div>
                  <div className="font-medium">{author}</div>
                  {role && <div className="text-sm text-slate-500">{role}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      )

    case "elegant":
      return (
        <div className={baseStyles}>
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full"
              style={{ backgroundColor: `${selectedColor}20` }}
            >
              <Feather className="w-8 h-8" style={{ color: selectedColor }} />
            </div>
          </div>
          <p className={`text-lg ${TYPOGRAPHY.body} mb-6 text-center italic`}>{quote}</p>
          {author && (
            <div className="text-center">
              <div className="font-medium">{author}</div>
              {role && <div className="text-sm text-slate-500">{role}</div>}
            </div>
          )}
        </div>
      )

    case "minimal":
      return (
        <div className={baseStyles}>
          <div className="border-l-4 pl-6" style={{ borderColor: selectedColor }}>
            <p className={`text-lg ${TYPOGRAPHY.body} mb-4`}>{quote}</p>
            {author && (
              <div>
                <div className="font-medium">{author}</div>
                {role && <div className="text-sm text-slate-500">{role}</div>}
              </div>
            )}
          </div>
        </div>
      )

    // Classic is default
    default:
      return (
        <div className={baseStyles}>
          <div className="relative p-8 bg-slate-50">
            <div className="absolute top-4 left-4 text-6xl leading-none opacity-20" style={{ color: selectedColor }}>
              "
            </div>
            <div
              className="absolute bottom-4 right-4 text-6xl leading-none opacity-20 rotate-180"
              style={{ color: selectedColor }}
            >
              "
            </div>
            <p className={`text-lg ${TYPOGRAPHY.body} mb-6 relative z-10`}>{quote}</p>
            {author && (
              <div className="flex items-center justify-end">
                <div>
                  <div className="font-medium">{author}</div>
                  {role && <div className="text-sm text-slate-500">{role}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      )
  }
}

// -----------------------------------------------
// 7. LUXURY BUTTONS & CALL-TO-ACTIONS
// -----------------------------------------------

interface ButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "outline" | "minimal" | "elegant"
  color?: "gold" | "navy" | "walnut"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  onClick?: () => void
}

export function LuxuryButton({
  children,
  className,
  variant = "primary",
  color = "gold",
  size = "md",
  icon,
  iconPosition = "right",
  onClick,
}: ButtonProps) {
  // Map color names to actual color values
  const colorMap = {
    gold: {
      bg: COLORS.gold.medium,
      text: "#ffffff",
      hover: COLORS.gold.dark,
      border: COLORS.gold.medium,
    },
    navy: {
      bg: COLORS.navy.medium,
      text: "#ffffff",
      hover: COLORS.navy.dark,
      border: COLORS.navy.medium,
    },
    walnut: {
      bg: COLORS.walnut.medium,
      text: "#ffffff",
      hover: COLORS.walnut.dark,
      border: COLORS.walnut.medium,
    },
  }

  const selectedColor = colorMap[color]

  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  // Base button styles
  const baseStyles = cn(
    "inline-flex items-center justify-center transition-all duration-300 font-medium",
    sizeClasses[size],
    className,
  )

  // Render different button variants
  switch (variant) {
    case "outline":
      return (
        <button
          className={cn(baseStyles, "border-2 hover:bg-opacity-10")}
          style={{
            borderColor: selectedColor.border,
            color: selectedColor.border,
            backgroundColor: "transparent",
          }}
          onClick={onClick}
        >
          {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
          {children}
          {iconPosition === "right" && icon && (
            <span className="ml-2">{icon || <ChevronRight className="w-5 h-5" />}</span>
          )}
        </button>
      )

    case "minimal":
      return (
        <button
          className={cn(baseStyles, "hover:underline")}
          style={{
            color: selectedColor.border,
            backgroundColor: "transparent",
          }}
          onClick={onClick}
        >
          {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
          {children}
          {iconPosition === "right" && icon && (
            <span className="ml-2">{icon || <ChevronRight className="w-5 h-5" />}</span>
          )}
        </button>
      )

    case "elegant":
      return (
        <button
          className={cn(baseStyles, "border hover:translate-y-[-2px] shadow-sm hover:shadow")}
          style={{
            borderColor: selectedColor.border,
            color: selectedColor.border,
            backgroundColor: "transparent",
          }}
          onClick={onClick}
        >
          <span className="relative px-2">
            <span
              className="absolute top-0 left-0 w-1 h-1 border-t border-l"
              style={{ borderColor: selectedColor.border }}
            ></span>
            <span
              className="absolute top-0 right-0 w-1 h-1 border-t border-r"
              style={{ borderColor: selectedColor.border }}
            ></span>
            <span
              className="absolute bottom-0 left-0 w-1 h-1 border-b border-l"
              style={{ borderColor: selectedColor.border }}
            ></span>
            <span
              className="absolute bottom-0 right-0 w-1 h-1 border-b border-r"
              style={{ borderColor: selectedColor.border }}
            ></span>

            {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
            {children}
            {iconPosition === "right" && icon && (
              <span className="ml-2">{icon || <ChevronRight className="w-5 h-5" />}</span>
            )}
          </span>
        </button>
      )

    // Primary is default
    default:
      return (
        <button
          className={cn(baseStyles, "hover:shadow-md")}
          style={{
            backgroundColor: selectedColor.bg,
            color: selectedColor.text,
          }}
          onClick={onClick}
        >
          {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
          {children}
          {iconPosition === "right" && icon && (
            <span className="ml-2">{icon || <ChevronRight className="w-5 h-5" />}</span>
          )}
        </button>
      )
  }
}

// -----------------------------------------------
// SHOWCASE COMPONENT
// -----------------------------------------------

export default function LuxuryDesignSystem() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className={`text-5xl ${TYPOGRAPHY.heading} text-slate-900 mb-6`}>North Bay Kitchen & Bath</h1>
          <p className={`text-xl ${TYPOGRAPHY.body} text-slate-600 max-w-3xl mx-auto`}>Luxury Design System</p>
          <LuxuryDivider variant="ornate" color="gold" width="center" withIcon />
        </div>

        {/* Color Palette */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Color Palette"
            subtitle="Our signature luxury color palette"
            variant="elegant"
            icon={<Palette className="w-6 h-6" style={{ color: COLORS.gold.medium }} />}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="h-32 rounded-lg mb-4" style={{ backgroundColor: COLORS.gold.medium }}></div>
              <h3 className="font-medium mb-1">Gold</h3>
              <p className="text-sm text-slate-500">{COLORS.gold.medium}</p>
            </div>
            <div>
              <div className="h-32 rounded-lg mb-4" style={{ backgroundColor: COLORS.navy.medium }}></div>
              <h3 className="font-medium mb-1">Navy</h3>
              <p className="text-sm text-slate-500">{COLORS.navy.medium}</p>
            </div>
            <div>
              <div className="h-32 rounded-lg mb-4" style={{ backgroundColor: COLORS.ivory.medium }}></div>
              <h3 className="font-medium mb-1">Ivory</h3>
              <p className="text-sm text-slate-500">{COLORS.ivory.medium}</p>
            </div>
            <div>
              <div className="h-32 rounded-lg mb-4" style={{ backgroundColor: COLORS.walnut.medium }}></div>
              <h3 className="font-medium mb-1">Walnut</h3>
              <p className="text-sm text-slate-500">{COLORS.walnut.medium}</p>
            </div>
          </div>
        </section>

        {/* Dividers */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Dividers"
            subtitle="Elegant separators for content sections"
            variant="underlined"
          />

          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-medium mb-4">Classic Divider</h3>
              <LuxuryDivider variant="classic" color="gold" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Minimal Divider</h3>
              <LuxuryDivider variant="minimal" color="navy" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Ornate Divider</h3>
              <LuxuryDivider variant="ornate" color="walnut" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Double Divider</h3>
              <LuxuryDivider variant="double" color="gold" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Divider with Icon</h3>
              <LuxuryDivider
                variant="classic"
                color="navy"
                withIcon
                icon={<Crown className="w-4 h-4" style={{ color: COLORS.navy.medium }} />}
              />
            </div>
          </div>
        </section>

        {/* Frames */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Luxury Frames"
            subtitle="Decorative borders for important content"
            variant="framed"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <LuxuryFrame variant="classic" color="gold">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Classic Frame</h3>
                <p className="text-slate-600">Elegant border for highlighting premium content</p>
              </div>
            </LuxuryFrame>

            <LuxuryFrame variant="minimal" color="navy">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Minimal Frame</h3>
                <p className="text-slate-600">Subtle gradient borders for a modern look</p>
              </div>
            </LuxuryFrame>

            <LuxuryFrame variant="ornate" color="gold">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Ornate Frame</h3>
                <p className="text-slate-600">Decorative corners for a luxurious feel</p>
              </div>
            </LuxuryFrame>

            <LuxuryFrame variant="accent" color="walnut">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Accent Frame</h3>
                <p className="text-slate-600">Sophisticated nested corners</p>
              </div>
            </LuxuryFrame>
          </div>
        </section>

        {/* Emblems */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Decorative Emblems"
            subtitle="Distinctive brand elements and icons"
            variant="centered"
          />

          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <LuxuryEmblem variant="crest" color="gold" letter="N" />
              <p className="mt-4 text-sm text-slate-600">Crest</p>
            </div>

            <div className="text-center">
              <LuxuryEmblem variant="medallion" color="navy" letter="B" />
              <p className="mt-4 text-sm text-slate-600">Medallion</p>
            </div>

            <div className="text-center">
              <LuxuryEmblem variant="monogram" color="walnut" letter="K" />
              <p className="mt-4 text-sm text-slate-600">Monogram</p>
            </div>

            <div className="text-center">
              <LuxuryEmblem
                variant="badge"
                color="gold"
                icon={<Diamond className="w-6 h-6" style={{ color: COLORS.gold.dark }} />}
              />
              <p className="mt-4 text-sm text-slate-600">Badge</p>
            </div>
          </div>
        </section>

        {/* Patterns */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Textural Backgrounds"
            subtitle="Sophisticated patterns and textures"
            variant="elegant"
            icon={<Gem className="w-6 h-6" style={{ color: COLORS.gold.medium }} />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LuxuryPattern variant="marble" color="gold" opacity={0.2} className="h-48 rounded-lg">
              <div className="h-full flex items-center justify-center">
                <h3 className="text-xl font-medium">Marble Texture</h3>
              </div>
            </LuxuryPattern>

            <LuxuryPattern variant="geometric" color="navy" opacity={0.15} className="h-48 rounded-lg">
              <div className="h-full flex items-center justify-center">
                <h3 className="text-xl font-medium">Geometric Pattern</h3>
              </div>
            </LuxuryPattern>

            <LuxuryPattern variant="organic" color="walnut" opacity={0.2} className="h-48 rounded-lg">
              <div className="h-full flex items-center justify-center">
                <h3 className="text-xl font-medium">Organic Pattern</h3>
              </div>
            </LuxuryPattern>

            <LuxuryPattern variant="classic" color="gold" opacity={0.15} className="h-48 rounded-lg">
              <div className="h-full flex items-center justify-center">
                <h3 className="text-xl font-medium">Classic Pattern</h3>
              </div>
            </LuxuryPattern>
          </div>
        </section>

        {/* Section Headers */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Section Headers"
            subtitle="Elegant headings for content organization"
            variant="centered"
          />

          <div className="space-y-16">
            <LuxurySectionHeader
              title="Centered Header Style"
              subtitle="With decorative diamond accent"
              variant="centered"
              color="gold"
            />

            <LuxurySectionHeader
              title="Underlined Header Style"
              subtitle="With gradient underline"
              variant="underlined"
              color="navy"
            />

            <LuxurySectionHeader
              title="Framed Header Style"
              subtitle="With corner accents"
              variant="framed"
              color="walnut"
            />

            <LuxurySectionHeader
              title="Elegant Header Style"
              subtitle="With icon and line accents"
              variant="elegant"
              color="gold"
              icon={<Star className="w-5 h-5" style={{ color: COLORS.gold.medium }} />}
            />
          </div>
        </section>

        {/* Quotes */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Testimonial Styles"
            subtitle="Elegant quote displays for client testimonials"
            variant="underlined"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <LuxuryQuote
              quote="North Bay Kitchen & Bath transformed our outdated kitchen into a stunning centerpiece. Their attention to detail and quality craftsmanship exceeded our expectations."
              author="Sarah Johnson"
              role="Homeowner, Napa Valley"
              variant="classic"
              color="gold"
            />

            <LuxuryQuote
              quote="Working with their design team was a pleasure from start to finish. They listened to our needs and created a space that perfectly reflects our style."
              author="Michael Roberts"
              role="Client, Sonoma"
              variant="modern"
              color="navy"
            />

            <LuxuryQuote
              quote="The transformation of our master bathroom was nothing short of spectacular. Every detail was considered, creating a true luxury retreat in our home."
              author="Jennifer Williams"
              role="Homeowner, St. Helena"
              variant="elegant"
              color="gold"
            />

            <LuxuryQuote
              quote="Their team's expertise and professionalism made our renovation stress-free. The finished kitchen is both beautiful and functional."
              author="David Thompson"
              role="Client, Yountville"
              variant="minimal"
              color="walnut"
            />
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Call-to-Action Buttons"
            subtitle="Sophisticated button styles for user interaction"
            variant="framed"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
            <div>
              <h3 className="text-lg font-medium mb-6">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <LuxuryButton variant="primary" color="gold">
                  Schedule Consultation
                </LuxuryButton>

                <LuxuryButton variant="primary" color="navy" icon={<Calendar className="w-5 h-5" />}>
                  Book Appointment
                </LuxuryButton>

                <LuxuryButton variant="primary" color="walnut" size="lg">
                  View Portfolio
                </LuxuryButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-6">Outline Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <LuxuryButton variant="outline" color="gold">
                  Learn More
                </LuxuryButton>

                <LuxuryButton variant="outline" color="navy" icon={<ChevronRight className="w-5 h-5" />}>
                  Explore Services
                </LuxuryButton>

                <LuxuryButton variant="outline" color="walnut" size="lg">
                  Contact Us
                </LuxuryButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-6">Minimal Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <LuxuryButton variant="minimal" color="gold">
                  View Details
                </LuxuryButton>

                <LuxuryButton variant="minimal" color="navy" icon={<ChevronRight className="w-5 h-5" />}>
                  Read More
                </LuxuryButton>

                <LuxuryButton variant="minimal" color="walnut" size="lg">
                  See All Projects
                </LuxuryButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-6">Elegant Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <LuxuryButton variant="elegant" color="gold">
                  Request Quote
                </LuxuryButton>

                <LuxuryButton variant="elegant" color="navy" icon={<Award className="w-5 h-5" />}>
                  Our Services
                </LuxuryButton>

                <LuxuryButton variant="elegant" color="walnut" size="lg">
                  Visit Showroom
                </LuxuryButton>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-20">
          <LuxurySectionHeader
            title="Design System Guidelines"
            subtitle="How to use these components effectively"
            variant="elegant"
            icon={<Flower className="w-6 h-6" style={{ color: COLORS.gold.medium }} />}
          />

          <LuxuryFrame variant="ornate" color="gold">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Color Usage</h3>
                <p className="text-slate-600">
                  Use gold as the primary accent color for luxury elements. Navy provides depth and contrast, while
                  ivory creates breathing room. Walnut adds warmth and can be used for natural, earthy elements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Typography</h3>
                <p className="text-slate-600">
                  Maintain consistent typography with light headings, medium subheadings, and normal body text. Use
                  uppercase with tracking for small accent text.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Spacing</h3>
                <p className="text-slate-600">
                  Follow the spacing scale for consistent margins and padding. Allow elements to breathe with generous
                  whitespace.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Component Combinations</h3>
                <p className="text-slate-600">
                  Pair section headers with appropriate dividers. Use frames to highlight important content. Apply
                  patterns as subtle backgrounds rather than dominant elements.
                </p>
              </div>
            </div>
          </LuxuryFrame>
        </section>
      </div>
    </div>
  )
}
