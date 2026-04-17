"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import { CipherText } from "@/components/CipherText";
import StatsClay from "@/components/StatsClay";
import { Layers, People, Favorite, Computer, Print, ShoppingCart, Build, Opacity, ArrowBack, ArrowForward, East, Star, Person, ExpandMore, Savings, Verified, LocationOn } from "@mui/icons-material";

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
      {/* Preload LCP hero image — only on homepage */}
      <link rel="preload" as="image" href="/images/hero-bg.webp" fetchPriority="high" />
      <Header />
      <HeroSection />
      <BrandCarousel />
      <DefinitionBlock />
      <ServicesSection />
      <StatsSection />
      <FeaturedProducts />
      <ReviewsSection />
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
    <section
      className="relative min-h-screen flex items-center pt-20 px-8 lg:px-24 overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        contentVisibility: "auto",
      }}
    >
      {/* Dark overlay — fades left-to-right so text stays legible against the neon scene */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071325]/95 via-[#071325]/75 to-[#071325]/30 z-0" />
      {/* Bottom vignette to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#071325] to-transparent z-0" />

      <div className="w-full max-w-3xl relative z-10 space-y-8">
        <h1 className="sr-only">Printer Rental Dubai & UAE | Photocopier Leasing Services</h1>
        <CipherText
          text="Rent, Buy, or Repair"
          textSize="text-2xl sm:text-3xl md:text-7xl"
          className="mb-2 drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]"
          textColor="#ffffff"
          delay={500}
        />
        <CipherText
          text="All Under One Roof"
          textSize="text-xl sm:text-2xl md:text-6xl"
          className="mb-4 drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]"
          delay={1500}
        />
        <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          Premium office equipment solutions for the modern executive. From high-speed printing to expert technical support, we power your productivity with precision.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="/get-quote"
            className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.4)]"
          >
            Get a Quote
          </a>
          <a
            href="/services"
            className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}

function DefinitionBlock() {
  return (
    <section className="relative py-28 px-8 lg:px-24 overflow-hidden" style={{ background: '#050d1a' }}>

      {/* Circuit board grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(245,190,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,190,83,0.04) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Dot intersections overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(245,190,83,0.12) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Center ambient depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(7,19,37,0.7) 0%, transparent 75%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Centered heading ── */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4">
            What is <span className="text-[#f5be53]">Printer Rental</span> in the UAE?
          </h2>
          <p className="text-[#7a94ad] text-base max-w-lg mx-auto leading-relaxed">
            Flexible leasing options to access top-tier multifunction printers (MFPs) and
            photocopiers with low monthly operational costs.
          </p>
        </div>

        {/* ── 4-card grid — outer cards normal, inner two elevated ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:items-end">
          {([
            {
              Icon: Build,
              title: 'All-Inclusive Leasing',
              body: 'A simple monthly fee that covers your machine, unlimited toner, maintenance, repairs, and full technical support.',
              elevated: false,
            },
            {
              Icon: Savings,
              title: 'Smart Financials',
              body: 'Healthy cash flow with zero upfront capital investment, zero deposit, and absolutely no exit fees.',
              elevated: true,
            },
            {
              Icon: Verified,
              title: 'Premium Equipment',
              body: 'Enjoy access to high-performance, industry-leading devices from trusted brands like Canon and Kyocera.',
              elevated: true,
            },
            {
              Icon: LocationOn,
              title: 'Seamless UAE Coverage',
              body: 'Popular and fully supported across major business centers: Dubai, Sharjah, and Abu Dhabi.',
              elevated: false,
            },
          ] as const).map(({ Icon, title, body, elevated }, i) => (
            <div key={i}
              className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${elevated ? 'lg:-translate-y-5' : ''}`}
              style={{
                background: 'linear-gradient(170deg, rgba(8,18,36,0.97) 0%, rgba(5,11,22,0.99) 100%)',
                border: '1px solid rgba(245,190,83,0.22)',
                boxShadow: elevated
                  ? '0 0 0 1px rgba(245,190,83,0.15), 0 0 40px rgba(245,190,83,0.12), 0 20px 60px rgba(0,0,0,0.5)'
                  : '0 0 0 1px rgba(245,190,83,0.08), 0 0 20px rgba(245,190,83,0.06), 0 8px 32px rgba(0,0,0,0.4)',
              }}>

              {/* Corner circuit node — top-left */}
              <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
                <div className="absolute top-2 left-0 w-3 h-px" style={{ background: 'rgba(245,190,83,0.35)' }} />
                <div className="absolute top-0 left-2 w-px h-3" style={{ background: 'rgba(245,190,83,0.35)' }} />
              </div>
              {/* Corner circuit node — bottom-right */}
              <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none">
                <div className="absolute bottom-2 right-0 w-3 h-px" style={{ background: 'rgba(245,190,83,0.35)' }} />
                <div className="absolute bottom-0 right-2 w-px h-3" style={{ background: 'rgba(245,190,83,0.35)' }} />
              </div>

              {/* Glow intensifies on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 30px rgba(245,190,83,0.06)' }} />

              {/* ── Icon illustration area ── */}
              <div className="relative flex items-center justify-center pt-8 pb-6 px-6">
                {/* Radial backdrop behind icon */}
                <div className="absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 60%, rgba(245,190,83,0.07) 0%, transparent 70%)' }} />
                <div className="relative w-20 h-20 rounded-[1.25rem] flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(145deg, rgba(245,190,83,0.16) 0%, rgba(245,190,83,0.04) 100%)',
                    border: '1px solid rgba(245,190,83,0.32)',
                    boxShadow: '0 0 0 6px rgba(245,190,83,0.05), 0 0 30px rgba(245,190,83,0.14)',
                  }}>
                  <Icon style={{ fontSize: 38, color: '#f5be53' }} />
                </div>
              </div>

              {/* ── Text area ── */}
              <div className="px-6 pb-7 flex flex-col flex-1"
                style={{ borderTop: '1px solid rgba(245,190,83,0.08)' }}>
                <h3 className="text-white font-bold text-[0.95rem] mt-5 mb-2 leading-snug">{title}</h3>
                <p className="text-[#6a87a4] text-[0.8rem] leading-relaxed">{body}</p>
              </div>

              {/* Bottom glow bar — appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, #f5be53, transparent)' }} />
            </div>
          ))}
        </div>

        {/* Sparkle decoration — bottom right */}
        <div className="flex justify-end mt-8 pr-2">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 0L12.5 9.5L22 11L12.5 12.5L11 22L9.5 12.5L0 11L9.5 9.5L11 0Z" fill="#f5be53" fillOpacity="0.5" />
          </svg>
        </div>

      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { icon: Print, title: "Printer Rental", desc: "Flexible leasing options for high-volume enterprises. Scale your operations without capital stress.", href: "/services/printer-rental" },
    { icon: ShoppingCart, title: "Equipment Sales", desc: "The latest fleet of industrial-grade printers and photocopiers from world-leading brands.", href: "/services/sales" },
    { icon: Build, title: "Expert Repair", desc: "Certified technicians available 24/7. We minimize downtime with swift, precise hardware maintenance.", href: "/services/repair" },
    { icon: Opacity, title: "Toner & Supplies", desc: "Genuine consumables and spare parts logistics to keep your document workflow uninterrupted.", href: "/services/toner" },
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
                <s.icon className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 whitespace-nowrap">{s.title}</h3>
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
        { value: "1500+", label: "Happy Clients", icon: People },
        { value: "50k+", label: "Parts Fixed", icon: Favorite },
        { value: "24/7", label: "Support", icon: Computer },
      ]}
      title="Numbers That Speak"
      subtitle="Proven track record of delivering premium office equipment solutions across the UAE since 2012."
    />
  );
}

