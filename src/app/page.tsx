"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import { MagneticHover } from "@/components/MagneticHover";
import StatsClay from "@/components/StatsClay";
import { Layers, Users, Heart, Monitor } from "lucide-react";

export default function Home() {
  const [faqs, setFaqs] = useState<{q: string; a: string}[]>([]);

  useEffect(() => {
    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      const allFaqs = JSON.parse(faqStored);
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "homepage" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultHomeFaqs);
    } else {
      setFaqs(defaultHomeFaqs);
    }
  }, []);

  const defaultHomeFaqs = [
    { q: "What is the duration of your printer rental plans?", a: "We offer flexible rental periods starting from short-term event hire (1-7 days) to long-term corporate leases (12-36 months), all with included maintenance." },
    { q: "Do you provide on-site repair services?", a: "Yes, our factory-certified technicians provide on-site repairs across all major service areas. We aim for a 4-hour response time for critical failures." },
    { q: "Are the spare parts and toners original?", a: "Exclusively. Sahara only supplies OEM (Original Equipment Manufacturer) consumables and parts to ensure the longevity of your hardware." },
    { q: "Can I upgrade my rented equipment during the contract?", a: "Absolutely. Our 'Growth Guard' policy allows you to upgrade your fleet as your office printing demands increase without hefty termination fees." },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      <HeroSection />
      <DefinitionBlock />
      <ServicesSection />
      <StatsSection />
      <FeaturedProducts />
      <ReviewsSection />
      <BrandCarousel />
      <CTASection />
      <FAQSection faqs={faqs} />
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <FAQSchema faqs={faqs} />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 px-8 lg:px-24 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
        <div className="space-y-8">
          <MagneticHover text="Rent, Buy, or Repair" textSize="text-5xl md:text-6xl" className="mb-4" />
          <MagneticHover text="All Under One Roof" textSize="text-4xl md:text-5xl" activeColor="#f5be53" inactiveColor="#525252" className="mb-4" />
          <p className="text-lg md:text-xl text-[#d3c5b0] max-w-lg">
            Premium office equipment solutions for the modern executive. From high-speed printing to expert technical support, we power your productivity with celestial precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Get a Quote
            </a>
            <a href="/services" className="glass-card px-8 py-4 rounded-full font-bold text-lg text-white hover:bg-[#2a3548] transition-colors">
              Explore Services
            </a>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-[#f5be53]/20 blur-[120px] rounded-full"></div>
          <div className="relative z-20 glass-card p-8 rounded-3xl overflow-hidden">
            <img 
              src="/images/printer-hero.webp"
              alt="Canon Kyocera photocopier rental Dubai UAE office"
              className="w-full h-full object-cover rounded-2xl mix-blend-screen opacity-90"
            />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-[#f5be53]/10 rounded-full blur-[160px]"></div>
    </section>
  );
}

function DefinitionBlock() {
  return (
    <section className="py-16 px-8 bg-[#101c2e]">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 border-l-4 border-[#f5be53]">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">What is Printer Rental in UAE?</h2>
          <p className="text-lg text-[#d3c5b0] leading-relaxed mb-4">
            Printer rental (also known as printer leasing or copier leasing) is a service where businesses lease multifunction printers (MFPs) and photocopiers instead of purchasing them outright. The rental agreement typically includes the machine, unlimited toner, maintenance, repairs, and technical support for a fixed monthly fee.
          </p>
          <p className="text-lg text-[#d3c5b0] leading-relaxed">
            In the UAE, printer rental is particularly popular among companies in Dubai, Sharjah, and Abu Dhabi because it eliminates the massive upfront capital expenditure of purchasing equipment while providing access to industry-leading Canon and Kyocera devices with zero deposit and no exit fees.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { icon: "print", title: "Printer Rental", desc: "Flexible leasing options for high-volume enterprises. Scale your operations without capital stress.", href: "/services/printer-rental" },
    { icon: "shopping_cart", title: "Equipment Sales", desc: "The latest fleet of industrial-grade printers and photocopiers from world-leading brands.", href: "/services/sales" },
    { icon: "build", title: "Expert Repair", desc: "Certified technicians available 24/7. We minimize downtime with swift, precise hardware maintenance.", href: "/services/repair" },
    { icon: "opacity", title: "Toner & Supplies", desc: "Genuine consumables and spare parts logistics to keep your document workflow uninterrupted.", href: "/services/toner" },
  ];

  return (
    <section className="py-24 px-8 lg:px-24 bg-[#101c2e]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">Our Expertise</h2>
          <p className="text-4xl font-bold text-white">Office Solutions Redefined</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <a key={i} href={s.href} className="glass-card p-8 rounded-3xl light-leak group hover:scale-[1.02] transition-all duration-500 block">
              <div className="w-14 h-14 rounded-2xl bg-[#2a3548] flex items-center justify-center mb-6 text-[#f5be53] group-hover:bg-[#f5be53] group-hover:text-[#412d00] transition-colors">
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-[#d3c5b0] text-sm leading-relaxed">{s.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <StatsClay
      stats={[
        { value: "13+", label: "Years Active", icon: Layers },
        { value: "1500+", label: "Happy Clients", icon: Users },
        { value: "50k+", label: "Parts Fixed", icon: Heart },
        { value: "24/7", label: "Support", icon: Monitor },
      ]}
      title="Numbers That Speak"
      subtitle="Proven track record of delivering premium office equipment solutions across the UAE since 2012."
    />
  );
}

function FeaturedProducts() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_products");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProducts(parsed.filter((p: any) => p.isActive).slice(0, 8));
    } else {
      setProducts([
        { name: "HP LaserJet Enterprise M608", brand: "HP", desc: "High-speed monochromatic laser for heavy duty enterprise workloads.", priceRental: "Contact for Pricing", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX" },
        { name: "Canon imageRUNNER ADVANCE", brand: "Canon", desc: "Comprehensive document imaging and integrated workflow management.", priceRental: "Leasing Available", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq" },
        { name: "Brother HL-L6400DW", brand: "Brother", desc: "Robust wireless laser printing for medium-sized professional offices.", priceRental: "Sale Ready", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX" },
        { name: "Kyocera ECOSYS", brand: "Kyocera", desc: "Ultra-reliable high-volume printing with exceptional cost efficiency.", priceRental: "Leasing Available", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAERWQK3qqk13Z7BoPNtyd_ahfswNo3cAHfP8il3OnqNIb-H8xbY5wpLN73pZv1w7I-LUqgbSwU8pAdWtG0-U83-NA3lFUz4CR-JKj7OKbtGhqlBpw--P2zyDDtyOxUCIiFUoEch3GjRdAmb29wh-PAKsRTplPdT_InvjdUFTgZMD0Sjq4nhfHwwapSvedZp6Vr2A5B7MvVA5AXgNwff2zgGdCrBQbKxcL4wWnNGmPfICBq6St7tcvtFPButWk7Ah7dOicVLcHDEsx" },
      ]);
    }
  }, []);

  const scrollLeft = React.useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = React.useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">Inventory</h2>
          <p className="text-4xl font-bold text-white">Elite Hardware Selection</p>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={scrollLeft} className="w-12 h-12 rounded-full border border-[#9c8f7c]/20 flex items-center justify-center hover:border-[#f5be53] text-[#d3c5b0] hover:text-[#f5be53] transition-all cursor-pointer">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button type="button" onClick={scrollRight} className="w-12 h-12 rounded-full bg-[#f5be53] text-[#412d00] flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex gap-8 no-scrollbar overflow-x-auto pb-8 snap-x max-w-7xl mx-auto scroll-smooth">
        {products.map((p, i) => (
          <div key={i} className="min-w-[320px] md:min-w-[400px] snap-center glass-card rounded-3xl overflow-hidden group">
            <div className="h-64 bg-[#142032] relative overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#f5be53] uppercase tracking-widest">{p.brand}</div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <p className="text-[#d3c5b0] text-sm mb-6">{p.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#f5be53] font-bold text-lg">{p.priceRental || "Contact for Pricing"}</span>
                <a href="/products" className="text-white hover:text-[#f5be53] transition-colors flex items-center gap-2">
                  Details <span className="material-symbols-outlined text-sm">east</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    { name: "Marcus Thorne", role: "Architectural Lead", text: "Exceptional service. They repaired our office plotter within 4 hours. Absolute lifesavers!" },
    { name: "Sarah Jenkins", role: "Operations Manager", text: "The printer rental program saved us 40% on operational costs this quarter. Professional and reliable." },
    { name: "David Chen", role: "IT Director", text: "Prompt toner delivery. Never had to wait more than a day. Highly recommend Sahara." },
  ];

  return (
    <section className="py-24 bg-[#101c2e]/50 relative">
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
        <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">Wall of Trust</h2>
        <p className="text-4xl font-bold text-white">Rated 4.9/5 by Google Local Guide</p>
      </div>
      <div className="flex gap-6 overflow-hidden max-w-7xl mx-auto px-8">
        <div className="flex gap-6 animate-infinite-scroll py-4">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="glass-card min-w-[350px] p-8 rounded-2xl flex flex-col justify-between h-64">
              <div className="flex text-[#f5be53] gap-1 mb-4">
                {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
              </div>
              <p className="text-[#d7e3fc] italic text-sm">&quot;{r.text}&quot;</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3548] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#f5be53]">person</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{r.name}</p>
                  <p className="text-slate-500 text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCarousel() {
  const [brands, setBrands] = useState<any[]>([]);

  const defaultBrands = [
    { name: "HP", slug: "hp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/HP_logo.svg/512px-HP_logo.svg.png" },
    { name: "Canon", slug: "canon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Canon_logo.svg/512px-Canon_logo.svg.png" },
    { name: "Xerox", slug: "xerox", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Xerox_logo.svg/512px-Xerox_logo.svg.png" },
    { name: "Kyocera", slug: "kyocera", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kyocera_logo.svg/512px-Kyocera_logo.svg.png" },
    { name: "Ricoh", slug: "ricoh", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ricoh_logo.svg/512px-Ricoh_logo.svg.png" },
    { name: "Sharp", slug: "sharp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Sharp_logo.svg/512px-Sharp_logo.svg.png" },
    { name: "Brother", slug: "brother", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brother_Logo.svg/512px-Brother_Logo.svg.png" },
    { name: "Epson", slug: "epson", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Epson_logo.svg/512px-Epson_logo.svg.png" },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("sahara_brands");
    if (stored) {
      const parsed = JSON.parse(stored);
      const activeBrands = parsed.filter((b: any) => b.isActive);
      if (activeBrands.length > 0) {
        setBrands(activeBrands);
        return;
      }
    }
    setBrands(defaultBrands);
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="py-12 bg-[#101c2e] overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase">Trusted Brands</h2>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#101c2e] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#101c2e] to-transparent z-10"></div>
        <div className="flex items-center overflow-hidden">
          <div className="flex gap-16 animate-carousel whitespace-nowrap">
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <div key={i} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="h-16 w-32 flex items-center justify-center rounded-xl bg-white/5 p-3">
                  <img 
                    src={brand.logoUrl} 
                    alt={brand.name} 
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-[#412d00] mb-6">Ready to Upgrade?</h2>
            <p className="text-[#483200] text-lg md:text-xl font-medium">Get a customized proposal for your office equipment within 24 hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/get-quote" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
              Get Your Quote
            </a>
            <a href="/contact" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="py-24 px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">Questions</h2>
        <p className="text-4xl font-bold text-white">Frequently Asked</p>
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
  );
}

function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
