"use client";

import { useState, useEffect } from "react";

const defaultFaqs = [
  {
    q: "Who is the authorised Bravo card printer retail partner in the UAE?",
    a: "Sahara Office Equipments is the authorised UAE retail partner for the Bravo RTAI retransfer printer and the Bravo DC 3300 direct-to-card printer — the two Bravo Global models we stock, sell, and support. We provide sales, genuine consumables, and on-site service across Dubai, Sharjah, Abu Dhabi, and all UAE emirates."
  },
  {
    q: "What is the print resolution of the Bravo RTAI?",
    a: "The Bravo RTAI prints at 600 DPI (dots per inch) using colour dye sublimation retransfer technology. It supports over-the-edge printing for borderless card output and features the exclusive HOLO-MET™ technology for metallic lustre effects on ID cards."
  },
  {
    q: "Does the Bravo DC 3300 support dual-sided printing?",
    a: "Yes. The Bravo DC 3300 is available in both Simplex (DC 3300 S) and Duplex (DC 3300 D) models. Duplex printing speed is 170 cards/hour. A dual-side activation key is also available to upgrade a simplex unit on-site."
  },
  {
    q: "Which Bravo printer supports holographic retransfer?",
    a: "The Bravo RTAI supports holographic retransfer film — both standard and customised holograms — directly in the printer without a separate laminator. This makes it ideal for government IDs, banking cards, and access credentials requiring overt security features."
  },
  {
    q: "Can I print on wooden or transparent cards with Bravo printers?",
    a: "Yes — the Bravo RTAI supports PVC, ABSS, PET, PET-G, PC, wooden (specially treated), and translucent cards. This breadth of media support makes it unique in the UAE market for eco-friendly and specialist card applications."
  },
  {
    q: "How much do Bravo card printers cost in Dubai / UAE?",
    a: "Pricing depends on configuration (simplex/duplex, encoding modules, lamination). Contact Sahara Office Equipments for a tailored quote for the UAE market. As the authorised UAE retail partner for the RTAI and DC 3300, we offer competitive pricing, warranty, and after-sales support."
  },
  {
    q: "Is technical support and service available in UAE for Bravo printers?",
    a: "Yes. As the authorised UAE retail partner for these two Bravo models, Sahara provides on-site technical support, genuine Bravo consumables (ribbons, retransfer film, cleaning kits), and warranty service for both the RTAI and DC 3300 across all emirates."
  },
  {
    q: "What warranty do Bravo card printers carry?",
    a: "Both the Bravo RTAI and DC 3300 carry a 3-year printer warranty. The RTAI additionally provides a lifetime warranty on the print head. Optional extended warranty is available through Sahara Office Equipments as the authorised UAE service partner."
  },
];

export default function BravoFaqClient() {
  const [faqs, setFaqs] = useState(defaultFaqs);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/faqs?pageSlug=bravo-card-printers-uae')
      .then(r => r.json())
      .then(data => {
        const rows = data.faqs ?? data;
        if (Array.isArray(rows) && rows.length > 0) {
          const page = rows
            .filter((f: any) => f.isActive === 1 || f.isActive === true)
            .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map((f: any) => ({ q: f.question, a: f.answer }));
          if (page.length > 0) setFaqs(page);
        }
      })
      .catch(() => {});
  }, []);

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
          onClick={() => setOpenFaq(openFaq === i ? null : i)}
        >
          <div className="flex justify-between items-center p-6">
            <h3 className="font-bold text-base text-white pr-4">{f.q}</h3>
            <span className="text-[#f5be53] shrink-0 text-xl">{openFaq === i ? "−" : "+"}</span>
          </div>
          {openFaq === i && (
            <div className="px-6 pb-6">
              <p className="text-[#d3c5b0] leading-relaxed text-sm">{f.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
