"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import { CloseIcon, ShoppingCartIcon, Inventory, LocalShippingIcon, BuildIcon, SpeedIcon, CheckCircleIcon, Delete, SettingsIcon, VerifiedIcon, SyncIcon } from "@/components/icons/index";

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
}

const defaultSupplies: Supply[] = [
  { id: "1", name: "Canon C5045/5051/5250/5255 Toner Premium Black C-EXV 28", brand: "Canon", category: "Toner", compatibleModels: "C5045, C5051, C5250, C5255", color: "Black", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "2", name: "Canon C5045/5051/5250/5255 Toner Premium Cyan C-EXV 28", brand: "Canon", category: "Toner", compatibleModels: "C5045, C5051, C5250, C5255", color: "Cyan", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "3", name: "Canon C5045/5051/5250/5255 Toner Premium Yellow C-EXV 28", brand: "Canon", category: "Toner", compatibleModels: "C5045, C5051, C5250, C5255", color: "Yellow", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "4", name: "Canon C5045/5051/5250/5255 Toner Premium Magenta C-EXV 28", brand: "Canon", category: "Toner", compatibleModels: "C5045, C5051, C5250, C5255", color: "Magenta", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "5", name: "Canon C5035/5040/5235/5240 Toner Premium Black C-EXV 29", brand: "Canon", category: "Toner", compatibleModels: "C5035, C5040, C5235, C5240", color: "Black", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "6", name: "Canon C5035/5040/5235/5240 Toner Premium Cyan C-EXV 29", brand: "Canon", category: "Toner", compatibleModels: "C5035, C5040, C5235, C5240", color: "Cyan", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "7", name: "Canon C5035/5040/5235/5240 Toner Premium Yellow C-EXV 29", brand: "Canon", category: "Toner", compatibleModels: "C5035, C5040, C5235, C5240", color: "Yellow", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "8", name: "Canon C5035/5040/5235/5240 Toner Premium Magenta C-EXV 29", brand: "Canon", category: "Toner", compatibleModels: "C5035, C5040, C5235, C5240", color: "Magenta", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "9", name: "Compatible C-EXV51 Toner Cartridge for imageRUNNER Advance C5535/C5540/C5550/C5560", brand: "Canon", category: "Toner", compatibleModels: "C5535, C5540, C5550, C5560", color: "Black", yield: "36,000 pages", price: "Contact for Pricing", stock: 25, image: "", isActive: true },
  { id: "10", name: "Long Life OPC Drum for Canon IR ADVANCE C5535 C5540 C5550 C5560", brand: "Canon", category: "Drum", compatibleModels: "C5535, C5540, C5550, C5560, IRC 5535, 5540, 5550", yield: "150,000 pages", price: "Contact for Pricing", stock: 15, image: "", isActive: true },
  { id: "11", name: "Long Life OPC Drum for Canon IR ADVANCE C5235 C5240 C5250 C5255", brand: "Canon", category: "Drum", compatibleModels: "C5235, C5240, C5250, C5255", yield: "120,000 pages", price: "Contact for Pricing", stock: 15, image: "", isActive: true },
  { id: "12", name: "Canon C5045/5250/5550 Paper Pickup Rollers", brand: "Canon", category: "Spare Part", compatibleModels: "C5045, C5250, C5550", yield: "N/A", price: "Contact for Pricing", stock: 20, image: "", isActive: true },
  { id: "13", name: "Canon iR ADVANCE Maintenance Kit", brand: "Canon", category: "Maintenance Kit", compatibleModels: "C5030, C5035, C5045, C5051, C5235, C5240, C5250, C5255", yield: "300,000 pages", price: "Contact for Pricing", stock: 10, image: "", isActive: true },
];

