"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Close, ShoppingCart, Build, Settings, Add, Remove } from "@mui/icons-material";
import { formatAED, isPriced } from "@/lib/price";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast";
import CartBar from "@/components/CartBar";
import { resolveWhatsAppNumber, buildWaLink, buildCartQuoteMessage } from "@/lib/whatsapp";

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
  const [showCart, setShowCart] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<{
    paymentGatewayEnabled: boolean;
    paymentGatewayUrl: string;
    paymentGatewayLabel: string;
  }>({
    paymentGatewayEnabled: false,
    paymentGatewayUrl: "",
    paymentGatewayLabel: "Buy Now",
  });

  const { cart, count, total, hasUnpriced, add, remove, setQty } = useCart();
  const { showToast, ToastElement } = useToast();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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

    resolveWhatsAppNumber().then(setWhatsappNumber);

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

  // Drawer a11y: Escape to close, lock body scroll, focus the close button.
  useEffect(() => {
    if (!showCart) return;
    document.body.classList.add("overflow-hidden");
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setShowCart(false); return; }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showCart]);

  const handleAddToCart = useCallback((supply: Supply) => {
    add({ id: supply.id, name: supply.name, brand: supply.brand, price: supply.price, color: supply.color, category: supply.category, slug: supply.slug });
    showToast("success", `${supply.name} added to cart`);
    setJustAdded(supply.id);
    setTimeout(() => setJustAdded((cur) => (cur === supply.id ? null : cur)), 1500);
  }, [add, showToast]);

  const quantityInCart = (supplyId: string) => cart.find((item) => item.supply.id === supplyId)?.quantity ?? 0;

  const sendWhatsAppQuote = async () => {
    const number = whatsappNumber ?? await resolveWhatsAppNumber();
    const message = buildCartQuoteMessage(cart);
    window.open(buildWaLink(number, message), "_blank", "noopener,noreferrer");
    try {
      navigator.sendBeacon(
        "/api/leads/whatsapp/",
        new Blob([JSON.stringify({ message, source: "cart_drawer" })], { type: "application/json" })
      );
    } catch { /* best-effort */ }
  };

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
      {ToastElement}

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity ${showCart ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a1425] shadow-2xl p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
            <button ref={closeBtnRef} onClick={() => setShowCart(false)} aria-label="Close cart" className="text-slate-400 hover:text-white"><Close /></button>
          </div>
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">Your cart is empty</p>
              <button onClick={() => setShowCart(false)} className="text-[#f5be53] font-medium hover:underline">
                Browse Spare Parts &amp; Toners
              </button>
            </div>
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
                      <button onClick={() => remove(item.supply.id)} aria-label={`Remove ${item.supply.name} from cart`} className="text-slate-400 hover:text-red-400"><Close sx={{ fontSize: 18 }} /></button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(item.supply.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.supply.name}`} className="w-8 h-8 rounded-lg bg-[#101c2e] text-white flex items-center justify-center">-</button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button onClick={() => setQty(item.supply.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.supply.name}`} className="w-8 h-8 rounded-lg bg-[#101c2e] text-white flex items-center justify-center">+</button>
                      </div>
                      <span className="text-[#f5be53] font-medium">{item.supply.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-white font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{formatAED(total)}</span>
                </div>
                {hasUnpriced && (
                  <div className="mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                    Some items show &quot;Contact for Pricing&quot; and can&apos;t be paid for online yet — request a quote and our team will confirm pricing.
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3">
                  {hasUnpriced ? (
                    <span className="block w-full bg-slate-700 text-slate-400 py-4 rounded-xl font-bold text-center cursor-not-allowed" title="Remove unpriced items to pay online">
                      Pay Now
                    </span>
                  ) : (
                    <a href="/checkout/" onClick={() => setShowCart(false)} className="block w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold text-center hover:scale-[1.02] transition-transform">
                      Pay Now
                    </a>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <a href="/request-quote/" onClick={() => setShowCart(false)} className="block w-full border-2 border-[#f5be53]/60 text-[#f5be53] py-3.5 rounded-xl font-bold text-center hover:bg-[#f5be53]/10 transition-colors">
                      Email Quote
                    </a>
                    <button onClick={sendWhatsAppQuote} className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-center hover:brightness-110 transition-all">
                      WhatsApp
                    </button>
                  </div>
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
            <button onClick={() => setShowCart(true)} className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
              <ShoppingCart className="text-[#f5be53]" />
              <span className="text-white font-medium">Cart ({count})</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupplies.map((supply) => {
              const inCartQty = quantityInCart(supply.id);
              return (
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
                      {inCartQty > 0 ? (
                        <div className="flex items-center gap-1 bg-[#101c2e] rounded-lg px-1 py-1">
                          <button onClick={() => setQty(supply.id, inCartQty - 1)} aria-label={`Decrease ${supply.name} quantity`} className="w-7 h-7 rounded-md flex items-center justify-center text-white hover:bg-white/10"><Remove sx={{ fontSize: 16 }} /></button>
                          <span className="text-white text-sm w-5 text-center">{inCartQty}</span>
                          <button onClick={() => setQty(supply.id, inCartQty + 1)} aria-label={`Increase ${supply.name} quantity`} className="w-7 h-7 rounded-md flex items-center justify-center text-white hover:bg-white/10"><Add sx={{ fontSize: 16 }} /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(supply)}
                          disabled={supply.stock === 0}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${supply.stock > 0 ? (justAdded === supply.id ? "bg-green-500 text-white" : "bg-[#f5be53] text-[#412d00] hover:scale-105") : "bg-slate-600 text-slate-400 cursor-not-allowed"}`}
                        >
                          {justAdded === supply.id ? "Added ✓" : "Add to Cart"}
                        </button>
                      )}
                      {paymentSettings.paymentGatewayEnabled && paymentSettings.paymentGatewayUrl && (
                        <a href={paymentSettings.paymentGatewayUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg font-medium transition-all border border-[#f5be53]/60 text-[#f5be53] hover:bg-[#f5be53]/10">{paymentSettings.paymentGatewayLabel}</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );})}
          </div>
          {filteredSupplies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      <CartBar onViewCart={() => setShowCart(true)} />
    </>
  );
}
