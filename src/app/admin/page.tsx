"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Stats {
  totalProducts: number;
  totalInquiries: number;
  pendingInquiries: number;
  publishedBlogs: number;
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
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedInquiries = localStorage.getItem("sahara_inquiries");
    if (storedInquiries) {
      const inquiries = JSON.parse(storedInquiries);
      setStats((prev) => ({
        ...prev,
        totalInquiries: inquiries.length,
        pendingInquiries: inquiries.filter((i: any) => i.status === "pending").length,
      }));
      setRecentInquiries(inquiries.slice(0, 5));
    }

    const storedProducts = localStorage.getItem("sahara_products");
    if (storedProducts) {
      setStats((prev) => ({ ...prev, totalProducts: JSON.parse(storedProducts).length }));
    }

    const storedBlogs = localStorage.getItem("sahara_blogs");
    if (storedBlogs) {
      const blogs = JSON.parse(storedBlogs);
      setStats((prev) => ({
        ...prev,
        publishedBlogs: blogs.filter((b: any) => b.status === "published").length,
      }));
    }

    setLoading(false);
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.totalProducts, icon: "inventory_2", color: "text-blue-400" },
    { label: "Total Inquiries", value: stats.totalInquiries, icon: "request_quote", color: "text-green-400" },
    { label: "Pending Inquiries", value: stats.pendingInquiries, icon: "pending", color: "text-yellow-400" },
    { label: "Published Blogs", value: stats.publishedBlogs, icon: "article", color: "text-purple-400" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071325] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#f5be53] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071325]">
      <Header />
      <main className="pt-24 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome to Sahara Admin Dashboard</p>
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
      </main>
    </div>
  );
}