export default function PrinterSparePartsPage() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [cart, setCart] = useState<{ supply: Supply; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [paymentSettingsIcon, setPaymentSettingsIcon] = useState<{
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
      setSupplies(defaultSupplies.filter((s: Supply) => s.isActive));
    }
    const storedCart = localStorage.getItem("sahara_cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const storedSettingsIcon = localStorage.getItem("sahara_SettingsIcon");
    if (storedSettingsIcon) {
      const parsed = JSON.parse(storedSettingsIcon);
      setPaymentSettingsIcon({
        paymentGatewayEnabled: parsed.paymentGatewayEnabled || false,
        paymentGatewayUrl: parsed.paymentGatewayUrl || "",
        paymentGatewayLabel: parsed.paymentGatewayLabel || "Buy Now",
      });
    }

    const handleSettingsIconChange = () => {
      const updated = localStorage.getItem("sahara_SettingsIcon");
      if (updated) {
        const parsed = JSON.parse(updated);
        setPaymentSettingsIcon({
          paymentGatewayEnabled: parsed.paymentGatewayEnabled || false,
          paymentGatewayUrl: parsed.paymentGatewayUrl || "",
          paymentGatewayLabel: parsed.paymentGatewayLabel || "Buy Now",
        });
      }
    };
    window.addEventListener("sahara-SettingsIcon-updated", handleSettingsIconChange);
    return () => window.removeEventListener("sahara-SettingsIcon-updated", handleSettingsIconChange);
  }, []);

  const addToCart = (supply: Supply) => {
    const existing = cart.find((item) => item.supply.id === supply.id);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.supply.id === supply.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { supply, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("sahara_cart", JSON.stringify(newCart));
  };

  const removeFromCart = (supplyId: string) => {
    const newCart = cart.filter((item) => item.supply.id !== supplyId);
    setCart(newCart);
    localStorage.setItem("sahara_cart", JSON.stringify(newCart));
  };

  const updateQuantity = (supplyId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(supplyId);
      return;
    }
    const newCart = cart.map((item) =>
      item.supply.id === supplyId ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem("sahara_cart", JSON.stringify(newCart));
  };

  const cartTotal = cart.reduce(
    (acc, item) => {
      const priceNum = parseInt(item.supply.price.replace(/[^0-9]/g, "") || "0");
      return acc + (item.supply.price === "Contact for Pricing" ? 0 : priceNum * item.quantity);
    },
    0
  );

  const filteredSupplies = supplies.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.compatibleModels.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    const matchesBrand = brandFilter === "all" || s.brand === brandFilter;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const brands = Array.from(new Set(supplies.map((s) => s.brand)));
  const categories = ["Toner", "Drum", "Spare Part", "Maintenance Kit"];

  const getColorDot = (color?: string) => {
    if (!color) return null;
    const colors: Record<string, string> = {
      Black: "#1a1a1a",
      Cyan: "#00bcd4",
      Yellow: "#ffeb3b",
      Magenta: "#e91e63",
    };
    return (
      <span
        className="inline-block w-3 h-3 rounded-full border border-white/30"
        style={{ backgroundColor: colors[color] || "#888" }}
      />
    );
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          showCart ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setShowCart(false)}
        />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a1425] shadow-2xl p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-slate-400 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.supply.id}
                    className="glass-card p-4 rounded-xl"
                  >
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="text-white font-medium text-sm">
                          {item.supply.name}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {item.supply.brand} - {item.supply.color || item.supply.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.supply.id)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <Delete className="text-sm" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.supply.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-lg bg-[#101c2e] text-white flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-white w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.supply.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-lg bg-[#101c2e] text-white flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[#f5be53] font-medium">
                        {item.supply.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-white font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>
                    {cartTotal > 0
                      ? `AED ${cartTotal.toLocaleString()}`
                      : "Contact for Pricing"}
                  </span>
                </div>
                <a
                  href="/get-quote"
                  onClick={() => setShowCart(false)}
                  className="block w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold text-center hover:scale-[1.02] transition-transform"
                >
                  Request Quote
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">
                Genuine Supplies
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                Printer <span className="text-[#f5be53]">Spare Parts</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] max-w-xl">
                Browse our complete Inventory of OEM toners, drums, maintenance kits, and spare
                parts. Same-day delivery across UAE.
              </p>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="hidden lg:flex items-center gap-3 glass-card px-6 py-3 rounded-full"
            >
              <ShoppingCartIcon className="text-[#f5be53]" />
              <span className="text-white font-medium">
                Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-8 lg:px-24 bg-[#0a1425] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search by product name or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-400"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-400">
              Showing {filteredSupplies.length} products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupplies.map((supply) => (
              <div
                key={supply.id}
                className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="h-48 bg-[#142032] relative overflow-hidden">
                  {supply.image ? (
                    <img
                      src={supply.image}
                      alt={supply.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {supply.category === "Toner" && supply.color ? (
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-20 h-28 rounded-lg border-2 border-white/20 flex items-center justify-center">
                            <div
                              className="w-16 h-24 rounded"
                              style={{
                                backgroundColor:
                                  supply.color === "Black"
                                    ? "#1a1a1a"
                                    : supply.color === "Cyan"
                                    ? "#00bcd4"
                                    : supply.color === "Yellow"
                                    ? "#ffeb3b"
                                    : supply.color === "Magenta"
                                    ? "#e91e63"
                                    : "#888",
                              }}
                            />
                          </div>
                          <span className="text-slate-500 text-sm">
                            {supply.color} Toner
                          </span>
                        </div>
                      ) : supply.category === "Drum" ? (
                        <div className="flex flex-col items-center gap-4">
                          <SettingsIcon className="text-6xl text-slate-600" style={{ fontSize: 60 }} />
                          <span className="text-slate-500 text-sm">OPC Drum</span>
                        </div>
                      ) : (
                        <BuildIcon className="text-6xl text-slate-600" style={{ fontSize: 60 }} />
                      )}
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        supply.category === "Toner"
                          ? "bg-blue-500/80 text-white"
                          : supply.category === "Drum"
                          ? "bg-purple-500/80 text-white"
                          : supply.category === "Spare Part"
                          ? "bg-orange-500/80 text-white"
                          : "bg-green-500/80 text-white"
                      }`}
                    >
                      {supply.category}
                    </span>
                  </div>
                  {supply.stock > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500/80 text-white px-2 py-1 rounded-full text-xs">
                        In Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#f5be53] uppercase tracking-widest">
                      {supply.brand}
                    </span>
                    {getColorDot(supply.color)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {supply.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-2">
                    Fits: {supply.compatibleModels}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>Yield: {supply.yield}</span>
                    <span>Stock: {supply.stock}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f5be53] font-bold text-lg">
                      {supply.price}
                    </span>
                    {paymentSettingsIcon.paymentGatewayEnabled && paymentSettingsIcon.paymentGatewayUrl ? (
                      <a
                        href={paymentSettingsIcon.paymentGatewayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg font-medium transition-all bg-[#f5be53] text-[#412d00] hover:scale-105"
                      >
                        {paymentSettingsIcon.paymentGatewayLabel}
                      </a>
                    ) : (
                      <button
                        onClick={() => addToCart(supply)}
                        disabled={supply.stock === 0}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          supply.stock > 0
                            ? "bg-[#f5be53] text-[#412d00] hover:scale-105"
                            : "bg-slate-600 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSupplies.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl text-slate-600 mb-4">🔍</div>
              <p className="text-slate-400 text-lg">
                No products found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: VerifiedIcon,
                title: "Genuine OEM",
                desc: "Only original manufacturer supplies for optimal performance",
              },
              {
                icon: LocalShippingIcon,
                title: "Same-Day Delivery",
                desc: "Express delivery across Dubai, Abu Dhabi, and Sharjah",
              },
              {
                icon: Inventory,
                title: "Bulk Pricing",
                desc: "Volume discounts for businesses with multiple devices",
              },
              {
                icon: SyncIcon,
                title: "Auto-Replenishment",
                desc: "Automatic toner delivery based on usage tracking",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <b.icon className="text-3xl text-[#f5be53] mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">
            Need Supplies?
          </h2>
          <p className="text-[#483200] text-lg mb-8">
            Same-day delivery across the UAE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-quote"
              className="bg-[#071325] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
            >
              Request Quote
            </a>
            <a
              href="/contact"
              className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-4 rounded-full font-bold text-lg backdrop-blur-sm"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />

      {/* Mobile Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="lg:hidden fixed bottom-24 right-6 z-40 bg-[#f5be53] text-[#412d00] px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        <ShoppingCartIcon />
        <span className="font-bold">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
      </button>
    </main>
  );
}
