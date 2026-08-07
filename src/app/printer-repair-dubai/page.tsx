"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

const defaultFaqs = [
  { q: "Do you offer printer repair services in Dubai?", a: "Yes! We provide professional printer and photocopier repair services across Dubai. Our certified technicians can fix all major brands." },
  { q: "What is your printer repair response time in Dubai?", a: "We offer 4-hour emergency response for critical printer failures in Dubai. Standard repairs scheduled within 24 hours." },
  { q: "Do you repair all printer brands in Dubai?", a: "Yes! We repair Canon, HP, Kyocera, Xerox, Ricoh, Sharp, Brother, Samsung, and Lexmark printers in Dubai." },
  { q: "How much does printer repair cost in Dubai?", a: "Our printer repair services in Dubai start from AED 150 for minor issues. Complex repairs quoted after diagnosis. Free assessment for rental clients." },
  { q: "Do you provide on-site printer repair in Dubai?", a: "Yes! Our technicians provide on-site repair services at your office in Dubai. No need to transport the equipment." },
  { q: "What printer issues can you repair in Dubai?", a: "We repair paper jams, printing quality issues, network connectivity, software errors, mechanical failures, and more." },
  { q: "Do you offer printer repair contracts in Dubai?", a: "Yes! Our AMC (Annual Maintenance Contract) includes unlimited repairs, preventive maintenance, and priority response." },
  { q: "Do you offer printer repair in other areas of Dubai?", a: "We serve all Dubai areas including Business Bay, JLT, Deira, Marina, DIFC, Sheikh Zayed Road, and all other districts." },
];

export default function PrinterRepairDubai() {
  const [settings, setSettings] = useState<any>(null);
  // Initialized with defaultFaqs (not []) so the server-rendered HTML — what
  // Googlebot's first pass actually sees — already carries real FAQPage
  // content instead of an empty mainEntity array.
  const [faqs, setFaqs] = useState<{q: string; a: string}[]>(defaultFaqs);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }

    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      const allFaqs = JSON.parse(faqStored);
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "printer-repair-dubai" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const repairServices = [
    { icon: "build", title: "Hardware Repair", desc: "Mechanical repairs, component replacement, roller changes, fuser unit repairs" },
    { icon: "settings", title: "Software & Network", desc: "Driver installation, network configuration, firmware updates, troubleshooting" },
    { icon: "cleaning_services", title: "Deep Cleaning", desc: "Interior cleaning, roller cleaning, belt replacement, printhead maintenance" },
    { icon: "emergency", title: "Emergency Repairs", desc: "4-hour response for critical issues, same-day service for urgent requests" },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments - Printer Repair Dubai",
    "description": "Professional printer repair services in Dubai. On-site repairs, 4-hour response, all brands serviced.",
    "url": "https://www.saharaprinter.com/printer-repair-dubai",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "areaServed": {
      "@type": "State",
      "name": "Dubai"
    },
    "priceRange": "AED 150-1000",
    "openingHours": "24/7"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
      { "@type": "ListItem", "position": 2, "name": "Repair Services", "item": "https://www.saharaprinter.com/services/repair/" },
      { "@type": "ListItem", "position": 3, "name": "Printer Repair Dubai", "item": "https://www.saharaprinter.com/printer-repair-dubai/" }
    ]
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/unsplash-office.webp"
            alt="Printer Repair Dubai"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325]/90 to-[#101c2e]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Printer Repair Dubai</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Printer & Photocopier <span className="text-[#f5be53]">Repair</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Professional printer repair services in Dubai with 4-hour emergency response. All brands serviced including Canon, HP, Kyocera, Xerox.
              </p>

              {/* AEO Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Printer Repair Dubai — Quick Answer</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  Sahara dispatches certified technicians for printer and photocopier repair across Dubai with a{" "}
                  <strong className="text-white">4-hour emergency response</strong> — under 2 hours for Business Bay, DIFC, and Downtown Dubai.
                  Repairs start from <strong className="text-white">AED 150</strong>, use genuine OEM parts only, and carry a 30-day workmanship warranty.
                  We service JLT, Marina, Deira, Sheikh Zayed Road, and every other Dubai district.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Request Repair
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  Call: +971503823969
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-[#f5be53]/20 blur-[120px] rounded-full"></div>
              <div className="relative z-20 glass-card p-8 rounded-3xl overflow-hidden">
                <img 
                  src="/images/service-maintanence.webp"
                  alt="Printer Repair Service Dubai"
                  className="w-full h-full object-cover rounded-2xl mix-blend-screen opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Printer Repair Services in Dubai</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairServices.map((service, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-center">
                <span className="material-symbols-outlined text-4xl text-[#f5be53] mb-4">{service.icon}</span>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-[#d3c5b0] text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Repair */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Printer Brands We Repair in Dubai</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Canon", "HP", "Kyocera", "Xerox", "Ricoh", "Sharp", "Brother", "Samsung", "Lexmark", "Konica Minolta", "Toshiba", "Epson"].map((brand, i) => (
              <span key={i} className="bg-[#2a3548] px-6 py-3 rounded-full text-[#d3c5b0] text-lg font-semibold">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-16 relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-6">Need Printer Repair in Dubai?</h2>
            <p className="text-[#483200] text-lg mb-8">Get a technician dispatched within 4 hours. Free diagnosis for AMC clients.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/rental-calculator/" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Request Repair
              </a>
              <a href="tel:+971503823969" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details 
              key={i} 
              className="rounded-2xl p-6 group cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)',
                boxShadow: '6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)',
              }}
              open={i === 0}
            >
              <summary className="flex justify-between items-center list-none font-bold text-lg text-white">
                {f.q}
                <span className="material-symbols-outlined text-[#f5be53] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-4 text-[#d3c5b0] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related — cross-link to the UAE-wide service hub to signal complementary (not duplicate) intent */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Outside Dubai?</h2>
          <p className="text-[#d3c5b0] mb-6">
            We repair printers and copiers across all seven emirates. See our{" "}
            <a href="/services/repair/" className="text-[#f5be53] font-semibold hover:underline">full repair service page</a>{" "}
            for brands serviced, AMC options, and UAE-wide coverage.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
    </>
  );
}
