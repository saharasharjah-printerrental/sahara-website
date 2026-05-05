"use client";

import Link from "next/link";
import { BLOG_LINK_MAP, LINK_TYPE_COLORS, LINK_TYPE_LABELS } from "@/lib/internalLinks";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string;
}

interface BlogInternalLinksProps {
  currentSlug: string;
  allPosts: BlogPost[];
}

export default function BlogInternalLinks({ currentSlug, allPosts }: BlogInternalLinksProps) {
  const config = BLOG_LINK_MAP[currentSlug];
  if (!config) return null;

  const relatedPosts = config.relatedSlugs
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean) as BlogPost[];

  if (relatedPosts.length === 0 && config.relatedLinks.length === 0) return null;

  return (
    <>
      {/* Contextual Internal Links Panel */}
      <aside className="max-w-3xl mx-auto mb-10 rounded-2xl border border-[#f5be53]/15 bg-[#0a1628] p-6">
        <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5be53] animate-pulse inline-block" />
          Explore Related Resources
        </p>

        {/* Primary service CTA */}
        <Link
          href={config.primaryService.href}
          className="flex items-center justify-between w-full rounded-xl bg-[#f5be53]/10 border border-[#f5be53]/25 px-5 py-3 mb-4 hover:bg-[#f5be53]/20 transition-colors group"
        >
          <span className="text-white font-semibold text-sm group-hover:text-[#f5be53] transition-colors">
            {config.primaryService.label}
          </span>
          <span className="text-[#f5be53] text-xs font-bold flex items-center gap-1">
            Learn More
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        {/* Related links grid */}
        <div className="flex flex-wrap gap-2">
          {config.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all hover:scale-105 ${LINK_TYPE_COLORS[link.type]}`}
            >
              <span className="text-[10px] opacity-60">{LINK_TYPE_LABELS[link.type]}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </aside>

      {/* Topically Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-8 bg-[#0a1628]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Continue Reading</h3>
            <p className="text-slate-400 text-sm mb-8">Articles related to this topic</p>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((p) => (
                <Link key={p.id} href={`/blogs/${p.slug}`}>
                  <div className="rounded-2xl border border-white/8 bg-[#0d1b2e] p-5 group cursor-pointer hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                    {p.coverImage && (
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-full h-36 object-cover rounded-xl mb-4"
                        loading="lazy"
                      />
                    )}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#142032] border border-[#f5be53]/20 text-[#f5be53] text-xs font-medium mb-3 self-start">
                      {p.category}
                    </span>
                    <h4 className="text-white font-bold text-sm leading-snug group-hover:text-[#f5be53] transition-colors flex-1">
                      {p.title}
                    </h4>
                    <p className="text-slate-500 text-xs mt-2">{p.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

