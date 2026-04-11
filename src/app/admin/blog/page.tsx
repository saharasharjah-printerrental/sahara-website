"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  coverImage: string;
  publishedAt: string;
  createdAt: string;
}

const samplePosts: BlogPost[] = [
  { id: "1", title: "How to Choose the Best Printer Rental Dubai Service?", slug: "how-to-choose-the-best-printer-rental-dubai-service", excerpt: "Start your search for printer rental Dubai with a quick audit you can finish this afternoon", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp", publishedAt: "2/16/2026", createdAt: "2026-02-16" },
  { id: "2", title: "The Problem We Solve", slug: "the-problem-we-solve", excerpt: "In any office, the sudden breakdown of a document printer or copier creates a cascade of problems.", content: "Full content here...", category: "Insights", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "3", title: "What a Copier Rental Service Must Deliver to a Client", slug: "what-a-copier-rental-service-must-deliver-to-a-client", excerpt: "A successful copier rental service is defined not just by the equipment it provides, but by the quality of the service.", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "4", title: "Why a Company Chooses Copier Rental Service Over Buying a Copier", slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier", excerpt: "A company's decision to rent a copier instead of buying one is about far more than just the initial investment.", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "5", title: "Total Cost of Printer Ownership", slug: "total-cost-of-printer-ownership", excerpt: "While the initial purchase price of a copier may seem affordable, the true cost is often much higher.", content: "Full content here...", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "6", title: "Video Walkthrough: Solving Canon Printer Problems", slug: "video-walkthrough-solving-canon-printer-problems", excerpt: "This video tutorial guides you through practical steps to troubleshoot common Canon printer issues.", content: "Full content here...", category: "Troubleshooting", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1754304132/blogs/mmmyp3kxrfsp1aryzule.png", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "7", title: "The Hidden Cost of Your Office Copier", slug: "the-hidden-cost-of-your-office-copier", excerpt: "Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs.", content: "Full content here...", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758285328/blogs/mukam5nzst3o6lvhac5m.jpg", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "8", title: "How Dubai Companies Save Budget by Choosing Value-Driven Printer Rental", slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental", excerpt: "Dubai's dynamic business environment demands efficiency and cost-effectiveness.", content: "Full content here...", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg", publishedAt: "7/16/2025", createdAt: "2025-07-16" },
  { id: "9", title: "Real Estate to Clinics: Why Every UAE Business is Renting Printers in 2025", slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025", excerpt: "It's 2025, and even the most glamorous offices have one thing in common—no one actually owns their printers.", content: "Full content here...", category: "Trends", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg", publishedAt: "6/28/2025", createdAt: "2025-06-28" },
  { id: "10", title: "Rent or Buy Your Office Printer? Let's Talk Smart Choices for Your Business", slug: "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business", excerpt: "Every business owner knows that big decisions can really impact your wallet and your team.", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749630742/blogs/ue4jwdxdlp655oeoylsq.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
  { id: "11", title: "Stop Wasting Money on Printing: Your Guide to Smarter Office Habits", slug: "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits", excerpt: "Does your business constantly track every penny, yet somehow printing costs just fly under the radar?", content: "Full content here...", category: "Tips", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749638040/blogs/ldevdfienoa4ibffpix0.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sahara_blogs");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPosts(parsed);
        } else {
          setPosts(samplePosts);
          localStorage.setItem("sahara_blogs", JSON.stringify(samplePosts));
        }
      } else {
        setPosts(samplePosts);
        localStorage.setItem("sahara_blogs", JSON.stringify(samplePosts));
      }
    } catch (e) {
      console.error("Error loading blog posts:", e);
      setPosts(samplePosts);
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem("sahara_blogs", JSON.stringify(newPosts));
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this blog post?")) {
      savePosts(posts.filter(p => p.id !== id));
    }
  };

  const handleStatus = (id: string, status: string) => {
    savePosts(posts.map(p => p.id === id ? { ...p, status, publishedAt: status === "published" ? new Date().toISOString().split("T")[0] : "" } : p));
  };

  const filteredPosts = posts.filter(p => {
    if (filter === "published") return p.status === "published";
    if (filter === "draft") return p.status === "draft";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
              <p className="text-slate-400 mt-1">Create and manage blog content</p>
            </div>
            <button onClick={() => router.push("/admin/blog/editor")} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              New Post
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            {["all", "published", "draft"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-[#f5be53] text-[#412d00]" : "bg-[#101c2e] text-slate-400 hover:text-white"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Title</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Category</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Date</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/5">
                      <td className="p-4">
                        <p className="font-medium text-white">{post.title}</p>
                        <p className="text-sm text-slate-400">{post.slug}</p>
                      </td>
                      <td className="p-4 text-slate-300">{post.category}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-sm">{post.publishedAt || post.createdAt}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => router.push(`/admin/blog/editor?id=${post.id}`)} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handleStatus(post.id, post.status === "published" ? "draft" : "published")} className={`p-2 rounded-lg transition-colors ${post.status === "published" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>
                            <span className="material-symbols-outlined text-sm">{post.status === "published" ? "unpublished" : "publish"}</span>
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}