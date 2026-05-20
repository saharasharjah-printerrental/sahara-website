import { getRequestContext } from "@cloudflare/next-on-pages";

export interface FaqItem { q: string; a: string; }

export async function getFaqsForPage(pageSlug: string, defaultFaqs: FaqItem[] = []): Promise<FaqItem[]> {
  try {
    const env = (getRequestContext().env as any);
    if (!env?.DB) return defaultFaqs;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind(pageSlug).all();
    if (result?.results?.length > 0) {
      return (result.results as any[]).map((r) => ({ q: r.question, a: r.answer }));
    }
    return defaultFaqs;
  } catch {
    return defaultFaqs;
  }
}

export function buildFaqSchema(faqs: FaqItem[], pageId?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageId ? { "@id": pageId } : {}),
    mainEntity: faqs.map((f, i) => ({
      "@type": "Question",
      ...(pageId ? { "@id": `${pageId}-${i + 1}` } : {}),
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
