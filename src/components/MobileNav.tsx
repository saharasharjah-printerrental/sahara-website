"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, SettingsSuggest, Inventory2, RequestQuote, MoreHoriz, Close, LocationOn, Article, Call, Print, ShoppingCart, Build, Handyman, Groups } from "@mui/icons-material";
import CartIndicator from "@/components/CartIndicator";

export default function MobileNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const bottomNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: SettingsSuggest },
    { name: "Products", href: "/products", icon: Inventory2 },
    { name: "Get Quote", href: "/rental-calculator/", icon: RequestQuote },
  ];

  const services = [
    { name: "Printer Rental", href: "/services/printer-rental/", icon: Print },
    { name: "Paper Shredder Rental", href: "/services/paper-shredder-rental/", icon: Article },
    { name: "PaperCut Print Management", href: "/services/papercut-print-management/", icon: SettingsSuggest },
    { name: "Toner & Parts", href: "/services/printer-spare-parts/", icon: ShoppingCart },
    { name: "Printer Repair", href: "/services/repair/", icon: Build },
    { name: "AMC Services", href: "/services/amc/", icon: Handyman },
  ];

  const morePages = [
    { name: "About Us", href: "/about", icon: Article },
    { name: "Clients", href: "/our-clients", icon: Groups },
    { name: "Blog", href: "/blogs", icon: Article },
    { name: "Locations", href: "/printer-rental-dubai", icon: LocationOn },
    { name: "Contact", href: "/contact", icon: Call },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50 flex justify-around items-center px-2 py-1 bg-[#071325]/60 backdrop-blur-lg rounded-full outline outline-slate-700/15 shadow-[0_20px_40px_rgba(3,14,32,0.4)] pb-safe">
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

        <CartIndicator variant="mobile" />

        {/* More Button */}
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
      </nav>

      {/* Bottom sheet menu */}
      <AnimatePresence>
        {isMoreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMoreOpen(false)}
            />

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

                <div className="h-px bg-white/5 mx-1 my-1" />

                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] px-2 pb-1">Pages</p>
                {morePages.map((page) => {
                  const active = isActive(page.href);
                  return (
                    <Link
                      key={page.name}
                      href={page.href}
                      onClick={() => setIsMoreOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all active:scale-[0.98] ${
                        active
                          ? "bg-[#f5be53]/12 text-[#f5be53]"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-[#f5be53]/20" : "bg-white/5"}`}>
                        <page.icon style={{ fontSize: 15 }} />
                      </span>
                      <span className="text-[13px] font-medium">{page.name}</span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f5be53] shrink-0" />}
                    </Link>
                  );
                })}
              </div>

              <div className="px-3 pb-3">
                <Link
                  href="/rental-calculator/"
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
    </>
  );
}