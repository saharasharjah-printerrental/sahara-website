export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from '@cloudflare/next-on-pages';
import BlogsClient from "@/components/BlogsClient";

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
    publisher: {
      "@type": "Organization",
      name: "Sahara Office Equipments",
    },
  };

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
      <BlogsClient initialPosts={initialPosts.length > 0 ? initialPosts : undefined} />
    </>
  );
}