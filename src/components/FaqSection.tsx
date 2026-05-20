import { getFaqsForPage, buildFaqSchema, FaqItem } from "@/lib/faqs";

interface Props {
  pageSlug: string;
  defaultFaqs?: FaqItem[];
  pageId?: string;
}

export default async function FaqSection({ pageSlug, defaultFaqs = [], pageId }: Props) {
  const faqs = await getFaqsForPage(pageSlug, defaultFaqs);
  if (faqs.length === 0) return null;

  const schema = buildFaqSchema(faqs, pageId);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="rounded-2xl p-6 group cursor-pointer"
            style={{
              background: "linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)",
              boxShadow: "6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)",
            }}
            open={i === 0}
          >
            <summary className="flex justify-between items-center list-none font-bold text-lg text-white">
              {faq.q}
              <span className="text-[#f5be53] text-xl shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">›</span>
            </summary>
            <p className="mt-4 text-[#d3c5b0] leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
