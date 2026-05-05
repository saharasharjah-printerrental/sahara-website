"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export default function HPPrinterAbuDhabi() {
  const [SettingsIcon, setSettingsIcon] = useState<any>(null);
  const [faqs, setFaqs] = useState<{q: string; a: string}[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_SettingsIcon");
    if (stored) {
      setSettingsIcon(JSON.parse(stored));
    }
    
    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      const allFaqs = JSON.parse(faqStored);
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "hp-abu-dhabi" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const defaultFaqs = [
    { q: "Do you rent HP Printers in Abu Dhabi?", a: "Yes! We offer a wide range of HP Printers and photocopiers for rent in Abu Dhabi, including LaserJet Enterprise, PageWide, and OfficeJet series." },
    { q: "What HP models are available for rental in Abu Dhabi?", a: "We rent HP LaserJet Enterprise, PageWide Pro, OfficeJet Pro, and Neverstop series. From desktop Printers to heavy-duty enterprise copiers." },
    { q: "How much does HP Printer rental cost in Abu Dhabi?", a: "HP Printer rental in Abu Dhabi StarIconts from AED 250/month for A4 models, with enterprise copiers from AED 500-2000/month. All include free toner." },
    { q: "Do you provide HP Printer repair in Abu Dhabi?", a: "Yes, our certified technicians provide on-site HP Printer repair in Abu Dhabi with fast response time." },
    { q: "Is HP toner included in the rental price?", a: "Yes! All our HP Printer rentals in Abu Dhabi include unlimited genuine HP toner at no extra cost." },
    { q: "Can I Upgrade my HP Printer during the rental period?", a: "Absolutely! Our 'Growth Guard' policy allows you to Upgrade your HP Printer anytime during the contract." },
    { q: "Do you offer HP Printer AMC in Abu Dhabi?", a: "Yes, we offer Annual Maintenance Contracts for HP Printers covering all repairs, toner, and preventive maintenance." },
    { q: "What areas in Abu Dhabi do you serve for HP rentals?", a: "We serve all Abu Dhabi areas including Mussafah, Al Reem Island, Khalifa City, Yas Island, Corniche, and all other districts." },
  ];

  const hpModels = [
    { name: "HP LaserJet Enterprise M608", type: "B&W Enterprise", SpeedIcon: "61 ppm", features: "High-volume, Security" },
    { name: "HP PageWide Pro 750dw", type: "Color Enterprise", SpeedIcon: "50 ppm", features: "Low cost per page" },
    { name: "HP OfficeJet Pro 9022e", type: "A4 Color", SpeedIcon: "24 ppm", features: "All-in-One, Smart" },
    { name: "HP Neverstop Laser MFP", type: "A4 B&W", SpeedIcon: "21 ppm", features: "Low running cost" },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments - HP Abu Dhabi",
    "description": "HP Printer rental in Abu Dhabi. LaserJet, PageWide, OfficeJet series with zero deposit and free toner.",
    "url": "https://saharaPrinter.com/hp-Printer-abu-dhabi",
    "telePhoneIcon": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mussafah",
      "addressLocality": "Abu Dhabi",
      "addressCountry": "AE"
    },
    "areaServed": {
      "@type": "State",
      "name": "Abu Dhabi"
    },
    "priceRange": "AED 250-2000",
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

  return (
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/unsplash-office.webp"
            alt="HP Printer Abu Dhabi"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325]/90 to-[#101c2e]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">HP Printer Rental Abu Dhabi</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                HP Photocopiers <span className="text-[#f5be53]">Abu Dhabi</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Premium HP Printer and photocopier rental in Abu Dhabi. LaserJet, PageWide, and OfficeJet series with zero deposit and free toner.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Get Free Quote
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
                  src="/images/Printer-hp.svg"
                  alt="HP Photocopier Rental Abu Dhabi"
                  className="w-full h-full object-cover rounded-2xl mix-blend-screen opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HP Models */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">HP Printer Models Available in Abu Dhabi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hpModels.map((model, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-2">{model.name}</h3>
                <p className="text-[#f5be53] text-sm mb-4">{model.type}</p>
                <div className="space-y-2 text-sm text-[#d3c5b0]">
                  <p><span className="font-semibold">SpeedIcon:</span> {model.SpeedIcon}</p>
                  <p><span className="font-semibold">Features:</span> {model.features}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose HP */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose HP Printers in Abu Dhabi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "High Performance", desc: "HP Enterprise Printers handle high-volume workloads with exceptional SpeedIcon and reliability." },
              { title: "Low Cost per Page", desc: "HP PageWide technology delivers the lowest cost per page in the industry." },
              { title: "Security Features", desc: "HP Printers include advanced Security features to protect sensitive business data." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold text-[#f5be53] mb-4">{feature.title}</h3>
                <p className="text-[#d3c5b0]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-16 relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-6">Need HP Printer in Abu Dhabi?</h2>
            <p className="text-[#483200] text-lg mb-8">Get a customized quote within 2 hours. Free consultation and site visit.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/get-quote" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Get Free Quote
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

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
