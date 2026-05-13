"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  position: string;
  isActive: boolean;
  sortOrder: number;
}

const initialBanners: Banner[] = [
  { id: "1", title: "Printer Rental Starting from AED 300/mo", subtitle: "Full maintenance included. No hidden costs.", ctaText: "Get Quote", ctaLink: "/get-quote", imageUrl: "", position: "hero", isActive: true, sortOrder: 1 },
];

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const { showToast, ToastElement } = useToast();

  useEffect(() => {
    fetch('/api/banners')
      .then(r => r.json())
      .then(data => {
        if (data.banners?.length) {
          setBanners(data.banners);
        } else {
          const stored = localStorage.getItem("sahara_banners");
          setBanners(stored ? JSON.parse(stored) : initialBanners);
        }
      })
      .catch(() => {
        const stored = localStorage.getItem("sahara_banners");
        setBanners(stored ? JSON.parse(stored) : initialBanners);
      });
  }, []);

  const saveBanners = (newBanners: Banner[]) => {
    setBanners(newBanners);
    localStorage.setItem("sahara_banners", JSON.stringify(newBanners));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    try {
      await fetch(`/api/banners?id=${id}`, { method: 'DELETE' });
    } catch (e) { console.error('Delete failed:', e); }
    saveBanners(banners.filter(b => b.id !== id));
    showToast('success', 'Banner deleted');
  };

  const handleToggle = (id: string) => {
    saveBanners(banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  const handleSave = async (banner: Banner) => {
    const finalBanner = editingBanner ? banner : { ...banner, id: Date.now().toString() };
    try {
      await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalBanner),
      });
    } catch (e) { console.error('Save failed:', e); }
    if (editingBanner) {
      saveBanners(banners.map(b => b.id === banner.id ? finalBanner : b));
    } else {
      saveBanners([...banners, finalBanner]);
    }
    setShowModal(false);
    setEditingBanner(null);
    showToast('success', editingBanner ? 'Banner updated' : 'Banner created');
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Banners</h1>
              <p className="text-slate-400 mt-1">Manage homepage banners and CTAs</p>
            </div>
            <button onClick={() => { setEditingBanner(null); setShowModal(true); }} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Banner
            </button>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Banner</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Position</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">CTA</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Order</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.id} className="border-b border-white/5">
                      <td className="p-4">
                        <p className="font-medium text-white">{banner.title}</p>
                        <p className="text-sm text-slate-400">{banner.subtitle}</p>
                      </td>
                      <td className="p-4 text-slate-300 capitalize">{banner.position.replace("_", " ")}</td>
                      <td className="p-4 text-slate-300">{banner.ctaText}</td>
                      <td className="p-4">
                        <button onClick={() => handleToggle(banner.id)} className={`px-3 py-1 rounded-full text-xs font-medium ${banner.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {banner.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4 text-slate-400">{banner.sortOrder}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingBanner(banner); setShowModal(true); }} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handleDelete(banner.id)} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400">
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

      {showModal && (
        <BannerModal banner={editingBanner} onSave={handleSave} onClose={() => { setShowModal(false); setEditingBanner(null); }} />
      )}
    </div>
  );
}

function BannerModal({ banner, onSave, onClose }: { banner: Banner | null; onSave: (b: Banner) => void; onClose: () => void }) {
  const [form, setForm] = useState<Banner>(banner || {
    id: "", title: "", subtitle: "", ctaText: "Get Quote", ctaLink: "/get-quote", imageUrl: "", position: "hero", isActive: true, sortOrder: 0
  });
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [convertToWebp, setConvertToWebp] = useState(true);

  const positions = [
    { value: "hero", label: "Hero (Homepage Banner)" },
    { value: "mid_page", label: "Mid Page" },
    { value: "footer_cta", label: "Footer CTA" },
  ];

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
          setForm(prev => ({ ...prev, imageUrl: data.url }));
        } else {
          const reader = new FileReader();
          reader.onloadend = () => setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
          reader.readAsDataURL(file);
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = () => setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      const reader = new FileReader();
      reader.onloadend = () => setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
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
      
      if (data.url && data.format !== 'original') {
        setForm(prev => ({ ...prev, imageUrl: data.url }));
      } else if (data.url && data.note) {
        setForm(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        setForm(prev => ({ ...prev, imageUrl: imageUrl }));
      }
      setImageUrl("");
    } catch (error) {
      console.error("Fetch failed:", error);
      setForm(prev => ({ ...prev, imageUrl: imageUrl }));
      setImageUrl("");
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{banner ? "Edit Banner" : "Add Banner"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">CTA Text</label>
              <input type="text" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">CTA Link</label>
              <input type="text" value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
              <select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white">
                {positions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Banner Image</label>
            <div className="flex items-center gap-3 mb-3">
              <label className="flex-1 cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                  {uploading ? "Uploading..." : form.imageUrl ? "Change Image" : "Upload Image"}
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
                placeholder="https://example.com/banner.jpg" 
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

          {form.imageUrl && (
            <div className="flex items-center gap-3">
              <div className="w-32 h-20 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setForm(prev => ({ ...prev, imageUrl: "" }))} className="text-slate-400 hover:text-red-400 text-sm">
                Remove
              </button>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button onClick={() => onSave(form)} className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02]">Save Banner</button>
          </div>
        </div>
      </div>
    </div>
  );
}