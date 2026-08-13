"use client";

import { useState, useEffect } from "react";
import { Close, ShoppingCart, Build, Settings } from "@mui/icons-material";
import { parsePriceAED, formatAED, isPriced } from "@/lib/price";

interface Supply {
  id: string;
  name: string;
  brand: string;
  category: "Toner" | "Drum" | "Spare Part" | "Maintenance Kit";
  compatibleModels: string;
  color?: string;
  yield: string;
  price: string;
  stock: number;
  image: string;
  isActive: boolean;
  alt_text?: string;
  image_width?: number;
  image_height?: number;
  slug?: string;
}

interface SparePartsCartClientProps {
  defaultSupplies: Supply[];
}

export default function SparePartsCartClient({ defaultSupplies }: SparePartsCartClientProps) {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [cart, setCart] = useState<{ supply: Supply; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState<{
    paymentGatewayEnabled: boolean;
    paymentGatewayUrl: string;
    paymentGatewayLabel: string;
  }>({
    paymentGatewayEnabled: false,
    paymentGatewayUrl: "",
    paymentGatewayLabel: "Buy Now",
  });

  useEffect(() => {
    const stored = localStorage.getItem("sahara_supplies");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSupplies(parsed.filter((s: Supply) => s.isActive));
    } else {
      setSupplies(defaultSupplies);
    }

    // localStorage above is a paint-only cache; always re-fetch from D1 and
    // overwrite it so admin price/stock edits reflect without a manual clear.
    fetch('/api/supplies/', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.supplies) && data.supplies.length > 0) {
          const active = data.supplies
            .map((s: Supply) => ({ ...s, isActive: Boolean(s.isActive) }))
            .filter((s: Supply) => s.isActive);
          setSupplies(active);
          localStorage.setItem("sahara_supplies", JSON.stringify(active));
        }
      })
      .catch(() => {});

    const storedCart = localStorage.getItem("sahara_cart");
    if (storedCart) setCart(JSON.parse(storedCart));

    const applyPayment = (parsed: Record<string, unknown>) => {
      setPaymentSettings({
        paymentGatewayEnabled: Boolean(parsed.paymentGatewayEnabled),
        paymentGatewayUrl: String(parsed.paymentGatewayUrl || ""),
        paymentGatewayLabel: String(parsed.paymentGatewayLabel || "Buy Now"),
      });
    };

    // Fetch from D1 first (real visitors won't have localStorage populated)
    fetch('/api/settings/?key=site_settings')
      .then(r => r.json())
      .then(data => {
        if (data.setting?.value) {
          const parsed = JSON.parse(data.setting.value);
          applyPayment(parsed);
          localStorage.setItem("sahara_settings", JSON.stringify(parsed));
        } else {
          const storedSettings = localStorage.getItem("sahara_settings");
          if (storedSettings) applyPayment(JSON.parse(storedSettings));
        }
      })
      .catch(() => {
        const storedSettings = localStorage.getItem("sahara_settings");
        if (storedSettings) applyPayment(JSON.parse(storedSettings));
      });

    const handleSettingsChange = () => {
      const updated = localStorage.getItem("sahara_settings");
      if (updated) applyPayment(JSON.parse(updated));
    };
    window.addEventListener("sahara-settings-updated", handleSettingsChange);
    return () => window.removeEventListener("sahara-settings-updated", handleSettingsChange);
  }, [defaultSupplies]);

  const addToCart = (supply: Supply) => {
    const existing = cart.find((item) => item.supply.id === supply.id);
    const newCart = existing
      ? cart.map((item) => item.supply.id === supply.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { supply, quantity: 1 }];
    setCart(newCart);
    localStorage.setItem("sahara_cart", JSON.stringify(newCart));
  };

  const removeFromCart = (supplyId: string) => {
    const newCart = cart.filter((item) => item.supply.id !== supplyId);
    setCart(newCart);
    localStorage.setItem("sahara_cart", JSON.stringify(newCart));
  };

  const updateQuantity = (supplyId: string, quantity: number) => {
    if (quantity < 1) { removeFromCart(supplyId); return; }
    const newCart = cart.map((item) => item.supply.id === supplyId ? { ...item, quantity } : item);
    setCart(newCart);
    localStorage.setItem("sahara_cart", JSON.stringify(newCart));
  };

  const cartTotal = cart.reduce((acc, item) => acc + parsePriceAED(item.supply.price) * item.quantity, 0);
  const hasUnpricedItems = cart.some((item) => !isPriced(item.supply.price));

  const filteredSupplies = supplies.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.compatibleModels.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    const matchesBrand = brandFilter === "all" || s.brand === brandFilter;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const brands = Array.from(new Set(supplies.map((s) => s.brand)));
  const categories = ["Toner", "Drum", "Spare Part", "Maintenance Kit"];

  const getColorDot = (color?: string) => {
    if (!color) return null;
    const colors: Record<string, string> = { Black: "#1a1a1a", Cyan: "#00bcd4", Yellow: "#ffeb3b", Magenta: "#e91e63" };
    return <span className="inline-block w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: colors[color] || "#888" }} />;
  };

  return (
    <>
      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity ${showCart ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a1425] shadow-2xl p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
            <button onClick={() => setShowCart(false)} aria-label="Close cart" className="text-slate-400 hover:text-white"><Close /></button>
          </div>
          {cart.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.supply.id} className="glass-card p-4 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="text-white font-medium text-sm">{item.supply.name}</p>
                        <p className="text-slate-400 text-xs">{item.supply.brand} - {item.supply.color || item.supply.category}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.supply.id)} aria-label={`Remove ${item.supply.name} from cart`} className="text-slate-400 hover:text-red-400"><Close sx={{ fontSize: 18 }} /></button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.supply.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.supply.name}`} className="w-8 h-8 rounded-lg bg-[#101c2e] text-white flex items-center justify-center">-</button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.supply.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.supply.name}`} className="w-8 h-8 rounded-lg bg-[#101c2e] text-white flex items-center justify-center">+</button>
                      </div>
                      <span className="text-[#f5be53] font-medium">{item.supply.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-white font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{formatAED(cartTotal)}</span>
                </div>
                {hasUnpricedItems && (
                  <div className="mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                    Some items show &quot;Contact for Pricing&quot; and can&apos;t be paid for online yet — request a quote and our team will confirm pricing.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hasUnpricedItems ? (
                    <span className="block w-full bg-slate-700 text-slate-400 py-4 rounded-xl font-bold text-center cursor-not-allowed" title="Remove unpriced items to pay online">
                      Pay Now
                    </span>
                  ) : (
                    <a href="/checkout/" onClick={() => setShowCart(false)} className="block w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold text-center hover:scale-[1.02] transition-transform">
                      Pay Now
                    </a>
                  )}
                  <a href="/request-quote/" onClick={() => setShowCart(false)} className="block w-full border-2 border-[#f5be53]/60 text-[#f5be53] py-4 rounded-xl font-bold text-center hover:bg-[#f5be53]/10 transition-colors">
                    Request Quotation
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <section className="py-8 px-8 lg:px-24 bg-[#0a1425] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input type="text" placeholder="Search by product name or model..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-400" />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white">
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white">
              <option value="all">All Brands</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-400">Showing {filteredSupplies.length} products</p>
            <button onClick={() => setShowCart(true)} className="hidden lg:flex items-center gap-3 glass-card px-6 py-3 rounded-full">
              <ShoppingCart className="text-[#f5be53]" />
              <span className="text-white font-medium">Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupplies.map((supply) => (
              <div key={supply.id} className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <div className="h-48 bg-[#142032] relative overflow-hidden">
                  {supply.image ? (
                    <img
                      src={supply.image}
                      alt={supply.alt_text || supply.name}
                      width={supply.image_width || 800}
                      height={supply.image_height || 800}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center${supply.image ? " hidden" : ""}`}>
                    {supply.category === "Toner" && supply.color ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-28 rounded-lg border-2 border-white/20 flex items-center justify-center">
                          <div className="w-16 h-24 rounded" style={{ backgroundColor: supply.color === "Black" ? "#1a1a1a" : supply.color === "Cyan" ? "#00bcd4" : supply.color === "Yellow" ? "#ffeb3b" : supply.color === "Magenta" ? "#e91e63" : "#888" }} />
                        </div>
                        <span className="text-slate-500 text-sm">{supply.color} Toner</span>
                      </div>
                    ) : supply.category === "Drum" ? (
                      <div className="flex flex-col items-center gap-4">
                        <Settings sx={{ fontSize: 60 }} className="text-6xl text-slate-600" />
                        <span className="text-slate-500 text-sm">OPC Drum</span>
                      </div>
                    ) : (
                      <Build sx={{ fontSize: 60 }} className="text-6xl text-slate-600" />
                    )}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${supply.category === "Toner" ? "bg-blue-500/80 text-white" : supply.category === "Drum" ? "bg-purple-500/80 text-white" : supply.category === "Spare Part" ? "bg-orange-500/80 text-white" : "bg-green-500/80 text-white"}`}>{supply.category}</span>
                  </div>
                  {supply.stock > 0 && <div className="absolute top-3 right-3"><span className="bg-green-500/80 text-white px-2 py-1 rounded-full text-xs">In Stock</span></div>}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#f5be53] uppercase tracking-widest">{supply.brand}</span>
                    {getColorDot(supply.color)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {supply.slug ? (
                      <a href={`/services/printer-spare-parts/${supply.slug}/`} className="hover:text-[#f5be53] transition-colors">{supply.name}</a>
                    ) : supply.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-2">Fits: {supply.compatibleModels}</p>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>Yield: {supply.yield}</span>
                    <span>Stock: {supply.stock}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#f5be53] font-bold text-lg">{supply.price}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => addToCart(supply)} disabled={supply.stock === 0} className={`px-4 py-2 rounded-lg font-medium transition-all ${supply.stock > 0 ? "bg-[#f5be53] text-[#412d00] hover:scale-105" : "bg-slate-600 text-slate-400 cursor-not-allowed"}`}>Add to Cart</button>
                      {paymentSettings.paymentGatewayEnabled && paymentSettings.paymentGatewayUrl && (
                        <a href={paymentSettings.paymentGatewayUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg font-medium transition-all border border-[#f5be53]/60 text-[#f5be53] hover:bg-[#f5be53]/10">{paymentSettings.paymentGatewayLabel}</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredSupplies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Cart Button */}
      <button onClick={() => setShowCart(true)} className="lg:hidden fixed bottom-24 right-6 z-40 bg-[#f5be53] text-[#412d00] px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <ShoppingCart />
        <span className="font-bold">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
      </button>
    </>
  );
}