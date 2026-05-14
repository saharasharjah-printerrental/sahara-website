export const runtime = 'edge';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRequestContext } from '@cloudflare/next-on-pages';
import BlogPostClient from "@/components/BlogPostClient";
import type { BlogLinkConfig } from "@/lib/internalLinks";

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

// Metadata-only fallbacks — no blog HTML content so BLOG_CONTENT is not bundled into the Worker
const fallbackPosts: BlogPost[] = [
  { id: "1", title: "How to Choose the Best Printer Rental Dubai Service?", slug: "how-to-choose-the-best-printer-rental-dubai-service", excerpt: "Start your search for printer rental Dubai with a quick audit you can finish this afternoon", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp", publishedAt: "2/16/2026", createdAt: "2026-02-16" },
  { id: "2", title: "The Problem We Solve", slug: "the-problem-we-solve", excerpt: "In any office, the sudden breakdown of a document printer or copier creates a cascade of problems.", content: "", category: "Insights", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "3", title: "What a Copier Rental Service Must Deliver to a Client", slug: "what-a-copier-rental-service-must-deliver-to-a-client", excerpt: "A successful copier rental service is defined not just by the equipment it provides, but by the quality of service it delivers.", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "4", title: "Why a Company Chooses Copier Rental Service Over Buying a Copier", slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier", excerpt: "A company's decision to rent a copier instead of buying one is about far more than just the initial investment.", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "5", title: "Total Cost of Printer Ownership", slug: "total-cost-of-printer-ownership", excerpt: "While the initial purchase price of a copier may seem affordable, the true cost of ownership is often much higher than a rental agreement.", content: "", category: "Finance", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "6", title: "Video Walkthrough: Solving Canon Printer Problems", slug: "video-walkthrough-solving-canon-printer-problems", excerpt: "This video tutorial guides you through practical steps to troubleshoot common Canon printer issues such as paper jams, connection errors, and ink problems.", content: "", category: "Troubleshooting", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1754304132/blogs/mmmyp3kxrfsp1aryzule.png", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "7", title: "The Hidden Cost of Your Office Copier", slug: "the-hidden-cost-of-your-office-copier", excerpt: "Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs.", content: "", category: "Finance", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758285328/blogs/mukam5nzst3o6lvhac5m.jpg", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "8", title: "How Dubai Companies Save Budget by Choosing Value-Driven Printer Rental", slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental", excerpt: "Dubai's dynamic business environment demands efficiency and cost-effectiveness.", content: "", category: "Finance", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg", publishedAt: "7/16/2025", createdAt: "2025-07-16" },
  { id: "9", title: "Real Estate to Clinics: Why Every UAE Business is Renting Printers in 2025", slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025", excerpt: "Even the most glamorous Dubai real estate offices and high-tech clinics have one thing in common—no one actually owns their printers anymore.", content: "", category: "Trends", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg", publishedAt: "6/28/2025", createdAt: "2025-06-28" },
  { id: "10", title: "Rent or Buy Your Office Printer? Let's Talk Smart Choices for Your Business", slug: "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business", excerpt: "Every business owner knows that big decisions, and even the seemingly small ones, can really impact your wallet.", content: "", category: "Guide", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749630742/blogs/ue4jwdxdlp655oeoylsq.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
  { id: "11", title: "Stop Wasting Money on Printing: Your Guide to Smarter Office Habits", slug: "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits", excerpt: "Does your business constantly track every penny, yet somehow printing costs just fly under the radar?", content: "", category: "Tips", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749638040/blogs/ldevdfienoa4ibffpix0.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
];

function mapDbPost(row: any): BlogPost {
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

async function fetchPost(slug: string): Promise<{ post: any; allPosts: BlogPost[]; linkConfig: BlogLinkConfig | null } | null> {
  try {
    const db = getRequestContext().env.DB as any;
    const row = await db.prepare('SELECT * FROM blogs WHERE slug = ? AND isActive = 1').first(slug);
    if (!row) return null;
    const allResult = await db.prepare('SELECT id, title, slug, excerpt, image, category, publishedAt, createdAt FROM blogs WHERE isActive = 1 ORDER BY publishedAt DESC').all();
    const allPosts: BlogPost[] = (allResult?.results ?? []).map(mapDbPost);
    let linkConfig: BlogLinkConfig | null = null;
    if (row.internal_links) {
      try { linkConfig = JSON.parse(row.internal_links); } catch {}
    }
    return { post: row, allPosts, linkConfig };
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
  } catch {}

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
  let linkConfig: BlogLinkConfig | null = null;

  const dbData = await fetchPost(slug);
  if (dbData) {
    post = mapDbPost(dbData.post);
    allPosts = dbData.allPosts;
    linkConfig = dbData.linkConfig;
  } else {
    const fallback = fallbackPosts.find(p => p.slug === slug);
    if (!fallback) notFound();
    post = fallback;
    allPosts = fallbackPosts;
  }

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogPostClient post={post} allPosts={allPosts} linkConfig={linkConfig} />
    </>
  );
}
