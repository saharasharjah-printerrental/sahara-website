"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  condition: string;
  priceSale: string;
  priceRental: string;
  specs: string[];
  image: string;
  isActive: boolean;
  isFeatured: boolean;
}

const initialProducts: Product[] = [
  { id: "1", name: "imageRUNNER ADVANCE C5500", brand: "Canon", category: "MFP", condition: "New", priceSale: "Contact for Pricing", priceRental: "AED 800/mo", specs: ["55 PPM", "Full Color"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq", isActive: true, isFeatured: true },
  { id: "2", name: "DesignJet Z9+ PostScript", brand: "HP", category: "Plotters", condition: "Refurbished", priceSale: "AED 12,000", priceRental: "AED 600/mo", specs: ["44-inch Roll", "2400 DPI"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX", isActive: true, isFeatured: false },
  { id: "3", name: "TASKalfa 6003i Series", brand: "Kyocera", category: "MFP", condition: "New", priceSale: "Contact for Pricing", priceRental: "AED 950/mo", specs: ["60 PPM", "Monochrome"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX", isActive: true, isFeatured: false },
  { id: "4", name: "Xerox AltaLink C8170", brand: "Xerox", category: "MFP", condition: "New", priceSale: "Contact for Pricing", priceRental: "AED 1,100/mo", specs: ["10\" UI Tablet", "ConnectKey"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq", isActive: true, isFeatured: true },
  { id: "5", name: "imagePROGRAF PRO-4100", brand: "Canon", category: "Plotters", condition: "New", priceSale: "AED 18,000", priceRental: "AED 1,200/mo", specs: ["12-Color Ink", "Data Encrypt"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq", isActive: true, isFeatured: false },
  { id: "6", name: "LaserJet Managed E82560", brand: "HP", category: "A3 Printers", condition: "New", priceSale: "Contact for Pricing", priceRental: "AED 750/mo", specs: ["Wolf Security", "Energy Star"], image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr1lJJ4I71i6lOkkqq4p_2Aev6e3vmkP04ntBdotbP5s7Vb-kVyBUl9pzhg6mvZjX2soHsv1gNmzsq2AYeOwNfvZTQ28_8OQElDPtitchQSFyfM36CTbQ8HwGiYfCfzFeldUnAiU9Sm1jvba2MU1j1BFrUbvdvQ55mOLIkbQerOOKk12uXa9nXdkVJcCIceNvY8XSYOoNwzRQ5R3wZN-DyMhqPR2YGZHLCeAZXpQI2CfR68zt6a2ivQRXDtzNtbQu18tjA-wyBtX", isActive: true, isFeatured: true },
];

const API_BASE = '/api';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      
      if (data.products && data.products.length > 0) {
        const mapped = data.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.category,
          condition: p.condition,
          priceSale: p.priceSale,
          priceRental: p.priceRental,
          specs: p.specs ? p.specs.split('|') : [],
          image: p.image,
          isActive: p.isActive === 1,
          isFeatured: p.isFeatured === 1,
        }));
        setProducts(mapped);
      } else {
        setProducts(initialProducts);
        localStorage.setItem("sahara_products", JSON.stringify(initialProducts));
      }
    } catch (error) {
      console.error('Failed to fetch products from API, falling back to localStorage:', error);
      const stored = localStorage.getItem("sahara_products");
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        setProducts(initialProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveProducts = async (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("sahara_products", JSON.stringify(newProducts));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`${API_BASE}/products?id=${id}`, { method: 'DELETE' });
      } catch (e) {
        console.log('API not available, local delete only');
      }
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggleActive = async (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p);
    const product = products.find(p => p.id === id);
    if (product) {
      try {
        await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, isActive: product.isActive ? 0 : 1, isActiveNumber: product.isActive ? 0 : 1 })
        });
      } catch (e) {
        console.log('API not available, local only');
      }
    }
    saveProducts(updated);
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p);
    saveProducts(updated);
  };

  const handleSave = async (product: Product) => {
    try {
      await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          specs: product.specs.join('|'),
          isActive: product.isActive ? 1 : 0,
          isFeatured: product.isFeatured ? 1 : 0
        })
      });
    } catch (e) {
      console.log('API not available, local only');
    }
    
    if (editingProduct) {
      saveProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      saveProducts([...products, { ...product, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => {
    if (filter === "active") return p.isActive;
    if (filter === "inactive") return !p.isActive;
    if (filter === "featured") return p.isFeatured;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Products</h1>
              <p className="text-slate-400 mt-1">Manage your product inventory</p>
            </div>
            <button
              onClick={() => { setEditingProduct(null); setShowModal(true); }}
              className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Add Product
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            {["all", "active", "inactive", "featured"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-[#f5be53] text-[#412d00]"
                    : "bg-[#101c2e] text-slate-400 hover:text-white"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Table */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Product</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Brand</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Category</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Condition</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Rental Price</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/5">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="font-medium text-white">{product.name}</p>
                            {product.isFeatured && (
                              <span className="text-xs text-[#f5be53]">Featured</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">{product.brand}</td>
                      <td className="p-4 text-slate-300">{product.category}</td>
                      <td className="p-4 text-slate-300">{product.condition}</td>
                      <td className="p-4 text-[#f5be53] font-medium">{product.priceRental}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleActive(product.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.isActive
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingProduct(product); setShowModal(true); }}
                            className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(product.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              product.isFeatured
                                ? "bg-[#f5be53]/20 text-[#f5be53]"
                                : "bg-[#101c2e] text-slate-400 hover:text-white"
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">star</span>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onSave, onClose }: { product: Product | null; onSave: (p: Product) => void; onClose: () => void }) {
  const [form, setForm] = useState<Product>(product || {
    id: "",
    name: "",
    brand: "HP",
    category: "MFP",
    condition: "New",
    priceSale: "",
    priceRental: "",
    specs: [],
    image: "",
    isActive: true,
    isFeatured: false,
  });

  const brands = ["HP", "Canon", "Xerox", "Kyocera", "Ricoh", "Brother", "Sharp", "Epson"];
  const categories = ["MFP", "A3 Printers", "A4 Printers", "Plotters", "Color", "Monochrome"];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{product ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Brand</label>
              <select
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              >
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Condition</label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              >
                <option>New</option>
                <option>Refurbished</option>
                <option>Used</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Rental Price</label>
              <input
                type="text"
                value={form.priceRental}
                onChange={(e) => setForm({ ...form, priceRental: e.target.value })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                placeholder="AED 800/mo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Specs (comma separated)</label>
            <input
              type="text"
              value={form.specs.join(", ")}
              onChange={(e) => setForm({ ...form, specs: e.target.value.split(", ").filter(s => s) })}
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              placeholder="55 PPM, Full Color"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform"
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}