export const runtime = 'edge';

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getRequestContext } from '@cloudflare/next-on-pages';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import BlogInternalLinks from "@/components/BlogInternalLinks";

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

const fallbackPosts: BlogPost[] = [
  { id: "1", title: "How to Choose the Best Printer Rental Dubai Service?", slug: "how-to-choose-the-best-printer-rental-dubai-service", excerpt: "Start your search for printer rental Dubai with a quick audit you can finish this afternoon", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp", publishedAt: "2/16/2026", createdAt: "2026-02-16" },
  { id: "2", title: "The Problem We Solve", slug: "the-problem-we-solve", excerpt: "In any office, the sudden breakdown of a document printer or copier creates a cascade of problems.", content: "", category: "Insights", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "3", title: "What a Copier Rental Service Must Deliver to a Client", slug: "what-a-copier-rental-service-must-deliver-to-a-client", excerpt: "A successful copier rental service is defined not just by the equipment it provides, but by the quality of service it delivers.", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "4", title: "Why a Company Chooses Copier Rental Service Over Buying a Copier", slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier", excerpt: "A company's decision to rent a copier instead of buying one is about far more than just the initial investment.", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "5", title: "Total Cost of Printer Ownership", slug: "total-cost-of-printer-ownership", excerpt: "While the initial purchase price of a copier may seem affordable, the true cost of ownership is often much higher than a rental agreement.", content: "", category: "Finance", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "6", title: "Video Walkthrough: Solving Canon Printer Problems", slug: "video-walkthrough-solving-canon-printer-problems", excerpt: "This video tutorial guides you through practical steps to troubleshoot common Canon printer issues.", content: "", category: "Troubleshooting", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1754304132/blogs/mmmyp3kxrfsp1aryzule.png", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "7", title: "The Hidden Cost of Your Office Copier", slug: "the-hidden-cost-of-your-office-copier", excerpt: "Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs.", content: "", category: "Finance", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758285328/blogs/mukam5nzst3o6lvhac5m.jpg", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "8", title: "How Dubai Companies Save Budget by Choosing Value-Driven Printer Rental", slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental", excerpt: "Dubai's dynamic business environment demands efficiency and cost-effectiveness.", content: "", category: "Finance", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg", publishedAt: "7/16/2025", createdAt: "2025-07-16" },
  { id: "9", title: "Real Estate to Clinics: Why Every UAE Business is Renting Printers in 2025", slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025", excerpt: "Even the most glamorous Dubai real estate offices and high-tech clinics have one thing in common.", content: "", category: "Trends", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg", publishedAt: "6/28/2025", createdAt: "2025-06-28" },
  { id: "10", title: "Rent or Buy Your Office Printer? Let's Talk Smart Choices for Your Business", slug: "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business", excerpt: "Every business owner knows that big decisions can really impact your wallet.", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749630742/blogs/ue4jwdxdlp655oeoylsq.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
  { id: "11", title: "Stop Wasting Money on Printing: Your Guide to Smarter Office Habits", slug: "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits", excerpt: "Does your business constantly track every penny, yet somehow printing costs just fly under the radar?", content: "", category: "Tips", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749638040/blogs/ldevdfienoa4ibffpix0.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
];

function mapRow(row: any): BlogPost {
  return {
    id: String(row.id),
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    category: row.category || '',
    coverImage: row.image || '',
    publishedAt: row.publishedAt || '',
    createdAt: row.createdAt || '',
  };
}

async function fetchPost(slug: string): Promise<{ post: BlogPost; allPosts: BlogPost[] } | null> {
  try {
    const db = getRequestContext().env.DB as any;
    const row = await db.prepare('SELECT * FROM blogs WHERE slug = ? AND isActive = 1').first(slug);
    if (!row) return null;
    const allResult = await db.prepare('SELECT id, title, slug, excerpt, image, category, publishedAt, createdAt FROM blogs WHERE isActive = 1 ORDER BY publishedAt DESC').all();
    return {
      post: mapRow(row),
      allPosts: (allResult?.results ?? []).map(mapRow),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const db = getRequestContext().env.DB as any;
    const row = await db.prepare('SELECT title, excerpt, meta_title, meta_description, meta_keywords FROM blogs WHERE slug = ? AND isActive = 1').first(slug);
    if (row) {
      const title = row.meta_title || `${row.title} | Sahara`;
      const description = row.meta_description || row.excerpt;
      const keywords = row.meta_keywords || 'printer rental uae, office equipment dubai, photocopier uae';
      return {
        title, description, keywords,
        openGraph: { title, description, url: `https://www.saharaprinter.com/blogs/${slug}/`, siteName: 'Sahara Office Equipments', locale: 'en_AE', type: 'article' },
        alternates: { canonical: `https://www.saharaprinter.com/blogs/${slug}/` },
      };
    }
  } catch { /* fall through */ }
  const fallback = fallbackPosts.find(p => p.slug === slug);
  if (!fallback) return { title: "Blog | Sahara Office Equipments" };
  return {
    title: `${fallback.title} | Sahara`,
    description: fallback.excerpt,
    keywords: 'printer rental uae, office equipment dubai, photocopier uae',
    openGraph: { title: `${fallback.title} | Sahara`, description: fallback.excerpt, url: `https://www.saharaprinter.com/blogs/${slug}/`, siteName: 'Sahara Office Equipments', locale: 'en_AE', type: 'article' },
    alternates: { canonical: `https://www.saharaprinter.com/blogs/${slug}/` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  let allPosts: BlogPost[] = [];

  const dbData = await fetchPost(slug);
  if (dbData) {
    post = dbData.post;
    allPosts = dbData.allPosts;
  } else {
    const fallback = fallbackPosts.find(p => p.slug === slug);
    if (!fallback) notFound();
    post = fallback!;
    allPosts = fallbackPosts;
  }

  const sameCategoryPosts = allPosts.filter(p => p.slug !== slug && p.category === post!.category);
  const otherPosts = allPosts.filter(p => p.slug !== slug && p.category !== post!.category);
  const morePosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "datePublished": post.createdAt,
    "author": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://saharaprinter.com" },
    "publisher": { "@type": "Organization", "name": "Sahara Office Equipments", "logo": { "@type": "ImageObject", "url": "https://saharaprinter.com/images/sahara-navbar-logo.webp" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://saharaprinter.com/blogs/${slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saharaprinter.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://saharaprinter.com/blogs/" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://saharaprinter.com/blogs/${slug}/` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-sm text-slate-500 mb-6 flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#f5be53] transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/blogs/" className="hover:text-[#f5be53] transition-colors">Blog</Link>
            <span className="mx-1">/</span>
            <span className="text-[#f5be53] line-clamp-1 max-w-xs">{post.title}</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142032] border border-[#f5be53]/20 text-[#f5be53] text-sm mb-4">
            {post.category}
          </span>
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
        <BlogInternalLinks currentSlug={slug} allPosts={allPosts} />
      </section>

      {morePosts.length > 0 && (
        <section className="py-16 px-8 bg-[#101c2e]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">More Articles</h3>
            <p className="text-slate-400 text-sm mb-8">{sameCategoryPosts.length > 0 ? `More from ${post.category}` : "More from our blog"}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {morePosts.map((p) => (
                <Link key={p.id} href={`/blogs/${p.slug}/`}>
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
      )}

      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Our Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/services/printer-rental/", label: "Printer Rental" },
              { href: "/services/amc/", label: "AMC" },
              { href: "/services/repair/", label: "Printer Repair" },
              { href: "/services/toner/", label: "Toner & Parts" },
              { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
              { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi" },
              { href: "/photocopier-rental-sharjah/", label: "Photocopier Sharjah" },
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
            <Link href="/get-quote/" className="px-8 py-4 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold inline-block hover:scale-105 transition-transform">Get a Free Quote</Link>
            <Link href="/contact/" className="px-8 py-4 glass-card text-white rounded-full font-bold inline-block border border-[#f5be53]/20 hover:bg-[#2a3548] transition-colors">Contact Us</Link>
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