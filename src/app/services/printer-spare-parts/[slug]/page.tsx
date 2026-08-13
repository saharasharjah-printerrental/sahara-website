export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import { SITE_URL } from "@/lib/siteUrl";
import { normalizeR2Url } from "@/lib/r2url";
import { resolveSupplyPrice } from "@/lib/price";

interface SupplyRow {
  id: string;
  name: string;
  brand: string;
  category: string;
  compatibleModels: string;
  color: string | null;
  yield: string;
  price: string;
  price_aed: number | null;
  price_on_request: number | null;
  stock: number;
  image: string;
  alt_text: string | null;
  sku: string | null;
  mpn: string | null;
  gtin: string | null;
  condition: string | null;
  slug: string;
}

async function getSupply(slug: string): Promise<SupplyRow | null> {
  try {
    const db = getRequestContext().env.DB as any;
    const row = await db.prepare("SELECT * FROM supplies WHERE slug = ? AND isActive = 1").bind(slug).first();
    return row ?? null;
  } catch {
    return null;
  }
}

async function getRelatedSupplies(category: string, excludeSlug: string): Promise<SupplyRow[]> {
  try {
    const db = getRequestContext().env.DB as any;
    const result = await db
      .prepare("SELECT * FROM supplies WHERE category = ? AND slug != ? AND isActive = 1 ORDER BY name LIMIT 3")
      .bind(category, excludeSlug)
      .all();
    return (result?.results ?? []) as SupplyRow[];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supply = await getSupply(slug);
  if (!supply) return { title: "Item Not Found | Sahara Office Equipments" };

  const resolved = resolveSupplyPrice(supply);
  const title = `${supply.name} | ${supply.brand} ${supply.category} | Sahara Office Equipments`;
  const description = `Genuine ${supply.brand} ${supply.category.toLowerCase()} — ${supply.name}. Fits ${supply.compatibleModels}. ${resolved.payable ? resolved.display : "Contact for pricing"}. Same-day delivery across the UAE.`;
  const canonical = `${SITE_URL}/services/printer-spare-parts/${slug}/`;
  const image = normalizeR2Url(supply.image || "");

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
      images: image ? [{ url: image, width: 800, height: 800, alt: supply.alt_text || supply.name }] : undefined,
    },
  };
}

