export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from '@cloudflare/next-on-pages';
import BlogsClient from "@/components/BlogsClient";
import { orgRef } from "@/lib/brand";
import { buildFaqSchema, type FaqItem } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Printer Rental Blog UAE | Office Equipment Insights | Sahara",
  description: "Expert insights on printer rental, photocopier leasing, office printing solutions, and managed print services for UAE businesses. Tips, guides, and industry trends.",
  keywords: "printer rental blog uae, office equipment insights dubai, photocopier leasing guide, printing tips uae, managed print services blog",
  openGraph: {
    title: "Printer Rental Blog UAE | Office Equipment Insights",
    description: "Expert insights on printer rental, photocopier leasing, and office printing solutions for UAE businesses.",
    url: "https://www.saharaprinter.com/blogs/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Printer Rental Blog UAE — Sahara Office Equipments",
      },
    ],
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/blogs/",
  },
};

const BLOG_FAQS: FaqItem[] = [
  {
    q: "What can I learn from the Sahara Printer blog?",
    a: "The Sahara Printer blog covers UAE printer rental, photocopier rental, paper shredder rental, AMC, repair, toner, compliance, and office equipment buying guides for Dubai, Sharjah, Abu Dhabi, and the wider UAE.",
  },
  {
    q: "Which blog guides should I read before renting or buying office equipment?",
    a: "Start with the rental cost, rent-versus-buy, AMC, copier rental, and paper shredder buying guides. These explain pricing, maintenance, service response, and when rental is better than buying.",
  },
  {
    q: "Do the articles apply to businesses outside Dubai?",
    a: "Yes. Many guides cover UAE-wide service decisions, including Dubai, Sharjah, Abu Dhabi, Ajman, free zones, and multi-branch offices that need delivery, support, or maintenance coverage.",
  },
  {
    q: "Can Sahara help me choose equipment after I read a guide?",
    a: "Yes. You can use the quote form or contact Sahara Office Equipments for help choosing a printer, photocopier, paper shredder, AMC plan, or rental package based on your monthly volume and team size.",
  },
];

async function fetchInitialPosts() {
  try {
    const db = getRequestContext().env.DB as any;
    const result = await db.prepare('SELECT id, title, slug, excerpt, image, category, publishedAt, createdAt FROM blogs WHERE isActive = 1 ORDER BY publishedAt DESC').all();
    return (result?.results ?? []).map((b: any) => ({
      id: String(b.id), title: b.title, slug: b.slug, excerpt: b.excerpt || '',
      content: '', category: b.category || '', status: 'published',
      coverImage: b.image || '', publishedAt: b.publishedAt || '', createdAt: b.createdAt || '',
    }));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const initialPosts = await fetchInitialPosts();
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sahara Office Equipments Blog",
    description: "Expert insights on printer rental, photocopier leasing, and office printing solutions for UAE businesses.",
    url: "https://www.saharaprinter.com/blogs/",
    publisher: orgRef(),
  };

  const faqSchema = buildFaqSchema(BLOG_FAQS, "https://www.saharaprinter.com/blogs/#faq");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.saharaprinter.com/blogs/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <BlogsClient initialPosts={initialPosts.length > 0 ? initialPosts : undefined} />
    </>
  );
}
