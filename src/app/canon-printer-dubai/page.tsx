"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function CanonPrinterDubai() {
  const [settings, setSettings] = useState<any>(null);
  const [faqs, setFaqs] = useState<{q: string; a: string}[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
    
    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      const allFaqs = JSON.parse(faqStored);
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "canon-dubai" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const defaultFaqs = [
    { q: "Do you rent Canon printers in Dubai?", a: "Yes! We offer a wide range of Canon printers and photocopiers for rent in Dubai, including imageRUNNER, i-SENSYS, and imageCLASS series." },
    { q: "What Canon models are available for rental in Dubai?", a: "We rent Canon imageRUNNER ADVANCE, i-SENSYS MF, imageCLASS, and MAXIFY series. From compact A4 printers to heavy-duty A3 copiers." },
    { q: "How much does Canon printer rental cost in Dubai?", a: "Canon printer rental in Dubai starts from AED 300/month for A4 models, with A3 enterprise copiers from AED 500-2000/month. All include free toner." },
    { q: "Do you provide Canon printer repair in Dubai?", a: "Yes, our certified technicians provide on-site Canon printer repair in Dubai with 4-hour emergency response time." },
    { q: "Is Canon toner included in the rental price?", a: "Yes! All our Canon printer rentals in Dubai include unlimited genuine Canon toner at no extra cost." },
    { q: "Can I upgrade my Canon printer during the rental period?", a: "Absolutely! Our 'Growth Guard' policy allows you to upgrade your Canon printer anytime during the contract." },
    { q: "Do you offer Canon printer AMC in Dubai?", a: "Yes, we offer Annual Maintenance Contracts for Canon printers covering all repairs, toner, and preventive maintenance." },
    { q: "What areas in Dubai do you serve for Canon rentals?", a: "We serve all Dubai areas including Business Bay, JLT, Deira, Marina, DIFC, Sheikh Zayed Road, and all other districts." },
  ];

  const canonModels = [
    { name: "Canon imageRUNNER ADVANCE C356i", type: "A4 Color MFP", speed: "35 ppm", features: "Print, Copy, Scan, Send" },
    { name: "Canon imageRUNNER ADVANCE 5540i", type: "A3 B&W", speed: "40 ppm", features: "High-speed, Security" },
    { name: "Canon imageRUNNER ADVANCE C5250", type: "A3 Color", speed: "50 ppm", features: "Full Color, Professional" },
    { name: "Canon i-SENSYS MF655Cdn", type: "A4 Color", speed: "21 ppm", features: "Compact, Network" },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments - Canon Dubai",
    "description": "Canon printer rental in Dubai. imageRUNNER, i-SENSYS, imageCLASS series with zero deposit and free toner.",
    "url": "https://saharaprinter.com/canon-printer-dubai",
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
    "priceRange": "AED 300-2000",
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
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
            alt="Canon Printer Dubai"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325]/90 to-[#101c2e]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Canon Printer Rental Dubai</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Canon Photocopiers <span className="text-[#f5be53]">Dubai</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Premium Canon printer and photocopier rental in Dubai. imageRUNNER, i-SENSYS, and imageCLASS series with zero deposit and free toner.
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYsYbeoBdwCMdfKukPftrIWkhBOQx1lndcCm5Qs8XRbWgH1sOw1h5-rvEaCAGB9aa_KytGw2-L_GbchDCAtNQ01XejFtpAqqAaWfxe0ydzDFEJgryCFFz_fV-H4F2FbvE6_A__nILe03afsoax65a_fHoLk1DU85YBHeJkzEpvMNgDYMI4PPBFUIMwWUzHl91aJjxul2EvAcBTmx-5O-9pF72SloVRcbbfYNUufng5c6rUo1z2dKU-niv05rw8byh2L9HREmwtvC6b"
                  alt="Canon Photocopier Rental Dubai"
                  className="w-full h-full object-cover rounded-2xl mix-blend-screen opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canon Models */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Canon Printer Models Available in Dubai</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {canonModels.map((model, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-2">{model.name}</h3>
                <p className="text-[#f5be53] text-sm mb-4">{model.type}</p>
                <div className="space-y-2 text-sm text-[#d3c5b0]">
                  <p><span className="font-semibold">Speed:</span> {model.speed}</p>
                  <p><span className="font-semibold">Features:</span> {model.features}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Canon */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Canon Printers in Dubai</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Vibrant Color", desc: "Canon Color imageRUNNER delivers exceptional color reproduction ideal for marketing materials." },
              { title: "Reliability", desc: "Canon devices are known for legendary durability and low maintenance requirements." },
              { title: "Easy to Use", desc: "Intuitive touch interfaces and seamless integration with office workflows." },
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-6">Need Canon Printer in Dubai?</h2>
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
    </main>
  );
}