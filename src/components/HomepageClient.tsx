"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CipherText } from "@/components/CipherText";
import StatsClay from "@/components/StatsClay";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";
import AnswerBlock from "@/components/AnswerBlock";
import CtaBand from "@/components/ui/CtaBand";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";
import {
  SettingsIcon,
  AwardIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  HeadsetIcon,
  LayersIcon,
} from "@/components/icons";
import {
  Layers,
  People,
  Favorite,
  Computer,
  ArrowBack,
  ArrowForward,
  East,
  Star,
  Person,
  ExpandMore,
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
  googleReviews,
  googlePlaceId = "",
}: {
  initialLogos?: any[];
  initialTestimonials?: any[];
  initialFaqs?: { q: string; a: string }[];
  googleReviews?: { rating: number; reviewCount: number };
  googlePlaceId?: string;
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
      <ReviewsSectionContent initialTestimonials={initialTestimonials} googleReviews={googleReviews} googlePlaceId={googlePlaceId} />
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
      <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/75 to-surface/30 z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent z-0" />

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
        <div className="max-w-lg">
          <AnswerBlock
            id="printer-rental-uae-quick-answer"
            question="Printer Rental UAE — Quick Answer"
            answer="Sahara Office Equipments provides printer and photocopier rental across UAE from AED 250/month with zero deposit, free toner, and 4-hour emergency support since 2012."
          />
        </div>
        <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          Premium office equipment solutions for the modern executive. From high-speed printing to expert technical support, we power your productivity with precision.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a href="/rental-calculator/" className="btn-primary">
            Get a Quote
          </a>
          <a
            href="/services/printer-rental/"
            className="px-8 py-4 rounded-pill font-bold text-lg text-white border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
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
    <section className="py-12 bg-surface-low">
      <div className="text-center mb-8">
        <h2 className="text-caption font-bold text-primary tracking-[0.3em] uppercase">Trusted Brands</h2>
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
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-low to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-low to-transparent z-10 pointer-events-none" />
        <div ref={trackRef} className="flex gap-12 items-center py-2" style={{ width: "max-content" }} suppressHydrationWarning>
          {displayLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center w-32 h-16 rounded-card border border-white/[0.06] bg-white/5 p-3 opacity-60 hover:opacity-100 transition-opacity">
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
  const points = [
    { Icon: SettingsIcon, title: "All-Inclusive Leasing", body: "A simple monthly fee that covers your machine, unlimited toner, maintenance, repairs, and full technical support." },
    { Icon: AwardIcon, title: "Smart Financials", body: "Healthy cash flow with zero upfront capital investment, zero deposit, and absolutely no exit fees." },
    { Icon: ShieldCheckIcon, title: "Premium Equipment", body: "Enjoy access to high-performance, industry-leading devices from trusted brands like Canon and Kyocera." },
    { Icon: TruckIcon, title: "Seamless UAE Coverage", body: "Popular and fully supported across major business centers: Dubai, Sharjah, and Abu Dhabi." },
  ];
  return (
    <section className="relative py-section px-4 lg:px-12 overflow-hidden bg-ink">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(245,190,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,190,83,0.04) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(245,190,83,0.12) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(7,19,37,0.7) 0%, transparent 75%)" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal className="text-center mb-14">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">What We Offer</p>
          <h2 className="font-sora text-title font-bold text-white">
            What is <span className="text-primary">Printer Rental</span> in the UAE?
          </h2>
          <p className="text-muted text-[0.95rem] max-w-lg mx-auto leading-relaxed mt-5">
            Flexible leasing options to access top-tier multifunction printers (MFPs) and photocopiers with low monthly operational costs.
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <FeatureCard key={p.title} icon={p.Icon} title={p.title} body={p.body} delay={(i % 4) * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { icon: ClockIcon, title: "Printer Rental", desc: "Flexible leasing options for high-volume enterprises. Scale your operations without capital stress.", href: "/services/printer-rental/" },
    { icon: TruckIcon, title: "Equipment Sales", desc: "The latest fleet of industrial-grade printers and photocopiers from world-leading brands.", href: "/products/" },
    { icon: HeadsetIcon, title: "Expert Repair", desc: "Certified technicians available 24/7. We minimize downtime with swift, precise hardware maintenance.", href: "/services/repair/" },
    { icon: LayersIcon, title: "Toner & Supplies", desc: "Genuine consumables and spare parts logistics to keep your document workflow uninterrupted.", href: "/services/printer-spare-parts/" },
  ];
  return (
    <section className="py-section px-4 lg:px-12 bg-surface-low">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Our Expertise</p>
          <h2 className="font-sora text-title font-bold text-white">Office Solutions Redefined</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <FeatureCard key={s.href} icon={s.icon} title={s.title} body={s.desc} href={s.href} delay={(i % 4) * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  const locations = [
    { city: "Dubai", href: "/printer-rental-dubai/", label: "Printer Rental Dubai", desc: "Same-day delivery to Business Bay, DIFC, JLT, Marina & all Dubai districts.", price: "From AED 250/mo", highlight: true, icon: "🏙️" },
    { city: "Abu Dhabi", href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi", desc: "Weekly maintenance visits. Mussafah, Al Reem Island, Khalifa City & ADGM.", price: "From AED 250/mo", highlight: true, icon: "🕌" },
    { city: "Sharjah", href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah", desc: "HQ in Sharjah Industrial Area. Fastest response times in the emirate.", price: "From AED 250/mo", highlight: true, icon: "🏭" },
    { city: "RAK", href: "/printer-rental-rak/", label: "Printer Rental RAK", desc: "Serving Ras Al Khaimah businesses, free zones & industrial areas.", price: "From AED 300/mo", highlight: false, icon: "🌿" },
    { city: "Fujairah", href: "/printer-rental-fujairah/", label: "Printer Rental Fujairah", desc: "East coast coverage — Fujairah port, free zones & business centres.", price: "From AED 300/mo", highlight: false, icon: "⛰️" },
    { city: "Al Ain", href: "/printer-rental-al-ain/", label: "Printer Rental Al Ain", desc: "Garden city coverage — Al Ain businesses, universities & clinics.", price: "From AED 300/mo", highlight: false, icon: "🌴" },
  ];
  return (
    <section className="py-section px-4 lg:px-12 bg-ink">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">UAE Coverage</p>
          <h2 className="font-sora text-title font-bold text-white">Printer Rental Across All 7 Emirates</h2>
          <p className="text-muted mt-5 max-w-lg mx-auto text-[0.9rem]">Same-day delivery in Dubai &amp; Abu Dhabi. Free delivery and setup across the UAE.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {locations.filter((l) => l.highlight).map((loc, i) => (
            <Reveal key={loc.href} delay={i * 0.05}>
              <Link href={loc.href} className="group relative block rounded-panel border border-primary/25 bg-surface-mid p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{loc.icon}</span>
                  <span className="rounded-pill border border-primary/20 bg-primary/10 px-3 py-1 text-caption font-bold text-primary">{loc.price}</span>
                </div>
                <h3 className="mb-2 font-sora text-headline font-bold text-white transition-colors group-hover:text-primary">{loc.label}</h3>
                <p className="mb-6 text-[0.9rem] leading-relaxed text-muted">{loc.desc}</p>
                <span className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-primary">
                  View Plans
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.filter((l) => !l.highlight).map((loc, i) => (
            <FeatureCard
              key={loc.href}
              title={loc.label}
              href={loc.href}
              delay={(i % 4) * 0.05}
              body={
                <>
                  <p className="mb-2">{loc.desc}</p>
                  <span className="text-primary/70 text-caption font-medium">{loc.price}</span>
                </>
              }
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/copier-lease-uae/" className="inline-block rounded-pill border border-primary/25 px-6 py-3 text-[0.9rem] font-medium text-primary transition-colors hover:bg-primary/10">
            View Nationwide Copier Lease Plans →
          </Link>
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
    <section className="py-section px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
        <Reveal>
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Inventory</p>
          <h2 className="font-sora text-title font-bold text-white">Elite Hardware Selection</h2>
        </Reveal>
        <div className="flex gap-4">
          <button type="button" onClick={scrollLeft} aria-label="Scroll products left" className="w-12 h-12 rounded-pill border border-white/[0.1] flex items-center justify-center hover:border-primary text-on-surface-variant hover:text-primary transition-all cursor-pointer">
            <ArrowBack className="text-xl" />
          </button>
          <button type="button" onClick={scrollRight} aria-label="Scroll products right" className="w-12 h-12 rounded-pill bg-primary text-on-primary flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
            <ArrowForward className="text-xl" />
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex gap-8 no-scrollbar overflow-x-auto pb-8 snap-x max-w-7xl mx-auto scroll-smooth">
        {(loading ? FEATURED_SKELETON : products).map((p, i) => (
          <div key={i} className="min-w-[320px] md:min-w-[400px] snap-center rounded-panel border border-white/[0.08] bg-surface-low overflow-hidden group">
            <div className="h-64 bg-surface-mid relative overflow-hidden">
              {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />}
              {p.brand && <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-pill text-[10px] font-bold text-primary uppercase tracking-widest">{p.brand}</div>}
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-2">{p.name || " "}</h3>
              <p className="text-on-surface-variant text-sm mb-6">{p.desc || " "}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-lg">{p.priceRental || " "}</span>
                {!loading && <Link href="/products/" className="text-white hover:text-primary transition-colors flex items-center gap-2">Details <East className="text-sm" /></Link>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsSectionContent({
  initialTestimonials = [],
  googleReviews,
  googlePlaceId = "",
}: {
  initialTestimonials?: any[];
  googleReviews?: { rating: number; reviewCount: number };
  googlePlaceId?: string;
}) {
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
    <section className="py-section bg-surface-low/50 relative">
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
        <Reveal>
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Wall of Trust</p>
          <h2 className="font-sora text-title font-bold text-white mb-5">What Our Clients Say</h2>
          {googleReviews && (
            <GoogleReviewsBadge
              rating={googleReviews.rating}
              reviewCount={googleReviews.reviewCount}
              placeId={googlePlaceId}
              className="justify-center text-lg"
            />
          )}
        </Reveal>
      </div>
      <div className="overflow-hidden" onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)}>
        <div ref={trackRef} className="flex gap-6 py-4" style={{ width: "max-content" }} suppressHydrationWarning>
          {allTestimonials.map((t, i) => (
            <div key={i} className="w-[350px] flex-shrink-0 rounded-card border border-white/[0.08] bg-surface-mid p-8 flex flex-col justify-between h-64">
              <div className="flex text-primary gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (star <= (t.rating || 5) ? <Star key={star} style={{ fontSize: "1.25rem" }} /> : <Star key={star} style={{ fontSize: "1.25rem", opacity: 0.3 }} />))}
              </div>
              <p className="text-on-surface italic text-sm">&quot;{t.text}&quot;</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-max flex items-center justify-center overflow-hidden">
                  {t.avatarUrl ? <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" /> : <Person className="text-primary" />}
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
    <CtaBand
      title="Ready to Upgrade?"
      body="Get a customized proposal for your office equipment within 24 hours."
      primary={{ label: "Get Your Quote", href: "/rental-calculator/" }}
      secondary={{ label: "Contact Support", href: "/contact/" }}
    />
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
    <section className="py-section px-4 max-w-4xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Questions</p>
        <h2 className="font-sora text-title font-bold text-white">Frequently Asked</h2>
      </Reveal>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details key={i} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
            <summary className="flex justify-between items-center list-none font-bold text-lg text-white">
              {f.q}
              <ExpandMore className="text-primary group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-4 text-on-surface-variant leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
