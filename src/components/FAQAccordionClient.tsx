"use client";

import { useState, useEffect } from "react";
import { ExpandMore } from "@mui/icons-material";

interface FAQAccordionClientProps {
  defaultFaqs?: { q: string; a: string }[];
  pageSlug?: string;
}

export default function FAQAccordionClient({
  defaultFaqs = [],
  pageSlug,
}: FAQAccordionClientProps) {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(defaultFaqs);

  useEffect(() => {
    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      try {
        const allFaqs = JSON.parse(faqStored);
        const pageFaqs = allFaqs.filter(
          (f: any) => f.pageSlug === pageSlug && f.isActive
        );
        const sorted = pageFaqs.sort(
          (a: any, b: any) => a.sortOrder - b.sortOrder
        );
        if (sorted.length > 0) {
          setFaqs(sorted.map((f: any) => ({ q: f.question, a: f.answer })));
        }
      } catch {
        // Use default
      }
    }
  }, [pageSlug]);

  if (faqs.length === 0) return null;

  return (
    <section className="py-24 px-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="rounded-2xl p-6 group cursor-pointer"
            style={{
              background: "linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)",
              boxShadow:
                "6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)",
            }}
            open={i === 0}
          >
            <summary className="flex justify-between items-center list-none font-bold text-lg text-white">
              {faq.q}
              <ExpandMore className="text-[#f5be53] group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-4 text-[#d3c5b0] leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}