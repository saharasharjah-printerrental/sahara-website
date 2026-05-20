"use client";

import { useState, useEffect } from "react";

interface Faq {
  q: string;
  a: string;
}

const defaultFaqs: Faq[] = [
  { q: "What is PaperCut print management software?", a: "PaperCut is the world's leading print management software used by 100+ million users across 200 countries. It tracks, controls, and reduces print costs by enforcing print policies, enabling secure print release, and reporting on usage by user, department, or project. Sahara provides PaperCut MF and NG setup, licensing, and support for UAE offices." },
  { q: "How much does PaperCut cost for a UAE office?", a: "PaperCut NG (for SMEs) starts from approximately AED 1,800 per year for 10 users. PaperCut MF (for enterprise with MFP integration) is licensed per device. Sahara provides competitive UAE pricing with installation, configuration, and 1-year support included." },
  { q: "Which printers does PaperCut work with in UAE?", a: "PaperCut MF works natively with Canon, Kyocera, Ricoh, Xerox, HP, Brother, and Sharp MFPs — all brands Sahara dealers in UAE. Installation integrates directly into the printer's touch panel for secure print release and copy/scan tracking." },
  { q: "Can PaperCut reduce our office printing costs in Dubai?", a: "Yes. Dubai and UAE businesses that implement PaperCut typically see 20–30% reduction in print volume within 3 months — driven by duplex enforcement, colour restrictions, secure print release (reduces uncollected prints), and department quota management." },
  { q: "Does Sahara provide PaperCut training and support in UAE?", a: "Yes. Sahara's PaperCut implementation service includes on-site installation, Active Directory/LDAP integration, user training, and 12-month remote + on-site support across Dubai, Sharjah, and Abu Dhabi." },
];

export default function PaperCutFaqClient() {
  const [faqs, setFaqs] = useState<Faq[]>(defaultFaqs);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/faqs?pageSlug=papercut-print-management')
      .then(r => r.json())
      .then(data => {
        const rows = data.faqs ?? data;
        if (Array.isArray(rows) && rows.length > 0) {
          const mapped = rows
            .filter((f: any) => f.isActive === 1 || f.isActive === true)
            .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map((f: any) => ({ q: f.question, a: f.answer }));
          if (mapped.length > 0) setFaqs(mapped);
        }
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="glass-card rounded-2xl overflow-hidden border border-white/5">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-6 text-left"
            aria-expanded={open === i}
          >
            <h3 className="text-white font-semibold text-sm leading-snug">{faq.q}</h3>
            <span className={`shrink-0 w-6 h-6 rounded-full border border-[#f5be53]/30 flex items-center justify-center text-[#f5be53] transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
              +
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-6">
              <p className="text-[#d3c5b0] text-sm leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
