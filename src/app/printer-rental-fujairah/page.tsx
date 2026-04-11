"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import { ExpandMore } from "@mui/icons-material";

export default function PrinterRentalFujairah() {
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
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "printer-rental-fujairah" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const defaultFaqs = [
    { q: "Do you offer printer rental in Fujairah?", a: "Yes! We provide printer and photocopier rental services across Fujairah including Fujairah City, Dibba, and the industrial areas." },
    { q: "How much does printer rental cost in Fujairah?", a: "Our printer rental in Fujairah starts from AED 250/month with zero deposit and free toner included. Enterprise A3 copiers available from AED 500-2000/month." },
    { q: "What is your response time in Fujairah?", a: "We provide weekly service visits for Fujairah clients with emergency response available within 4-6 hours." },
    { q: "Do you serve Dibba and Kalba?", a: "Yes! We serve all areas in Fujairah including Fujairah City, Dibba, Kalba, and the Fujairah Free Trade Zone." },
    { q: "Do you offer zero deposit printer rental in Fujairah?", a: "Yes! We offer zero deposit rental options for Fujairah businesses. Pay only your monthly rental with no upfront costs." },
    { q: "Which brands do you service in Fujairah?", a: "We service Canon, Kyocera, HP, Xerox, Ricoh, Sharp, Brother, and Samsung in Fujairah." },
    { q: "How long are your Fujairah rental contracts?", a: "We offer flexible terms from 12-36 months with short-term rentals available for events and temporary needs." },
    { q: "Do you provide AMC services in Fujairah?", a: "Yes, we offer Annual Maintenance Contracts covering toner, parts, labor, and preventive maintenance for Fujairah clients." },
  ];

  const fujairahAreas = ["Fujairah City", "Dibba", "Kalba", "Fujairah Free Trade Zone", "Saniya", "Industrial Area"];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments - Fujairah Branch",
    "description": "Printer rental and photocopier lease services in Fujairah. Zero deposit, free toner.",
    "url": "https://saharaprinter.com/printer-rental-fujairah",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Fujairah Free Trade Zone",
      "addressLocality": "Fujairah",
      "addressCountry": "AE"
    },
    "areaServed": {
      "@type": "State",
      "name": "Fujairah"
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
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
            alt="Fujairah Mountain Landscape"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325]/90 to-[#101c2e]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Printer Rental Fujairah</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Photocopier Lease <span className="text-[#f5be53]">Fujairah</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Premium printer rental in Fujairah with zero deposit, free toner, and reliable on-site support. Serving businesses across the eastern emirates.
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
                  alt="Canon Kyocera photocopier rental Fujairah UAE"
                  className="w-full h-full object-cover rounded-2xl mix-blend-screen opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Areas We Serve in Fujairah</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {fujairahAreas.map((area, i) => (
              <span key={i} className="bg-[#2a3548] px-4 py-2 rounded-full text-[#d3c5b0] text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Sahara in Fujairah</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Zero Deposit", desc: "No upfront security deposit required. Start renting with minimal initial investment." },
              { title: "Free Toner", desc: "All plans include unlimited genuine toner at no extra cost." },
              { title: "Reliable Support", desc: "Weekly service visits and emergency response for Fujairah clients." },
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-6">Need Printer Rental in Fujairah?</h2>
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
                <ExpandMore className="text-[#f5be53] group-open:rotate-180 transition-transform" />
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