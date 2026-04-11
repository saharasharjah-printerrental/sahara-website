"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dashboard, Print, ShoppingCart, RequestQuote, Article, Groups, Quiz, Business, Storage, Settings, Public, Logout } from "@mui/icons-material";

const menuItems = [
  { icon: Dashboard, label: "Dashboard", href: "/admin" },
  { icon: Print, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Supplies & Parts", href: "/admin/supplies" },
  { icon: RequestQuote, label: "Inquiries", href: "/admin/inquiries" },
  { icon: Article, label: "Blog Posts", href: "/admin/blog" },
  { icon: Groups, label: "Clients", href: "/admin/clients" },
  { icon: Quiz, label: "FAQs", href: "/admin/faqs" },
  { icon: Business, label: "Brands", href: "/admin/brands" },
  { icon: Storage, label: "SEO & Analytics", href: "/admin/seo" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("sahara_admin_auth");
    if (!auth && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    if (auth) {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("sahara_admin_auth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071325] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#f5be53] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071325] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#030e20] border-r border-white/5 flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="text-xl font-bold text-[#f5be53]">
            Sahara Admin
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href
                  ? "bg-[#f5be53] text-[#412d00]"
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}