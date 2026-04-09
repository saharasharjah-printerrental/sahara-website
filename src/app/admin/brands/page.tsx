"use client";

import { useState, useEffect } from "react";

interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

const initialBrands: Brand[] = [
  { id: "1", name: "HP", slug: "hp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/HP_logo.svg/512px-HP_logo.svg.png", description: "HP printers and MFPs", isActive: true, sortOrder: 1 },
  { id: "2", name: "Canon", slug: "canon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Canon_logo.svg/512px-Canon_logo.svg.png", description: "Canon imageRUNNER series", isActive: true, sortOrder: 2 },
  { id: "3", name: "Xerox", slug: "xerox", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Xerox_logo.svg/512px-Xerox_logo.svg.png", description: "Xerox AltaLink and VersaLink", isActive: true, sortOrder: 3 },
  { id: "4", name: "Ricoh", slug: "ricoh", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ricoh_logo.svg/512px-Ricoh_logo.svg.png", description: "Ricoh IM and MP series", isActive: true, sortOrder: 4 },
  { id: "5", name: "Kyocera", slug: "kyocera", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kyocera_logo.svg/512px-Kyocera_logo.svg.png", description: "Kyocera TASKalfa series", isActive: true, sortOrder: 5 },
  { id: "6", name: "Brother", slug: "brother", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brother_Logo.svg/512px-Brother_Logo.svg.png", description: "Brother laser and inkjet", isActive: true, sortOrder: 6 },
  { id: "7", name: "Sharp", slug: "sharp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Sharp_logo.svg/512px-Sharp_logo.svg.png", description: "Sharp BP series", isActive: true, sortOrder: 7 },
  { id: "8", name: "Epson", slug: "epson", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Epson_logo.svg/512px-Epson_logo.svg.png", description: "Epson business printers", isActive: true, sortOrder: 8 },
];

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_brands");
    if (stored) {
      setBrands(JSON.parse(stored));
    } else {
      setBrands(initialBrands);
      localStorage.setItem("sahara_brands", JSON.stringify(initialBrands));
    }
  }, []);

  const saveBrands = (newBrands: Brand[]) => {
    setBrands(newBrands);
    localStorage.setItem("sahara_brands", JSON.stringify(newBrands));
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this brand?")) {
      saveBrands(brands.filter(b => b.id !== id));
    }
  };

  const handleToggle = (id: string) => {
    saveBrands(brands.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  const handleSave = (brand: Brand) => {
    if (editingBrand) {
      saveBrands(brands.map(b => b.id === brand.id ? brand : b));
    } else {
      saveBrands([...brands, { ...brand, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingBrand(null);
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Brands</h1>
              <p className="text-slate-400 mt-1">Manage printer brands</p>
            </div>
            <button onClick={() => { setEditingBrand(null); setShowModal(true); }} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Brand
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                    {brand.logoUrl ? (
                      <img src={brand.logoUrl} alt={brand.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <span className="material-symbols-outlined text-3xl text-slate-400">business</span>
                    )}
                  </div>
                  <button onClick={() => handleToggle(brand.id)} className={`px-3 py-1 rounded-full text-xs font-medium ${brand.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {brand.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{brand.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{brand.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingBrand(brand); setShowModal(true); }} className="flex-1 py-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white text-sm">Edit</button>
                  <button onClick={() => handleDelete(brand.id)} className="py-2 px-3 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <BrandModal brand={editingBrand} onSave={handleSave} onClose={() => { setShowModal(false); setEditingBrand(null); }} />
      )}
    </div>
  );
}

function BrandModal({ brand, onSave, onClose }: { brand: Brand | null; onSave: (b: Brand) => void; onClose: () => void }) {
  const [form, setForm] = useState<Brand>(brand || {
    id: "", name: "", slug: "", logoUrl: "", description: "", isActive: true, sortOrder: 0
  });
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setForm(prev => ({ ...prev, logoUrl: base64 }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{brand ? "Edit Brand" : "Add Brand"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Brand Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Logo</label>
            <div className="flex gap-3 items-center">
              <label className="flex-1 cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                  {uploading ? "Uploading..." : form.logoUrl ? "Change Image" : "Upload Image"}
                </div>
              </label>
              {form.logoUrl && (
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  <img src={form.logoUrl} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Or paste Logo URL</label>
            <input type="text" value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white h-20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-5 h-5 rounded" />
              <span className="text-white">Active</span>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button onClick={() => onSave(form)} className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02]">Save Brand</button>
          </div>
        </div>
      </div>
    </div>
  );
}