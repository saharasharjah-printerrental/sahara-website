export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Sahara Office Equipments",
  description: "Sahara Office Equipments' return and refund policy for toner, spare parts, and equipment purchased through saharaprinter.com in the UAE.",
  openGraph: {
    title: "Return & Refund Policy | Sahara Office Equipments",
    description: "Return and refund terms for online orders placed with Sahara Office Equipments in the UAE.",
    url: "https://www.saharaprinter.com/returns-refunds/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Return & Refund Policy — Sahara Office Equipments",
      },
    ],
  },
  alternates: { canonical: "https://www.saharaprinter.com/returns-refunds/" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Return & Refund Policy", "item": "https://www.saharaprinter.com/returns-refunds/" },
  ],
};

export default function ReturnsRefundsPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Policies</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Return &amp; Refund Policy</h1>
            <p className="text-lg text-[#d3c5b0] max-w-2xl">
              This policy covers toner, drums, spare parts, and equipment purchased directly through saharaprinter.com.
              It does not apply to rental or AMC contracts, which are governed by their own signed agreements.
            </p>
          </div>
        </section>

        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto space-y-10 text-[#d3c5b0] leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Return window</h2>
              <p>
                You may request a return within <strong className="text-white">7 calendar days</strong> of delivery for
                toner, drums, and spare parts purchased online. To qualify, the item must be:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Unused, unopened, and in its original manufacturer packaging</li>
                <li>Free of physical damage not caused by Sahara Office Equipments or the courier</li>
                <li>Accompanied by the order reference or invoice number</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Non-returnable items</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Opened or installed toner cartridges, drums, and maintenance kits</li>
                <li>Items custom-ordered or sourced specifically for your device model</li>
                <li>Products showing signs of use, tampering, or damage from misuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Damaged or incorrect items</h2>
              <p>
                If an item arrives damaged, defective, or different from what you ordered, contact us within{" "}
                <strong className="text-white">48 hours of delivery</strong> with your order reference and photos of the
                item and packaging. We will arrange a free replacement or full refund — no return shipping cost to you
                in this case.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How to request a return</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Email <a href="mailto:info@saharaedoc.com" className="text-[#f5be53] hover:underline">info@saharaedoc.com</a> or call <a href="tel:+971503823969" className="text-[#f5be53] hover:underline">+971 50 382 3969</a> with your order reference.</li>
                <li>We confirm eligibility and issue a return authorisation and collection or drop-off details.</li>
                <li>Once the item is received and inspected, we process your refund or replacement within 5–7 business days.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Refund method</h2>
              <p>
                Approved refunds are issued to the original payment method used at checkout. Orders paid by bank
                transfer or on account are refunded by bank transfer to the account of record. Refund processing by
                the card network or bank can take a further 5–10 business days after we issue it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Cancellations</h2>
              <p>
                Orders can be cancelled free of charge before dispatch. Once an order has been dispatched, standard
                return terms above apply instead.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                Sahara Office Equipments Trading LLC — Al Arabi Building, Industrial Area 11, Sharjah, UAE. Phone{" "}
                <a href="tel:+971503823969" className="text-[#f5be53] hover:underline">+971 50 382 3969</a>, email{" "}
                <a href="mailto:info@saharaedoc.com" className="text-[#f5be53] hover:underline">info@saharaedoc.com</a>.
                See also our <a href="/shipping-delivery/" className="text-[#f5be53] hover:underline">Shipping &amp; Delivery</a>{" "}
                and <a href="/terms/" className="text-[#f5be53] hover:underline">Terms of Service</a>.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
