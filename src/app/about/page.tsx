export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "About Sahara | UAE Printer Rental Experts Since 2012",
  description: "Sahara Office Equipment Trading LLC — 13 years in UAE. 1,500+ clients, 4.9★ Google rating. Printer & photocopier rental from AED 250/mo. Sharjah HQ, all-UAE coverage.",
  keywords: "sahara office equipments, printer rental company uae, photocopier rental sharjah, printer service dubai, about sahara printer, printer amc dubai, UAE printer rental since 2012",
  openGraph: {
    title: "About Sahara | UAE Printer Rental Experts Since 2012",
    description: "13 years serving UAE businesses. 1,500+ clients, 4.9★ Google rating. Printer rental from AED 250/mo. Zero deposit, free toner & maintenance.",
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">
              About Sahara
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Pioneers in <span className="text-[#f5be53]">Office Printing</span> Solutions
            </h1>

            {/* AEO Quick Answer Block */}
            <div className="aeo-block bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-6 max-w-3xl mx-auto text-left">
              <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">About Sahara Office Equipments — Quick Answer</p>
              <p className="text-[#d3c5b0] text-sm leading-relaxed">
                Sahara Office Equipment Trading LLC is a UAE-based printer rental and photocopier leasing company
                founded in <strong className="text-white">2012</strong>, headquartered in Sharjah (Industrial Area 11).
                With <strong className="text-white">1,500+ clients</strong> and <strong className="text-white">50,000+ repairs</strong> completed,
                Sahara serves Dubai, Abu Dhabi, Sharjah, RAK, Fujairah, and Al Ain — offering Canon, Kyocera, HP,
                and Ricoh solutions from AED 250/month with a 4-hour emergency response guarantee.
              </p>
            </div>

            <p className="text-lg text-[#d3c5b0] max-w-3xl mx-auto">
              Since 2012, we have been the UAE&apos;s trusted partner for printer rental,
              photocopier leasing, repair services, and managed print solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-8 lg:px-24 bg-[#0a1425]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 13, suffix: "+", label: "Years Experience" },
              { number: 1500, suffix: "+", label: "Happy Clients" },
              { number: 2000, suffix: "+", label: "Devices Deployed" },
              { number: 24, suffix: "/7", label: "Support Available" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#f5be53] mb-2">
                  <CountUp to={stat.number} duration={2} separator="," />
                  {stat.suffix}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  Sahara Office Equipment Trading LLC was established in 2012 with a 
                  simple mission: to provide businesses across the UAE with reliable, 
                  cost-effective printing solutions.
                </p>
                <p>
                  What started as a small operation in Sharjah has grown into one of 
                  the region's leading providers of managed print services. We serve 
                  businesses of all sizes—from startups to Fortune 500 companies.
                </p>
                <p>
                  Our team of certified technicians provides comprehensive support, 
                  including printer rental, photocopier leasing, annual maintenance 
                  contracts (AMC), and emergency repairs. We partner with world-renowned 
                  brands including Canon, HP, Xerox, Ricoh, Kyocera, and Brother.
                </p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  "Zero deposit rental options",
                  "Free toner and maintenance",
                  "4-hour response time",
                  "24/7 emergency support",
                  "Flexible lease terms",
                  "Free delivery across UAE",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="material-symbols-outlined text-[#f5be53]">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-20 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive printing solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "print",
                title: "Printer Rental",
                desc: "Short-term and long-term printer rental with flexible terms",
              },
              {
                icon: "copy_all",
                title: "Photocopier Lease",
                desc: "High-volume photocopier leasing for offices of any size",
              },
              {
                icon: "handyman",
                title: "AMC Services",
                desc: "Annual maintenance contracts to keep your equipment running",
              },
              {
                icon: "build",
                title: "Printer Repair",
                desc: "Expert repair services for all major printer brands",
              },
              {
                icon: "inventory",
                title: "Toner & Parts",
                desc: "Genuine OEM toners, drums, and spare parts supply",
              },
              {
                icon: "shopping_cart",
                title: "Corporate Sales",
                desc: "New printer and photocopier sales at competitive prices",
              },
            ].map((service, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <span className="material-symbols-outlined text-3xl text-[#f5be53] mb-4">
                  {service.icon}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations We Serve */}
      <section className="py-20 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">We Serve All Across UAE</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Free delivery and on-site service across all emirates
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Dubai", "Sharjah", "Abu Dhabi", "Ajman", "RAK", "Fujairah", "Al Ain", "Umm Al Quwain"
            ].map((city, i) => (
              <span 
                key={i} 
                className="px-6 py-3 bg-[#101c2e] border border-white/10 rounded-full text-slate-300"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">
            Ready to Transform Your Office?
          </h2>
          <p className="text-[#483200] text-lg mb-8">
            Contact us today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-quote"
              className="bg-[#071325] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
            >
              Get a Quote
            </a>
            <a
              href="/contact"
              className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-4 rounded-full font-bold text-lg backdrop-blur-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}