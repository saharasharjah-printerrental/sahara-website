"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import BlogInternalLinks from "@/components/BlogInternalLinks";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
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

const serviceLinks = [
  { href: "/services/printer-rental/", label: "Printer Rental" },
  { href: "/photocopier-rental-dubai/", label: "Photocopier Rental" },
  { href: "/services/amc/", label: "AMC" },
  { href: "/services/repair/", label: "Printer Repair" },
  { href: "/services/printer-spare-parts/", label: "Toner & Parts" },
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
  { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi" },
  { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah" },
  { href: "/photocopier-rental-sharjah/", label: "Photocopier Sharjah" },
];

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeBlogContent(html: string): string {
  if (!html) return "";

  let normalized = html
    .replace(/```yaml[\s\S]*?```/gi, "")
    .replace(/^---[\s\S]*?---/i, "")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((\/[^)\s]+)\)/g, '<a href="$2">$1</a>');

  normalized = normalized.replace(/((?:<div>\s*\|[\s\S]*?\|\s*<\/div>\s*){2,})/g, (tableBlock) => {
    const rows = [...tableBlock.matchAll(/<div>\s*\|([\s\S]*?)\|\s*<\/div>/g)]
      .map((match) => match[1].split("|").map((cell) => cell.trim()))
      .filter((cells) => cells.some(Boolean))
      .filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)));

    if (rows.length < 2) return tableBlock;

    const [head, ...body] = rows;
    return [
      '<div class="my-6 overflow-x-auto"><table class="w-full border-collapse text-sm">',
      `<thead><tr>${head.map((cell) => `<th class="border border-white/10 bg-white/5 px-3 py-2 text-left font-semibold text-white">${cell}</th>`).join("")}</tr></thead>`,
      `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td class="border border-white/10 px-3 py-2 text-on-surface-variant">${cell}</td>`).join("")}</tr>`).join("")}</tbody>`,
      "</table></div>",
    ].join("");
  });

  const headingPattern = [
    "AEO Answer Block",
    "Introduction",
    "FAQ",
    "Related Resources",
    "The Most Common Causes of Shredder Jams",
    "How to Clear a Jam Safely",
    "The Biggest Shredding Mistakes to Avoid",
    "If You're Renting: What's Covered",
    "Step 1: Match Sheet Capacity to Team Size",
    "Step 2: Choose the Security Level",
    "Step 3: Check Bin Capacity and Duty Cycle",
    "Step 4: Compare Buy vs Rent",
    "Dubai Pricing Snapshot (2026)",
    "Buy or Rent First? A Quick Test",
    "When Buying Makes Sense",
    "When Renting Makes Sense",
  ].map((heading) => heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  normalized = normalized.replace(
    new RegExp(`<div>\\s*(${headingPattern.join("|")})\\s*<\\/div>`, "g"),
    "<h2>$1</h2>"
  );

  normalized = normalized.replace(/<div>\s*[-â€“]\s+(.+?)<\/div>/g, "<li>$1</li>");

  return normalized;
}

