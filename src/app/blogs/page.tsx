export const runtime = 'edge';
import type { Metadata } from "next";
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
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/blogs/",
  },
};

export default function BlogPage() {
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <BlogsClient />
    </>
  );
}