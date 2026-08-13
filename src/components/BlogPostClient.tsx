"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import BlogInternalLinks from "@/components/BlogInternalLinks";
import { BlogLinkConfig } from "@/lib/internalLinks";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  createdAt: string;
}

interface BlogPostClientProps {
  post: BlogPost;
  allPosts: BlogPost[];
  linkConfig?: BlogLinkConfig | null;
}

export default function BlogPostClient({ post, allPosts, linkConfig }: BlogPostClientProps) {
  const sameCategoryPosts = allPosts.filter(p => p.slug !== post.slug && p.category === post.category);
  const otherPosts = allPosts.filter(p => p.slug !== post.slug && p.category !== post.category);
  const morePosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-sm text-slate-500 mb-6 flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#f5be53] transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/blogs/" className="hover:text-[#f5be53] transition-colors">Blog</Link>
            <span className="mx-1">/</span>
            <span className="text-[#f5be53] line-clamp-1 max-w-xs">{post.title}</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142032] border border-[#f5be53]/20 text-[#f5be53] text-sm mb-4">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-[#d3c5b0] text-lg">{post.publishedAt}</p>
        </div>
      </section>

      {post.coverImage && (
        <section className="px-8 lg:px-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto rounded-2xl" />
          </div>
        </section>
      )}

      <section className="px-8 lg:px-24 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-[#d3c5b0] text-lg leading-relaxed">{post.excerpt}</p>
            {post.content && post.content.trim() !== "" && post.content !== "<p><br></p>" && post.content !== "<p>&nbsp;</p>" && post.content !== "Full content here..." ? (
              <div className="text-[#d3c5b0] leading-relaxed mt-6 blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-slate-500 mt-6 italic">No content available for this post.</p>
            )}
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-24 pb-16">
        <BlogInternalLinks currentSlug={post.slug} allPosts={allPosts} linkConfig={linkConfig} />
      </section>

      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">More Articles</h3>
          <p className="text-slate-400 text-sm mb-8">{sameCategoryPosts.length > 0 ? `More from ${post.category}` : "More from our blog"}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {morePosts.map((p) => (
              <Link key={p.id} href={`/blogs/${p.slug}`}>
                <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                  <img src={p.coverImage} alt={p.title} className="w-full h-40 object-cover rounded-xl mb-4" loading="lazy" />
                  <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#142032] border border-[#f5be53]/20 text-[#f5be53] text-xs font-medium mb-3 self-start">{p.category}</span>
                  <h4 className="text-white font-bold group-hover:text-[#f5be53] transition-colors flex-1 line-clamp-2">{p.title}</h4>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                  <p className="text-slate-500 text-xs mt-3">{p.publishedAt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blogs/" className="px-6 py-3 border border-[#f5be53]/30 text-[#f5be53] rounded-full text-sm font-medium hover:bg-[#f5be53]/10 transition-colors inline-block">View All Articles →</Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Our Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/services/printer-rental", label: "Printer Rental" },
              { href: "/services/photocopier-rental", label: "Photocopier Rental" },
              { href: "/services/amc", label: "AMC" },
              { href: "/services/repair", label: "Printer Repair" },
              { href: "/services/printer-spare-parts", label: "Toner & Parts" },
              { href: "/printer-rental-dubai", label: "Printer Rental Dubai" },
              { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi" },
              { href: "/photocopier-rental-sharjah", label: "Photocopier Sharjah" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-4 py-2 rounded-full border border-white/10 text-slate-400 text-xs hover:text-white hover:border-[#f5be53]/30 transition-all">{link.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Printer Solutions in UAE?</h2>
          <p className="text-[#d3c5b0] mb-8">Get a customized quote for <Link href="/services/printer-rental/" className="text-[#f5be53] hover:underline">printer rental</Link>, <Link href="/services/repair/" className="text-[#f5be53] hover:underline">repair</Link>, or <Link href="/services/amc/" className="text-[#f5be53] hover:underline">maintenance</Link> — within 2 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/rental-calculator/" className="px-8 py-4 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold inline-block hover:scale-105 transition-transform">Get a Free Quote</Link>
            <Link href="/contact/" className="px-8 py-4 glass-card text-white rounded-full font-bold inline-block border border-[#f5be53]/20 hover:bg-[#2a3548] transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