export default async function SupplyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supply = await getSupply(slug);
  if (!supply) notFound();

  const resolved = resolveSupplyPrice(supply);
  const canonical = `${SITE_URL}/services/printer-spare-parts/${slug}/`;
  const image = normalizeR2Url(supply.image || "");
  const related = await getRelatedSupplies(supply.category, slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: supply.name,
    brand: { "@type": "Brand", name: supply.brand },
    category: supply.category,
    sku: supply.sku || supply.id,
    mpn: supply.mpn || undefined,
    gtin: supply.gtin || undefined,
    description: `${supply.name} — fits ${supply.compatibleModels}. Rated yield: ${supply.yield}.`,
    image: image || undefined,
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "AED",
      price: resolved.payable ? resolved.aed : undefined,
      availability: supply.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: `https://schema.org/${supply.condition === "refurbished" ? "RefurbishedCondition" : "NewCondition"}`,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "AE",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "AED" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "AE" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 2, unitCode: "DAY" },
        },
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Toner & Spare Parts", item: `${SITE_URL}/services/printer-spare-parts/` },
      { "@type": "ListItem", position: 3, name: supply.name, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="pt-32 pb-20 px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <nav className="flex mb-10 text-sm font-medium text-[#d3c5b0] gap-2 items-center flex-wrap">
              <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <a href="/services/printer-spare-parts/" className="hover:text-[#f5be53] transition-colors">Toner &amp; Spare Parts</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#f5be53]">{supply.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="glass-card rounded-2xl overflow-hidden h-[420px] relative bg-[#142032] flex items-center justify-center">
                {image ? (
                  <img src={image} alt={supply.alt_text || supply.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="material-symbols-outlined text-6xl text-slate-600">inventory_2</span>
                )}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#f5be53] uppercase tracking-widest">
                  {supply.brand}
                </div>
              </div>

              <div>
                <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">
                  {supply.category}{supply.color ? ` · ${supply.color}` : ""}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">{supply.name}</h1>
                <p className="text-lg text-[#d3c5b0] mb-6">
                  Fits {supply.compatibleModels}. Rated yield: {supply.yield}.
                </p>

                <div className="glass-card rounded-2xl p-6 mb-8">
                  <p className="text-xs uppercase tracking-widest text-[#8fa3bc] mb-1">Price</p>
                  <p className="text-2xl font-bold text-[#f5be53]">{resolved.display}</p>
                  <p className="mt-3 text-sm text-[#8fa3bc]">
                    {supply.stock > 0 ? `In stock — ${supply.stock} available` : "Currently out of stock"} · Free
                    same-day delivery in Dubai, Sharjah &amp; Abu Dhabi
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="/services/printer-spare-parts/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                    {resolved.payable ? "Add to Cart" : "Check Availability"}
                  </a>
                  <a href="/request-quote/" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                    Request a Quote
                  </a>
                  <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                    Call: +971 50 382 3969
                  </a>
                </div>

                <p className="mt-8 text-sm text-[#8fa3bc]">
                  Genuine OEM only. See our{" "}
                  <a href="/returns-refunds/" className="text-[#f5be53] hover:underline">Return Policy</a> and{" "}
                  <a href="/shipping-delivery/" className="text-[#f5be53] hover:underline">Delivery Policy</a>.
                </p>
              </div>
            </div>

            <div className="mt-24 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Specifications</h2>
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                      <tbody>
                        <tr className="border-b border-[#4f4536]/30">
                          <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm w-1/3">Brand</th>
                          <td className="py-3 px-5 text-white">{supply.brand}</td>
                        </tr>
                        <tr className="border-b border-[#4f4536]/30">
                          <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm">Category</th>
                          <td className="py-3 px-5 text-white">{supply.category}</td>
                        </tr>
                        <tr className="border-b border-[#4f4536]/30">
                          <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm">Compatible Models</th>
                          <td className="py-3 px-5 text-white">{supply.compatibleModels}</td>
                        </tr>
                        <tr className="border-b border-[#4f4536]/30">
                          <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm">Rated Yield</th>
                          <td className="py-3 px-5 text-white">{supply.yield}</td>
                        </tr>
                        {supply.sku && (
                          <tr className="border-b border-[#4f4536]/30 last:border-0">
                            <th scope="row" className="py-3 px-5 text-[#8fa3bc] font-medium text-sm">SKU</th>
                            <td className="py-3 px-5 text-white">{supply.sku}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Why genuine OEM</h2>
                  <p className="text-[#d3c5b0] leading-relaxed">
                    We supply original manufacturer {supply.category.toLowerCase()} only. Compatible and refilled
                    alternatives are cheaper per unit, but in UAE office conditions they are the most common cause
                    of drum damage, streaking and fuser failure — and they void manufacturer warranty cover.
                  </p>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="glass-card rounded-2xl p-6 lg:sticky lg:top-28">
                  <h2 className="text-lg font-bold text-white mb-3">Need this part urgently?</h2>
                  <p className="text-[#d3c5b0] text-sm leading-relaxed mb-5">
                    Same-day delivery is available across Dubai, Sharjah and Abu Dhabi for orders placed during
                    working hours.
                  </p>
                  <a href="/request-quote/" className="block text-center bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-full font-bold mb-3 hover:scale-105 transition-transform">
                    Request a Quote
                  </a>
                  <a href="tel:+971503823969" className="block text-center border border-[#f5be53]/40 text-[#f5be53] px-6 py-3 rounded-full font-bold hover:bg-[#f5be53]/10 transition-colors">
                    +971 50 382 3969
                  </a>
                </div>
              </aside>
            </div>

            {related.length > 0 && (
              <div className="mt-24">
                <h2 className="text-2xl font-bold text-white mb-8">Related {supply.category} Items</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {related.map((r) => {
                    const rResolved = resolveSupplyPrice(r);
                    const rImage = normalizeR2Url(r.image || "");
                    return (
                      <a
                        key={r.id}
                        href={`/services/printer-spare-parts/${r.slug}/`}
                        className="glass-card rounded-2xl overflow-hidden group block"
                      >
                        <div className="h-40 bg-[#142032] relative overflow-hidden flex items-center justify-center">
                          {rImage ? (
                            <img src={rImage} alt={r.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                          ) : (
                            <span className="material-symbols-outlined text-4xl text-slate-600">inventory_2</span>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="text-white font-bold mb-1 text-sm line-clamp-2">{r.name}</h3>
                          <p className="text-[#f5be53] text-sm font-semibold">{rResolved.display}</p>
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