const BRAND_IMAGES: Record<string, string> = {
  Canon: "/images/printer-canon-1.webp",
  HP: "/images/printer-hp.svg",
  Kyocera: "/images/printer-kyocera.webp",
  Xerox: "/images/printer-xerox.webp",
  Brother: "/images/printer-brother.webp",
  Ricoh: "/images/printer-ricoh.webp",
  Samsung: "/images/printer-samsung.webp",
  Lexmark: "/images/printer-lexmark.webp",
};
// heroPrntr1.webp contains Canon-branded machines — never show it for non-Canon products
const CANON_ONLY = new Set(["/images/heroPrntr1.webp", "/images/printer-canon-2.webp"]);
function localImg(image: string, brand: string): string {
  if (!image || !image.startsWith("/") || (CANON_ONLY.has(image) && brand !== "Canon")) {
    return BRAND_IMAGES[brand] || "/images/printer-canon-1.webp";
  }
  return image;
}

function FeaturedProducts() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_products");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProducts(
        parsed
          .filter((p: any) => p.isActive)
          .map((p: any) => ({ ...p, image: localImg(p.image, p.brand) }))
          .slice(0, 8)
      );
    } else {
      setProducts([
        { name: "HP LaserJet Enterprise M608",  brand: "HP",      desc: "High-speed monochromatic laser for heavy duty enterprise workloads.",    priceRental: "Contact for Pricing", image: "/images/printer-hp.svg"       },
        { name: "Canon imageRUNNER ADVANCE",     brand: "Canon",   desc: "Comprehensive document imaging and integrated workflow management.",      priceRental: "Leasing Available",   image: "/images/printer-canon-1.webp"  },
        { name: "Brother HL-L6400DW",            brand: "Brother", desc: "Robust wireless laser printing for medium-sized professional offices.",   priceRental: "Sale Ready",          image: "/images/printer-brother.webp"  },
        { name: "Kyocera ECOSYS M6235cidn",      brand: "Kyocera", desc: "Ultra-reliable high-volume printing with exceptional cost efficiency.",   priceRental: "Leasing Available",   image: "/images/printer-kyocera.webp"  },
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
            <ArrowBack className="text-xl" />
          </button>
          <button type="button" onClick={scrollRight} className="w-12 h-12 rounded-full bg-[#f5be53] text-[#412d00] flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
            <ArrowForward className="text-xl" />
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex gap-8 no-scrollbar overflow-x-auto pb-8 snap-x max-w-7xl mx-auto scroll-smooth">
        {products.map((p, i) => (
          <div key={i} className="min-w-[320px] md:min-w-[400px] snap-center glass-card rounded-3xl overflow-hidden group">
            <div className="h-64 bg-[#142032] relative overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#f5be53] uppercase tracking-widest">{p.brand}</div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <p className="text-[#d3c5b0] text-sm mb-6">{p.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#f5be53] font-bold text-lg">{p.priceRental || "Contact for Pricing"}</span>
                <a href="/products" className="text-white hover:text-[#f5be53] transition-colors flex items-center gap-2">
                  Details <East className="text-sm" />
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
                {[1,2,3,4,5].map(s => <Star key={s} className="text-xl" style={{fontSize: '1.25rem'}} />)}
              </div>
              <p className="text-[#d7e3fc] italic text-sm">&quot;{r.text}&quot;</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3548] flex items-center justify-center">
                  <Person className="text-[#f5be53]" />
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
    { name: "HP", slug: "hp", logoUrl: "" },
    { name: "Canon", slug: "canon", logoUrl: "" },
    { name: "Xerox", slug: "xerox", logoUrl: "" },
    { name: "Kyocera", slug: "kyocera", logoUrl: "" },
    { name: "Ricoh", slug: "ricoh", logoUrl: "" },
    { name: "Sharp", slug: "sharp", logoUrl: "" },
    { name: "Brother", slug: "brother", logoUrl: "" },
    { name: "Epson", slug: "epson", logoUrl: "" },
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

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

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
                  {brand.logoUrl ? (
                    <img 
                      src={brand.logoUrl} 
                      alt={brand.name} 
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`text-slate-500 font-bold text-lg ${brand.logoUrl ? 'hidden' : ''}`}>
                    {getInitials(brand.name)}
                  </div>
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
              <ExpandMore className="text-[#f5be53] group-open:rotate-180 transition-transform" />
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
