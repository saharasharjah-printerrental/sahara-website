"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much does paper shredder rental cost in Dubai?",
    a: "Paper shredder rental in Dubai starts from AED 150/month for cross-cut models. Micro-cut and high-capacity shredders for larger offices start from AED 300/month. All rentals include free delivery, setup, and maintenance."
  },
  {
    q: "Can I rent a paper shredder for a single day or event in UAE?",
    a: "Yes. Sahara Office Equipments offers short-term paper shredder rental from 1 day to 3 months in Dubai, Sharjah, and Abu Dhabi — ideal for office clear-outs, events, and compliance audits."
  },
  {
    q: "What types of shredders are available for rent in UAE?",
    a: "We offer cross-cut shredders (DIN P-4 level for general office use), micro-cut shredders (DIN P-5 for confidential documents), and industrial strip-cut shredders for bulk destruction. All are compliant with UAE data protection and GDPR standards."
  },
  {
    q: "Is paper shredder rental better than buying in UAE?",
    a: "For occasional or seasonal use, rental is significantly cheaper than buying. A good office shredder costs AED 800–3,000 to buy. Renting at AED 150/month gives you the same quality with maintenance included and no capital expenditure."
  },
  {
    q: "Do you deliver paper shredders to JAFZA, SAIF Zone, and free zones?",
    a: "Yes. We deliver paper shredders to all UAE free zones including JAFZA (Dubai), SAIF Zone (Sharjah), DAFZA, DIFC, and Abu Dhabi free zones. Same-day delivery available for Dubai and Sharjah."
  },
  {
    q: "Are your shredders compliant with UAE data protection laws?",
    a: "Yes. All shredders we supply meet the UAE Personal Data Protection Law (PDPL Federal Decree-Law No. 45 of 2021) requirements for secure document destruction. Cross-cut models meet DIN P-4 and micro-cut models meet DIN P-5 — the recommended standard for confidential documents."
  },
];

export default function ShredderFaqClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((f, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: 'linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)',
            boxShadow: '6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)',
          }}
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div className="flex justify-between items-center p-6">
            <h3 className="font-bold text-base text-white pr-4">{f.q}</h3>
            <span className="text-[#f5be53] shrink-0 text-xl">{open === i ? "−" : "+"}</span>
          </div>
          {open === i && (
            <div className="px-6 pb-6">
              <p className="text-[#d3c5b0] leading-relaxed text-sm">{f.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
