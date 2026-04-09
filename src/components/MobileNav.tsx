"use client";

import Link from "next/link";

export default function MobileNav() {
  const links = [
    { href: "/", icon: "home", label: "Home" },
    { href: "/services", icon: "settings_suggest", label: "Services" },
    { href: "/products", icon: "inventory_2", label: "Products" },
    { href: "/blog", icon: "article", label: "Blog" },
    { href: "/contact", icon: "call", label: "Contact" },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50 flex justify-around items-center px-2 py-1 bg-[#071325]/60 backdrop-blur-lg rounded-full outline outline-slate-700/15 shadow-[0_20px_40px_rgba(3,14,32,0.4)]">
      {links.map((link, i) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${i === 0 ? "bg-[#f5be53] text-[#071325]" : "text-slate-400 hover:bg-slate-800/50"}`}
        >
          <span className="material-symbols-outlined">{link.icon}</span>
          <span className="text-[10px] font-medium uppercase tracking-widest mt-0.5">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
