"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";

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
  altText: string;
  imageWidth: number;
  imageHeight: number;
  isActive: boolean;
}

const initialSupplies: Supply[] = [
  {
    id: "1",
    name: "Canon C5045/5051/5250/5255 Toner Premium Black",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5045, C5051, C5250, C5255",
    color: "Black",
    yield: "25,000 pages",
    price: "Contact for Pricing",
    stock: 50,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "2",
    name: "Canon C5045/5051/5250/5255 Toner Premium Cyan",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5045, C5051, C5250, C5255",
    color: "Cyan",
    yield: "25,000 pages",
    price: "Contact for Pricing",
    stock: 50,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "3",
    name: "Canon C5045/5051/5250/5255 Toner Premium Yellow",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5045, C5051, C5250, C5255",
    color: "Yellow",
    yield: "25,000 pages",
    price: "Contact for Pricing",
    stock: 50,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "4",
    name: "Canon C5045/5051/5250/5255 Toner Premium Magenta",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5045, C5051, C5250, C5255",
    color: "Magenta",
    yield: "25,000 pages",
    price: "Contact for Pricing",
    stock: 50,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "5",
    name: "Canon C5035/5040/5235/5240 Toner Premium Black",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5035, C5040, C5235, C5240",
    color: "Black",
    yield: "23,000 pages",
    price: "Contact for Pricing",
    stock: 30,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "6",
    name: "Canon C5035/5040/5235/5240 Toner Premium Cyan",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5035, C5040, C5235, C5240",
    color: "Cyan",
    yield: "23,000 pages",
    price: "Contact for Pricing",
    stock: 30,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "7",
    name: "Canon C5035/5040/5235/5240 Toner Premium Yellow",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5035, C5040, C5235, C5240",
    color: "Yellow",
    yield: "23,000 pages",
    price: "Contact for Pricing",
    stock: 30,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "8",
    name: "Canon C5035/5040/5235/5240 Toner Premium Magenta",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "C5035, C5040, C5235, C5240",
    color: "Magenta",
    yield: "23,000 pages",
    price: "Contact for Pricing",
    stock: 30,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "9",
    name: "Compatible C-EXV51 Toner Cartridge",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "imageRUNNER Advance C5535, C5540, C5550, C5560",
    color: "Black",
    yield: "36,000 pages",
    price: "Contact for Pricing",
    stock: 25,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "10",
    name: "Long Life OPC Drum for Canon IR ADVANCE C5535 C5540 C5550 C5560",
    brand: "Canon",
    category: "Drum",
    compatibleModels: "C5535, C5540, C5550, C5560, IRC 5535, 5540, 5550",
    yield: "150,000 pages",
    price: "Contact for Pricing",
    stock: 15,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "11",
    name: "Long Life OPC Drum for Canon IR ADVANCE C5235 C5240 C5250 C5255",
    brand: "Canon",
    category: "Drum",
    compatibleModels: "C5235, C5240, C5250, C5255",
    yield: "120,000 pages",
    price: "Contact for Pricing",
    stock: 15,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "12",
    name: "Canon C5045/5250/5550 Paper Pickup Rollers",
    brand: "Canon",
    category: "Spare Part",
    compatibleModels: "C5045, C5250, C5550",
    yield: "N/A",
    price: "Contact for Pricing",
    stock: 20,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
  {
    id: "13",
    name: "Canon iR ADVANCE C5030, 5035, 5045, 5051, 5235, 5240, 5250, 5255 Maintenance Kit",
    brand: "Canon",
    category: "Maintenance Kit",
    compatibleModels: "C5030, C5035, C5045, C5051, C5235, C5240, C5250, C5255",
    yield: "300,000 pages",
    price: "Contact for Pricing",
    stock: 10,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  },
];

export default function AdminSupplies() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSupply, setEditingSupply] = useState<Supply | null>(null);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { showToast, ToastElement } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("sahara_supplies");
    if (stored) {
      setSupplies(JSON.parse(stored));
    } else {
      setSupplies(initialSupplies);
      localStorage.setItem("sahara_supplies", JSON.stringify(initialSupplies));
    }
  }, []);

  const saveSupplies = (newSupplies: Supply[]) => {
    setSupplies(newSupplies);
    localStorage.setItem("sahara_supplies", JSON.stringify(newSupplies));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this supply item?")) {
      saveSupplies(supplies.filter(s => s.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    saveSupplies(supplies.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleSave = (supply: Supply) => {
    if (editingSupply) {
      saveSupplies(supplies.map(s => s.id === supply.id ? supply : s));
    } else {
      saveSupplies([...supplies, { ...supply, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingSupply(null);
    showToast('success', editingSupply ? 'Supply updated' : 'Supply created');
  };

  const filteredSupplies = supplies.filter(s => {
    if (filter === "active" && !s.isActive) return false;
    if (filter === "inactive" && s.isActive) return false;
    if (categoryFilter !== "all" && s.category !== categoryFilter) return false;
    return true;
  });

  const categories = ["Toner", "Drum", "Spare Part", "Maintenance Kit"];
  const brands = ["Canon", "HP", "Xerox", "Kyocera", "Ricoh", "Brother", "Sharp"];

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
              <p className="text-slate-400 mt-1">Manage toners, drums, and spare parts inventory</p>
            </div>
            <button
              onClick={() => { setEditingSupply(null); setShowModal(true); }}
              className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Add Supply
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-slate-400 text-sm">Total Items</p>
              <p className="text-2xl font-bold text-white">{supplies.length}</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-slate-400 text-sm">Toners</p>
              <p className="text-2xl font-bold text-white">{supplies.filter(s => s.category === "Toner").length}</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-slate-400 text-sm">Drums</p>
              <p className="text-2xl font-bold text-white">{supplies.filter(s => s.category === "Drum").length}</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-slate-400 text-sm">Total Stock</p>
              <p className="text-2xl font-bold text-white">{supplies.reduce((acc, s) => acc + s.stock, 0)}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#101c2e] border border-white/10 rounded-lg py-2 px-4 text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {["all", "active", "inactive"].map((f) => (
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

          {/* Supplies Table */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Product</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Brand</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Category</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Compatible Models</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Yield</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Stock</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSupplies.map((supply) => (
                    <tr key={supply.id} className="border-b border-white/5">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#101c2e] flex items-center justify-center">
                            {supply.color ? (
                              <div className="w-6 h-6 rounded-full border-2 border-white/20" style={{ backgroundColor: supply.color.toLowerCase() === 'cyan' ? '#00bcd4' : supply.color.toLowerCase() === 'magenta' ? '#e91e63' : supply.color.toLowerCase() === 'yellow' ? '#ffeb3b' : supply.color.toLowerCase() === 'black' ? '#333' : '#888' }}></div>
                            ) : (
                              <span className="material-symbols-outlined text-slate-400">settings</span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">{supply.name}</p>
                            {supply.color && <span className="text-xs text-slate-500">{supply.color}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">{supply.brand}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          supply.category === "Toner" ? "bg-blue-500/20 text-blue-400" :
                          supply.category === "Drum" ? "bg-purple-500/20 text-purple-400" :
                          supply.category === "Spare Part" ? "bg-orange-500/20 text-orange-400" :
                          "bg-green-500/20 text-green-400"
                        }`}>
                          {supply.category}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300 text-sm">{supply.compatibleModels}</td>
                      <td className="p-4 text-slate-300">{supply.yield}</td>
                      <td className="p-4">
                        <span className={`font-medium ${supply.stock > 10 ? "text-green-400" : supply.stock > 0 ? "text-orange-400" : "text-red-400"}`}>
                          {supply.stock}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleActive(supply.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            supply.isActive
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {supply.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingSupply(supply); setShowModal(true); }}
                            className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(supply.id)}
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
        <SupplyModal
          supply={editingSupply}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingSupply(null); }}
          brands={brands}
          categories={categories}
        />
      )}
    </div>
  );
}

function SupplyModal({ supply, onSave, onClose, brands, categories }: { supply: Supply | null; onSave: (s: Supply) => void; onClose: () => void; brands: string[]; categories: string[] }) {
  const [form, setForm] = useState<Supply>(supply || {
    id: "",
    name: "",
    brand: "Canon",
    category: "Toner",
    compatibleModels: "",
    color: "",
    yield: "",
    price: "Contact for Pricing",
    stock: 0,
    image: "",
    altText: "",
    imageWidth: 800,
    imageHeight: 800,
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [convertToWebp, setConvertToWebp] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const colors = ["Black", "Cyan", "Yellow", "Magenta", "N/A"];

  const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 800, height: 800 });
      img.src = src;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const processImage = async (base64: string) => {
      const dims = await getImageDimensions(base64);
      setForm({ ...form, image: base64, imageWidth: dims.width, imageHeight: dims.height, altText: form.altText || `${form.brand} ${form.name} image` });
      setUploading(false);
    };

    if (convertToWebp) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/convert-image", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          const dims = await getImageDimensions(data.url);
          setForm({ ...form, image: data.url, imageWidth: dims.width, imageHeight: dims.height, altText: form.altText || `${form.brand} ${form.name} image` });
        } else {
          const reader = new FileReader();
          reader.onloadend = async () => await processImage(reader.result as string);
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error("WebP conversion failed:", error);
        const reader = new FileReader();
        reader.onloadend = async () => await processImage(reader.result as string);
        reader.readAsDataURL(file);
      } finally {
        setUploading(false);
      }
    } else {
      const reader = new FileReader();
      reader.onloadend = async () => await processImage(reader.result as string);
      reader.onerror = () => {
        setUploading(false);
        alert("Failed to read file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlFetch = async () => {
    if (!imageUrl) return;
    setConverting(true);
    try {
      const res = await fetch("/api/convert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl })
      });
      const data = await res.json();
      if (data.url) {
        const dims = await getImageDimensions(data.url);
        setForm(prev => ({ ...prev, image: data.url, imageWidth: dims.width, imageHeight: dims.height, altText: prev.altText || `${prev.brand} ${prev.name} image` }));
      } else {
        setForm(prev => ({ ...prev, image: imageUrl }));
      }
      setImageUrl("");
    } catch (error) {
      console.error("Fetch failed:", error);
      setImageUrl("");
    } finally {
      setConverting(false);
    }
  };

  const clearImage = () => {
    setForm({ ...form, image: "", imageWidth: 800, imageHeight: 800 });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{supply ? "Edit Supply" : "Add Supply"}</h2>
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
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {form.category === "Toner" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Color</label>
              <select
                value={form.color || ""}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              >
                {colors.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Compatible Models</label>
            <input
              type="text"
              value={form.compatibleModels}
              onChange={(e) => setForm({ ...form, compatibleModels: e.target.value })}
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              placeholder="e.g., C5045, C5051, C5250"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Page Yield</label>
              <input
                type="text"
                value={form.yield}
                onChange={(e) => setForm({ ...form, yield: e.target.value })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                placeholder="e.g., 25,000 pages"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Stock Quantity</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Price</label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
              placeholder="Contact for Pricing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Product Image</label>
            <div className="flex items-center gap-3 mb-3">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                  {uploading ? "Uploading..." : form.image ? "Change Image" : "Upload Image"}
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={convertToWebp}
                  onChange={(e) => setConvertToWebp(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-slate-400">Convert to WebP</span>
              </label>
            </div>
            <div className="flex gap-2 mb-3">
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="flex-1 bg-[#101c2e] border border-white/10 rounded-xl py-2 px-4 text-white text-sm" 
                placeholder="Or paste image URL" 
              />
              <button 
                onClick={handleUrlFetch} 
                disabled={converting || !imageUrl}
                className="px-4 py-2 rounded-xl bg-[#f5be53] text-[#412d00] font-medium hover:bg-[#c8962e] disabled:opacity-50 text-sm"
              >
                {converting ? "..." : "Fetch"}
              </button>
            </div>
            
            {form.image && (
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  <img src={form.image} alt={form.altText || "Preview"} className="w-full h-full object-contain" />
                </div>
                <button onClick={clearImage} className="text-slate-400 hover:text-red-400 text-sm">
                  Remove
                </button>
              </div>
            )}
            {form.image && (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Alt Text (SEO)</label>
                  <input 
                    type="text" 
                    value={form.altText} 
                    onChange={(e) => setForm({ ...form, altText: e.target.value })} 
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-2 px-3 text-white text-sm" 
                    placeholder="Product image for SEO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Width</label>
                  <input 
                    type="number" 
                    value={form.imageWidth} 
                    onChange={(e) => setForm({ ...form, imageWidth: parseInt(e.target.value) || 800 })} 
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-2 px-3 text-white text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Height</label>
                  <input 
                    type="number" 
                    value={form.imageHeight} 
                    onChange={(e) => setForm({ ...form, imageHeight: parseInt(e.target.value) || 800 })} 
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-2 px-3 text-white text-sm" 
                  />
                </div>
              </div>
            )}
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
              Save Supply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}