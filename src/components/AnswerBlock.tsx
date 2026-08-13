import type { FaqItem } from "@/lib/faqs";

interface Props {
  /** The question, rendered verbatim as a real <h2> — not an eyebrow label. */
  question: string;
  /**
   * The answer paragraph. Contract: first sentence answers directly in under
   * 15 words; whole paragraph is 40-60 words and must stand alone as an AI
   * search snippet with no dependency on surrounding page content.
   */
  answer: string;
  /** Supporting bullets rendered under the answer — facts, not marketing copy. */
  supportingPoints?: string[];
  /** Optional heading id for in-page anchors / TOC linking. */
  id?: string;
}

/**
 * AEO answer block: H2 question -> direct-answer paragraph -> supporting
 * bullets. Visually matches the original "AEO Answer Block" wrapper used on
 * paper-shredder-rental/page.tsx and printer-rental-dubai/page.tsx, but
 * promotes the eyebrow <p> to a real <h2> (crawlers and AI extraction favour
 * real heading semantics over styled text) and adds the bullet list the
 * older pattern never had.
 */
export default function AnswerBlock({ question, answer, supportingPoints, id }: Props) {
  return (
    <div
      id={id}
      className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8"
    >
      <h2 className="text-lg md:text-xl font-bold text-white mb-2">{question}</h2>
      <p className="text-[#d3c5b0] text-sm leading-relaxed">{answer}</p>
      {supportingPoints && supportingPoints.length > 0 && (
        <ul className="text-[#d3c5b0] text-sm space-y-1 mt-3 list-disc pl-5">
          {supportingPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Render a FaqItem straight through AnswerBlock without prop juggling at call sites. */
export function AnswerBlockFromFaq({ faq, id }: { faq: FaqItem; id?: string }) {
  return <AnswerBlock question={faq.q} answer={faq.a} supportingPoints={faq.supportingPoints} id={id} />;
}
