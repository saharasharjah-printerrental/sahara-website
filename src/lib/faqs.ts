import { getRequestContext } from "@cloudflare/next-on-pages";

export interface FaqItem {
  q: string;
  a: string;
  /** AEO supporting bullets rendered under the answer paragraph (migration 017). */
  supportingPoints?: string[];
}

function parseSupportingPoints(raw: unknown): string[] | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((p) => typeof p === "string") : undefined;
  } catch {
    return undefined;
  }
}

export async function getFaqsForPage(pageSlug: string, defaultFaqs: FaqItem[] = []): Promise<FaqItem[]> {
  try {
    const env = (getRequestContext().env as any);
    if (!env?.DB) return defaultFaqs;
    const result = await env.DB.prepare(
      "SELECT question, answer, supportingPoints FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind(pageSlug).all();
    if (result?.results?.length > 0) {
      return (result.results as any[]).map((r) => ({
        q: r.question,
        a: r.answer,
        supportingPoints: parseSupportingPoints(r.supportingPoints),
      }));
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

/**
 * Same shape as buildFaqSchema but named for the AEO Q&A rollout (AnswerBlock
 * component) so call sites read as "this page is answer-engine content," not
 * just an accordion. Schema.org has no distinct QAPage-for-declarative-answer
 * type beyond FAQPage/QAPage; FAQPage is the correct, broadly-supported
 * choice for a list of question+answer pairs that aren't user-submitted Q&A.
 */
export function buildQAPageSchema(faqs: FaqItem[], pageId?: string) {
  return buildFaqSchema(faqs, pageId);
}
