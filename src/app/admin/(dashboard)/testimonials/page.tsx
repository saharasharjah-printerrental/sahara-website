"use client";

import { useState, useEffect } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import { useToast } from "@/components/admin/Toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
  avatarAlt: string;
  isActive: boolean;
  sortOrder: number;
}

const API_BASE = '/api';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastElement } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      const data = await res.json();
      if (data.testimonials && data.testimonials.length > 0) {
        const mapped = data.testimonials.map((t: any) => ({
          id: t.id,
          name: t.name,
          role: t.role || '',
          text: t.text,
          rating: t.rating || 5,
          avatarUrl: t.image_url || t.avatarUrl || '',
          avatarAlt: t.avatarAlt || '',
          isActive: t.is_active === 1 || t.is_active === true || t.isActive === 1 || t.isActive === true,
          sortOrder: t.sort_order ?? t.sortOrder ?? 0,
        }));
        setTestimonials(mapped);
        localStorage.setItem("sahara_testimonials", JSON.stringify(mapped));
      } else {
        const stored = localStorage.getItem("sahara_testimonials");
        if (stored) setTestimonials(JSON.parse(stored));
      }
    } catch {
      const stored = localStorage.getItem("sahara_testimonials");
      if (stored) setTestimonials(JSON.parse(stored));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`${API_BASE}/testimonials?id=${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Delete failed:', e);
    }
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem("sahara_testimonials", JSON.stringify(updated));
    showToast('success', 'Testimonial deleted');
  };

  const handleToggle = async (id: string) => {
    const t = testimonials.find(t => t.id === id);
    if (!t) return;
    const updated = testimonials.map(x => x.id === id ? { ...x, isActive: !x.isActive } : x);
    setTestimonials(updated);
    localStorage.setItem("sahara_testimonials", JSON.stringify(updated));
    try {
      await fetch(`${API_BASE}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...t, is_active: t.isActive ? 0 : 1, isActive: t.isActive ? 0 : 1 })
      });
    } catch (e) {
      console.error('Toggle failed:', e);
    }
  };

  const handleSave = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`${API_BASE}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testimonial,
          isActive: testimonial.isActive ? 1 : 0,
          is_active: testimonial.isActive ? 1 : 0,
          image_url: testimonial.avatarUrl,
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast('error', data.error || 'Failed to save to database');
        return;
      }
    } catch (e) {
      showToast('error', 'Network error. Please try again.');
      return;
    }
    setShowModal(false);
    setEditingTestimonial(null);
    showToast('success', editingTestimonial ? 'Testimonial updated' : 'Testimonial created');
    fetchTestimonials();
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Wall of Trust</h1>
              <p className="text-slate-400 mt-1">Manage testimonials & customer reviews</p>
            </div>
            <button onClick={() => { setEditingTestimonial(null); setShowModal(true); }} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Testimonial
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      {t.avatarUrl ? (
                        <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-2xl text-slate-400">person</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{t.name}</h3>
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                  <button onClick={() => handleToggle(t.id)} className={`px-3 py-1 rounded-full text-xs font-medium ${t.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {t.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
                
                <div className="flex text-[#f5be53] gap-1 mb-3">
                  {[1,2,3,4,5].map(star => (
                    star <= t.rating ? <Star key={star} style={{fontSize: '1rem'}} /> : <StarBorder key={star} style={{fontSize: '1rem'}} />
                  ))}
                </div>
                
                <p className="text-sm text-slate-300 italic mb-4">&quot;{t.text}&quot;</p>
                
                <div className="flex gap-2">
                  <button onClick={() => { setEditingTestimonial(t); setShowModal(true); }} className="flex-1 py-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white text-sm">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="py-2 px-3 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <TestimonialModal testimonial={editingTestimonial} onSave={handleSave} onClose={() => { setShowModal(false); setEditingTestimonial(null); }} />
      )}
    </div>
  );
}

function TestimonialModal({ testimonial, onSave, onClose }: { testimonial: Testimonial | null; onSave: (t: Testimonial) => void; onClose: () => void }) {
  const [form, setForm] = useState<Testimonial>(testimonial || {
    id: "", name: "", role: "", text: "", rating: 5, avatarUrl: "", avatarAlt: "", isActive: true, sortOrder: 0
  });
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Testimonials → R2 (no conversion needed, R2 serves directly)
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setForm(prev => ({ ...prev, avatarUrl: data.url, avatarAlt: prev.avatarAlt || `${prev.name} avatar` }));
        return;
      }
    } catch {
      // fall through to local preview
    } finally {
      setUploading(false);
    }
    // R2 not configured — show local preview so admin can see the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, avatarUrl: reader.result as string, avatarAlt: prev.avatarAlt || `${prev.name} avatar` }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{testimonial ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Testimonial Text</label>
            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white h-24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(star => (
                <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}>
                  {star <= form.rating ? (
                    <Star className="text-[#f5be53] cursor-pointer" />
                  ) : (
                    <StarBorder className="text-slate-600 cursor-pointer hover:text-[#f5be53]" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Avatar</label>
            <label className="flex-1 cursor-pointer">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                {uploading ? "Uploading..." : form.avatarUrl ? "Change Avatar" : "Upload Avatar"}
              </div>
            </label>
          </div>
          {form.avatarUrl && (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/10 overflow-hidden">
                <img src={form.avatarUrl} alt={form.name} className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setForm(prev => ({ ...prev, avatarUrl: "" }))} className="text-slate-400 hover:text-red-400 text-sm">
                Remove
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 pt-4">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-5 h-5 rounded" />
            <span className="text-white">Active</span>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button onClick={() => onSave(form)} className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02]">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
