"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";

const ITEMS_PER_PAGE = 9;

const BRAND_IMAGES: Record<string, string> = {
  Canon: "/images/printer-canon-1.webp",
  HP: "/images/printer-hp.svg",
  Kyocera: "/images/printer-kyocera.webp",
  Xerox: "/images/printer-xerox.webp",
  Brother: "/images/printer-brother.webp",
  Ricoh: "/images/printer-ricoh.webp",
  Samsung: "/images/printer-samsung.webp",
  Lexmark: "/images/printer-lexmark.webp",
  Sharp: "/brands/sharp.webp",
  Epson: "/brands/epson.webp",
};
const CANON_ONLY = new Set(["/images/heroPrntr1.webp", "/images/printer-canon-2.webp"]);
function localImg(image: string, brand: string): string {
  if (image && image.startsWith("http")) return image;
  if (image && image.startsWith("/") && !(CANON_ONLY.has(image) && brand !== "Canon")) return image;
  return BRAND_IMAGES[brand] || "/images/printer-canon-1.webp";
}

// Slugs must match the product rows in D1 and the URLs in sitemap.ts — the
// grid only renders a crawlable link when a product has one.
const defaultProducts = [
  { id: "1", slug: "imagerunner-advance-c5500", name: "imageRUNNER ADVANCE C5500", brand: "Canon", category: "MFP", condition: "New", priceRental: "AED 800/mo", specs: ["55 PPM", "Full Color", "A3 Support", "Network Ready"], image: "/images/printer-canon-1.webp", isActive: true },
  { id: "2", slug: "laserjet-managed-e82560", name: "LaserJet Managed E82560", brand: "HP", category: "A3 Printers", condition: "New", priceRental: "AED 750/mo", specs: ["Wolf Security", "Energy Star", "56 PPM", "Duplex"], image: "/images/printer-hp.svg", isActive: true },
  { id: "3", slug: "taskalfa-6003i-series", name: "TASKalfa 6003i Series", brand: "Kyocera", category: "MFP", condition: "New", priceRental: "AED 950/mo", specs: ["60 PPM", "Monochrome", "HyPAS Platform", "1200 DPI"], image: "/images/printer-kyocera.webp", isActive: true },
  { id: "4", slug: "altalink-c8170", name: "AltaLink C8170", brand: "Xerox", category: "MFP", condition: "New", priceRental: "AED 1,100/mo", specs: ['10" UI Tablet', "ConnectKey", "Color", "70 PPM"], image: "/images/printer-xerox.webp", isActive: true },
  { id: "5", slug: "hl-l6400dw-enterprise", name: "HL-L6400DW Enterprise", brand: "Brother", category: "A4 Printers", condition: "New", priceRental: "AED 400/mo", specs: ["50 PPM", "Duplex", "Wi-Fi Direct", "250-sheet Tray"], image: "/images/printer-brother.webp", isActive: true },
  { id: "6", slug: "mp-2555sp", name: "MP 2555SP", brand: "Ricoh", category: "MFP", condition: "New", priceRental: "AED 500/mo", specs: ["25 PPM", "Copy/Print/Scan", "600 DPI", "Network Ready"], image: "/images/printer-ricoh.webp", isActive: true },
  { id: "7", slug: "proxpress-m4580fx", name: "ProXpress M4580FX", brand: "Samsung", category: "MFP", condition: "Refurbished", priceRental: "AED 350/mo", specs: ["43 PPM", "Fax Ready", "Duplex", "Auto Sort"], image: "/images/printer-samsung.webp", isActive: true },
  { id: "8", slug: "ms431dn-laser", name: "MS431dn Laser", brand: "Lexmark", category: "A4 Printers", condition: "Refurbished", priceRental: "AED 300/mo", specs: ["42 PPM", "1200 DPI", "512MB RAM", "USB 3.0"], image: "/images/printer-lexmark.webp", isActive: true },
  { id: "9", slug: "m6635cidn-color-mfp", name: "M6635cidn Color MFP", brand: "Kyocera", category: "MFP", condition: "New", priceRental: "AED 700/mo", specs: ["35 PPM", "Full Color", "Duplex", "Gigabit Ethernet"], image: "/images/printer-kyocera.webp", isActive: true },
  { id: "10", slug: "color-laserjet-pro-m479fdw", name: "Color LaserJet Pro M479fdw", brand: "HP", category: "MFP", condition: "New", priceRental: "AED 450/mo", specs: ["27 PPM Color", "Wi-Fi", "Fax", "Touch Display"], image: "/images/heroBnr1.webp", isActive: true },
  { id: "11", slug: "imageprograf-pro-4100", name: "imagePROGRAF PRO-4100", brand: "Canon", category: "Plotters", condition: "New", priceRental: "AED 1,200/mo", specs: ["12-Color Ink", "44-inch Roll", "2400 DPI", "Data Encrypt"], image: "/images/printer-canon-1.webp", isActive: true },
  { id: "12", slug: "designjet-z9-postscript", name: "DesignJet Z9+ PostScript", brand: "HP", category: "Plotters", condition: "Refurbished", priceRental: "AED 600/mo", specs: ["44-inch Roll", "2400 DPI", "PostScript", "HP Stitch"], image: "/images/printer-hp.svg", isActive: true },
  { id: "13", slug: "bp-70c31-color-mfp", name: "BP-70C31 Color MFP", brand: "Sharp", category: "MFP", condition: "New", priceRental: "AED 650/mo", specs: ["31 PPM Color", "A3 Support", "Cloud Connect", "Duplex"], image: "/brands/sharp.webp", isActive: true },
  { id: "14", slug: "ecotank-l15150-wide-format", name: "EcoTank L15150 Wide-Format", brand: "Epson", category: "A3 Printers", condition: "New", priceRental: "AED 480/mo", specs: ["25 PPM Color", "A3+ Support", "Wi-Fi Direct", "Low Cost/Page"], image: "/brands/epson.webp", isActive: true },
];

