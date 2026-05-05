"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "boneyard-js/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

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
};
const CANON_ONLY = new Set(["/images/heroPrntr1.webp", "/images/printer-canon-2.webp"]);
function localImg(image: string, brand: string): string {
  if (!image || !image.startsWith("/") || (CANON_ONLY.has(image) && brand !== "Canon")) {
    return BRAND_IMAGES[brand] || "/images/printer-canon-1.webp";
  }
  return image;
}

const defaultProducts = [
  { id: "1",  name: "imageRUNNER ADVANCE C5500", brand: "Canon",   category: "MFP",        condition: "New",         priceRental: "AED 800/mo",   specs: ["55 PPM", "Full Color", "A3 Support", "Network Ready"],       image: "/images/printer-canon-1.webp",   isActive: true },
  { id: "2",  name: "LaserJet Managed E82560",   brand: "HP",      category: "A3 Printers", condition: "New",         priceRental: "AED 750/mo",   specs: ["Wolf Security", "Energy Star", "56 PPM", "Duplex"],          image: "/images/printer-hp.svg",        isActive: true },
  { id: "3",  name: "TASKalfa 6003i Series",     brand: "Kyocera", category: "MFP",        condition: "New",         priceRental: "AED 950/mo",   specs: ["60 PPM", "Monochrome", "HyPAS Platform", "1200 DPI"],        image: "/images/printer-kyocera.webp",   isActive: true },
  { id: "4",  name: "AltaLink C8170",            brand: "Xerox",   category: "MFP",        condition: "New",         priceRental: "AED 1,100/mo", specs: ['10" UI Tablet', "ConnectKey", "Color", "70 PPM"],            image: "/images/printer-xerox.webp",     isActive: true },
  { id: "5",  name: "HL-L6400DW Enterprise",     brand: "Brother", category: "A4 Printers", condition: "New",         priceRental: "AED 400/mo",   specs: ["50 PPM", "Duplex", "Wi-Fi Direct", "250-sheet Tray"],       image: "/images/printer-brother.webp",   isActive: true },
  { id: "6",  name: "MP 2555SP",                 brand: "Ricoh",   category: "MFP",        condition: "New",         priceRental: "AED 500/mo",   specs: ["25 PPM", "Copy/Print/Scan", "600 DPI", "Network Ready"],     image: "/images/printer-ricoh.webp",     isActive: true },
  { id: "7",  name: "ProXpress M4580FX",         brand: "Samsung", category: "MFP",        condition: "Refurbished", priceRental: "AED 350/mo",   specs: ["43 PPM", "Fax Ready", "Duplex", "Auto Sort"],               image: "/images/printer-samsung.webp",   isActive: true },
  { id: "8",  name: "MS431dn Laser",             brand: "Lexmark", category: "A4 Printers", condition: "Refurbished", priceRental: "AED 300/mo",   specs: ["42 PPM", "1200 DPI", "512MB RAM", "USB 3.0"],               image: "/images/printer-lexmark.webp",   isActive: true },
  { id: "9",  name: "M6635cidn Color MFP",       brand: "Kyocera", category: "MFP",        condition: "New",         priceRental: "AED 700/mo",   specs: ["35 PPM", "Full Color", "Duplex", "Gigabit Ethernet"],       image: "/images/printer-kyocera.webp",   isActive: true },
  { id: "10", name: "Color LaserJet Pro M479fdw", brand: "HP",     category: "MFP",        condition: "New",         priceRental: "AED 450/mo",   specs: ["27 PPM Color", "Wi-Fi", "Fax", "Touch Display"],            image: "/images/heroBnr1.webp",          isActive: true },
  { id: "11", name: "imagePROGRAF PRO-4100",     brand: "Canon",   category: "Plotters",   condition: "New",         priceRental: "AED 1,200/mo", specs: ["12-Color Ink", "44-inch Roll", "2400 DPI", "Data Encrypt"],  image: "/images/printer-canon-1.webp",   isActive: true },
  { id: "12", name: "DesignJet Z9+ PostScript",  brand: "HP",      category: "Plotters",   condition: "Refurbished", priceRental: "AED 600/mo",   specs: ["44-inch Roll", "2400 DPI", "PostScript", "HP Stitch"],      image: "/images/printer-hp.svg",        isActive: true },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } catch {
        // API unavailable
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
  }, []);

  const activeProducts = products.filter(p => p.isActive);
  const brands = Array.from(new Set(activeProducts.map(p => p.brand))).sort();
  const categories = Array.from(new Set(activeProducts.map(p => p.category))).sort();
  const conditions = Array.from(new Set(activeProducts.map(p => p.condition))).sort();

  const filteredProducts = activeProducts.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (selectedConditions.length > 0 && !selectedConditions.includes(p.condition)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const resetPage = () => setCurrentPage(1);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    resetPage();
  };
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    resetPage();
  };
  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]);
    resetPage();
  };

  const pageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i);
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      <div className="pt-24 pb-40 px-8 min-h-screen">
        <header className="max-w-7xl mx-auto mb-12">
          <nav className="flex mb-6 text-sm font-medium text-[#d3c5b0] gap-2 items-center">
            <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#f5be53]">Products</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                Precision <span className="text-[#f5be53]">Equipments</span>
              </h1>
              <p className="text-[#d3c5b0] max-w-xl text-lg">
                Harness the power of industrial-grade reliability. Curated technology for the high-performance executive office.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-[#101c2e] p-1 rounded-full">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-full flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-[#f5be53] text-[#412d00]" : "text-[#d3c5b0] hover:text-white"}`}
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-full flex items-center justify-center transition-all ${viewMode === "list" ? "bg-[#f5be53] text-[#412d00]" : "text-[#d3c5b0] hover:text-white"}`}
              >
                <span className="material-symbols-outlined">list</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="space-y-10">
            <div className="relative">
              <input
                className="w-full bg-[#142032] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#f5be53] text-white placeholder:text-[#d3c5b0]/50"
                placeholder="Search models..."
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); resetPage(); }}
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#d3c5b0]">search</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#f5be53]">Brand</h3>
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-[#4f4536] bg-[#142032] text-[#f5be53] focus:ring-[#f5be53]/20"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className="text-[#d3c5b0] group-hover:text-white transition-colors">{brand}</span>
                </label>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#f5be53]">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${selectedCategories.includes(cat) ? "bg-[#f5be53] text-[#412d00] border-[#f5be53]" : "border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#f5be53]">Condition</h3>
              <div className="space-y-2">
                {conditions.map(cond => (
                  <div
                    key={cond}
                    onClick={() => toggleCondition(cond)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${selectedConditions.includes(cond) ? "bg-[#142032] border-[#f5be53]" : "bg-[#101c2e] border-[#4f4536]/10 hover:border-[#f5be53]/30"}`}
                  >
                    <span className="text-white">{cond === "New" ? "Brand New" : cond}</span>
                    <span className={`material-symbols-outlined text-lg ${selectedConditions.includes(cond) ? "text-[#f5be53]" : "text-[#d3c5b0]"}`}>
                      {cond === "New" ? "verified" : "history"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {(selectedBrands.length > 0 || selectedCategories.length > 0 || selectedConditions.length > 0 || searchQuery) && (
              <button
                onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setSelectedConditions([]); setSearchQuery(""); resetPage(); }}
                className="w-full py-2 rounded-xl border border-[#4f4536] text-[#d3c5b0] hover:border-red-400 hover:text-red-400 text-sm transition-all"
              >
                Clear Filters
              </button>
            )}
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#d3c5b0] text-sm">
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> products
                {totalPages > 1 && <span> — Page <span className="text-white font-bold">{safePage}</span> of <span className="text-white font-bold">{totalPages}</span></span>}
              </p>
            </div>

            {loading ? (
              <Skeleton
                name="product-grid"
                loading={true}
                color="rgba(26,45,74,0.9)"
                darkColor="rgba(30,52,85,0.9)"
                animate="shimmer"
                stagger={80}
              >
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {Array(9).fill(null).map((_, i) => (
                    <div key={i} className="glass-card rounded-[2rem] overflow-hidden flex flex-col">
                      <div className="h-64 bg-[#142032]" />
                      <div className="p-6 flex-1 flex flex-col gap-4">
                        <div className="h-6 rounded-lg bg-[#1a2d4a] w-3/4" />
                        <div className="grid grid-cols-2 gap-3">
                          {Array(4).fill(null).map((__, j) => (
                            <div key={j} className="h-4 rounded bg-[#1a2d4a]" />
                          ))}
                        </div>
                        <div className="mt-auto flex flex-col gap-3 pt-2">
                          <div className="h-5 rounded-lg bg-[#1a2d4a] w-1/3" />
                          <div className="h-12 rounded-2xl bg-[#1a2d4a]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Skeleton>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-24 text-[#d3c5b0]">
                <span className="material-symbols-outlined text-5xl text-[#4f4536] mb-4 block">search_off</span>
                No products match your filters.
              </div>
            ) : (
              <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {paginatedProducts.map(product => (
                  <div key={product.id} className={`glass-card rounded-[2rem] overflow-hidden flex flex-col group hover:translate-y-[-8px] transition-all duration-500 ${viewMode === "list" ? "flex-row" : ""}`}>
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-40 flex-shrink-0" : "h-64"}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/printer-canon-1.webp"; }}
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-[#c8962e]/90 text-[#412d00] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter backdrop-blur-md">
                          {product.brand}
                        </span>
                        <span className="bg-[#071325]/80 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter backdrop-blur-md">
                          {product.condition}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {(product.specs || []).slice(0, 4).map((spec: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#f5be53] text-lg">speed</span>
                            <span className="text-xs text-[#d3c5b0]">{spec}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto">
                        <p className="text-[#f5be53] font-bold text-lg mb-4">{product.priceRental || "Contact for Pricing"}</p>
                        <a href="/get-quote" className="w-full gold-gradient py-4 rounded-2xl text-[#412d00] font-bold text-center hover:shadow-lg hover:shadow-[#f5be53]/20 transition-all block">
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="w-12 h-12 rounded-full border border-[#4f4536] flex items-center justify-center hover:border-[#f5be53] text-[#d3c5b0] hover:text-[#f5be53] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>

                {pageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span key={`ellipsis-${i}`} className="text-[#d3c5b0] px-2">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-12 h-12 rounded-full font-bold transition-all ${page === safePage ? "bg-[#f5be53] text-[#412d00]" : "border border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-[#f5be53]"}`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="w-12 h-12 rounded-full border border-[#4f4536] flex items-center justify-center hover:border-[#f5be53] text-[#d3c5b0] hover:text-[#f5be53] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Printer Rental Products - Sahara Office Equipments",
            "description": "Browse our complete range of printer rental products including Canon, HP, Kyocera, Xerox, and more. Zero deposit rental available across Dubai, Abu Dhabi, and UAE.",
            "url": "https://saharaprinter.com/products",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Available Printer Rental Products",
              "numberOfItems": defaultProducts.length,
              "itemListElement": defaultProducts.map((product, index) => ({
                "@type": "Product",
                "position": index + 1,
                "name": product.name,
                "brand": {
                  "@type": "Brand",
                  "name": product.brand
                },
                "category": product.category,
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "AED",
                  "availability": "https://schema.org/InStock",
                  "price": product.priceRental.replace(/[^\d]/g, ''),
                  "description": product.priceRental
                },
                "description": `${product.brand} ${product.name} - ${product.specs.join(', ')}`
              }))
            }
          })
        }}
      />
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}
