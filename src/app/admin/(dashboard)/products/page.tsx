"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";
import { persistImageIfStaged, deleteRemoteImage } from "@/lib/imageUpload";
import CloudImagePicker from "@/components/admin/CloudImagePicker";

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
  { id: "1",  name: "imageRUNNER ADVANCE C5500",  brand: "Canon",   category: "MFP",         condition: "New",         priceSale: "Contact for Pricing", priceRental: "AED 800/mo",   specs: ["55 PPM", "Full Color", "A3 Support", "Network Ready"],      image: "/images/printer-canon-1.webp",  isActive: true, isFeatured: true  },
  { id: "2",  name: "DesignJet Z9+ PostScript",   brand: "HP",      category: "Plotters",    condition: "Refurbished", priceSale: "AED 12,000",           priceRental: "AED 600/mo",   specs: ["44-inch Roll", "2400 DPI", "PostScript", "HP Stitch"],      image: "/images/printer-hp.svg",       isActive: true, isFeatured: false },
  { id: "3",  name: "TASKalfa 6003i Series",      brand: "Kyocera", category: "MFP",         condition: "New",         priceSale: "Contact for Pricing", priceRental: "AED 950/mo",   specs: ["60 PPM", "Monochrome", "HyPAS Platform", "1200 DPI"],       image: "/images/printer-kyocera.webp",  isActive: true, isFeatured: false },
  { id: "4",  name: "AltaLink C8170",             brand: "Xerox",   category: "MFP",         condition: "New",         priceSale: "Contact for Pricing", priceRental: "AED 1,100/mo", specs: ["10\" UI Tablet", "ConnectKey", "Color", "70 PPM"],           image: "/images/printer-xerox.webp",    isActive: true, isFeatured: true  },
  { id: "5",  name: "imagePROGRAF PRO-4100",      brand: "Canon",   category: "Plotters",    condition: "New",         priceSale: "AED 18,000",           priceRental: "AED 1,200/mo", specs: ["12-Color Ink", "44-inch Roll", "2400 DPI", "Data Encrypt"], image: "/images/printer-canon-1.webp",  isActive: true, isFeatured: false },
  { id: "6",  name: "LaserJet Managed E82560",    brand: "HP",      category: "A3 Printers", condition: "New",         priceSale: "Contact for Pricing", priceRental: "AED 750/mo",   specs: ["Wolf Security", "Energy Star", "56 PPM", "Duplex"],         image: "/images/printer-hp.svg",       isActive: true, isFeatured: true  },
  { id: "7",  name: "HL-L6400DW Enterprise",      brand: "Brother", category: "A4 Printers", condition: "New",         priceSale: "AED 2,800",            priceRental: "AED 400/mo",   specs: ["50 PPM", "Duplex", "Wi-Fi Direct", "250-sheet Tray"],       image: "/images/printer-brother.webp",  isActive: true, isFeatured: false },
  { id: "8",  name: "MP 2555SP",                  brand: "Ricoh",   category: "MFP",         condition: "New",         priceSale: "AED 4,500",            priceRental: "AED 500/mo",   specs: ["25 PPM", "Copy/Print/Scan", "600 DPI", "Network Ready"],    image: "/images/printer-ricoh.webp",    isActive: true, isFeatured: false },
  { id: "9",  name: "ProXpress M4580FX",          brand: "Samsung", category: "MFP",         condition: "Refurbished", priceSale: "AED 3,200",            priceRental: "AED 350/mo",   specs: ["43 PPM", "Fax Ready", "Duplex", "Auto Sort"],               image: "/images/printer-samsung.webp",  isActive: true, isFeatured: false },
  { id: "10", name: "MS431dn Laser",              brand: "Lexmark", category: "A4 Printers", condition: "Refurbished", priceSale: "AED 2,000",            priceRental: "AED 300/mo",   specs: ["42 PPM", "1200 DPI", "512MB RAM", "USB 3.0"],               image: "/images/printer-lexmark.webp",  isActive: true, isFeatured: false },
  { id: "11", name: "M6635cidn Color MFP",        brand: "Kyocera", category: "MFP",         condition: "New",         priceSale: "Contact for Pricing", priceRental: "AED 700/mo",   specs: ["35 PPM", "Full Color", "Duplex", "Gigabit Ethernet"],       image: "/images/printer-kyocera.webp",  isActive: true, isFeatured: false },
  { id: "12", name: "Color LaserJet Pro M479fdw", brand: "HP",      category: "MFP",         condition: "New",         priceSale: "AED 3,500",            priceRental: "AED 450/mo",   specs: ["27 PPM Color", "Wi-Fi", "Fax", "Touch Display"],            image: "/images/heroBnr1.webp",         isActive: true, isFeatured: false },
];

