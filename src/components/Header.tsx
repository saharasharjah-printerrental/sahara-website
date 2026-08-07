"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Print, CopyAll, Handyman, Build, Inventory, ShoppingCart, Home, SettingsSuggest, Inventory2, RequestQuote, LocationOn, Article, Call, ExpandMore, ExpandLess, MoreHoriz, InfoOutlined, Close, Groups } from "@mui/icons-material";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Clients", href: "/our-clients" },
  { name: "Blogs", href: "/blogs" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const brands = [
  { name: "HP", href: "/brands/hp" },
  { name: "Canon", href: "/brands/canon" },
  { name: "Ricoh", href: "/brands/ricoh" },
  { name: "Xerox", href: "/brands/xerox" },
  { name: "Kyocera", href: "/brands/kyocera" },
  { name: "Brother", href: "/brands/brother" },
  { name: "Samsung", href: "/brands/samsung" },
  { name: "Lexmark", href: "/brands/lexmark" },
  { name: "Sharp", href: "/brands/sharp" },
  { name: "Epson", href: "/brands/epson" },
  { name: "Konica Minolta", href: "/brands/konica-minolta" },
];

const services = [
  { name: "Printer Rental", href: "/services/printer-rental/", icon: Print },
  { name: "Photocopier Rental", href: "/services/photocopier-rental/", icon: CopyAll },
  { name: "Paper Shredder Rental", href: "/services/paper-shredder-rental/", icon: Article },
  { name: "PaperCut Print Management", href: "/services/papercut-print-management/", icon: SettingsSuggest },
  { name: "Annual Maintenance (AMC)", href: "/services/amc/", icon: Handyman },
  { name: "Printer Repair", href: "/services/repair/", icon: Build },
  { name: "Toner & Spare Parts", href: "/services/printer-spare-parts/", icon: Inventory },
  { name: "Plotter Maintenance", href: "/services/plotter-maintenance/", icon: ShoppingCart },
];

// Mobile bottom nav - direct link items (3 icons keeps bar uncluttered)
const bottomNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services/printer-rental", icon: SettingsSuggest },
  { name: "Products", href: "/products", icon: Inventory2 },
];

