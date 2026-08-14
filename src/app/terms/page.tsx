export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Sahara Office Equipments",
  description: "Terms and conditions for using saharaprinter.com and purchasing printer rental, sales, repair, AMC, and spare parts services from Sahara Office Equipments.",
  openGraph: {
    title: "Terms of Service | Sahara Office Equipments",
    description: "Terms and conditions for saharaprinter.com and Sahara Office Equipments services.",
    url: "https://www.saharaprinter.com/terms/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Terms of Service — Sahara Office Equipments",
      },
    ],
  },
  alternates: { canonical: "https://www.saharaprinter.com/terms/" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://www.saharaprinter.com/terms/" },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Policies</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Terms of Service</h1>
            <p className="text-lg text-[#d3c5b0] max-w-2xl">
              These terms govern your use of saharaprinter.com and any purchase, rental, or service booking made
              through it. By using this site or placing an order, you agree to these terms.
            </p>
          </div>
        </section>

        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto space-y-10 text-[#d3c5b0] leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Who we are</h2>
              <p>
                Sahara Office Equipments Trading LLC (&quot;Sahara&quot;, &quot;we&quot;, &quot;us&quot;) is registered
                in Sharjah, United Arab Emirates, with our head office at Al Arabi Building, Industrial Area 11,
                Sharjah, PO Box 47373.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Orders and pricing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices on saharaprinter.com are quoted in AED and include applicable UAE VAT unless stated otherwise.</li>
                <li>Placing an order online is an offer to purchase, which we accept by confirming your order and dispatching goods.</li>
                <li>We reserve the right to correct pricing or listing errors and to cancel an order affected by such an error, with a full refund.</li>
                <li>Items listed as &quot;Contact for Pricing&quot; require a confirmed quotation before an order can be placed.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Rental &amp; AMC services</h2>
              <p>
                Printer and photocopier rental, AMC, and repair services are governed by a separate signed service
                agreement or quotation accepted by both parties. Where a signed agreement exists, its terms take
                precedence over this page for that engagement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Payments</h2>
              <p>
                We accept payment by the methods shown at checkout, including card payment via our payment
                processor and bank transfer for approved business accounts. Card payments are processed by a
                third-party PCI-compliant payment gateway — we do not store your full card details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Returns, refunds &amp; delivery</h2>
              <p>
                See our{" "}
                <a href="/returns-refunds/" className="text-[#f5be53] hover:underline">Return &amp; Refund Policy</a>{" "}
                and{" "}
                <a href="/shipping-delivery/" className="text-[#f5be53] hover:underline">Shipping &amp; Delivery Policy</a>{" "}
                for order-specific terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Warranty</h2>
              <p>
                Genuine OEM toner, drums, and spare parts sold by Sahara carry the manufacturer&apos;s standard
                warranty against defects. Warranty does not cover damage from misuse, use of non-genuine consumables
                elsewhere in the device, or normal wear.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of liability</h2>
              <p>
                To the extent permitted by UAE law, Sahara&apos;s liability for any claim relating to a purchase is
                limited to the value of the order in question. We are not liable for indirect or consequential loss
                arising from delivery delays or product issues, except where caused by our negligence.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Governing law</h2>
              <p>
                These terms are governed by the laws of the United Arab Emirates, and any dispute is subject to the
                exclusive jurisdiction of the courts of Sharjah.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                Questions about these terms: <a href="mailto:info@saharaedoc.com" className="text-[#f5be53] hover:underline">info@saharaedoc.com</a>{" "}
                or <a href="tel:+971503823969" className="text-[#f5be53] hover:underline">+971 50 382 3969</a>.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
