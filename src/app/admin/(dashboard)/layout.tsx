"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dashboard, Print, ShoppingCart, Article, Groups, Quiz, Business, Storage, Settings, Public, Logout, FormatQuote, Image, ReceiptLong } from "@mui/icons-material";

const menuItems = [
  { icon: Dashboard, label: "Dashboard", href: "/admin" },
  { icon: Print, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Supplies & Parts", href: "/admin/supplies" },
  { icon: ReceiptLong, label: "Orders", href: "/admin/orders" },
  { icon: Article, label: "Blog Posts", href: "/admin/blog" },
  { icon: Groups, label: "Clients", href: "/admin/clients" },
  { icon: Quiz, label: "FAQs", href: "/admin/faqs" },
  { icon: Business, label: "Brands", href: "/admin/brands" },
  { icon: FormatQuote, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Image, label: "Logo & Branding", href: "/admin/logos" },
  { icon: Storage, label: "SEO & Analytics", href: "/admin/seo" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem("sahara_admin_auth");
    if (auth) {
      setIsAuthenticated(true);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("sahara_admin_auth");
    router.push("/admin/login");
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center" suppressHydrationWarning>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex" suppressHydrationWarning>
      <aside className="w-64 bg-slate-950 border-r border-white/5 flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="text-xl font-bold text-primary">
            Sahara Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href
                  ? "bg-primary text-amber-950"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-all"
          >
            <Public />
            <span className="font-medium">View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-all w-full"
          >
            <Logout />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
