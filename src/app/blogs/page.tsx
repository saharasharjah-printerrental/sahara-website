"use client";

import { useState, useEffect } from "react";
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
          title: "How to Choose the Best Printer Rental Dubai Service?",
          slug: "how-to-choose-the-best-printer-rental-dubai-service",
          excerpt: "Start your search for printer rental Dubai with a quick audit you can finish this afternoon",
          content: "Full content here...",
          category: "Guide",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp",
          publishedAt: "2/16/2026",
          createdAt: "2026-02-16"
        },
        {
          id: "2",
          title: "The Problem We Solve",
          slug: "the-problem-we-solve",
          excerpt: "In any office, the sudden breakdown of a document printer or copier creates a cascade of problems. It's more than a minor inconvenience; it's a productivity killer.",
          content: "Full content here...",
          category: "Insights",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg",
          publishedAt: "9/24/2025",
          createdAt: "2025-09-24"
        },
        {
          id: "3",
          title: "What a Copier Rental Service Must Deliver to a Client",
          slug: "what-a-copier-rental-service-must-deliver-to-a-client",
          excerpt: "A successful copier rental service is defined not just by the equipment it provides, but by the quality of the service, it delivers.",
          content: "Full content here...",
          category: "Guide",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg",
          publishedAt: "9/24/2025",
          createdAt: "2025-09-24"
        },
        {
          id: "4",
          title: "Why a Company Chooses Copier Rental Service Over Buying a Copier",
          slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
          excerpt: "A company's decision to rent a copier instead of buying one is about far more than just the initial investment.",
          content: "Full content here...",
          category: "Guide",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg",
          publishedAt: "8/23/2025",
          createdAt: "2025-08-23"
        },
        {
          id: "5",
          title: "Total Cost of Printer Ownership",
          slug: "total-cost-of-printer-ownership",
          excerpt: "While the initial purchase price of a copier may seem affordable, the true cost of owning and operating the device is often much higher than a rental agreement.",
          content: "Full content here...",
          category: "Finance",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg",
          publishedAt: "8/23/2025",
          createdAt: "2025-08-23"
        },
        {
          id: "6",
          title: "Video Walkthrough: Solving Canon Printer Problems",
          slug: "video-walkthrough-solving-canon-printer-problems",
          excerpt: "This video tutorial guides you through practical steps to troubleshoot common Canon printer issues, such as paper jams, connection errors, and ink problems.",
          content: "Full content here...",
          category: "Troubleshooting",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1754304132/blogs/mmmyp3kxrfsp1aryzule.png",
          publishedAt: "8/4/2025",
          createdAt: "2025-08-04"
        },
        {
          id: "7",
          title: "The Hidden Cost of Your Office Copier",
          slug: "the-hidden-cost-of-your-office-copier",
          excerpt: "Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs, unreliable service, and a significant burden on your team.",
          content: "Full content here...",
          category: "Finance",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758285328/blogs/mukam5nzst3o6lvhac5m.jpg",
          publishedAt: "8/4/2025",
          createdAt: "2025-08-04"
        },
        {
          id: "8",
          title: "How Dubai Companies Save Budget by Choosing Value-Driven Printer Rental",
          slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
          excerpt: "Dubai's dynamic business environment demands efficiency and cost-effectiveness. Companies are constantly seeking ways to optimize their operations.",
          content: "Full content here...",
          category: "Finance",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg",
          publishedAt: "7/16/2025",
          createdAt: "2025-07-16"
        },
        {
          id: "9",
          title: "Real Estate to Clinics: Why Every UAE Business is Renting Printers in 2025",
          slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
          excerpt: "Picture this: It's 2025, and even the most glamorous Dubai real estate offices and high-tech clinics have one thing in common—no one actually owns their printers anymore.",
          content: "Full content here...",
          category: "Trends",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg",
          publishedAt: "6/28/2025",
          createdAt: "2025-06-28"
        },
        {
          id: "10",
          title: "Rent or Buy Your Office Printer? Let's Talk Smart Choices for Your Business",
          slug: "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business",
          excerpt: "Every business owner knows that big decisions, and even the seemingly small ones, can really impact your wallet and your team.",
          content: "Full content here...",
          category: "Guide",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749630742/blogs/ue4jwdxdlp655oeoylsq.png",
          publishedAt: "6/11/2025",
          createdAt: "2025-06-11"
        },
        {
          id: "11",
          title: "Stop Wasting Money on Printing: Your Guide to Smarter Office Habits",
          slug: "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits",
          excerpt: "Does your business constantly track every penny, yet somehow printing costs just fly under the radar? You're not alone.",
          content: "Full content here...",
          category: "Tips",
          status: "published",
          coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749638040/blogs/ldevdfienoa4ibffpix0.png",
          publishedAt: "6/11/2025",
          createdAt: "2025-06-11"
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
      <link rel="canonical" href="https://www.saharaprinter.com/blogs/" />
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
                <Link href={`/blogs/${post.slug}`} key={post.id}>
                <article
                  className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500 cursor-pointer h-full"
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
                </Link>
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

      {/* Topic Clusters — Internal Linking Hub */}
      <section className="py-16 px-8 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Explore by Topic</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Printer Rental Guides",
                desc: "Everything you need to know before renting a printer in the UAE.",
                links: [
                  { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" as const },
                  { href: "/printer-rental-dubai", label: "Printer Rental Dubai", type: "location" as const },
                  { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", type: "location" as const },
                  { href: "/photocopier-rental-sharjah", label: "Photocopier Sharjah", type: "location" as const },
                ],
              },
              {
                title: "Cost & Finance",
                desc: "Understand the true cost of printing and how rental saves money.",
                links: [
                  { href: "/services/amc", label: "Annual Maintenance (AMC)", type: "service" as const },
                  { href: "/rental-calculator", label: "Rental Cost Calculator", type: "tool" as const },
                  { href: "/copier-lease-uae", label: "Copier Lease UAE", type: "location" as const },
                  { href: "/get-quote", label: "Get a Free Quote", type: "tool" as const },
                ],
              },
              {
                title: "Repair & Maintenance",
                desc: "Keep your office printers running at peak performance.",
                links: [
                  { href: "/services/repair", label: "Printer Repair Services", type: "service" as const },
                  { href: "/printer-repair-dubai", label: "Printer Repair Dubai", type: "location" as const },
                  { href: "/services/toner", label: "Toner & Spare Parts", type: "service" as const },
                  { href: "/services/printer-spare-parts", label: "Printer Spare Parts", type: "service" as const },
                ],
              },
            ].map((cluster) => (
              <div key={cluster.title} className="rounded-2xl border border-white/8 bg-[#0d1b2e] p-6">
                <h3 className="text-white font-bold mb-2">{cluster.title}</h3>
                <p className="text-slate-400 text-xs mb-5 leading-relaxed">{cluster.desc}</p>
                <ul className="space-y-2">
                  {cluster.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#f5be53] transition-colors group"
                      >
                        <svg className="w-3.5 h-3.5 text-[#f5be53]/50 group-hover:text-[#f5be53] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Pages Cross-Links */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Printer Brands We Offer</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/brands/canon", label: "Canon" },
              { href: "/brands/hp", label: "HP" },
              { href: "/brands/kyocera", label: "Kyocera" },
              { href: "/brands/ricoh", label: "Ricoh" },
              { href: "/brands/xerox", label: "Xerox" },
              { href: "/brands/brother", label: "Brother" },
              { href: "/brands/samsung", label: "Samsung" },
              { href: "/brands/lexmark", label: "Lexmark" },
            ].map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="px-5 py-2 rounded-full border border-white/10 text-slate-400 text-sm hover:text-white hover:border-[#f5be53]/30 transition-all"
              >
                {brand.label}
              </Link>
            ))}
          </div>
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