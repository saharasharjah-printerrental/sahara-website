"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

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
  Sharp: "/images/printer-sharp.webp",
  Epson: "/images/printer-epson.webp",
};
const CANON_ONLY = new Set(["/images/heroPrntr1.webp", "/images/printer-canon-2.webp"]);
function localImg(image: string, brand: string): string {
  if (image && image.startsWith("http")) return image;
  if (image && image.startsWith("/") && !(CANON_ONLY.has(image) && brand !== "Canon")) return image;
  return BRAND_IMAGES[brand] || "/images/printer-canon-1.webp";
}

const defaultProducts = [
  { id: "1", name: "imageRUNNER ADVANCE C5500", brand: "Canon", category: "MFP", condition: "New", priceRental: "AED 800/mo", specs: ["55 PPM", "Full Color", "A3 Support", "Network Ready"], image: "/images/printer-canon-1.webp", isActive: true },
  { id: "2", name: "LaserJet Managed E82560", brand: "HP", category: "A3 Printers", condition: "New", priceRental: "AED 750/mo", specs: ["Wolf Security", "Energy Star", "56 PPM", "Duplex"], image: "/images/printer-hp.svg", isActive: true },
  { id: "3", name: "TASKalfa 6003i Series", brand: "Kyocera", category: "MFP", condition: "New", priceRental: "AED 950/mo", specs: ["60 PPM", "Monochrome", "HyPAS Platform", "1200 DPI"], image: "/images/printer-kyocera.webp", isActive: true },
  { id: "4", name: "AltaLink C8170", brand: "Xerox", category: "MFP", condition: "New", priceRental: "AED 1,100/mo", specs: ['10" UI Tablet', "ConnectKey", "Color", "70 PPM"], image: "/images/printer-xerox.webp", isActive: true },
  { id: "5", name: "HL-L6400DW Enterprise", brand: "Brother", category: "A4 Printers", condition: "New", priceRental: "AED 400/mo", specs: ["50 PPM", "Duplex", "Wi-Fi Direct", "250-sheet Tray"], image: "/images/printer-brother.webp", isActive: true },
  { id: "6", name: "MP 2555SP", brand: "Ricoh", category: "MFP", condition: "New", priceRental: "AED 500/mo", specs: ["25 PPM", "Copy/Print/Scan", "600 DPI", "Network Ready"], image: "/images/printer-ricoh.webp", isActive: true },
  { id: "7", name: "ProXpress M4580FX", brand: "Samsung", category: "MFP", condition: "Refurbished", priceRental: "AED 350/mo", specs: ["43 PPM", "Fax Ready", "Duplex", "Auto Sort"], image: "/images/printer-samsung.webp", isActive: true },
  { id: "8", name: "MS431dn Laser", brand: "Lexmark", category: "A4 Printers", condition: "Refurbished", priceRental: "AED 300/mo", specs: ["42 PPM", "1200 DPI", "512MB RAM", "USB 3.0"], image: "/images/printer-lexmark.webp", isActive: true },
  { id: "9", name: "M6635cidn Color MFP", brand: "Kyocera", category: "MFP", condition: "New", priceRental: "AED 700/mo", specs: ["35 PPM", "Full Color", "Duplex", "Gigabit Ethernet"], image: "/images/printer-kyocera.webp", isActive: true },
  { id: "10", name: "Color LaserJet Pro M479fdw", brand: "HP", category: "MFP", condition: "New", priceRental: "AED 450/mo", specs: ["27 PPM Color", "Wi-Fi", "Fax", "Touch Display"], image: "/images/heroBnr1.webp", isActive: true },
  { id: "11", name: "imagePROGRAF PRO-4100", brand: "Canon", category: "Plotters", condition: "New", priceRental: "AED 1,200/mo", specs: ["12-Color Ink", "44-inch Roll", "2400 DPI", "Data Encrypt"], image: "/images/printer-canon-1.webp", isActive: true },
  { id: "12", name: "DesignJet Z9+ PostScript", brand: "HP", category: "Plotters", condition: "Refurbished", priceRental: "AED 600/mo", specs: ["44-inch Roll", "2400 DPI", "PostScript", "HP Stitch"], image: "/images/printer-hp.svg", isActive: true },
  { id: "13", name: "BP-70C31 Color MFP", brand: "Sharp", category: "MFP", condition: "New", priceRental: "AED 650/mo", specs: ["31 PPM Color", "A3 Support", "Cloud Connect", "Duplex"], image: "/images/printer-sharp.webp", isActive: true },
  { id: "14", name: "EcoTank L15150 Wide-Format", brand: "Epson", category: "A3 Printers", condition: "New", priceRental: "AED 480/mo", specs: ["25 PPM Color", "A3+ Support", "Wi-Fi Direct", "Low Cost/Page"], image: "/images/printer-epson.webp", isActive: true },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
      const stored = localStorage.getItem("sahara_products");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProducts(parsed.map((p: any) => ({ ...p, image: localImg(p.image, p.brand) })));
      } else {
        setProducts(defaultProducts);
      }
      setLoading(false);
    })();
  }, []);

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
    router.push(`/products?${params.toString()}`);
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
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="pt-32 pb-8 px-8 lg:px-24">
          <header className="max-w-7xl mx-auto mb-12">
            <nav className="flex mb-6 text-sm font-medium text-[#d3c5b0] gap-2 items-center">
              <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#f5be53]">Products</span>
            </nav>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4">Precision <span className="text-[#f5be53]">Equipments</span></h1>
                <p className="text-[#d3c5b0] max-w-xl text-lg">Harness the power of industrial-grade reliability. Curated technology for the high-performance executive office.</p>
              </div>
              <div className="flex items-center gap-4 bg-[#101c2e] p-1 rounded-full">
                <button onClick={() => setViewMode("grid")} className={`p-3 rounded-full flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-[#f5be53] text-[#412d00]" : "text-[#d3c5b0] hover:text-white"}`}>
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button onClick={() => setViewMode("list")} className={`p-3 rounded-full flex items-center justify-center transition-all ${viewMode === "list" ? "bg-[#f5be53] text-[#412d00]" : "text-[#d3c5b0] hover:text-white"}`}>
                  <span className="material-symbols-outlined">list</span>
                </button>
              </div>
            </div>
          </header>
        </section>

        {/* Exclusive Distributor Callout */}
        <div className="max-w-7xl mx-auto px-8 lg:px-0 mb-4">
          <a
            href="/bravo-card-printers-uae"
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-[#0d1a2e] to-[#091524] border border-[#f5be53]/25 rounded-2xl p-5 hover:border-[#f5be53]/50 transition-colors group"
          >
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-2xl">🏅</span>
              <div>
                <p className="text-[9px] font-bold text-[#f5be53] uppercase tracking-[0.2em]">Exclusive UAE Distributor</p>
                <p className="text-white font-bold text-base leading-tight">Bravo Card Printers — RTAI & DC 3300</p>
              </div>
            </div>
            <p className="text-[#8fa3bc] text-sm sm:ml-auto max-w-sm">
              Sole authorized Bravo Global partner in the UAE. 600 dpi retransfer &amp; direct-to-card ID printers for enterprise, government &amp; education.
            </p>
            <span className="text-[#f5be53] text-sm font-semibold group-hover:translate-x-1 transition-transform shrink-0">View →</span>
          </a>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="space-y-10">
            <div className="relative">
              <input className="w-full bg-[#142032] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#f5be53] text-white placeholder:text-[#d3c5b0]/50" placeholder="Search models..." type="text" value={searchQuery} onChange={(e) => updateParams("search", e.target.value)} />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#d3c5b0]">search</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#f5be53]">Brand</h3>
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-[#4f4536] bg-[#142032] text-[#f5be53] focus:ring-[#f5be53]/20" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                  <span className="text-[#d3c5b0] group-hover:text-white transition-colors">{brand}</span>
                </label>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#f5be53]">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => toggleCategory(cat)} className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${selectedCategories.includes(cat) ? "bg-[#f5be53] text-[#412d00] border-[#f5be53]" : "border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white"}`}>{cat}</button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#f5be53]">Condition</h3>
              <div className="space-y-2">
                {conditions.map((cond) => (
                  <div key={cond} onClick={() => toggleCondition(cond)} className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${selectedConditions.includes(cond) ? "bg-[#142032] border-[#f5be53]" : "bg-[#101c2e] border-[#4f4536]/10 hover:border-[#f5be53]/30"}`}>
                    <span className="text-white">{cond === "New" ? "Brand New" : cond}</span>
                    <span className={`material-symbols-outlined text-lg ${selectedConditions.includes(cond) ? "text-[#f5be53]" : "text-[#d3c5b0]"}`}>{cond === "New" ? "verified" : "history"}</span>
                  </div>
                ))}
              </div>
            </div>

            {(selectedBrands.length > 0 || selectedCategories.length > 0 || selectedConditions.length > 0 || searchQuery) && (
              <button onClick={clearFilters} className="w-full py-2 rounded-xl border border-[#4f4536] text-[#d3c5b0] hover:border-red-400 hover:text-red-400 text-sm transition-all">Clear Filters</button>
            )}
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#d3c5b0] text-sm">Showing <span className="text-white font-bold">{filteredProducts.length}</span> products{totalPages > 1 && <span> — Page <span className="text-white font-bold">{safePage}</span> of <span className="text-white font-bold">{totalPages}</span></span>}</p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(null).map((_, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                    <div className="h-48 bg-[#142032] rounded-xl mb-4" />
                    <div className="h-6 bg-[#142032] rounded mb-2" />
                    <div className="h-4 bg-[#142032] rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-6xl text-[#d3c5b0] mb-4">inventory_2</span>
                <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
                <p className="text-[#d3c5b0]">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {paginatedProducts.map((p) => (
                  <div key={p.id} className="glass-card rounded-2xl overflow-hidden group">
                    <div className="h-48 bg-[#142032] relative overflow-hidden">
                      {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />}
                      {p.brand && <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#f5be53] uppercase tracking-widest">{p.brand}</div>}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.specs?.slice(0, 3).map((spec: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-[#142032] rounded-full text-xs text-[#d3c5b0]">{spec}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5be53] font-bold text-lg">{p.priceRental}</span>
                        <span className="text-white text-sm">{p.condition === "New" ? "Brand New" : p.condition}</span>
                      </div>
                      {paymentSettings.paymentGatewayEnabled && paymentSettings.paymentGatewayUrl && (
                        <a
                          href={paymentSettings.paymentGatewayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 block w-full text-center bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
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
              <div className="flex justify-center gap-2 mt-12">
                {safePage > 1 && (
                  <button onClick={() => updateParams("page", safePage - 1)} className="px-4 py-2 rounded-full border border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white transition-all">← Previous</button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => updateParams("page", p)} className={`w-10 h-10 rounded-full font-bold transition-all ${p === safePage ? "bg-[#f5be53] text-[#412d00]" : "border border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white"}`}>{p}</button>
                ))}
                {safePage < totalPages && (
                  <button onClick={() => updateParams("page", safePage + 1)} className="px-4 py-2 rounded-full border border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white transition-all">Next →</button>
                )}
              </div>
            )}
          </div>

          {/* Shop by Brand — cross-links to per-brand catalog pages */}
          <div className="mt-20 pt-12 border-t border-[#4f4536]/30">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Shop by Brand</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["canon", "hp", "kyocera", "xerox", "ricoh", "brother", "sharp", "epson", "lexmark", "samsung"].map((slug) => (
                <a
                  key={slug}
                  href={`/brands/${slug}/`}
                  className="px-6 py-3 rounded-full border border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white transition-all capitalize"
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