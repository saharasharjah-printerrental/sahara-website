"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export default function PhotocopierRentalSharjah() {
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
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "photocopier-rental-sharjah" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const defaultFaqs = [
    { q: "How much does photocopier rental cost in Sharjah?", a: "Our photocopier rental in Sharjah starts from AED 250/month. We offer competitive rates with zero deposit and free toner included in all plans." },
    { q: "Do you offer printer rental in Sharjah?", a: "Yes! We provide full printer and photocopier rental services across Sharjah including Industrial Area, Al Majaz, and SAIF Zone." },
    { q: "What is your response time in Sharjah?", a: "We offer 60-minute response time for emergency repairs in Sharjah. Our local technicians can reach most areas quickly." },
    { q: "Do you provide AMC services in Sharjah?", a: "Yes, we offer Annual Maintenance Contracts (AMC) in Sharjah covering toner, parts, labor, and preventive maintenance." },
    { q: "Can I get zero deposit printer rental in Sharjah?", a: "Absolutely! We offer zero deposit rental options for all our Sharjah clients. Pay only your monthly rental with no upfront costs." },
    { q: "Which brands do you service in Sharjah?", a: "We service Canon, Kyocera, HP, Xerox, Ricoh, Sharp, Brother, and Konica Minolta in Sharjah." },
    { q: "How long are your Sharjah rental contracts?", a: "Our contracts range from 12-36 months with flexible terms. Short-term rentals available for events." },
    { q: "Do you offer installation in Sharjah?", a: "Yes, free delivery and installation included with all our Sharjah printer and photocopier rentals." },
  ];

  const sharjahAreas = [
    "Industrial Area", "Al Majaz", "Muweilah", "SAIF Zone", 
    "Al Nahda", "Al Qasba", "Sharjah Airport International Airport",
    "King Faisal Road", "Al Khan", "Muwailih Commercial"
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments - Sharjah Branch",
    "description": "Photocopier rental and printer lease services in Sharjah. Zero deposit, free toner, 60min response.",
    "url": "https://saharaprinter.com/photocopier-rental-sharjah",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": {
      "@type": "State",
      "name": "Sharjah"
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
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1920&q=80"
            alt="Sharjah City"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325]/90 to-[#101c2e]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Photocopier Rental Sharjah</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Printer Lease <span className="text-[#f5be53]">UAE</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Reliable photocopier rental in Sharjah with zero deposit, free toner, and 60-minute emergency response. Serving Industrial Area, Al Majaz, SAIF Zone & more.
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
                  alt="Kyocera Canon photocopier rental Sharjah UAE"
                  className="w-full h-full object-cover rounded-2xl mix-blend-screen opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Block */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 border-l-4 border-[#f5be53]">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">What is Photocopier Rental in Sharjah?</h2>
            <p className="text-lg text-[#d3c5b0] leading-relaxed mb-4">
              Photocopier rental in Sharjah is a cost-effective solution for businesses that need copying, printing, and scanning equipment without large upfront investment. The rental includes the machine, unlimited toner, maintenance, and technical support.
            </p>
            <p className="text-lg text-[#d3c5b0] leading-relaxed">
              Sharjah businesses, especially in Industrial Area and SAIF Zone, benefit from our zero deposit rental plans that eliminate capital expenditure while providing access to premium Canon and Kyocera devices with full service support.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Our Sharjah Services</h2>
            <p className="text-[#d3c5b0] mt-4">Complete office equipment solutions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "print", title: "Printer Rental", desc: "Flexible leasing for all business sizes" },
              { icon: "copy", title: "Photocopier Rental", desc: "A3 & A4 copiers with full service" },
              { icon: "build", title: "Repair Services", desc: "On-site repair with 60min response" },
              { icon: "description", title: "AMC Plans", desc: "Annual maintenance contracts" },
            ].map((s, i) => (
              <a key={i} href={s.title.toLowerCase().includes("rental") ? "/services/printer-rental" : s.title.toLowerCase().includes("repair") ? "/services/repair" : "/services/amc"} className="glass-card p-8 rounded-3xl block hover:scale-[1.02] transition-all">
                <span className="material-symbols-outlined text-4xl text-[#f5be53] mb-4">{s.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#d3c5b0] text-sm">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Areas We Serve in Sharjah</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {sharjahAreas.map((area, i) => (
              <span key={i} className="bg-[#2a3548] px-4 py-2 rounded-full text-[#d3c5b0] text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose Our Sharjah Service</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Zero Deposit", desc: "No upfront security deposit required" },
              { title: "Free Toner", desc: "Unlimited genuine toner included" },
              { title: "60-Min Response", desc: "Fast emergency support across Sharjah" },
              { title: "24/7 Support", desc: "Round-the-clock technical assistance" },
              { title: "No Exit Fees", desc: "Flexible contract terms" },
              { title: "Free Upgrades", desc: "Upgrade anytime during contract" },
            ].map((b, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-[#f5be53]/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#f5be53]">check_circle</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-[#d3c5b0] text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="glass-card rounded-[2rem] py-12 px-8 flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { value: "1500+", label: "Happy Clients" },
              { value: "13+", label: "Years Experience" },
              { value: "2500+", label: "Machines Deployed" },
              { value: "60min", label: "Response Time" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-[#f5be53]">{stat.value}</p>
                <p className="text-sm uppercase tracking-widest text-slate-400 mt-2">{stat.label}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-6">Need Photocopier Rental in Sharjah?</h2>
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

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
