"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("sahara_blogs");
    if (stored) {
      const allPosts = JSON.parse(stored);
      const publishedPosts = allPosts.filter((p: BlogPost) => p.status === "published");
      setPosts(publishedPosts);
    } else {
      setPosts([
        {
          id: "1",
          title: "Top 5 Printer Brands for UAE Businesses in 2026",
          slug: "top-5-printer-brands-2026",
          excerpt: "Discover the best printer brands trusted by UAE businesses for reliability, performance, and cost-efficiency.",
          content: "Full content here...",
          category: "Buying Guide",
          status: "published",
          coverImage: "",
          publishedAt: "2026-03-15",
          createdAt: "2026-03-10"
        },
        {
          id: "2",
          title: "Printer Rental vs Buying: What's Best for Your Office?",
          slug: "printer-rental-vs-buying",
          excerpt: "Compare the costs and benefits of renting vs buying printers to make the right financial decision.",
          content: "Full content here...",
          category: "Guide",
          status: "published",
          coverImage: "",
          publishedAt: "2026-03-20",
          createdAt: "2026-03-18"
        },
        {
          id: "3",
          title: "How to Choose the Right Printer for Your Office",
          slug: "choose-right-printer-office",
          excerpt: "A comprehensive guide to selecting the perfect printer based on your business needs and volume.",
          content: "Full content here...",
          category: "Tips",
          status: "published",
          coverImage: "",
          publishedAt: "2026-04-01",
          createdAt: "2026-03-25"
        },
        {
          id: "4",
          title: "Managed Print Services: Save Big on Printing Costs",
          slug: "managed-print-services",
          excerpt: "Learn how managed print services can reduce your printing costs by up to 30%.",
          content: "Full content here...",
          category: "Guide",
          status: "published",
          coverImage: "",
          publishedAt: "2026-04-05",
          createdAt: "2026-04-01"
        },
      ]);
    }
  }, []);

  const categories = Array.from(new Set(posts.map(p => p.category)));

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#f5be53]/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#f5be53] font-medium">Latest Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Sahara <span className="text-[#f5be53]">Blog</span>
          </h1>
          <p className="text-lg text-[#d3c5b0] max-w-2xl mx-auto leading-relaxed">
            Expert insights on printer rental, office solutions, and managed print services for UAE businesses.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#f5be53] text-[#412d00]"
                    : "bg-[#142032] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                All Posts
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-[#f5be53] text-[#412d00]"
                      : "bg-[#142032] text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#142032] border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-[#f5be53] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500 cursor-pointer"
                >
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142032] border border-[#f5be53]/20 mb-4">
                    <span className="text-xs font-medium text-[#f5be53]">{post.category}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#f5be53] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#d3c5b0] text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-slate-500">{post.publishedAt}</span>
                    <span className="text-sm font-medium text-[#f5be53] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">article</span>
              <h3 className="text-2xl font-bold text-white mb-2">No posts found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto glass-card rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f5be53]/5 -z-10"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need Printer Solutions?</h2>
          <p className="text-[#d3c5b0] mb-10 max-w-2xl mx-auto text-lg">Contact our experts for personalized advice on printer rental, sales, and maintenance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/get-quote" className="px-12 py-5 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-[#f5be53]/30 inline-block">
              Get a Quote
            </a>
            <a href="/contact" className="px-12 py-5 glass-card text-white rounded-full font-bold text-lg hover:bg-[#2a3548] transition-all border border-[#f5be53]/20 inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}