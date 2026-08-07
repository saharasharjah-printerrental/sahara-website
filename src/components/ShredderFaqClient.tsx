"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much does paper shredder rental cost in Dubai?",
    a: "Paper shredder rental in Dubai starts from AED 150 for the Fellowes Powershred LX65 cross-cut model. Higher-capacity departmental shredders like the Fellowes 325Ci start from AED 400. Rental terms are customised to your document volume and contract length — request a quote for exact pricing. All rentals include free delivery, setup, and maintenance."
  },
  {
    q: "Can I rent a paper shredder for a single day or event in UAE?",
    a: "Yes. Sahara Office Equipments offers short-term paper shredder rental in Dubai, Sharjah, and Abu Dhabi with flexible, customised contract lengths — ideal for office clear-outs, events, and compliance audits. Tell us your dates and we'll confirm availability."
  },
  {
    q: "What types of shredders are available for rent in UAE?",
    a: "We supply Fellowes Powershred cross-cut shredders (DIN P-4 security level) in both personal/light-office and departmental capacities, plus heavy-duty industrial models for bulk destruction on request. All are compliant with UAE data protection and GDPR standards."
  },
  {
    q: "Is paper shredder rental better than buying in UAE?",
    a: "For occasional or seasonal use, rental is significantly cheaper than buying. A good office shredder costs AED 800–3,000 to buy. Renting from AED 150 gives you the same quality with maintenance included and no capital expenditure. For daily, high-volume shredding, buying can be the better long-term option."
  },
  {
    q: "Do you deliver paper shredders to JAFZA, SAIF Zone, and free zones?",
    a: "Yes. We deliver paper shredders to all UAE free zones including JAFZA (Dubai), SAIF Zone (Sharjah), DAFZA, DIFC, and Abu Dhabi free zones. Same-day delivery available for Dubai and Sharjah."
  },
  {
    q: "Are your shredders compliant with UAE data protection laws?",
    a: "Yes. All shredders we supply meet the UAE Personal Data Protection Law (PDPL Federal Decree-Law No. 45 of 2021) requirements for secure document destruction. Our Fellowes cross-cut models meet DIN P-4 — the recommended standard for confidential documents — with higher security levels available on request."
  },
  {
    q: "Where can I get a paper shredder machine in Dubai?",
    a: "Sahara Office Equipments supplies and delivers paper shredder machines throughout Dubai — for rent from AED 150 or as a one-off purchase. Free delivery and on-site setup are included across all Dubai districts, with same-day availability in most areas."
  },
  {
    q: "Can I buy a paper shredder instead of renting one?",
    a: "Yes — Sahara sells paper shredders outright as well as renting them. For offices that shred only occasionally, renting from AED 150 (with maintenance and repairs included) usually works out cheaper than buying outright at AED 800–3,000+. For daily, high-volume shredding, buying can make sense — ask us for a side-by-side quote and we'll recommend whichever is cheaper for your actual usage."
  },
  {
    q: "What's the difference between the paper shredders Sahara offers in the UAE?",
    a: "Sahara's UAE shredder range covers the Fellowes Powershred LX65 (10 sheets/pass, personal or light-office use) and the Fellowes Powershred 325Ci (24 sheets/pass, departmental/commercial use), both DIN P-4 cross-cut, plus heavy-duty models for high-volume clear-outs on request. All are available to rent or buy, with free delivery across Dubai, Sharjah, and Abu Dhabi."
  },
  {
    q: "Does Sahara supply paper shredders across Dubai and the wider UAE?",
    a: "Yes. Sahara delivers and services paper shredders across Dubai, Sharjah, Abu Dhabi, Ajman, and Ras Al Khaimah, including free zones like JAFZA, SAIF Zone, and DIFC. Rental plans start from AED 150; outright purchase is also available on request."
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
