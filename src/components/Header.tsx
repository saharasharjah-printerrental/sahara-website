"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const defaultBrands = [
  { name: "HP", href: "/brands/hp" },
  { name: "Canon", href: "/brands/canon" },
  { name: "Ricoh", href: "/brands/ricoh" },
  { name: "Xerox", href: "/brands/xerox" },
  { name: "Kyocera", href: "/brands/kyocera" },
  { name: "Brother", href: "/brands/brother" },
  { name: "Samsung", href: "/brands/samsung" },
  { name: "Lexmark", href: "/brands/lexmark" },
];

const locations = [
  { name: "Dubai", href: "/printer-rental-dubai" },
  { name: "Abu Dhabi", href: "/printer-rental-abu-dhabi" },
  { name: "Sharjah", href: "/photocopier-rental-sharjah" },
  { name: "RAK", href: "/printer-rental-rak" },
  { name: "Fujairah", href: "/printer-rental-fujairah" },
  { name: "Al Ain", href: "/printer-rental-al-ain" },
];

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Printer Rental", href: "/services/printer-rental", icon: "print" },
  { name: "Photocopier Rental", href: "/services/printer-rental", icon: "copy_all" },
  { name: "Annual Maintenance (AMC)", href: "/services/amc", icon: "handyman" },
  { name: "Printer Repair", href: "/services/repair", icon: "build" },
  { name: "Toner & Spare Parts", href: "/services/printer-spare-parts", icon: "inventory" },
  { name: "Corporate Sales", href: "/services/sales", icon: "shopping_cart" },
];

// Mobile bottom nav - direct link items
const bottomNavItems = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Services", href: "/services/printer-rental", icon: "settings_suggest" },
  { name: "Products", href: "/products", icon: "inventory_2" },
  { name: "Get Quote", href: "/get-quote", icon: "request_quote" },
];

// Mobile "More" dropdown items
const moreNavItems = [
  { name: "Brands", href: "/brands/hp", icon: "branding_watermark" },
  { name: "Locations", href: "/printer-rental-dubai", icon: "location_on" },
  { name: "Blog", href: "/blog", icon: "article" },
  { name: "Contact", href: "/contact", icon: "call" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [brands, setBrands] = useState(defaultBrands);
  const [settings, setSettings] = useState<any>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedBrands = localStorage.getItem("sahara_brands");
    if (storedBrands) {
      const parsed = JSON.parse(storedBrands).filter((b: any) => b.isActive);
      setBrands(parsed.map((b: any) => ({ name: b.name, href: `/brands/${b.slug}` })));
    }
  }, []);

  useEffect(() => {
    const storedSettings = localStorage.getItem("sahara_settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
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
      if (locationsRef.current && !locationsRef.current.contains(event.target as Node)) {
        setIsLocationsOpen(false);
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
            <img
              src="https://www.saharaprinter.com/assets/Home/sahara-navbar-logo.webp"
              alt="Sahara Office Equipments"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div
              ref={desktopNavRef}
              onMouseLeave={() => {
                setIsBrandsOpen(false);
                setIsLocationsOpen(false);
              }}
              className="relative flex items-center gap-1 p-1 bg-[#1f2a3d]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg ring-1 ring-black/10"
            >
                {navItems.map((item) => {
                const isCurrentActive = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onMouseEnter={() => {
                      setIsServicesOpen(false);
                      setIsBrandsOpen(false);
                      setIsLocationsOpen(false);
                    }}
                    className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${
                      isCurrentActive
                        ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef} onMouseEnter={() => setIsServicesOpen(true)}>
                <button
                  type="button"
                  aria-expanded={isServicesOpen}
                  onClick={() => {
                    setIsServicesOpen(!isServicesOpen);
                    setIsBrandsOpen(false);
                    setIsLocationsOpen(false);
                  }}
                  onMouseEnter={() => {
                    setIsServicesOpen(true);
                    setIsBrandsOpen(false);
                    setIsLocationsOpen(false);
                  }}
                  className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center gap-1 ${
                    isActive("/services")
                      ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Services
                  <span className="material-symbols-outlined text-xs">{isServicesOpen ? "expand_less" : "expand_more"}</span>
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#142032]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-[#1f2a3d] hover:text-[#f5be53] transition-colors"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <span className="material-symbols-outlined text-lg text-slate-400">{service.icon}</span>
                          <span>{service.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brands Dropdown */}
              <div className="relative" ref={brandsRef} onMouseEnter={() => setIsBrandsOpen(true)}>
                <button
                  type="button"
                  aria-expanded={isBrandsOpen}
                  onClick={() => {
                    setIsBrandsOpen(!isBrandsOpen);
                    setIsLocationsOpen(false);
                  }}
                  onMouseEnter={() => {
                    setIsBrandsOpen(true);
                    setIsLocationsOpen(false);
                  }}
                  className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center gap-1 ${
                    isActive("/brands")
                      ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Brands
                  <span className="material-symbols-outlined text-xs">{isBrandsOpen ? "expand_less" : "expand_more"}</span>
                </button>
                <AnimatePresence>
                  {isBrandsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#142032]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {brands.map((brand) => (
                        <Link
                          key={brand.name}
                          href={brand.href}
                          className="block px-4 py-3 text-slate-300 hover:bg-[#1f2a3d] hover:text-[#f5be53] transition-colors"
                          onClick={() => setIsBrandsOpen(false)}
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Locations Dropdown */}
              <div className="relative" ref={locationsRef} onMouseEnter={() => setIsLocationsOpen(true)}>
                <button
                  type="button"
                  aria-expanded={isLocationsOpen}
                  onClick={() => {
                    setIsLocationsOpen(!isLocationsOpen);
                    setIsBrandsOpen(false);
                  }}
                  onMouseEnter={() => {
                    setIsLocationsOpen(true);
                    setIsBrandsOpen(false);
                  }}
                  className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center gap-1 ${
                    isActive("/locations")
                      ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Locations
                  <span className="material-symbols-outlined text-xs">{isLocationsOpen ? "expand_less" : "expand_more"}</span>
                </button>
                <AnimatePresence>
                  {isLocationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#142032]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {locations.map((loc) => (
                        <Link
                          key={loc.name}
                          href={loc.href}
                          className="block px-4 py-3 text-slate-300 hover:bg-[#1f2a3d] hover:text-[#f5be53] transition-colors"
                          onClick={() => setIsLocationsOpen(false)}
                        >
                          {loc.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <Link href="/get-quote" className="hidden lg:block bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform">
            Get a Quote
          </Link>

          {/* Mobile - Logo only */}
          <div className="lg:hidden" />
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50 flex justify-around items-center px-2 py-1 bg-[#071325]/60 backdrop-blur-lg rounded-full outline outline-slate-700/15 shadow-[0_20px_40px_rgba(3,14,32,0.4)]">
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
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="text-[10px] font-medium uppercase tracking-widest mt-0.5">{link.name}</span>
            </Link>
          );
        })}

        {/* More Button - Opens dropdown with Brands, Locations, Contact */}
        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${
              isMoreOpen ? "bg-[#f5be53] text-[#412d00]" : "text-slate-400 hover:bg-slate-800/50"
            }`}
          >
            <span className="material-symbols-outlined">more_horiz</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-0.5">More</span>
          </button>

          {/* More Dropdown - Shows above bottom nav */}
          <AnimatePresence>
            {isMoreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-[#142032]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                {moreNavItems.map((item) => {
                  const isItemActive = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMoreOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        isItemActive ? "bg-[#f5be53]/20 text-[#f5be53]" : "text-slate-300 hover:bg-[#1f2a3d] hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