function extractFaqs(content: string): { q: string; a: string }[] {
  if (!content) return [];

  const sectionMatch = /(?:<h2[^>]*>\s*FAQ\s*<\/h2>|<div>\s*FAQ\s*<\/div>|##\s*FAQ)([\s\S]*?)(?:<h2[^>]*>|<div>\s*Related Resources\s*<\/div>|##\s*Related Resources|$)/i.exec(content);
  if (!sectionMatch) return [];

  const section = sectionMatch[1];
  const faqs: { q: string; a: string }[] = [];
  const paragraphPattern = /<(?:p|div)[^>]*>\s*(?:<strong>)?\s*(?:Q:\s*)?([\s\S]*?)(?:<\/strong>)?\s*(?:<\/(?:p|div)>|<br\s*\/?>)\s*<(?:p|div)[^>]*>\s*A:\s*([\s\S]*?)<\/(?:p|div)>/gi;
  let match: RegExpExecArray | null;

  while ((match = paragraphPattern.exec(section)) !== null) {
    const q = stripHtml(match[1]).replace(/\*\*/g, "");
    const a = stripHtml(match[2]).replace(/\*\*/g, "");
    if (q && a) faqs.push({ q, a });
  }

  if (faqs.length === 0) {
    const text = stripHtml(section);
    const textPattern = /Q:\s*([^?]+\?)\s*A:\s*([\s\S]*?)(?=Q:\s*[^?]+\?\s*A:|$)/gi;
    while ((match = textPattern.exec(text)) !== null) {
      const q = match[1].trim();
      const a = match[2].trim();
      if (q && a) faqs.push({ q, a });
    }
  }

  return faqs;
}

export default function BlogPostClient({ post, allPosts, linkConfig }: BlogPostClientProps) {
  const sameCategoryPosts = allPosts.filter(p => p.slug !== post.slug && p.category === post.category);
  const otherPosts = allPosts.filter(p => p.slug !== post.slug && p.category !== post.category);
  const morePosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);
  const trail = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blogs/" }, { label: post.title }];
  const normalizedContent = normalizeBlogContent(post.content);
  const visibleFaqs = extractFaqs(normalizedContent);

  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="relative overflow-hidden px-6 pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface-low" />
        <div className="relative mx-auto max-w-content">
          <Breadcrumbs trail={trail} />
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-surface-mid px-3 py-1 text-sm text-primary">{post.category}</span>
            <h1 className="mb-4 font-sora text-display font-bold text-white">{post.title}</h1>
            <p className="text-body text-muted">{post.publishedAt}</p>
          </Reveal>
        </div>
      </section>

      {post.coverImage && (
        <section className="px-6 pb-16">
          <Reveal className="mx-auto max-w-5xl">
            <img src={post.coverImage} alt={post.title} className="h-auto w-full rounded-panel" />
          </Reveal>
        </section>
      )}

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-invert max-w-none">
            <p className="text-body leading-relaxed text-on-surface-variant">{post.excerpt}</p>
            {normalizedContent && normalizedContent.trim() !== "" && normalizedContent !== "<p><br></p>" && normalizedContent !== "<p>&nbsp;</p>" && normalizedContent !== "Full content here..." ? (
              <div className="blog-content mt-6 leading-relaxed text-on-surface-variant" dangerouslySetInnerHTML={{ __html: normalizedContent }} />
            ) : (
              <p className="mt-6 italic text-slate-500">No content available for this post.</p>
            )}
          </div>
        </div>
      </section>

      {visibleFaqs.length > 0 && (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl rounded-panel border border-primary/15 bg-surface-mid p-6">
            <h2 className="mb-5 font-sora text-2xl font-bold text-white">FAQ</h2>
            <div className="space-y-5">
              {visibleFaqs.map((faq, index) => (
                <div key={`${faq.q}-${index}`}>
                  <h3 className="font-semibold text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-16">
        <BlogInternalLinks currentSlug={post.slug} allPosts={allPosts} linkConfig={linkConfig} />
      </section>

      <Section title="More Articles" subtitle={sameCategoryPosts.length > 0 ? `More from ${post.category}` : "More from our blog"} tone="raised" flush>
        <div className="grid gap-6 md:grid-cols-3">
          {morePosts.map((p) => (
            <Reveal key={p.id} className="h-full">
              <Link href={`/blogs/${p.slug}/`} className="block h-full">
                <div className="glass-card group flex h-full cursor-pointer flex-col rounded-card p-6 transition-transform duration-300 hover:-translate-y-1">
                  {p.coverImage && (
                    <img src={p.coverImage} alt={p.title} className="mb-4 h-40 w-full rounded-xl object-cover" loading="lazy" />
                  )}
                  <span className="mb-3 inline-flex self-start rounded-pill border border-primary/20 bg-surface-mid px-2.5 py-0.5 text-xs font-medium text-primary">{p.category}</span>
                  <h4 className="flex-1 line-clamp-2 font-bold text-white transition-colors group-hover:text-primary">{p.title}</h4>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
                  <p className="mt-3 text-xs text-slate-500">{p.publishedAt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blogs/" className="inline-block rounded-pill border border-primary/30 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10">View All Articles →</Link>
        </div>
      </Section>

      <Section flush>
        <p className="mb-6 text-center text-caption font-bold uppercase tracking-widest text-muted">Our Services</p>
        <div className="flex flex-wrap justify-center gap-3">
          {serviceLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-pill border border-white/10 px-4 py-2 text-xs text-muted transition-all hover:border-primary/30 hover:text-white">{link.label}</Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Need Printer Solutions in UAE?"
        body={
          <>
            Get a customized quote for <Link href="/services/printer-rental/" className="text-on-primary underline">printer rental</Link>,{" "}
            <Link href="/services/repair/" className="text-on-primary underline">repair</Link>, or{" "}
            <Link href="/services/amc/" className="text-on-primary underline">maintenance</Link> — within 2 hours.
          </>
        }
        primary={{ label: "Get a Free Quote", href: "/rental-calculator/" }}
        secondary={{ label: "Contact Us", href: "/contact/" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
