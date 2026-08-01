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

                <div className="glass-card rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6 sm:gap-10">
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

                <div className="flex flex-wrap gap-4">
                  <a href={`/get-quote?product=${slug}`} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
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
