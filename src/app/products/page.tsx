export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from '@cloudflare/next-on-pages';
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Printer Products UAE | Canon, HP, Kyocera, Xerox | Sahara Office",
  description: "Browse industrial-grade printers and photocopiers for rent in Dubai & UAE. Canon imageRUNNER, HP LaserJet, Kyocera TASKalfa, Xerox AltaLink. New & refurbished options from AED 300/month.",
  keywords: "printer products uae, photocopier sale dubai, office printer Canon HP Kyocera Xerox, buy printer uae, multifunction printer rental",
  openGraph: {
    title: "Printer Products UAE | Canon, HP, Kyocera, Xerox",
    description: "Browse industrial-grade printers and photocopiers for rent in Dubai & UAE. Canon imageRUNNER, HP LaserJet, Kyocera TASKalfa from AED 300/month.",
    url: "https://www.saharaprinter.com/products/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/products/",
  },
};

// Fetched server-side so the product grid — and therefore every crawlable
// link into /products/<slug>/ — is present in the initial HTML. Client-side
// fetching left these URLs orphaned and unindexed.
async function fetchInitialProducts() {
  try {
    const db = getRequestContext().env.DB as any;
    const result = await db
      .prepare('SELECT id, slug, name, brand, category, condition, price_rental, specifications, image_urls, is_active FROM products WHERE is_active = 1 ORDER BY sort_order ASC')
      .all();
    return (result?.results ?? []).map((p: any) => {
      let specs: string[] = [];
      try { specs = p.specifications ? JSON.parse(p.specifications) : []; } catch { specs = []; }
      let image = '';
      try { image = p.image_urls ? (JSON.parse(p.image_urls)[0] ?? '') : ''; } catch { image = ''; }
      return {
        id: String(p.id),
        slug: p.slug,
        name: p.name,
        brand: p.brand || '',
        category: p.category || '',
        condition: p.condition || '',
        priceRental: p.price_rental ? `AED ${p.price_rental}/mo` : '',
        specs: Array.isArray(specs) ? specs : [],
        image,
        isActive: true,
      };
    });
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const initialProducts = await fetchInitialProducts();

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Printer Products - Sahara Office Equipments",
    description: "Industrial-grade printers and photocopiers available for rent and sale in UAE.",
    url: "https://www.saharaprinter.com/products/",
    numberOfItems: initialProducts.length,
    itemListElement: initialProducts.map((p: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.brand ? `${p.brand} ${p.name}` : p.name,
      url: `https://www.saharaprinter.com/products/${p.slug}/`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.saharaprinter.com/products/" },
    ],
  };

  return (
    <>
      {/* Omitted entirely when D1 is unreachable — an ItemList with
          numberOfItems: 0 is worse than no ItemList at all. */}
      {initialProducts.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(productListSchema)}</script>
      )}
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <ProductsClient initialProducts={initialProducts.length > 0 ? initialProducts : undefined} />
    </>
  );
}