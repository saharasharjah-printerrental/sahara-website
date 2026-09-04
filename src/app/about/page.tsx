export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import CountUp from "@/components/CountUp";
import OrganizationRating from "@/components/OrganizationRating";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import { SettingsIcon, LayersIcon, ShieldCheckIcon, ClockIcon, LayerStackIcon, AwardIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Sahara | UAE Printer Rental Experts Since 2012",
  description: "Sahara Office Equipment Trading LLC — 13 years in UAE. 1,500+ clients, 5.0★ Google rating. Printer & photocopier rental from AED 250/mo. Sharjah HQ, all-UAE coverage.",
  keywords: "sahara office equipments, printer rental company uae, photocopier rental sharjah, printer service dubai, about sahara printer, printer amc dubai, UAE printer rental since 2012",
  openGraph: {
    title: "About Sahara | UAE Printer Rental Experts Since 2012",
    description: "13 years serving UAE businesses. 1,500+ clients, 5.0★ Google rating. Printer rental from AED 250/mo. Zero deposit, free toner & maintenance.",
    url: "https://www.saharaprinter.com/about/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "About Sahara Office Equipments UAE" }],
  },
  alternates: { canonical: "https://www.saharaprinter.com/about/" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Sahara Office Equipments",
  "description": "Sahara Office Equipment Trading LLC — UAE's leading printer rental and photocopier leasing company since 2012. Headquartered in Sharjah, serving Dubai, Abu Dhabi, and all UAE emirates.",
  "url": "https://www.saharaprinter.com/about/",
  "dateModified": "2026-04-15",
  "mainEntity": {
    "@type": "Organization",
    "name": "Sahara Office Equipments",
    "legalName": "Sahara Office Equipment Trading LLC",
    "foundingDate": "2012",
    "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 15, "maxValue": 50 },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Arabi Building, Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE",
      "postalCode": "47373"
    },
    "telephone": "+971503823969",
    "email": "info@saharaedoc.com",
    "url": "https://www.saharaprinter.com/"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.saharaprinter.com/about/" },
  ],
};

const services = [
  { icon: SettingsIcon, title: "Printer Rental", desc: "Short-term and long-term printer rental with flexible terms" },
  { icon: LayersIcon, title: "Photocopier Lease", desc: "High-volume photocopier leasing for offices of any size" },
  { icon: ShieldCheckIcon, title: "AMC Services", desc: "Annual maintenance contracts to keep your equipment running" },
  { icon: ClockIcon, title: "Printer Repair", desc: "Expert repair services for all major printer brands" },
  { icon: LayerStackIcon, title: "Toner & Parts", desc: "Genuine OEM toners, drums, and spare parts supply" },
  { icon: AwardIcon, title: "Equipment Sales", desc: "New printer and photocopier sales at competitive prices" },
];

const trail = [{ label: "Home", href: "/" }, { label: "About" }];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* aggregateRating is scoped to the homepage and /about — see OrganizationRating */}
      <OrganizationRating />
      <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <Header />

      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface-low" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

        <div className="relative mx-auto max-w-content">
          <Breadcrumbs trail={trail} />
          <Reveal className="text-center">
            <p className="text-caption font-bold uppercase tracking-[0.2em] text-primary">About Sahara</p>
            <h1 className="mt-4 font-sora text-display-xl font-bold text-white">
              Pioneers in <span className="text-primary">Office Printing</span> Solutions
            </h1>

            <div className="mx-auto mb-6 mt-6 max-w-3xl rounded-panel border border-primary/20 bg-surface-low p-5 text-left">
              <p className="mb-2 text-caption font-bold uppercase tracking-widest text-primary">About Sahara Office Equipments — Quick Answer</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Sahara Office Equipment Trading LLC is a UAE-based printer rental and photocopier leasing company
                founded in <strong className="text-white">2012</strong>, headquartered in Sharjah (Industrial Area
                11). With <strong className="text-white">1,500+ clients</strong> and{" "}
                <strong className="text-white">50,000+ repairs</strong> completed, Sahara serves Dubai, Abu Dhabi,
                Sharjah, RAK, Fujairah, and Al Ain — offering Canon, Kyocera, HP, and Ricoh solutions from AED
                250/month with a 4-hour emergency response guarantee.
              </p>
            </div>

            <p className="mx-auto max-w-3xl text-body text-muted">
              Since 2012, we have been the UAE&apos;s trusted partner for printer rental, photocopier leasing,
              repair services, and managed print solutions.
            </p>
          </Reveal>
        </div>
      </section>

      <Section flush tone="ink">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { number: 13, suffix: "+", label: "Years Experience" },
            { number: 1500, suffix: "+", label: "Happy Clients" },
            { number: 2000, suffix: "+", label: "Devices Deployed" },
            { number: 24, suffix: "/7", label: "Support Available" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">
                <CountUp to={stat.number} duration={2} separator="," />
                {stat.suffix}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="mb-6 font-sora text-title font-bold text-white">Our Story</h2>
            <div className="space-y-4 text-on-surface-variant">
              <p>
                Sahara Office Equipment Trading LLC was established in 2012 with a simple mission: to provide
                businesses across the UAE with reliable, cost-effective printing solutions.
              </p>
              <p>
                What started as a small operation in Sharjah has grown into one of the region&apos;s leading
                providers of managed print services. We serve businesses of all sizes—from startups to Fortune 500
                companies.
              </p>
              <p>
                Our team of certified technicians provides comprehensive support, including printer rental,
                photocopier leasing, annual maintenance contracts (AMC), and emergency repairs. We partner with
                world-renowned brands including Canon, HP, Xerox, Ricoh, Kyocera, and Brother.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="glass-card rounded-panel p-8">
            <h3 className="mb-6 text-xl font-bold text-white">Why Choose Us?</h3>
            <ul className="space-y-4">
              {[
                "Zero deposit rental options",
                "Free toner and maintenance",
                "4-hour response time",
                "24/7 emergency support",
                "Flexible lease terms",
                "Free delivery across UAE",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-on-surface-variant">
                  <span className="text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section title="Our Services" subtitle="Comprehensive printing solutions tailored to your business needs" align="center" tone="raised">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.desc} />
          ))}
        </div>
      </Section>

      <Section title="We Serve All Across UAE" subtitle="Free delivery and on-site service across all emirates" align="center">
        <div className="flex flex-wrap justify-center gap-4">
          {["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "RAK", "Fujairah", "Al Ain", "Umm Al Quwain"].map((city) => (
            <span key={city} className="rounded-pill border border-white/10 bg-surface-low px-6 py-3 text-on-surface-variant">
              {city}
            </span>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Ready to Transform Your Office?"
        body="Contact us today for a free consultation and quote"
        primary={{ label: "Get a Quote", href: "/rental-calculator/" }}
        secondary={{ label: "Contact Us", href: "/contact/" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
