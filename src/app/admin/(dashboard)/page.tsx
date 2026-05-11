"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalProducts: number;
  totalInquiries: number;
  pendingInquiries: number;
  publishedBlogs: number;
  liveUsers: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 6,
    totalInquiries: 0,
    pendingInquiries: 0,
    publishedBlogs: 0,
    liveUsers: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const loadStats = async () => {
      try {
        // Fetch from D1 APIs
        const [inqRes, prodRes, blogRes] = await Promise.all([
          fetch('/api/inquiries/').catch(() => null),
          fetch('/api/products/').catch(() => null),
          fetch('/api/blogs/?includeDrafts=1').catch(() => null),
        ]);

        if (inqRes?.ok) {
          const inqData = await inqRes.json();
          const inquiries = inqData.inquiries || [];
          setStats((prev) => ({
            ...prev,
            totalInquiries: inquiries.length,
            pendingInquiries: inquiries.filter((i: any) => (i.status || 'new') === 'new' || (i.status || 'pending') === 'pending').length,
          }));
          setRecentInquiries(
            inquiries
              .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
              .slice(0, 5)
              .map((i: any) => ({
                id: i.id,
                name: i.name,
                email: i.email,
                service: i.service || i.service_type || 'General',
                status: i.status || 'new',
                createdAt: i.createdAt || i.created_at || '',
              }))
          );
        } else {
          // Fall back to localStorage
          const storedInquiries = localStorage.getItem("sahara_inquiries");
          if (storedInquiries) {
            const inquiries = JSON.parse(storedInquiries);
            if (Array.isArray(inquiries)) {
              setStats((prev) => ({
                ...prev,
                totalInquiries: inquiries.length,
                pendingInquiries: inquiries.filter((i: any) => i.status === "pending").length,
              }));
              setRecentInquiries(inquiries.slice(0, 5));
            }
          }
        }

        if (prodRes?.ok) {
          const prodData = await prodRes.json();
          const products = prodData.products || [];
          setStats((prev) => ({ ...prev, totalProducts: products.length }));
        } else {
          const storedProducts = localStorage.getItem("sahara_products");
          if (storedProducts) {
            const products = JSON.parse(storedProducts);
            if (Array.isArray(products)) {
              setStats((prev) => ({ ...prev, totalProducts: products.length }));
            }
          }
        }

        if (blogRes?.ok) {
          const blogData = await blogRes.json();
          const blogs = blogData.blogs || [];
          setStats((prev) => ({
            ...prev,
            publishedBlogs: blogs.filter((b: any) => b.isActive === 1).length,
          }));
        } else {
          const storedBlogs = localStorage.getItem("sahara_blogs");
          if (storedBlogs) {
            const blogs = JSON.parse(storedBlogs);
            if (Array.isArray(blogs)) {
              setStats((prev) => ({
                ...prev,
                publishedBlogs: blogs.filter((b: any) => b.status === "published").length,
              }));
            }
          }
        }
      } catch (e) {
        console.error("Error loading dashboard data:", e);
      }
      setLoading(false);
    };

    loadStats();

    // Live user tracking — poll every 30s
    const fetchLive = () =>
      fetch("/api/analytics/stats/")
        .then((r) => r.json())
        .then((d) => setStats((prev) => ({ ...prev, liveUsers: d.online ?? 0 })))
        .catch(() => {});
    fetchLive();
    const liveInterval = setInterval(fetchLive, 30_000);
    return () => clearInterval(liveInterval);
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.totalProducts, icon: "inventory_2", color: "text-blue-400" },
    { label: "Total Inquiries", value: stats.totalInquiries, icon: "request_quote", color: "text-green-400" },
    { label: "Pending Inquiries", value: stats.pendingInquiries, icon: "pending", color: "text-yellow-400" },
    { label: "Published Blogs", value: stats.publishedBlogs, icon: "article", color: "text-purple-400" },
  ];
  const isLive = stats.liveUsers > 0;

  if (!mounted || loading) {
    return (
      <div className="min-h-full">
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="h-9 w-32 bg-[#1a2d4a] rounded-lg mb-2" />
            <div className="h-4 w-64 bg-[#1a2d4a] rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1a2d4a]" />
              </div>
              <div className="h-9 w-10 rounded-lg bg-[#1a2d4a] mb-2" />
              <div className="h-3.5 w-24 rounded-lg bg-[#1a2d4a]" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#1a2d4a] flex-shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-5 w-28 rounded-lg bg-[#1a2d4a]" />
                  <div className="h-3.5 w-36 rounded bg-[#1a2d4a]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-6 animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-36 bg-[#1a2d4a] rounded-lg" />
          </div>
          <div className="space-y-0">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex gap-6 py-4 border-b border-white/5 items-center">
                <div className="h-4 rounded bg-[#1a2d4a] w-28" />
                <div className="h-4 rounded bg-[#1a2d4a] w-36" />
                <div className="h-4 rounded bg-[#1a2d4a] w-20" />
                <div className="h-6 w-16 rounded-full bg-[#1a2d4a]" />
                <div className="h-4 rounded bg-[#1a2d4a] w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome to Sahara Admin Dashboard</p>
        </div>
        {/* Live Users Badge */}
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all ${isLive ? "bg-green-500/10 border-green-500/30" : "bg-white/5 border-white/10"}`}>
          <span className="relative flex h-3 w-3">
            {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? "bg-green-400" : "bg-slate-600"}`}></span>
          </span>
          <div>
            <p className={`text-2xl font-bold leading-none ${isLive ? "text-green-400" : "text-slate-500"}`}>{stats.liveUsers}</p>
            <p className="text-xs text-slate-400 mt-0.5">users online now</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`material-symbols-outlined text-3xl ${stat.color}`}>
                {stat.icon}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a href="/admin/products" className="glass-card rounded-2xl p-6 hover:border-[#f5be53]/30 transition-all group">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl text-blue-400 group-hover:text-[#f5be53] transition-colors">inventory_2</span>
            <div>
              <h3 className="font-bold text-white">Manage Products</h3>
              <p className="text-sm text-slate-400">Add, edit, or remove products</p>
            </div>
          </div>
        </a>
        <a href="/admin/inquiries" className="glass-card rounded-2xl p-6 hover:border-[#f5be53]/30 transition-all group">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl text-green-400 group-hover:text-[#f5be53] transition-colors">request_quote</span>
            <div>
              <h3 className="font-bold text-white">View Inquiries</h3>
              <p className="text-sm text-slate-400">Review and manage leads</p>
            </div>
          </div>
        </a>
        <a href="/admin/blog" className="glass-card rounded-2xl p-6 hover:border-[#f5be53]/30 transition-all group">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl text-purple-400 group-hover:text-[#f5be53] transition-colors">article</span>
            <div>
              <h3 className="font-bold text-white">Write Blog Post</h3>
              <p className="text-sm text-slate-400">Create new content</p>
            </div>
          </div>
        </a>
      </div>

      {/* Recent Inquiries */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-[#f5be53] hover:underline text-sm">
            View All
          </a>
        </div>
        {recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-sm font-medium text-slate-400 pb-4">Name</th>
                  <th className="text-left text-sm font-medium text-slate-400 pb-4">Email</th>
                  <th className="text-left text-sm font-medium text-slate-400 pb-4">Service</th>
                  <th className="text-left text-sm font-medium text-slate-400 pb-4">Status</th>
                  <th className="text-left text-sm font-medium text-slate-400 pb-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-white/5">
                    <td className="py-4 text-white">{inquiry.name}</td>
                    <td className="py-4 text-slate-400">{inquiry.email}</td>
                    <td className="py-4 text-slate-400">{inquiry.service}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        inquiry.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                        inquiry.status === "completed" ? "bg-green-500/20 text-green-400" :
                        "bg-slate-500/20 text-slate-400"
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 text-sm">{inquiry.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No inquiries yet. Inquiries will appear here when customers submit the contact form.
          </div>
        )}
      </div>
    </div>
  );
}