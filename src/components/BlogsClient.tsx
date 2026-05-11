"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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

const defaultPosts: BlogPost[] = [
  { id: "1", title: "How to Choose the Best Printer Rental Dubai Service?", slug: "how-to-choose-the-best-printer-rental-dubai-service", excerpt: "Start your search for printer rental Dubai with a quick audit", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp", publishedAt: "2/16/2026", createdAt: "2026-02-16" },
  { id: "2", title: "The Problem We Solve", slug: "the-problem-we-solve", excerpt: "In any office, the sudden breakdown of a document printer creates cascade of problems.", content: "Full content here...", category: "Insights", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "3", title: "What a Copier Rental Service Must Deliver to a Client", slug: "what-a-copier-rental-service-must-deliver-to-a-client", excerpt: "A successful copier rental service is defined by the quality of service it delivers.", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "4", title: "Why a Company Chooses Copier Rental Over Buying", slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier", excerpt: "A company's decision to rent a copier is about far more than just the initial investment.", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "5", title: "Total Cost of Printer Ownership", slug: "total-cost-of-printer-ownership", excerpt: "The true cost of owning a copier is often much higher than a rental agreement.", content: "Full content here...", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "6", title: "Video Walkthrough: Solving Canon Printer Problems", slug: "video-walkthrough-solving-canon-printer-problems", excerpt: "Troubleshoot common Canon printer issues like paper jams and connection errors.", content: "Full content here...", category: "Troubleshooting", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1754304132/blogs/mmmyp3kxrfsp1aryzule.png", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "7", title: "The Hidden Cost of Your Office Copier", slug: "the-hidden-cost-of-your-office-copier", excerpt: "Our competitors may offer a cheaper price, but with hidden costs.", content: "Full content here...", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758285328/blogs/mukam5nzst3o6lvhac5m.jpg", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "8", title: "How Dubai Companies Save Budget with Printer Rental", slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental", excerpt: "Dubai companies optimizing operations by choosing value-driven printer rental.", content: "Full content here...", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg", publishedAt: "7/16/2025", createdAt: "2025-07-16" },
  { id: "9", title: "Why Every UAE Business is Renting Printers in 2025", slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025", excerpt: "Even glamorous Dubai offices have one thing in common—no one owns their printers.", content: "Full content here...", category: "Trends", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg", publishedAt: "6/28/2025", createdAt: "2025-06-28" },
  { id: "10", title: "Rent or Buy Your Office Printer? Smart Choices", slug: "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business", excerpt: "How to decide between rental and purchase for your business.", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749630742/blogs/ue4jwdxdlp655oeoylsq.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
  { id: "11", title: "Stop Wasting Money on Printing", slug: "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits", excerpt: "Learn how to reduce printing waste and save money.", content: "Full content here...", category: "Tips", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749638040/blogs/ldevdfienoa4ibffpix0.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
];

export default function BlogsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/blogs/");
        const data = await res.json();
        if (data.blogs && data.blogs.length > 0) {
          const mapped = data.blogs.map((b: any) => ({
            id: b.id,
            title: b.title,
            slug: b.slug,
            excerpt: b.excerpt,
            content: b.content,
            category: b.category,
            status: "published",
            coverImage: b.image,
            publishedAt: b.publishedAt,
            createdAt: b.createdAt,
          }));
          setPosts(mapped);
          localStorage.setItem("sahara_blogs_public", JSON.stringify(mapped));
          setLoading(false);
          return;
        }
      } catch {}
      const stored = localStorage.getItem("sahara_blogs_public") || localStorage.getItem("sahara_blogs");
      if (stored) {
        const allPosts = JSON.parse(stored);
        setPosts(allPosts.filter((p: BlogPost) => p.status === "published"));
      } else {
        setPosts(defaultPosts);
      }
      setLoading(false);
    })();
  }, []);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/blogs?${params.toString()}`);
  };

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#f5be53]/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#f5be53] font-medium">Latest Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Sahara <span className="text-[#f5be53]">Blog</span></h1>
          <p className="text-lg text-[#d3c5b0] max-w-2xl mx-auto leading-relaxed">Expert insights on printer rental, office solutions, and managed print services for UAE businesses.</p>
        </div>
      </section>

      <section className="py-12 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <button onClick={() => updateParams("category", "all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "all" ? "bg-[#f5be53] text-[#412d00]" : "bg-[#142032] text-slate-400 hover:text-white border border-white/10"}`}>All Posts</button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => updateParams("category", cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? "bg-[#f5be53] text-[#412d00]" : "bg-[#142032] text-slate-400 hover:text-white border border-white/10"}`}>{cat}</button>
              ))}
            </div>
            <div className="relative w-full lg:w-80">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => updateParams("search", e.target.value)} className="w-full bg-[#142032] border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-[#f5be53] focus:outline-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="glass-card rounded-[32px] p-8 animate-pulse">
                  <div className="h-48 bg-[#142032] rounded-2xl mb-4" />
                  <div className="h-6 bg-[#142032] rounded mb-2" />
                  <div className="h-4 bg-[#142032] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link href={`/blogs/${post.slug}`} key={post.id}>
                  <article className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500 cursor-pointer h-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142032] border border-[#f5be53]/20 mb-4">
                      <span className="text-xs font-medium text-[#f5be53]">{post.category}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#f5be53] transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-[#d3c5b0] text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm">{post.publishedAt}</span>
                      <span className="text-[#f5be53] text-sm font-medium group-hover:translate-x-1 transition-transform">Read More →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-[#d3c5b0] mb-4">article</span>
              <h3 className="text-2xl font-bold text-white mb-2">No Articles Found</h3>
              <p className="text-[#d3c5b0]">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}