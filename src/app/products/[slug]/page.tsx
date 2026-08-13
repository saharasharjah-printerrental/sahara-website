export const runtime = 'edge';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import { SITE_URL } from "@/lib/siteUrl";

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string | null;
  description: string | null;
  specifications: string;
  price_sale: number;
  price_rental: number;
  condition: string;
  image_urls: string;
  meta_title: string | null;
  meta_description: string | null;
}

function parseJsonArray(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatPrice(amount: number, suffix = ""): string {
  if (!amount) return "Contact for Pricing";
  return `AED ${amount.toLocaleString()}${suffix}`;
}

async function getProduct(slug: string): Promise<ProductRow | null> {
  try {
    const db = getRequestContext().env.DB as any;
    const row = await db.prepare("SELECT * FROM products WHERE slug = ? AND is_active = 1").bind(slug).first();
    return row ?? null;
  } catch {
    return null;
  }
}

async function getRelatedProducts(brand: string, excludeSlug: string): Promise<ProductRow[]> {
  try {
    const db = getRequestContext().env.DB as any;
    const result = await db
      .prepare("SELECT * FROM products WHERE brand = ? AND slug != ? AND is_active = 1 ORDER BY sort_order LIMIT 3")
      .bind(brand, excludeSlug)
      .all();
    return (result?.results ?? []) as ProductRow[];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found | Sahara Office Equipments" };

  const title = product.meta_title || `${product.name} | ${product.brand} ${product.category} | Sahara Office Equipments`;
  const specs = parseJsonArray(product.specifications);
  const description =
    product.meta_description ||
    product.description ||
    `${product.name} by ${product.brand} — ${specs.slice(0, 3).join(", ")}. Available for rental from ${formatPrice(product.price_rental, "/mo")} in Dubai, Sharjah & Abu Dhabi. Zero deposit, free toner & maintenance.`;
  const images = parseJsonArray(product.image_urls);
  const canonical = `${SITE_URL}/products/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Sahara Office Equipments",
      locale: "en_AE",
      type: "website",
      images: images.length > 0 ? [{ url: images[0], width: 1200, height: 630, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const specs = parseJsonArray(product.specifications);
  const images = parseJsonArray(product.image_urls);
  const image = images[0] || "/images/printer-canon-1.webp";
  const related = await getRelatedProducts(product.brand, slug);

  const canonical = `${SITE_URL}/products/${slug}/`;
  const description =
    product.description ||
    `${product.name} by ${product.brand} is available for rental in Dubai, Sharjah & Abu Dhabi. ${specs.join(", ")}. Zero deposit, free toner & maintenance included.`;

  // Built from Sahara's actual service terms (zero deposit, included OEM toner,
  // 4-hour emergency response, nationwide coverage) rather than invented
  // manufacturer specs. Pricing questions route to sales because rates move.
  const faqs = [
    {
      q: `Can I rent the ${product.name} in Dubai, Sharjah or Abu Dhabi?`,
      a: `Yes. Sahara Office Equipments delivers and installs the ${product.brand} ${product.name} across all seven emirates — Dubai, Sharjah, Abu Dhabi, Ajman, Al Ain, Fujairah, Ras Al Khaimah and Umm Al Quwain — including the free zones at JAFZA, SAIF Zone, Hamriyah and Dubai Airport Free Zone. Delivery, installation and network configuration are handled by our own engineers, not a third-party courier.`,
    },
    {
      q: `What is included in the ${product.name} rental?`,
      a: `Every Sahara rental is all-inclusive: unlimited genuine OEM toner, all preventive and corrective maintenance, replacement parts, delivery, installation and network setup. There is no deposit and no separate consumables bill. We monitor toner levels remotely and replenish before you run out, so the only thing you are billed for is the agreed monthly rate.`,
    },
    {
      q: `How much does the ${product.name} cost to rent per month?`,
      a: `Rental rates depend on your monthly print volume, colour versus mono split, contract length and how many units you take. Equipment pricing in the UAE also moves with supply, so we quote current rates rather than publishing fixed ones. Call +971 50 382 3969 or request a quote and we will confirm today's price for the ${product.name}, usually within the same working day.`,
    },
    {
      q: `Do you provide maintenance and repair for the ${product.name}?`,
      a: `Yes. Maintenance is included for the full term of any rental. If you own your ${product.brand} equipment outright, we also cover it under a separate annual maintenance contract. Our technicians are certified on ${product.brand} equipment, we install genuine OEM parts only, and our emergency response target across the UAE is four hours.`,
    },
    {
      q: `Can I buy the ${product.name} instead of renting it?`,
      a: `Yes. The ${product.name} is available to purchase outright as well as on rental, in both new and refurbished condition depending on availability. Most UAE offices choose rental because it converts a capital purchase into a predictable monthly cost and moves the maintenance and toner risk to us — but if you prefer to own the asset, we will quote for purchase and can add an AMC separately.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    description,
    image: images.length > 0 ? images.map((i) => (i.startsWith("http") ? i : `${SITE_URL}${i}`)) : undefined,
    offers: [
      product.price_rental
        ? {
            "@type": "Offer",
            price: product.price_rental,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
            url: canonical,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: product.price_rental,
              priceCurrency: "AED",
              unitText: "MONTH",
            },
          }
        : undefined,
      product.price_sale
        ? {
            "@type": "Offer",
            price: product.price_sale,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
            url: canonical,
          }
        : undefined,
    ].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products/` },
      { "@type": "ListItem", position: 3, name: product.name, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="pt-32 pb-20 px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <nav className="flex mb-10 text-sm font-medium text-[#d3c5b0] gap-2 items-center flex-wrap">
              <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <a href="/products/" className="hover:text-[#f5be53] transition-colors">Products</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#f5be53]">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="glass-card rounded-2xl overflow-hidden h-[420px] relative">
                <img src={image} alt={product.name} className="w-full h-full object-cover" />
                {product.brand && (
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#f5be53] uppercase tracking-widest">
                    {product.brand}
                  </div>
                )}
              </div>

              <div>
                <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">
                  {product.category}{product.condition && product.condition !== "New" ? ` · ${product.condition}` : ""}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">{product.name}</h1>
                <p className="text-lg text-[#d3c5b0] mb-8">{description}</p>

                {specs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {specs.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#142032] rounded-full text-sm text-[#d3c5b0]">{s}</span>
                    ))}
                  </div>
                )}

                <div className="glass-card rounded-2xl p-6 mb-8">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#8fa3bc] mb-1">Rental From</p>
                      <p className="text-2xl font-bold text-[#f5be53]">{formatPrice(product.price_rental, "/mo")}</p>
                    </div>
                    {product.price_sale > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#8fa3bc] mb-1">Purchase Price</p>
                        <p className="text-2xl font-bold text-white">{formatPrice(product.price_sale)}</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-4 pt-4 border-t border-[#4f4536]/40 text-sm text-[#8fa3bc]">
                    Indicative pricing. UAE equipment rates move with supply and with your print volume —
                    contact our sales team for today&apos;s confirmed rate on the {product.name}.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href={`/rental-calculator/?product=${slug}`} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                    Get a Quote
                  </a>
                  <a href="/rental-calculator/" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                    Rental Calculator
                  </a>
                  <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                    Call: +971503823969
                  </a>
                </div>

                {product.brand && (
                  <p className="mt-8 text-sm text-[#8fa3bc]">
                    See the full{" "}
                    <a href={`/brands/${product.brand.toLowerCase()}/`} className="text-[#f5be53] hover:underline">
                      {product.brand} printer catalog
                    </a>{" "}
                    for more models and specifications.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-24 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Renting the {product.brand} {product.name} in the UAE
                  </h2>
                  <p className="text-[#d3c5b0] leading-relaxed mb-4">
                    The {product.name} is part of Sahara&apos;s managed {product.category.toLowerCase()} fleet, supplied on
                    rental, lease or outright purchase to businesses across the UAE. Sahara Office Equipments has
                    supplied and serviced office print equipment from its Sharjah base since 2012, and every unit we
                    place is installed, maintained and supported by our own engineers rather than subcontracted out.
                  </p>
                  <p className="text-[#d3c5b0] leading-relaxed">
                    Rental is the option most UAE offices take. It removes the capital cost of the device, folds toner
                    and maintenance into one predictable monthly figure, and means a failure is our problem to solve
                    rather than an unplanned bill. If the device is wrong for your volume after a few months, we swap
                    it — which is difficult to do once you have bought a machine outright. If you would rather own the
                    asset, we sell the {product.name} outright and cover it under a separate{" "}
                    <a href="/services/amc/" className="text-[#f5be53] hover:underline">annual maintenance contract</a>.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">What the rental includes</h2>
                  <ul className="space-y-3">
                    {[
                      ["Zero deposit", "No upfront capital and no security deposit to tie up cash."],
                      ["Unlimited genuine OEM toner", "We monitor levels remotely and replenish before you run out. Consumables are never billed separately."],
                      ["All maintenance and parts", "Preventive servicing and corrective repairs are included for the full term, using genuine OEM parts only."],
                      ["Delivery, installation and network setup", "Configured onto your network and tested by our engineers before handover."],
                      ["Four-hour emergency response", "Our target response time for a device-down call anywhere in the UAE."],
                    ].map(([title, desc]) => (
                      <li key={title} className="flex gap-3">
                        <span className="text-[#f5be53] font-bold mt-0.5">•</span>
                        <span className="text-[#d3c5b0] leading-relaxed">
                          <strong className="text-white">{title}</strong> — {desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {specs.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">{product.name} at a glance</h2>
                    <div className="glass-card rounded-2xl overflow-hidden">
                      <table className="w-full text-left">
                        <tbody>
                          <tr className="border-b border-[#4f4536]/30">
                            <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm w-1/3">Brand</th>
                            <td className="py-3 px-5 text-white">{product.brand}</td>
                          </tr>
                          <tr className="border-b border-[#4f4536]/30">
                            <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm">Category</th>
                            <td className="py-3 px-5 text-white">{product.category}</td>
                          </tr>
                          {product.condition && (
                            <tr className="border-b border-[#4f4536]/30">
                              <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm">Condition</th>
                              <td className="py-3 px-5 text-white">{product.condition}</td>
                            </tr>
                          )}
                          {specs.map((s, i) => (
                            <tr key={i} className="border-b border-[#4f4536]/30 last:border-0">
                              <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm">
                                {i === 0 ? "Key specifications" : ""}
                              </th>
                              <td className="py-3 px-5 text-white">{s}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Where we deliver and service</h2>
                  <p className="text-[#d3c5b0] leading-relaxed">
                    We install and service the {product.name} across every emirate. Our engineers cover{" "}
                    <a href="/printer-rental-dubai/" className="text-[#f5be53] hover:underline">Dubai</a>,{" "}
                    <a href="/photocopier-rental-sharjah/" className="text-[#f5be53] hover:underline">Sharjah</a>,{" "}
                    <a href="/printer-rental-abu-dhabi/" className="text-[#f5be53] hover:underline">Abu Dhabi</a>,{" "}
                    <a href="/printer-rental-al-ain/" className="text-[#f5be53] hover:underline">Al Ain</a>,{" "}
                    <a href="/printer-rental-fujairah/" className="text-[#f5be53] hover:underline">Fujairah</a> and{" "}
                    <a href="/printer-rental-rak/" className="text-[#f5be53] hover:underline">Ras Al Khaimah</a>, including
                    the free-zone business parks at JAFZA, SAIF Zone, Hamriyah and Dubai Airport Free Zone. Support is
                    handled from our Sharjah Industrial Area 11 workshop, which holds parts inventory for the models we
                    place — so a common failure is usually fixed on the first visit.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Frequently asked questions about the {product.name}
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((f) => (
                      <div key={f.q} className="glass-card rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-2">{f.q}</h3>
                        <p className="text-[#d3c5b0] leading-relaxed text-sm">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="glass-card rounded-2xl p-6 lg:sticky lg:top-28">
                  <h2 className="text-lg font-bold text-white mb-3">Get a quote for the {product.name}</h2>
                  <p className="text-[#d3c5b0] text-sm leading-relaxed mb-5">
                    Tell us your monthly volume and we will confirm the current rate, usually the same working day.
                  </p>
                  <a href={`/rental-calculator/?product=${slug}`} className="block text-center bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-full font-bold mb-3 hover:scale-105 transition-transform">
                    Request a Quote
                  </a>
                  <a href="tel:+971503823969" className="block text-center border border-[#f5be53]/40 text-[#f5be53] px-6 py-3 rounded-full font-bold mb-6 hover:bg-[#f5be53]/10 transition-colors">
                    +971 50 382 3969
                  </a>
                  <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-widest">Related services</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/services/printer-rental/" className="text-[#d3c5b0] hover:text-[#f5be53] transition-colors">Printer rental UAE</a></li>
                    <li><a href="/services/photocopier-rental/" className="text-[#d3c5b0] hover:text-[#f5be53] transition-colors">Photocopier rental</a></li>
                    <li><a href="/services/amc/" className="text-[#d3c5b0] hover:text-[#f5be53] transition-colors">Annual maintenance contracts</a></li>
                    <li><a href="/services/repair/" className="text-[#d3c5b0] hover:text-[#f5be53] transition-colors">Printer repair &amp; service</a></li>
                    <li><a href="/services/printer-spare-parts/" className="text-[#d3c5b0] hover:text-[#f5be53] transition-colors">Toner &amp; spare parts</a></li>
                  </ul>
                </div>
              </aside>
            </div>

            {related.length > 0 && (
              <div className="mt-24">
                <h2 className="text-2xl font-bold text-white mb-8">More {product.brand} Equipment</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {related.map((r) => {
                    const rImages = parseJsonArray(r.image_urls);
                    return (
                      <a
                        key={r.id}
                        href={`/products/${r.slug}/`}
                        className="glass-card rounded-2xl overflow-hidden group block"
                      >
                        <div className="h-40 bg-[#142032] relative overflow-hidden">
                          {rImages[0] && (
                            <img src={rImages[0]} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="text-white font-bold mb-1">{r.name}</h3>
                          <p className="text-[#f5be53] text-sm font-semibold">{formatPrice(r.price_rental, "/mo")}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
