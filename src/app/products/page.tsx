"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import MobileNav from "@/components/MobileNav";

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts([
        { id: "1", name: "imageRUNNER ADVANCE C5500", brand: "Canon", category: "MFP", condition: "New", priceRental: "AED 800/mo", specs: ["55 PPM", "Full Color"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq", isActive: true },
        { id: "2", name: "DesignJet Z9+ PostScript", brand: "HP", category: "Plotters", condition: "Refurbished", priceRental: "AED 600/mo", specs: ["44-inch Roll", "2400 DPI"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX", isActive: true },
        { id: "3", name: "TASKalfa 6003i Series", brand: "Kyocera", category: "MFP", condition: "New", priceRental: "AED 950/mo", specs: ["60 PPM", "Monochrome"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX", isActive: true },
        { id: "4", name: "Xerox AltaLink C8170", brand: "Xerox", category: "MFP", condition: "New", priceRental: "AED 1,100/mo", specs: ['10" UI Tablet', "ConnectKey"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq", isActive: true },
        { id: "5", name: "imagePROGRAF PRO-4100", brand: "Canon", category: "Plotters", condition: "New", priceRental: "AED 1,200/mo", specs: ["12-Color Ink", "Data Encrypt"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq", isActive: true },
        { id: "6", name: "LaserJet Managed E82560", brand: "HP", category: "A3 Printers", condition: "New", priceRental: "AED 750/mo", specs: ["Wolf Security", "Energy Star"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX", isActive: true },
      ]);
    }
  }, []);

  const activeProducts = products.filter(p => p.isActive);
  const brands = Array.from(new Set(activeProducts.map(p => p.brand)));
  const categories = Array.from(new Set(activeProducts.map(p => p.category)));
  const conditions = Array.from(new Set(activeProducts.map(p => p.condition)));

  const filteredProducts = activeProducts.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (selectedConditions.length > 0 && !selectedConditions.includes(p.condition)) return false;
    return true;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]);
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      <main className="pt-24 pb-40 px-8 min-h-screen">
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
          <aside className="space-y-10">
            <div className="relative">
              <input
                className="w-full bg-[#142032] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#f5be53] text-white placeholder:text-[#d3c5b0]/50"
                placeholder="Search models..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    <span className="text-white">{cond === "New" ? "Brand New" : "Refurbished"}</span>
                    <span className={`material-symbols-outlined text-lg ${selectedConditions.includes(cond) ? "text-[#f5be53]" : "text-[#d3c5b0]"}`}>
                      {cond === "New" ? "verified" : "history"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {filteredProducts.map(product => (
                <div key={product.id} className="glass-card rounded-[2rem] overflow-hidden flex flex-col group hover:translate-y-[-8px] transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {(product.specs || []).map((spec: string, i: number) => (
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

            <div className="flex justify-center items-center gap-4 py-12">
              <button className="w-12 h-12 rounded-full border border-[#4f4536] flex items-center justify-center hover:border-[#f5be53] text-[#d3c5b0] hover:text-[#f5be53] transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#f5be53] text-[#412d00] font-bold">1</button>
              <button className="w-12 h-12 rounded-full border border-[#4f4536] flex items-center justify-center hover:border-[#f5be53] text-[#d3c5b0] hover:text-[#f5be53] transition-all font-bold">2</button>
              <button className="w-12 h-12 rounded-full border border-[#4f4536] flex items-center justify-center hover:border-[#f5be53] text-[#d3c5b0] hover:text-[#f5be53] transition-all font-bold">3</button>
              <span className="text-[#d3c5b0] px-2">...</span>
              <button className="w-12 h-12 rounded-full border border-[#4f4536] flex items-center justify-center hover:border-[#f5be53] text-[#d3c5b0] hover:text-[#f5be53] transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppCTA />
      <MobileNav />
    </main>
  );
}
