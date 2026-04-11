"use client";

import { useState, useEffect } from "react";

interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  altText: string;
  imageWidth: number;
  imageHeight: number;
  heroImage: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

const initialBrands: Brand[] = [
  { id: "1", name: "HP", slug: "hp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/HP_logo.svg/512px-HP_logo.svg.png", altText: "HP Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1612815154858-60aa4c84e6ac?w=800&q=80", description: "HP printers and MFPs", isActive: true, sortOrder: 1 },
  { id: "2", name: "Canon", slug: "canon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Canon_logo.svg/512px-Canon_logo.svg.png", altText: "Canon Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80", description: "Canon imageRUNNER series", isActive: true, sortOrder: 2 },
  { id: "3", name: "Xerox", slug: "xerox", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Xerox_logo.svg/512px-Xerox_logo.svg.png", altText: "Xerox Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80", description: "Xerox AltaLink and VersaLink", isActive: true, sortOrder: 3 },
  { id: "4", name: "Ricoh", slug: "ricoh", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ricoh_logo.svg/512px-Ricoh_logo.svg.png", altText: "Ricoh Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", description: "Ricoh IM and MP series", isActive: true, sortOrder: 4 },
  { id: "5", name: "Kyocera", slug: "kyocera", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kyocera_logo.svg/512px-Kyocera_logo.svg.png", altText: "Kyocera Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1516959511247-47f1dd3f9931?w=800&q=80", description: "Kyocera TASKalfa series", isActive: true, sortOrder: 5 },
  { id: "6", name: "Brother", slug: "brother", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brother_Logo.svg/512px-Brother_Logo.svg.png", altText: "Brother Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1625846579064-358872420434?w=800&q=80", description: "Brother laser and inkjet", isActive: true, sortOrder: 6 },
  { id: "7", name: "Samsung", slug: "samsung", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Samsung_Logo.svg/512px-Samsung_Logo.svg.png", altText: "Samsung Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1632882765546-1c976638b544?w=800&q=80", description: "Samsung office printers", isActive: true, sortOrder: 7 },
  { id: "8", name: "Lexmark", slug: "lexmark", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lexmark_Logo.svg/512px-Lexmark_Logo.svg.png", altText: "Lexmark Printer Logo", imageWidth: 512, imageHeight: 512, heroImage: "https://images.unsplash.com/photo-1579766594465-98a3d2c6a3b7?w=800&q=80", description: "Lexmark enterprise printers", isActive: true, sortOrder: 8 },
];

const API_BASE = '/api';

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${API_BASE}/brands`);
      const data = await res.json();
      
      if (data.brands && data.brands.length > 0) {
        const mapped = data.brands.map((b: any) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          logoUrl: b.logoUrl,
          description: b.description || '',
          isActive: b.isActive === 1,
          sortOrder: b.sortOrder || 0,
        }));
        setBrands(mapped);
      } else {
        setBrands(initialBrands);
        localStorage.setItem("sahara_brands", JSON.stringify(initialBrands));
      }
    } catch (error) {
      console.error('Failed to fetch brands from API:', error);
      const stored = localStorage.getItem("sahara_brands");
      if (stored) {
        setBrands(JSON.parse(stored));
      } else {
        setBrands(initialBrands);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveBrands = (newBrands: Brand[]) => {
    setBrands(newBrands);
    localStorage.setItem("sahara_brands", JSON.stringify(newBrands));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this brand?")) {
      saveBrands(brands.filter(b => b.id !== id));
    }
  };

  const handleToggle = async (id: string) => {
    const brand = brands.find(b => b.id === id);
    if (brand) {
      try {
        await fetch(`${API_BASE}/brands`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...brand, isActive: brand.isActive ? 0 : 1 })
        });
      } catch (e) {
        console.log('API not available');
      }
    }
    saveBrands(brands.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  const handleSave = async (brand: Brand) => {
    try {
      await fetch(`${API_BASE}/brands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...brand,
          isActive: brand.isActive ? 1 : 0
        })
      });
    } catch (e) {
      console.log('API not available');
    }
    
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
    id: "", name: "", slug: "", logoUrl: "", altText: "", imageWidth: 512, imageHeight: 512, heroImage: "", description: "", isActive: true, sortOrder: 0
  });
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [convertToWebp, setConvertToWebp] = useState(true);

  const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 512, height: 512 });
      img.src = src;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      if (convertToWebp) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/convert-image", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          const dims = await getImageDimensions(data.url);
          setForm(prev => ({ ...prev, logoUrl: data.url, imageWidth: dims.width, imageHeight: dims.height, altText: prev.altText || `${prev.name} logo` }));
        } else {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const result = reader.result as string;
            const dims = await getImageDimensions(result);
            setForm(prev => ({ ...prev, logoUrl: result, imageWidth: dims.width, imageHeight: dims.height, altText: prev.altText || `${prev.name} logo` }));
          };
          reader.readAsDataURL(file);
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const result = reader.result as string;
          const dims = await getImageDimensions(result);
          setForm(prev => ({ ...prev, logoUrl: result, imageWidth: dims.width, imageHeight: dims.height, altText: prev.altText || `${prev.name} logo` }));
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as string;
        const dims = await getImageDimensions(result);
        setForm(prev => ({ ...prev, logoUrl: result, imageWidth: dims.width, imageHeight: dims.height }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
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
        setForm(prev => ({ 
          ...prev, 
          logoUrl: data.url, 
          imageWidth: dims.width, 
          imageHeight: dims.height,
          altText: prev.altText || `${prev.name} logo`
        }));
      }
      setImageUrl("");
    } catch (error) {
      console.error("Fetch failed:", error);
      setImageUrl("");
    } finally {
      setConverting(false);
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
            <div className="flex items-center gap-3 mb-3">
              <label className="flex-1 cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                  {uploading ? "Uploading..." : form.logoUrl ? "Change Image" : "Upload Image"}
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={convertToWebp} onChange={(e) => setConvertToWebp(e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm text-slate-400">Convert to WebP</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Or fetch from URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="flex-1 bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                placeholder="https://example.com/logo.png" 
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
          {form.logoUrl && (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                <img src={form.logoUrl} alt={form.altText || "Preview"} className="w-full h-full object-contain" />
              </div>
              <button onClick={() => setForm(prev => ({ ...prev, logoUrl: "", imageWidth: 512, imageHeight: 512 }))} className="text-slate-400 hover:text-red-400 text-sm">
                Remove
              </button>
            </div>
          )}
          {form.logoUrl && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Alt Text (SEO)</label>
                <input 
                  type="text" 
                  value={form.altText} 
                  onChange={(e) => setForm({ ...form, altText: e.target.value })} 
                  className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-2 px-3 text-white text-sm" 
                  placeholder="Brand logo for SEO"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Width</label>
                <input 
                  type="number" 
                  value={form.imageWidth} 
                  onChange={(e) => setForm({ ...form, imageWidth: parseInt(e.target.value) || 512 })} 
                  className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-2 px-3 text-white text-sm" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Height</label>
                <input 
                  type="number" 
                  value={form.imageHeight} 
                  onChange={(e) => setForm({ ...form, imageHeight: parseInt(e.target.value) || 512 })} 
                  className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-2 px-3 text-white text-sm" 
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Hero Image (Brand Page)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={form.heroImage || ""} 
                onChange={(e) => setForm({ ...form, heroImage: e.target.value })} 
                className="flex-1 bg-[#101c2e] border border-white/10 rounded-xl py-2 px-3 text-white text-sm" 
                placeholder="https://example.com/hero-image.webp"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Hero image displayed on brand page (recommended: 800x600px WebP)</p>
            {form.heroImage && (
              <div className="mt-2 w-24 h-16 rounded-lg bg-white/10 overflow-hidden">
                <img src={form.heroImage} alt="Hero" className="w-full h-full object-cover" />
              </div>
            )}
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