const API_BASE = '/api';

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
function resolveImg(image: string, brand: string): string {
  // Preserve Cloudinary/external URLs as-is
  if (image && image.startsWith("http")) return image;
  if (!image || (CANON_ONLY.has(image) && brand !== "Canon")) {
    return BRAND_IMAGES[brand] || "/images/printer-canon-1.webp";
  }
  return image;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { showToast, ToastElement } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/`);
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
          image: resolveImg(p.image, p.brand),
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
        const parsed = JSON.parse(stored);
        setProducts(parsed.map((p: any) => ({ ...p, image: resolveImg(p.image, p.brand) })));
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
      const row = products.find(p => p.id === id);
      try {
        const res = await fetch(`${API_BASE}/products/?id=${id}`, { method: 'DELETE' });
        if (res.ok && row?.image) await deleteRemoteImage(row.image);
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
        await fetch(`${API_BASE}/products/`, {
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
    const product = products.find(p => p.id === id);
    if (product) {
      try {
        await fetch(`${API_BASE}/products/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, specs: product.specs.join('|'), isActive: product.isActive ? 1 : 0, isFeatured: product.isFeatured ? 0 : 1 })
        });
      } catch { /* continue with local */ }
    }
    saveProducts(products.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
  };

  const handleSave = async (product: Product) => {
    const id = editingProduct ? product.id : Date.now().toString();
    const oldImage = editingProduct?.image ?? '';
    let finalImage: string;
    try {
      finalImage = await persistImageIfStaged(product.image);
    } catch {
      showToast('error', 'Image upload failed — try again');
      return;
    }
    const finalProduct = { ...product, id, image: finalImage };
    try {
      const res = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...finalProduct,
          specs: finalProduct.specs.join('|'),
          isActive: finalProduct.isActive ? 1 : 0,
          isFeatured: finalProduct.isFeatured ? 1 : 0,
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (finalImage !== oldImage) await deleteRemoteImage(finalImage);
        showToast('error', data.error || 'Failed to save to database');
        return;
      }
    } catch {
      if (finalImage !== oldImage) await deleteRemoteImage(finalImage);
      showToast('error', 'Network error. Please try again.');
      return;
    }
    if (oldImage && oldImage !== finalImage) await deleteRemoteImage(oldImage);
    if (editingProduct) {
      saveProducts(products.map(p => p.id === product.id ? finalProduct : p));
    } else {
      saveProducts([...products, finalProduct]);
    }
    setShowModal(false);
    setEditingProduct(null);
    showToast('success', editingProduct ? 'Product updated' : 'Product created');
  };

  const filteredProducts = products.filter(p => {
    if (filter === "active") return p.isActive;
    if (filter === "inactive") return !p.isActive;
    if (filter === "featured") return p.isFeatured;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
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
                  {loading ? (
                    Array(8).fill(null).map((_, i) => (
                      <tr key={`skel-${i}`} className="border-b border-white/5">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#1a2d4a]" />
                            <div className="h-4 w-32 rounded bg-[#1a2d4a]" />
                          </div>
                        </td>
                        <td className="p-4"><div className="h-4 w-16 rounded bg-[#1a2d4a]" /></td>
                        <td className="p-4"><div className="h-4 w-20 rounded bg-[#1a2d4a]" /></td>
                        <td className="p-4"><div className="h-4 w-16 rounded bg-[#1a2d4a]" /></td>
                        <td className="p-4"><div className="h-4 w-24 rounded bg-[#1a2d4a]" /></td>
                        <td className="p-4"><div className="h-6 w-16 rounded-full bg-[#1a2d4a]" /></td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#1a2d4a]" />
                            <div className="w-8 h-8 rounded-lg bg-[#1a2d4a]" />
                            <div className="w-8 h-8 rounded-lg bg-[#1a2d4a]" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : filteredProducts.map((product) => (
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
  const [converting, setConverting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [convertToWebp, setConvertToWebp] = useState(true);

  const brands = ["HP", "Canon", "Xerox", "Kyocera", "Ricoh", "Brother", "Sharp", "Epson"];
  const categories = ["MFP", "A3 Printers", "A4 Printers", "Plotters", "Color", "Monochrome"];

  const handleUrlFetch = async () => {
    if (!imageUrl) return;
    setConverting(true);
    try {
      const res = await fetch("/api/convert-image/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl })
      });
      const data = await res.json();
      
      if (data.url && data.format !== 'original') {
        setForm(prev => ({ ...prev, image: data.url }));
      } else if (data.url && data.note) {
        setForm(prev => ({ ...prev, image: data.url }));
      } else {
        setForm(prev => ({ ...prev, image: imageUrl }));
      }
      setImageUrl("");
    } catch (error) {
      console.error("Fetch failed:", error);
      setForm(prev => ({ ...prev, image: imageUrl }));
      setImageUrl("");
    } finally {
      setConverting(false);
    }
  };

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

          <CloudImagePicker
            label="Product Image"
            value={form.image}
            onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Or fetch from URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="flex-1 bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                placeholder="https://example.com/image.jpg" 
              />
              <button 
                onClick={handleUrlFetch} 
                disabled={converting || !imageUrl}
                className="px-4 py-2 rounded-xl bg-[#f5be53] text-[#412d00] font-medium hover:bg-[#c8962e] disabled:opacity-50"
              >
                {converting ? "..." : "Fetch"}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Fetches image and automatically converts to WebP</p>
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