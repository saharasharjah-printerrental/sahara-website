"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CipherText } from "@/components/CipherText";
import StatsClay from "@/components/StatsClay";
import {
  Layers,
  People,
  Favorite,
  Computer,
  Print,
  ShoppingCart,
  Build,
  Opacity,
  ArrowBack,
  ArrowForward,
  East,
  Star,
  Person,
  ExpandMore,
  Savings,
  Verified,
  LocationOn,
} from "@mui/icons-material";

const LOCAL_BRAND_LOGOS: Record<string, string> = {
  hp: "/brands/hp.webp",
  canon: "/brands/canon.webp",
  xerox: "/brands/xerox.webp",
  kyocera: "/brands/kyocera.webp",
  ricoh: "/brands/ricoh.webp",
  sharp: "/brands/sharp.webp",
  brother: "/brands/brother.webp",
  epson: "/brands/epson.webp",
};

const FALLBACK_LOGOS = [
  { id: "1", name: "HP", imageUrl: "/brands/hp.webp", isActive: true },
  { id: "2", name: "Canon", imageUrl: "/brands/canon.webp", isActive: true },
  { id: "3", name: "Xerox", imageUrl: "/brands/xerox.webp", isActive: true },
  { id: "4", name: "Ricoh", imageUrl: "/brands/ricoh.webp", isActive: true },
  { id: "5", name: "Kyocera", imageUrl: "/brands/kyocera.webp", isActive: true },
  { id: "6", name: "Brother", imageUrl: "/brands/brother.webp", isActive: true },
  { id: "7", name: "Sharp", imageUrl: "/brands/sharp.webp", isActive: true },
  { id: "8", name: "Epson", imageUrl: "/brands/epson.webp", isActive: true },
];

const FEATURED_SKELETON = Array(4).fill(null).map(() => ({
  name: "",
  brand: "",
  desc: "",
  priceRental: "",
  image: "",
}));

const defaultTestimonials = [
  { id: "1", name: "Marcus Thorne", role: "Architectural Lead", text: "Exceptional service. They repaired our office plotter within 4 hours. Absolute lifesavers!", rating: 5 },
  { id: "2", name: "Sarah Jenkins", role: "Operations Manager", text: "The printer rental program saved us 40% on operational costs this quarter. Professional and reliable.", rating: 5 },
  { id: "3", name: "David Chen", role: "IT Director", text: "Prompt toner delivery. Never had to wait more than a day. Highly recommend Sahara.", rating: 5 },
  { id: "4", name: "Fatima Al-Rashid", role: "Office Manager", text: "We rented 5 copiers for our new Dubai office. Setup was done same day. Outstanding service!", rating: 5 },
  { id: "5", name: "James O'Brien", role: "Facilities Coordinator", text: "The AMC contract has eliminated all our printer downtime. Their preventive maintenance is top-notch.", rating: 5 },
  { id: "6", name: "Aisha Mohammed", role: "Procurement Head", text: "Best printer rental rates in Abu Dhabi. Transparent pricing, no hidden fees. Will renew our contract.", rating: 5 },
];

const defaultHomeFaqs = [
  { q: "How much does printer rental cost in Dubai?", a: "Printer rental in Dubai starts from AED 250/month for A4 color printers. A3 photocopiers range from AED 500–1,000/month. All plans include zero deposit, unlimited toner, maintenance, and free delivery." },
  { q: "What are the benefits of printer rental in UAE?", a: "Printer rental in UAE offers zero upfront costs, predictable monthly payments, included maintenance and toner, latest technology access, and flexible upgrade options." },
  { q: "Do you offer printer rental in Abu Dhabi?", a: "Yes, we provide comprehensive printer rental services across Abu Dhabi, including Al Ain, Mussafah, and ICAD. Our Abu Dhabi fleet includes Canon, HP, and Kyocera equipment with same-day delivery." },
  { q: "What printer brands do you rent?", a: "We rent premium brands including Canon imageRUNNER, HP LaserJet Enterprise, Kyocera TASKalfa, Ricoh MP series, Xerox AltaLink, and Brother. All equipment is brand new with full manufacturer warranty." },
  { q: "Is toner included in printer rental?", a: "Yes — unlimited genuine OEM toner is included in all rental plans. We monitor levels remotely and replenish proactively." },
];