// Mobile "More" dropdown items
const moreNavItems = [
  { name: "Clients", href: "/our-clients", icon: Groups },
  { name: "Locations", href: "/printer-rental-dubai", icon: LocationOn },
  { name: "Blog", href: "/blogs", icon: Article },
  { name: "Contact", href: "/contact", icon: Call },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [brands, setBrands] = useState<{ name: string; href: string }[]>([
  { name: "HP", href: "/brands/hp" },
  { name: "Canon", href: "/brands/canon" },
  { name: "Ricoh", href: "/brands/ricoh" },
  { name: "Xerox", href: "/brands/xerox" },
  { name: "Kyocera", href: "/brands/kyocera" },
  { name: "Brother", href: "/brands/brother" },
  { name: "Samsung", href: "/brands/samsung" },
  { name: "Lexmark", href: "/brands/lexmark" },
  { name: "Sharp", href: "/brands/sharp" },
  { name: "Epson", href: "/brands/epson" },
  { name: "Konica Minolta", href: "/brands/konica-minolta" },
]);
  const [settings, setSettings] = useState<any>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedBrands = localStorage.getItem("sahara_brands");
      if (storedBrands) {
        const parsed = JSON.parse(storedBrands).filter((b: any) => b.isActive);
        setBrands(parsed.map((b: any) => ({ name: b.name, href: `/brands/${b.slug}` })));
      }
    } catch (e) {
      localStorage.removeItem("sahara_brands");
    }
  }, []);

  useEffect(() => {
    // Load settings from D1 API first
    fetch('/api/settings/')
      .then(res => res.json())
      .then(data => {
        if (data.settings && Object.keys(data.settings).length > 0) {
          setSettings(prev => ({ ...prev, ...data.settings }));
          localStorage.setItem("sahara_settings", JSON.stringify(data.settings));
        }
      })
      .catch(console.error);

    // Fallback to localStorage
    try {
      const storedSettings = localStorage.getItem("sahara_settings");
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed && typeof parsed === "object") setSettings(parsed);
      }
    } catch (e) {
      localStorage.removeItem("sahara_settings");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (brandsRef.current && !brandsRef.current.contains(event.target as Node)) {
        setIsBrandsOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#071325]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/sahara-navbar-logo.webp"
              alt="Sahara Office Equipments"
              width={120}
              height={40}
              style={{ height: "40px", width: "auto" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div
              ref={desktopNavRef}
              onMouseLeave={() => {
                setIsServicesOpen(false);
                setIsBrandsOpen(false);
              }}
              className="relative flex items-center gap-1 p-1 bg-[#1f2a3d]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg ring-1 ring-black/10"
            >
                {/* Home Link */}
              <Link
                href="/"
                onMouseEnter={() => { setIsServicesOpen(false); setIsBrandsOpen(false); }}
                className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${isActive("/") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
              >
                Home
              </Link>

              {/* About Link */}
              <Link
                href="/about"
                onMouseEnter={() => { setIsServicesOpen(false); setIsBrandsOpen(false); }}
                className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${isActive("/about") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
              >
                About
              </Link>

              {/* Clients Link */}
              <Link
                href="/our-clients"
                onMouseEnter={() => { setIsServicesOpen(false); setIsBrandsOpen(false); }}
                className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${isActive("/our-clients") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
              >
                Clients
              </Link>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef} onMouseEnter={() => setIsServicesOpen(true)}>
                <button
                  type="button"
                  aria-expanded={isServicesOpen}
                  onClick={() => { setIsServicesOpen(!isServicesOpen); setIsBrandsOpen(false); }}
                  onMouseEnter={() => { setIsServicesOpen(true); setIsBrandsOpen(false); }}
                  className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center gap-1 ${isActive("/services") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
                >
                  Services
                  {isServicesOpen ? <ExpandLess className="text-xs" /> : <ExpandMore className="text-xs" />}
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#142032]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      {services.map((service) => (
                        <Link key={service.name} href={service.href} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-[#1f2a3d] hover:text-[#f5be53] transition-colors" onClick={() => setIsServicesOpen(false)}>
                          <service.icon className="text-lg text-slate-400" />
                          <span>{service.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blogs Link */}
              <Link
                href="/blogs"
                onMouseEnter={() => { setIsServicesOpen(false); setIsBrandsOpen(false); }}
                className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${isActive("/blogs") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
              >
                Blogs
              </Link>

              {/* Products Link */}
              <Link
                href="/products"
                onMouseEnter={() => { setIsServicesOpen(false); setIsBrandsOpen(false); }}
                className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${isActive("/products") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
              >
                Products
              </Link>

              {/* Brands Dropdown */}
              <div className="relative" ref={brandsRef} onMouseEnter={() => setIsBrandsOpen(true)}>
                <button
                  type="button"
                  aria-expanded={isBrandsOpen}
                  onClick={() => { setIsBrandsOpen(!isBrandsOpen); }}
                  onMouseEnter={() => { setIsBrandsOpen(true); }}
                  className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center gap-1 ${isActive("/brands") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
                >
                  Brands
                  {isBrandsOpen ? <ExpandLess className="text-xs" /> : <ExpandMore className="text-xs" />}
                </button>
                <AnimatePresence>
                  {isBrandsOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#142032]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      {brands.map((brand) => (
                        <Link key={brand.name} href={brand.href} className="block px-4 py-3 text-slate-300 hover:bg-[#1f2a3d] hover:text-[#f5be53] transition-colors" onClick={() => setIsBrandsOpen(false)}>
                          {brand.name}
                        </Link>
                      ))}
                      <div className="border-t border-white/8 mx-3 my-1" />
                      <Link
                        href="/bravo-card-printers-uae"
                        className="flex items-center gap-2 px-4 py-3 text-[#f5be53] hover:bg-[#1f2a3d] transition-colors font-semibold text-sm"
                        onClick={() => setIsBrandsOpen(false)}
                      >
                        <span className="text-xs bg-[#f5be53]/20 px-1.5 py-0.5 rounded text-[#f5be53] font-bold">★</span>
                        Bravo Card Printers
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Link */}
              <Link
                href="/contact"
                onMouseEnter={() => { setIsServicesOpen(false); setIsBrandsOpen(false); }}
                className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${isActive("/contact") ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md" : "text-slate-300 hover:text-white"}`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <Link href="/rental-calculator" className="hidden lg:block bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform">
            Get a Quote
          </Link>

          {/* Mobile - Logo only */}
          <div className="lg:hidden" />
        </nav>
      </header>

      {/* Mobile Bottom Navigation - with safe area padding */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50 flex justify-around items-center px-2 py-1 bg-[#071325]/60 backdrop-blur-lg rounded-full outline outline-slate-700/15 shadow-[0_20px_40px_rgba(3,14,32,0.4)] pb-safe">
        {/* Direct Link Items */}
        {bottomNavItems.map((link) => {
          const isCurrentActive = isActive(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${
                isCurrentActive ? "bg-[#f5be53] text-[#412d00]" : "text-slate-400 hover:bg-slate-800/50"
              }`}
            >
                            <link.icon className="text-xl" />
              <span className="text-[10px] font-medium uppercase tracking-widest mt-0.5 whitespace-nowrap">{link.name}</span>
            </Link>
          );
        })}

        {/* More Button */}
        <div ref={moreRef}>
          <button
            type="button"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${
              isMoreOpen ? "bg-[#f5be53] text-[#412d00]" : "text-slate-400 hover:bg-slate-800/50"
            }`}
          >
            <MoreHoriz className="text-xl" />
            <span className="text-[10px] font-medium uppercase tracking-widest mt-0.5 whitespace-nowrap">More</span>
          </button>
        </div>

        {/* Bottom sheet — slides up above the nav bar */}
        <AnimatePresence>
          {isMoreOpen && (
            <>
              {/* Tap-outside backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMoreOpen(false)}
              />

              {/* Sheet panel - with safe area constraints */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="fixed bottom-[72px] left-2 right-2 z-50 rounded-2xl overflow-hidden max-h-[calc(100vh-180px)] overflow-y-auto lg:hidden"
                style={{
                  background: "linear-gradient(145deg, #0f1e30 0%, #091524 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 -4px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,190,83,0.06)",
                }}
              >
                {/* Sheet header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f5be53]" />
                    <span className="text-xs font-bold text-white uppercase tracking-[0.18em]">Menu</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen(false)}
                    className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-slate-500 hover:text-white active:scale-90 transition-all"
                  >
                    <Close style={{ fontSize: 13 }} />
                  </button>
                </div>

                <div className="px-3 py-3 space-y-1">
                  {/* ── Services ── */}
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] px-2 pb-1">Services</p>
                  {services.map((service) => {
                    const active = isActive(service.href);
                    return (
                      <Link
                        key={service.name}
                        href={service.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all active:scale-[0.98] ${
                          active
                            ? "bg-[#f5be53]/12 text-[#f5be53]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-[#f5be53]/20" : "bg-white/5"}`}>
                          <service.icon style={{ fontSize: 15 }} />
                        </span>
                        <span className="text-[13px] font-medium">{service.name}</span>
                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f5be53] shrink-0" />}
                      </Link>
                    );
                  })}

                  {/* ── Divider ── */}
                  <div className="h-px bg-white/5 mx-1 my-1" />

                  {/* ── Pages ── */}
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] px-2 pb-1">Pages</p>
                  {[
                    { name: "Get Quote", href: "/rental-calculator",    icon: RequestQuote },
                    { name: "About Us",  href: "/about",                icon: InfoOutlined },
                    { name: "Blogs",     href: "/blogs",                icon: Article      },
                    { name: "Locations", href: "/printer-rental-dubai", icon: LocationOn   },
                    { name: "Contact",   href: "/contact",              icon: Call         },
                  ].map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all active:scale-[0.98] ${
                          active
                            ? "bg-[#f5be53]/12 text-[#f5be53]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-[#f5be53]/20" : "bg-white/5"}`}>
                          <item.icon style={{ fontSize: 15 }} />
                        </span>
                        <span className="text-[13px] font-medium">{item.name}</span>
                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f5be53] shrink-0" />}
                      </Link>
                    );
                  })}
                </div>

                {/* ── CTA footer ── */}
                <div className="px-3 pb-3">
                  <Link
                    href="/rental-calculator"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] font-bold text-sm active:scale-[0.98] transition-transform"
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
