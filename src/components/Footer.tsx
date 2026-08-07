"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { Smartphone, Phone, Headphones, Email } from "@mui/icons-material";

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const defaultSocialLinks = [
  { name: "facebook", url: "https://www.facebook.com/share/1GM5UxFLTq/?mibextid=wwXIfr", icon: "facebook" },
  { name: "instagram", url: "https://www.instagram.com/sahara_office_equipments", icon: "instagram" },
  { name: "linkedin", url: "https://www.linkedin.com/company/sahara-office-equipment-trading-llc--sharjah/", icon: "linkedin" },
  { name: "youtube", url: "https://www.youtube.com/@saharaprinter", icon: "youtube" },
];

const MagneticButton = ({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "outline" }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 ${
        variant === "primary" 
          ? "bg-[#f5be53] text-[#030e20] hover:bg-[#d4a03d]" 
          : "border-2 border-[#f5be53] text-[#f5be53] hover:bg-[#f5be53] hover:text-[#030e20]"
      }`}
    >
      {children}
    </motion.button>
  );
};

const SocialIcon = ({ icon }: { icon: string }) => {
  const socialIcons: Record<string, React.ReactElement> = {
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedinIcon />,
    youtube: <YoutubeIcon />,
  };
  return socialIcons[icon] || null;
};

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);

  useEffect(() => {
    // Load settings from D1 API first
    fetch('/api/settings')
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
      const stored = localStorage.getItem("sahara_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setSettings(parsed);
        }
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    }

    const loadSocialLinks = () => {
      try {
        const stored = localStorage.getItem("sahara_seo_config");
        if (stored) {
          const config = JSON.parse(stored);
          if (config && typeof config === "object") {
            const sm = config.socialMedia || {};
            const links = [];
            if (sm.facebook) links.push({ name: "facebook", url: sm.facebook, icon: "facebook" });
            if (sm.instagram) links.push({ name: "instagram", url: sm.instagram, icon: "instagram" });
            if (sm.linkedin) links.push({ name: "linkedin", url: sm.linkedin, icon: "linkedin" });
            if (sm.twitter) links.push({ name: "twitter", url: sm.twitter, icon: "twitter" });
            if (sm.youtube) links.push({ name: "youtube", url: sm.youtube, icon: "youtube" });
            if (sm.whatsapp) links.push({ name: "whatsapp", url: sm.whatsapp, icon: "whatsapp" });
            if (links.length > 0) setSocialLinks(links);
          }
        }
      } catch (e) {
        console.error("Failed to load social links:", e);
      }
    };

    loadSocialLinks();

    const handleUpdate = () => loadSocialLinks();
    window.addEventListener("seo-config-updated", handleUpdate);

    return () => {
      window.removeEventListener("seo-config-updated", handleUpdate);
    };
  }, []);

  return (
    <footer className="bg-[#030e20] pt-12 pb-0 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="space-y-6 lg:col-span-1">
            <div className="text-xl font-bold text-[#f5be53]">Sahara Office Equipments</div>
            <p className="text-slate-400 text-sm leading-relaxed">UAE's trusted partner for printer rental, sales, repair, and managed print solutions since 2012.</p>

            {/* Social Media Links with motion */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: "#f5be53" }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a2a3a] to-[#0d1520] flex items-center justify-center text-slate-400 transition-all duration-300 cursor-pointer shadow-lg"
                  style={{
                    boxShadow: '4px 4px 12px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.05)',
                  }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <SocialIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>

            <div className="text-sm text-slate-400">
              <p className="font-semibold text-white mb-2">Headquarters</p>
              <p>Al Arabi Building, Industrial Area 11</p>
              <p>Sharjah, UAE</p>
              <p className="mt-2">PO Box 47373, Sharjah</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Smartphone className="text-[#f5be53] text-lg" />
                <a href="tel:+971503823969" className="hover:text-[#f5be53] transition-colors">+971 50 382 3969</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-[#f5be53] text-lg" />
                <a href="tel:+97165426169" className="hover:text-[#f5be53] transition-colors">+971 6 542 6169</a>
              </li>
              <li className="flex items-center gap-2">
                <Headphones className="text-[#f5be53] text-lg" />
                <a href="tel:+97165276444" className="hover:text-[#f5be53] transition-colors">+971 6 527 6444</a>
              </li>
              <li className="flex items-center gap-2">
                <Email className="text-[#f5be53] text-lg" />
                <a href="mailto:info@saharaedoc.com" className="hover:text-[#f5be53] transition-colors">info@saharaedoc.com</a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-500 mb-2">Working Hours</p>
              <p className="text-sm text-slate-400">Sat - Thu: 8:00 AM - 8:00 PM</p>
              <p className="text-sm text-slate-400">24/7 Emergency Support</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/services/printer-rental/" className="hover:text-[#f5be53] transition-colors">Printer Rental</Link></li>
              <li><Link href="/services/photocopier-rental/" className="hover:text-[#f5be53] transition-colors">Photocopier Rental</Link></li>
              <li><Link href="/services/paper-shredder-rental/" className="hover:text-[#f5be53] transition-colors">Paper Shredder Rental</Link></li>
              <li><Link href="/services/papercut-print-management/" className="hover:text-[#f5be53] transition-colors">PaperCut Print Management</Link></li>
              <li><Link href="/services/amc/" className="hover:text-[#f5be53] transition-colors">Annual Maintenance (AMC)</Link></li>
              <li><Link href="/services/repair/" className="hover:text-[#f5be53] transition-colors">Printer Repair</Link></li>
              <li><Link href="/services/toner/" className="hover:text-[#f5be53] transition-colors">Toner & Spare Parts</Link></li>
              <li><Link href="/services/plotter-maintenance/" className="hover:text-[#f5be53] transition-colors">Plotter Maintenance</Link></li>
              <li><Link href="/copier-lease-uae" className="hover:text-[#f5be53] transition-colors">Copier Lease UAE</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Locations</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/printer-rental-dubai" className="hover:text-[#f5be53] transition-colors">Printer Rental Dubai</Link></li>
              <li><Link href="/photocopier-rental-sharjah" className="hover:text-[#f5be53] transition-colors">Photocopier Sharjah</Link></li>
              <li><Link href="/printer-rental-abu-dhabi" className="hover:text-[#f5be53] transition-colors">Printer Rental Abu Dhabi</Link></li>
              <li><Link href="/printer-rental-rak" className="hover:text-[#f5be53] transition-colors">Printer Rental RAK</Link></li>
              <li><Link href="/printer-rental-fujairah" className="hover:text-[#f5be53] transition-colors">Printer Rental Fujairah</Link></li>
              <li><Link href="/printer-rental-al-ain" className="hover:text-[#f5be53] transition-colors">Printer Rental Al Ain</Link></li>
              <li><Link href="/printer-repair-dubai" className="hover:text-[#f5be53] transition-colors">Printer Repair Dubai</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Blog Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/blogs/how-to-choose-the-best-printer-rental-dubai-service" className="hover:text-[#f5be53] transition-colors leading-snug">
                  How to Choose Printer Rental Dubai
                </Link>
              </li>
              <li>
                <Link href="/blogs/total-cost-of-printer-ownership" className="hover:text-[#f5be53] transition-colors leading-snug">
                  Total Cost of Printer Ownership
                </Link>
              </li>
              <li>
                <Link href="/blogs/why-a-company-chooses-copier-rental-service-over-buying-a-copier" className="hover:text-[#f5be53] transition-colors leading-snug">
                  Copier Rental vs. Buying
                </Link>
              </li>
              <li>
                <Link href="/blogs/the-hidden-cost-of-your-office-copier" className="hover:text-[#f5be53] transition-colors leading-snug">
                  Hidden Cost of Office Copier
                </Link>
              </li>
              <li>
                <Link href="/blogs/stop-wasting-money-on-printing-your-guide-to-smarter-office-habits" className="hover:text-[#f5be53] transition-colors leading-snug">
                  Stop Wasting Money on Printing
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#f5be53] transition-colors font-medium text-slate-300">
                  View All Articles →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* SEO Internal Links — Keyword Anchor Text */}
        <div className="py-8 border-t border-white/5">
          <div className="text-center flex flex-wrap justify-center gap-x-3 gap-y-1.5 mb-3">
            <Link href="/printer-rental-dubai" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Printer Rental Dubai</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/photocopier-rental-sharjah" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Photocopier Sharjah</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/printer-rental-abu-dhabi" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Copier Abu Dhabi</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/copier-lease-uae" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Printer Lease UAE</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/services/paper-shredder-rental/" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Paper Shredder Rental UAE</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/services/papercut-print-management/" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">PaperCut Print Management UAE</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/services/toner/" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Toner Suppliers Dubai</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/services/amc/" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Printer AMC UAE</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/brands/canon" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Canon Printer Rental</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/brands/kyocera" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Kyocera Photocopier</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/printer-repair-dubai" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Printer Repair Dubai</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/canon-printer-dubai" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">Canon Printer Dubai</Link>
            <span className="text-slate-700 text-xs">|</span>
            <Link href="/hp-printer-abu-dhabi" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">HP Printer Abu Dhabi</Link>
          </div>
          <p className="text-slate-600 text-xs text-center">
            Serving: Dubai · Sharjah · Abu Dhabi · Ajman · RAK · Fujairah · Al Ain — Free delivery across UAE
          </p>
        </div>
        
        <div className="py-6 border-t border-white/5 text-center text-slate-500 text-xs">
          © 2026 Sahara Office Equipments. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