export default function HomepageClient({
  initialLogos = [],
  initialTestimonials = [],
  initialFaqs = [],
}: {
  initialLogos?: any[];
  initialTestimonials?: any[];
  initialFaqs?: { q: string; a: string }[];
}) {
  return (
    <>
      <HeroSection />
      <BrandCarouselSection initialLogos={initialLogos} />
      <DefinitionSection />
      <ServicesSection />
      <LocationsSection />
      <StatsSectionContent />
      <FeaturedProductsSection />
      <ReviewsSectionContent initialTestimonials={initialTestimonials} />
      <CTASection />
      <FAQSectionContent initialFaqs={initialFaqs} />
    </>
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#071325]/95 via-[#071325]/75 to-[#071325]/30 z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#071325] to-transparent z-0" />

      <div className="w-full max-w-3xl relative z-10 space-y-8">
        <h1 className="sr-only">Printer &amp; Photocopier Rental UAE | All-Inclusive Plans</h1>
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
        <div className="aeo-block bg-[#0d1b2e]/80 border border-[#f5be53]/20 rounded-xl p-4 max-w-lg">
          <span className="text-[#f5be53] font-bold text-xs uppercase tracking-widest block mb-1">Printer Rental UAE — Quick Answer</span>
          <p className="text-[#d3c5b0] text-sm leading-relaxed">Sahara Office Equipments provides printer and photocopier rental across UAE from <strong>AED 250/month</strong> with zero deposit, free toner, and 4-hour emergency support since 2012.</p>
        </div>
        <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          Premium office equipment solutions for the modern executive. From high-speed printing to expert technical support, we power your productivity with precision.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="/rental-calculator/"
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

function BrandCarouselSection({ initialLogos = [] }: { initialLogos?: any[] }) {
  const [mounted, setMounted] = useState(false);
  const [logos, setLogos] = useState<any[]>(
    initialLogos.length > 0 ? initialLogos.filter((l: any) => l.isActive) : FALLBACK_LOGOS
  );
  const [ready, setReady] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  // Avoid hydration mismatch: don't render until mounted on client
  useEffect(() => {
    setMounted(true);

    if (initialLogos.length > 0) {
      setLogos(initialLogos.filter((l: any) => l.isActive));
      setReady(true);
      return;
    }
    fetch("/api/logos/")
      .then((res) => res.json())
      .then((data) => {
        if (data.logos && data.logos.length > 0) {
          setLogos(data.logos.filter((l: any) => l.isActive));
        } else {
          setLogos(FALLBACK_LOGOS);
        }
      })
      .catch(() => setLogos(FALLBACK_LOGOS))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready || !logos.length) return;
    const track = trackRef.current;
    if (!track) return;
    posRef.current = 0;
    track.style.transform = "translateX(0px)";
    const SPEED = 0.5;
    // Fixed pitch: w-32 (128px) + gap-12 (48px) = 176px per item — avoids lazy-image width=0 bug
    const totalWidth = logos.length * 176;
    const step = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        if (totalWidth > 0 && posRef.current >= totalWidth) posRef.current -= totalWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, logos.length]);

  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-[#101c2e]">
      <div className="text-center mb-8">
        <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase">Trusted Brands</h2>
      </div>
      <noscript>
        <div className="flex gap-8 flex-wrap justify-center px-4 py-2">
          {FALLBACK_LOGOS.map((logo) => (
            <img key={logo.id} src={logo.imageUrl} alt={logo.name} height="40" className="max-h-10 object-contain opacity-70" />
          ))}
        </div>
      </noscript>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#101c2e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#101c2e] to-transparent z-10 pointer-events-none" />
        <div ref={trackRef} className="flex gap-12 items-center py-2" style={{ width: "max-content" }} suppressHydrationWarning>
          {displayLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center w-32 h-16 rounded-xl bg-white/5 p-3 opacity-60 hover:opacity-100 transition-opacity">
              {logo.imageUrl ? (
                <img src={LOCAL_BRAND_LOGOS[logo.name?.toLowerCase()] || logo.imageUrl} alt={logo.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              ) : (
                <span className="text-slate-400 font-bold text-base">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DefinitionSection() {
  return (
    <section className="relative py-16 px-4 lg:px-12 overflow-hidden" style={{ background: "#050d1a" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(245,190,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,190,83,0.04) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(245,190,83,0.12) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(7,19,37,0.7) 0%, transparent 75%)" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4">
            What is <span className="text-[#f5be53]">Printer Rental</span> in the UAE?
          </h2>
          <p className="text-[#7a94ad] text-base max-w-lg mx-auto leading-relaxed">
            Flexible leasing options to access top-tier multifunction printers (MFPs) and photocopiers with low monthly operational costs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:items-end">
          {([
            { Icon: Build, title: "All-Inclusive Leasing", body: "A simple monthly fee that covers your machine, unlimited toner, maintenance, repairs, and full technical support.", elevated: false },
            { Icon: Savings, title: "Smart Financials", body: "Healthy cash flow with zero upfront capital investment, zero deposit, and absolutely no exit fees.", elevated: true },
            { Icon: Verified, title: "Premium Equipment", body: "Enjoy access to high-performance, industry-leading devices from trusted brands like Canon and Kyocera.", elevated: true },
            { Icon: LocationOn, title: "Seamless UAE Coverage", body: "Popular and fully supported across major business centers: Dubai, Sharjah, and Abu Dhabi.", elevated: false },
          ] as const).map(({ Icon, title, body, elevated }, i) => (
            <div key={i} className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${elevated ? "lg:-translate-y-5" : ""}`} style={{ background: "linear-gradient(170deg, rgba(8,18,36,0.97) 0%, rgba(5,11,22,0.99) 100%)", border: "1px solid rgba(245,190,83,0.22)", boxShadow: elevated ? "0 0 0 1px rgba(245,190,83,0.15), 0 0 40px rgba(245,190,83,0.12), 0 20px 60px rgba(0,0,0,0.5)" : "0 0 0 1px rgba(245,190,83,0.08), 0 0 20px rgba(245,190,83,0.06), 0 8px 32px rgba(0,0,0,0.4)" }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(245,190,83,0.06)" }} />
              <div className="relative flex items-center justify-center pt-8 pb-6 px-6">
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(245,190,83,0.07) 0%, transparent 70%)" }} />
                <div className="relative w-20 h-20 rounded-[1.25rem] flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(145deg, rgba(245,190,83,0.16) 0%, rgba(245,190,83,0.04) 100%)", border: "1px solid rgba(245,190,83,0.32)", boxShadow: "0 0 0 6px rgba(245,190,83,0.05), 0 0 30px rgba(245,190,83,0.14)" }}>
                  <Icon style={{ fontSize: 38, color: "#f5be53" }} />
                </div>
              </div>
              <div className="px-6 pb-7 flex flex-col flex-1" style={{ borderTop: "1px solid rgba(245,190,83,0.08)" }}>
                <h3 className="text-white font-bold text-[0.95rem] mt-5 mb-2 leading-snug">{title}</h3>
                <p className="text-[#6a87a4] text-[0.8rem] leading-relaxed">{body}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, transparent, #f5be53, transparent)" }} />
            </div>
          ))}
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
    <section className="py-16 px-4 lg:px-12 bg-[#101c2e]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">Our Expertise</h2>
          <p className="text-4xl font-bold text-white">Office Solutions Redefined</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Link key={i} href={s.href} className="glass-card p-8 rounded-3xl light-leak group hover:scale-[1.02] transition-all duration-500 block">
              <div className="w-14 h-14 rounded-2xl bg-[#2a3548] flex items-center justify-center mb-6 text-[#f5be53] group-hover:bg-[#f5be53] group-hover:text-[#412d00] transition-colors">
                <s.icon className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 whitespace-nowrap">{s.title}</h3>
              <p className="text-[#d3c5b0] text-sm leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  const locations = [
    { city: "Dubai", href: "/printer-rental-dubai", label: "Printer Rental Dubai", desc: "Same-day delivery to Business Bay, DIFC, JLT, Marina & all Dubai districts.", price: "From AED 250/mo", highlight: true, icon: "🏙️" },
    { city: "Abu Dhabi", href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", desc: "Weekly maintenance visits. Mussafah, Al Reem Island, Khalifa City & ADGM.", price: "From AED 250/mo", highlight: true, icon: "🕌" },
    { city: "Sharjah", href: "/photocopier-rental-sharjah", label: "Photocopier Rental Sharjah", desc: "HQ in Sharjah Industrial Area. Fastest response times in the emirate.", price: "From AED 250/mo", highlight: false, icon: "🏭" },
    { city: "RAK", href: "/printer-rental-rak", label: "Printer Rental RAK", desc: "Serving Ras Al Khaimah businesses, free zones & industrial areas.", price: "From AED 300/mo", highlight: false, icon: "🌿" },
    { city: "Fujairah", href: "/printer-rental-fujairah", label: "Printer Rental Fujairah", desc: "East coast coverage — Fujairah port, free zones & business centres.", price: "From AED 300/mo", highlight: false, icon: "⛰️" },
    { city: "Al Ain", href: "/printer-rental-al-ain", label: "Printer Rental Al Ain", desc: "Garden city coverage — Al Ain businesses, universities & clinics.", price: "From AED 300/mo", highlight: false, icon: "🌴" },
  ];
  return (
    <section className="py-16 px-4 lg:px-12 bg-[#050d1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">UAE Coverage</h2>
          <p className="text-4xl font-bold text-white">Printer Rental Across All 7 Emirates</p>
          <p className="text-[#7a94ad] mt-4 max-w-lg mx-auto text-sm">Same-day delivery in Dubai & Abu Dhabi. Free delivery and setup across the UAE.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {locations.filter((l) => l.highlight).map((loc) => (
            <Link key={loc.href} href={loc.href} className="group relative rounded-3xl p-8 overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{ background: "linear-gradient(150deg, rgba(15,26,44,0.98) 0%, rgba(8,15,28,0.99) 100%)", border: "1px solid rgba(245,190,83,0.25)", boxShadow: "0 0 40px rgba(245,190,83,0.08), 0 20px 60px rgba(0,0,0,0.4)" }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 40px rgba(245,190,83,0.06)" }} />
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{loc.icon}</span>
                <span className="text-xs font-bold text-[#f5be53] bg-[#f5be53]/10 border border-[#f5be53]/20 px-3 py-1 rounded-full">{loc.price}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#f5be53] transition-colors">{loc.label}</h3>
              <p className="text-[#7a94ad] text-sm leading-relaxed mb-6">{loc.desc}</p>
              <span className="inline-flex items-center gap-2 text-[#f5be53] text-sm font-semibold">View Plans <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
            </Link>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.filter((l) => !l.highlight).map((loc) => (
            <Link key={loc.href} href={loc.href} className="group rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-300" style={{ background: "linear-gradient(150deg, rgba(12,22,38,0.97) 0%, rgba(7,14,26,0.98) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{loc.icon}</span>
                <h3 className="text-white font-bold text-sm group-hover:text-[#f5be53] transition-colors leading-snug">{loc.label}</h3>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mb-3">{loc.desc}</p>
              <span className="text-[#f5be53]/70 text-xs font-medium">{loc.price}</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/copier-lease-uae" className="px-6 py-3 border border-[#f5be53]/25 text-[#f5be53] rounded-full text-sm font-medium hover:bg-[#f5be53]/10 transition-colors inline-block">View Nationwide Copier Lease Plans →</Link>
        </div>
      </div>
    </section>
  );
}

function StatsSectionContent() {
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

function FeaturedProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sahara_products");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProducts(parsed.filter((p: any) => p.isActive).map((p: any) => ({ ...p, image: p.image || "" })).slice(0, 8));
      } else {
        setProducts([
          { name: "HP LaserJet Enterprise M608", brand: "HP", desc: "High-speed monochromatic laser for heavy duty enterprise workloads.", priceRental: "Contact for Pricing", image: "/images/printer-hp.svg" },
          { name: "Canon imageRUNNER ADVANCE", brand: "Canon", desc: "Comprehensive document imaging and integrated workflow management.", priceRental: "Leasing Available", image: "/images/printer-canon-1.webp" },
          { name: "Brother HL-L6400DW", brand: "Brother", desc: "Robust wireless laser printing for medium-sized professional offices.", priceRental: "Sale Ready", image: "/images/printer-brother.webp" },
          { name: "Kyocera ECOSYS M6235cidn", brand: "Kyocera", desc: "Ultra-reliable high-volume printing with exceptional cost efficiency.", priceRental: "Leasing Available", image: "/images/printer-kyocera.webp" },
        ]);
      }
    } catch (error) {
      setProducts([
        { name: "HP LaserJet Enterprise M608", brand: "HP", desc: "High-speed monochromatic laser for heavy duty enterprise workloads.", priceRental: "Contact for Pricing", image: "/images/printer-hp.svg" },
        { name: "Canon imageRUNNER ADVANCE", brand: "Canon", desc: "Comprehensive document imaging and integrated workflow management.", priceRental: "Leasing Available", image: "/images/printer-canon-1.webp" },
        { name: "Brother HL-L6400DW", brand: "Brother", desc: "Robust wireless laser printing for medium-sized professional offices.", priceRental: "Sale Ready", image: "/images/printer-brother.webp" },
        { name: "Kyocera ECOSYS M6235cidn", brand: "Kyocera", desc: "Ultra-reliable high-volume printing with exceptional cost efficiency.", priceRental: "Leasing Available", image: "/images/printer-kyocera.webp" },
      ]);
    }
    setLoading(false);
  }, []);

  const scrollLeft = useCallback(() => containerRef.current?.scrollBy({ left: -420, behavior: "smooth" }), []);
  const scrollRight = useCallback(() => containerRef.current?.scrollBy({ left: 420, behavior: "smooth" }), []);

  return (
    <section className="py-16 px-4 overflow-hidden">
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
        {(loading ? FEATURED_SKELETON : products).map((p, i) => (
          <div key={i} className="min-w-[320px] md:min-w-[400px] snap-center glass-card rounded-3xl overflow-hidden group">
            <div className="h-64 bg-[#142032] relative overflow-hidden">
              {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />}
              {p.brand && <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#f5be53] uppercase tracking-widest">{p.brand}</div>}
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-2">{p.name || "\u00A0"}</h3>
              <p className="text-[#d3c5b0] text-sm mb-6">{p.desc || "\u00A0"}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#f5be53] font-bold text-lg">{p.priceRental || "\u00A0"}</span>
                {!loading && <Link href="/products" className="text-white hover:text-[#f5be53] transition-colors flex items-center gap-2">Details <East className="text-sm" /></Link>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsSectionContent({ initialTestimonials = [] }: { initialTestimonials?: any[] }) {
  const [mounted, setMounted] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>(
    initialTestimonials.length > 0 ? initialTestimonials : defaultTestimonials
  );
  const [ready, setReady] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  // Avoid hydration mismatch: don't render until mounted on client
  useEffect(() => {
    setMounted(true);

    const normalizeT = (t: any) => ({ ...t, avatarUrl: t.avatarUrl || t.image_url || '' });
    if (initialTestimonials.length > 0) {
      setTestimonials(initialTestimonials.filter((t: any) => t.is_active === 1 || t.is_active === true || t.isActive === 1 || t.isActive === true).map(normalizeT));
      setReady(true);
      return;
    }
    fetch("/api/testimonials/")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials.filter((t: any) => t.is_active === 1 || t.is_active === true || t.isActive === 1 || t.isActive === true).map(normalizeT));
        } else {
          setTestimonials(defaultTestimonials);
        }
      })
      .catch(() => {
        setTestimonials(defaultTestimonials);
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready || !testimonials.length) return;
    const track = trackRef.current;
    if (!track) return;
    posRef.current = 0;
    track.style.transform = "translateX(0px)";
    const SPEED = 0.6;
    // Fixed pitch: w-[350px] (350px) + gap-6 (24px) = 374px per card — avoids measurement timing issues
    const totalWidth = testimonials.length * 374;
    const step = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        if (totalWidth > 0 && posRef.current >= totalWidth) posRef.current -= totalWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, testimonials.length]);

  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#101c2e]/50 relative">
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
        <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">Wall of Trust</h2>
        <p className="text-4xl font-bold text-white">Rated 4.9/5 by Google Local Guide</p>
      </div>
      <div className="overflow-hidden" onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)}>
        <div ref={trackRef} className="flex gap-6 py-4" style={{ width: "max-content" }} suppressHydrationWarning>
          {allTestimonials.map((t, i) => (
            <div key={i} className="glass-card w-[350px] flex-shrink-0 p-8 rounded-2xl flex flex-col justify-between h-64">
              <div className="flex text-[#f5be53] gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (star <= (t.rating || 5) ? <Star key={star} style={{ fontSize: "1.25rem" }} /> : <Star key={star} style={{ fontSize: "1.25rem", opacity: 0.3 }} />))}
              </div>
              <p className="text-[#d7e3fc] italic text-sm">&quot;{t.text}&quot;</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3548] flex items-center justify-center overflow-hidden">
                  {t.avatarUrl ? <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" /> : <Person className="text-[#f5be53]" />}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-[#412d00] mb-6">Ready to Upgrade?</h2>
            <p className="text-[#483200] text-lg md:text-xl font-medium">Get a customized proposal for your office equipment within 24 hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/rental-calculator" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">Get Your Quote</Link>
            <Link href="/contact" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm">Contact Support</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSectionContent({ initialFaqs = [] }: { initialFaqs?: { q: string; a: string }[] }) {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(
    initialFaqs.length > 0 ? initialFaqs : defaultHomeFaqs
  );

  useEffect(() => {
    if (initialFaqs.length > 0) {
      setFaqs(initialFaqs);
      return;
    }
    fetch("/api/faqs/?pageSlug=homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs && data.faqs.length > 0) {
          const mapped = data.faqs.map((f: any) => ({
            q: f.question,
            a: f.answer,
          }));
          setFaqs(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold text-[#f5be53] tracking-[0.3em] uppercase mb-4">Questions</h2>
        <p className="text-4xl font-bold text-white">Frequently Asked</p>
      </div>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details key={i} className="rounded-2xl p-6 group cursor-pointer" style={{ background: "linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)", boxShadow: "6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)" }} open={i === 0}>
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