const trail = [{ label: "Home", href: "/" }, { label: "Products" }];

export default function ProductsClient({ initialProducts }: { initialProducts?: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // Seed from server-rendered products so the grid (and its links into
  // /products/<slug>/) exist in the initial HTML for crawlers.
  const [products, setProducts] = useState<any[]>(
    () => (initialProducts?.length ? initialProducts.map((p) => ({ ...p, image: localImg(p.image, p.brand) })) : defaultProducts)
  );
  const [loading, setLoading] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState<{
    paymentGatewayEnabled: boolean;
    paymentGatewayUrl: string;
    paymentGatewayLabel: string;
  }>({ paymentGatewayEnabled: false, paymentGatewayUrl: "", paymentGatewayLabel: "Buy Now" });

  const searchQuery = searchParams.get("search") || "";
  const selectedBrands = useMemo(() => searchParams.get("brands")?.split(",").filter(Boolean) || [], [searchParams]);
  const selectedCategories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const selectedConditions = searchParams.get("conditions")?.split(",").filter(Boolean) || [];
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    // Fetch payment settings from D1
    fetch('/api/settings/?key=site_settings')
      .then(r => r.json())
      .then(data => {
        if (data.setting?.value) {
          const parsed = JSON.parse(data.setting.value);
          setPaymentSettings({
            paymentGatewayEnabled: Boolean(parsed.paymentGatewayEnabled),
            paymentGatewayUrl: String(parsed.paymentGatewayUrl || ""),
            paymentGatewayLabel: String(parsed.paymentGatewayLabel || "Buy Now"),
          });
        } else {
          const s = localStorage.getItem("sahara_settings");
          if (s) {
            const parsed = JSON.parse(s);
            setPaymentSettings({
              paymentGatewayEnabled: Boolean(parsed.paymentGatewayEnabled),
              paymentGatewayUrl: String(parsed.paymentGatewayUrl || ""),
              paymentGatewayLabel: String(parsed.paymentGatewayLabel || "Buy Now"),
            });
          }
        }
      })
      .catch(() => {
        const s = localStorage.getItem("sahara_settings");
        if (s) {
          const parsed = JSON.parse(s);
          setPaymentSettings({
            paymentGatewayEnabled: Boolean(parsed.paymentGatewayEnabled),
            paymentGatewayUrl: String(parsed.paymentGatewayUrl || ""),
            paymentGatewayLabel: String(parsed.paymentGatewayLabel || "Buy Now"),
          });
        }
      });

    (async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          const mapped = data.products.map((p: any) => ({
            ...p,
            specs: p.specs ? p.specs.split("|") : [],
            isActive: p.isActive === 1 || p.isActive === true,
            image: localImg(p.image, p.brand),
          }));
          setProducts(mapped);
          localStorage.setItem("sahara_products", JSON.stringify(mapped));
          setLoading(false);
          return;
        }
      } catch {}
      // Never downgrade server-rendered products to cached or default data —
      // that would strip the slugs the grid needs to render crawlable links.
      if (initialProducts?.length) {
        setLoading(false);
        return;
      }
      const stored = localStorage.getItem("sahara_products");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProducts(parsed.map((p: any) => ({ ...p, image: localImg(p.image, p.brand) })));
      } else {
        setProducts(defaultProducts);
      }
      setLoading(false);
    })();
  }, [initialProducts]);

  const updateParams = (key: string, value: string | string[] | number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(","));
      else params.delete(key);
    } else if (value) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }
    if (key !== "page") params.set("page", "1");
    router.push(`/products/?${params.toString()}`);
  };

  // Real href for pagination so Googlebot can reach products beyond page 1.
  // onClick keeps the client-side navigation; the href is what gets crawled.
  const pageHref = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `/products/?${params.toString()}`;
  };

  const activeProducts = products.filter((p) => p.isActive);
  const brands = Array.from(new Set(activeProducts.map((p) => p.brand))).sort();
  const categories = Array.from(new Set(activeProducts.map((p) => p.category))).sort();
  const conditions = Array.from(new Set(activeProducts.map((p) => p.condition))).sort();

  const filteredProducts = activeProducts.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (selectedConditions.length > 0 && !selectedConditions.includes(p.condition)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const toggleBrand = (brand: string) => {
    const newBrands = selectedBrands.includes(brand) ? selectedBrands.filter((b) => b !== brand) : [...selectedBrands, brand];
    updateParams("brands", newBrands);
  };
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category) ? selectedCategories.filter((c) => c !== category) : [...selectedCategories, category];
    updateParams("categories", newCategories);
  };
  const toggleCondition = (condition: string) => {
    const newConditions = selectedConditions.includes(condition) ? selectedConditions.filter((c) => c !== condition) : [...selectedConditions, condition];
    updateParams("conditions", newConditions);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  return (
    <>
      <main className="min-h-screen bg-surface">
        <Header />

        <section className="px-6 pb-8 pt-32">
          <header className="mx-auto mb-12 max-w-content">
            <Breadcrumbs trail={trail} />
            <Reveal className="flex flex-col items-end justify-between gap-6 md:flex-row">
              <div>
                <h1 className="font-sora text-display-xl font-bold tracking-tighter text-white">
                  Precision <span className="text-primary">Equipments</span>
                </h1>
                <p className="mt-4 max-w-xl text-body text-muted">
                  Harness the power of industrial-grade reliability. Curated technology for the high-performance
                  executive office.
                </p>
              </div>
              <div className="flex items-center gap-4 rounded-pill bg-surface-low p-1">
                <button onClick={() => setViewMode("grid")} className={`flex items-center justify-center rounded-full p-3 transition-all ${viewMode === "grid" ? "bg-primary text-on-primary" : "text-muted hover:text-white"}`}>
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button onClick={() => setViewMode("list")} className={`flex items-center justify-center rounded-full p-3 transition-all ${viewMode === "list" ? "bg-primary text-on-primary" : "text-muted hover:text-white"}`}>
                  <span className="material-symbols-outlined">list</span>
                </button>
              </div>
            </Reveal>
          </header>
        </section>

        {/* Bravo PVC Card Printer Callout */}
        <div className="mx-auto mb-4 max-w-content px-6 lg:px-0">
          <a
            href="/bravo-card-printers-uae/"
            className="group flex flex-col items-start gap-4 rounded-panel border border-primary/25 bg-surface-low p-5 transition-colors hover:border-primary/50 sm:flex-row sm:items-center"
          >
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-2xl">🏅</span>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Authorised Exclusive Reseller</p>
                <p className="text-base font-bold leading-tight text-white">PVC Card Printers — Bravo RTAI &amp; DC 3300</p>
              </div>
            </div>
            <p className="max-w-sm text-sm text-muted sm:ml-auto">
              Authorised exclusive reseller in the UAE for the Bravo RTAI and DC 3300. 600 dpi retransfer &amp;
              direct-to-card ID printers for enterprise, government &amp; education.
            </p>
            <span className="shrink-0 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">View →</span>
          </a>
        </div>

        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 lg:grid-cols-4 lg:px-0">
          <aside className="space-y-10">
            <div className="relative">
              <input className="w-full rounded-2xl border-none bg-surface-mid py-4 pl-12 pr-4 text-white placeholder:text-muted focus:ring-2 focus:ring-primary" placeholder="Search models..." type="text" value={searchQuery} onChange={(e) => updateParams("search", e.target.value)} />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted">search</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-caption font-bold uppercase tracking-widest text-primary">Brand</h3>
              {brands.map((brand) => (
                <label key={brand} className="group flex cursor-pointer items-center gap-3">
                  <input type="checkbox" className="h-5 w-5 rounded border-outline/40 bg-surface-mid text-primary focus:ring-primary/20" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                  <span className="text-muted transition-colors group-hover:text-white">{brand}</span>
                </label>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-caption font-bold uppercase tracking-widest text-primary">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => toggleCategory(cat)} className={`rounded-pill border px-4 py-2 text-xs font-bold transition-all ${selectedCategories.includes(cat) ? "border-primary bg-primary text-on-primary" : "border-outline/30 text-muted hover:border-primary hover:text-white"}`}>{cat}</button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-caption font-bold uppercase tracking-widest text-primary">Condition</h3>
              <div className="space-y-2">
                {conditions.map((cond) => (
                  <div key={cond} onClick={() => toggleCondition(cond)} className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all ${selectedConditions.includes(cond) ? "border-primary bg-surface-mid" : "border-outline/10 bg-surface-low hover:border-primary/30"}`}>
                    <span className="text-white">{cond === "New" ? "Brand New" : cond}</span>
                    <span className={`material-symbols-outlined text-lg ${selectedConditions.includes(cond) ? "text-primary" : "text-muted"}`}>{cond === "New" ? "verified" : "history"}</span>
                  </div>
                ))}
              </div>
            </div>

            {(selectedBrands.length > 0 || selectedCategories.length > 0 || selectedConditions.length > 0 || searchQuery) && (
              <button onClick={clearFilters} className="w-full rounded-xl border border-outline/30 py-2 text-sm text-muted transition-all hover:border-red-400 hover:text-red-400">Clear Filters</button>
            )}
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted">Showing <span className="font-bold text-white">{filteredProducts.length}</span> products{totalPages > 1 && <span> — Page <span className="font-bold text-white">{safePage}</span> of <span className="font-bold text-white">{totalPages}</span></span>}</p>
            </div>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array(6).fill(null).map((_, i) => (
                  <div key={i} className="glass-card animate-pulse rounded-card p-6">
                    <div className="mb-4 h-48 rounded-xl bg-surface-mid" />
                    <div className="mb-2 h-6 rounded bg-surface-mid" />
                    <div className="h-4 w-2/3 rounded bg-surface-mid" />
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="py-20 text-center">
                <span className="material-symbols-outlined mb-4 text-6xl text-muted">inventory_2</span>
                <h3 className="mb-2 text-2xl font-bold text-white">No Products Found</h3>
                <p className="text-muted">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {paginatedProducts.map((p) => (
                  <div key={p.id} className="glass-card group overflow-hidden rounded-card">
                    {p.slug ? (
                      <a href={`/products/${p.slug}/`} className="relative block h-48 overflow-hidden bg-surface-mid">
                        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />}
                        {p.brand && <div className="absolute left-4 top-4 rounded-pill bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">{p.brand}</div>}
                      </a>
                    ) : (
                      <div className="relative h-48 overflow-hidden bg-surface-mid">
                        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />}
                        {p.brand && <div className="absolute left-4 top-4 rounded-pill bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">{p.brand}</div>}
                      </div>
                    )}
                    <div className="p-6">
                      {p.slug ? (
                        <a href={`/products/${p.slug}/`}>
                          <h3 className="mb-2 text-xl font-bold text-white transition-colors hover:text-primary">{p.name}</h3>
                        </a>
                      ) : (
                        <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                      )}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {p.specs?.slice(0, 3).map((spec: string, i: number) => (
                          <span key={i} className="rounded-pill bg-surface-mid px-2 py-1 text-xs text-muted">{spec}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{p.priceRental}</span>
                        <span className="text-sm text-white">{p.condition === "New" ? "Brand New" : p.condition}</span>
                      </div>
                      {p.slug && (
                        <a
                          href={`/products/${p.slug}/`}
                          className="mt-4 block w-full rounded-xl border border-primary/40 px-4 py-2 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/10"
                        >
                          View Details
                        </a>
                      )}
                      {paymentSettings.paymentGatewayEnabled && paymentSettings.paymentGatewayUrl && (
                        <a
                          href={paymentSettings.paymentGatewayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 block w-full rounded-xl bg-gradient-to-r from-primary to-primary-deep px-4 py-2 text-center text-sm font-bold text-on-primary transition-transform hover:scale-105"
                        >
                          {paymentSettings.paymentGatewayLabel || "Buy Now"}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {safePage > 1 && (
                  <a href={pageHref(safePage - 1)} onClick={(e) => { e.preventDefault(); updateParams("page", safePage - 1); }} className="rounded-pill border border-outline/30 px-4 py-2 text-muted transition-all hover:border-primary hover:text-white">← Previous</a>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <a key={p} href={pageHref(p)} onClick={(e) => { e.preventDefault(); updateParams("page", p); }} aria-current={p === safePage ? "page" : undefined} className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${p === safePage ? "bg-primary text-on-primary" : "border border-outline/30 text-muted hover:border-primary hover:text-white"}`}>{p}</a>
                ))}
                {safePage < totalPages && (
                  <a href={pageHref(safePage + 1)} onClick={(e) => { e.preventDefault(); updateParams("page", safePage + 1); }} className="rounded-pill border border-outline/30 px-4 py-2 text-muted transition-all hover:border-primary hover:text-white">Next →</a>
                )}
              </div>
            )}
          </div>

          {/* Shop by Brand — cross-links to per-brand catalog pages */}
          <div className="mt-20 border-t border-white/10 pt-12 lg:col-span-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">Shop by Brand</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["canon", "hp", "kyocera", "xerox", "ricoh", "brother", "sharp", "epson", "lexmark", "samsung"].map((slug) => (
                <a
                  key={slug}
                  href={`/brands/${slug}/`}
                  className="rounded-pill border border-outline/30 px-6 py-3 capitalize text-muted transition-all hover:border-primary hover:text-white"
                >
                  {slug}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </>
  );
}
