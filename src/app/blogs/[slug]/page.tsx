"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_blogs");
    if (stored) {
      const allPostsData = JSON.parse(stored);
      const publishedPosts = allPostsData.filter((p: BlogPost) => p.status === "published");
      setAllPosts(publishedPosts);
      const found = publishedPosts.find((p: BlogPost) => p.slug === slug);
      if (found) {
        setPost(found);
        return;
      }
    }
    const defaultFound = defaultPosts.find(p => p.slug === slug);
    if (defaultFound) {
      setPost(defaultFound);
    } else {
      router.push("/blogs");
    }
  }, [slug, router]);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#071325]">
        <Header />
        <div className="pt-32 text-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[#f5be53] mb-6 hover:underline">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Blogs
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142032] border border-[#f5be53]/20 text-[#f5be53] text-sm mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-[#d3c5b0] text-lg">{post.publishedAt}</p>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="px-8 lg:px-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto rounded-2xl" />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-8 lg:px-24 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-[#d3c5b0] text-lg leading-relaxed">{post.excerpt}</p>
            {post.content && 
             post.content.trim() !== "" && 
             post.content !== "<p><br></p>" && 
             post.content !== "<p>&nbsp;</p>" &&
             post.content !== "Full content here..." ? (
              <div 
                className="text-[#d3c5b0] leading-relaxed mt-6 blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            ) : (
              <p className="text-slate-500 mt-6 italic">No content available for this post.</p>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8">More Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {allPosts.filter(p => p.slug !== slug).slice(0, 3).map((p) => (
              <Link key={p.id} href={`/blogs/${p.slug}`}>
                <div className="glass-card rounded-2xl p-6 group cursor-pointer">
                  <img src={p.coverImage} alt={p.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                  <h4 className="text-white font-bold group-hover:text-[#f5be53] transition-colors">{p.title}</h4>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Printer Solutions?</h2>
          <p className="text-[#d3c5b0] mb-8">Contact our experts for personalized advice</p>
          <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold inline-block">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}