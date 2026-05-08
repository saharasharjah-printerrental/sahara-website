"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon } from "@mui/icons-material";
import { useToast } from "@/components/admin/Toast";

interface Logo {
  id: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  isActive: boolean;
  sortOrder: number;
}

const API_BASE = '/api';

const FALLBACK_LOGOS: Logo[] = [
  { id: "1", name: "HP", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/HP_logo.svg", imageAlt: "HP Logo", link: "https://www.hp.com", isActive: true, sortOrder: 1 },
  { id: "2", name: "Canon", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Canon_logo.svg", imageAlt: "Canon Logo", link: "https://www.canon.com", isActive: true, sortOrder: 2 },
  { id: "3", name: "Xerox", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Xerox_logo.svg", imageAlt: "Xerox Logo", link: "https://www.xerox.com", isActive: true, sortOrder: 3 },
];

export default function AdminLogos() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLogo, setEditingLogo] = useState<Logo | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastElement } = useToast();

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const res = await fetch(`${API_BASE}/logos`);
      const data = await res.json();
      
      if (data.logos && data.logos.length > 0) {
        const mapped = data.logos.map((l: any) => ({
          id: l.id,
          name: l.name,
          imageUrl: l.imageUrl || '',
          imageAlt: l.imageAlt || '',
          link: l.link || '',
          isActive: l.isActive === 1,
          sortOrder: l.sortOrder || 0,
        }));
        setLogos(mapped);
      } else {
        setLogos(FALLBACK_LOGOS);
      }
    } catch (error) {
      console.error('Failed to fetch logos:', error);
      setLogos(FALLBACK_LOGOS);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => showToast(type, message);

  const saveLogos = (newLogos: Logo[]) => {
    setLogos(newLogos);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this logo?")) return;
    
    try {
      await fetch(`${API_BASE}/logos?id=${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Delete failed:', e);
    }
    
    saveLogos(logos.filter(l => l.id !== id));
    showNotification('success', 'Logo deleted');
  };

  const handleToggle = async (id: string) => {
    const logo = logos.find(l => l.id === id);
    if (logo) {
      try {
        const res = await fetch(`${API_BASE}/logos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...logo, isActive: logo.isActive ? 0 : 1 })
        });
        if (!res.ok) {
          showNotification('error', 'Failed to update logo status');
        }
      } catch (e) {
        // Continue with local update even if API fails
      }
    }
    saveLogos(logos.map(l => l.id === id ? { ...l, isActive: !l.isActive } : l));
  };

  const handleSave = async (logo: Logo) => {
    try {
      const res = await fetch(`${API_BASE}/logos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...logo,
          isActive: logo.isActive ? 1 : 0
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification('error', data.error || 'Failed to save logo');
        return;
      }
    } catch (e) {
      showNotification('error', 'Network error. Please try again.');
      return;
    }

    if (editingLogo) {
      saveLogos(logos.map(l => l.id === logo.id ? logo : l));
    } else {
      saveLogos([...logos, { ...logo, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingLogo(null);
    showNotification('success', editingLogo ? 'Logo updated successfully' : 'Logo created successfully');
    fetchLogos();
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Logo & Branding</h1>
              <p className="text-slate-400 mt-1">Manage client logos and brand assets</p>
            </div>
            <button
              onClick={() => { setEditingLogo(null); setShowModal(true); }}
              className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Add Logo
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {logos.map((logo) => (
                <div key={logo.id} className="glass-card rounded-xl p-4 relative group">
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => { setEditingLogo(logo); setShowModal(true); }}
                      className="p-1 rounded bg-[#101c2e] text-slate-400 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(logo.id)}
                      className="p-1 rounded bg-[#101c2e] text-slate-400 hover:text-red-400"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleToggle(logo.id)}
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      logo.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {logo.isActive ? "Active" : "Inactive"}
                  </button>
                  <div className="aspect-video flex items-center justify-center bg-white/5 rounded-lg overflow-hidden">
                    {logo.imageUrl ? (
                      <img src={logo.imageUrl} alt={logo.imageAlt} className="max-h-full max-w-full object-contain p-2" />
                    ) : (
                      <ImageIcon className="text-slate-600 text-3xl" />
                    )}
                  </div>
                  <p className="text-white text-sm font-medium mt-2 truncate">{logo.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <LogoModal
          logo={editingLogo}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingLogo(null); }}
        />
      )}
    </div>
  );
}

function LogoModal({ logo, onSave, onClose }: { logo: Logo | null; onSave: (l: Logo) => void; onClose: () => void }) {
  const [form, setForm] = useState<Logo>(logo || {
    id: "", name: "", imageUrl: "", imageAlt: "", link: "", isActive: true, sortOrder: 0
  });
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Logos → R2 (no conversion needed, R2 serves directly)
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setForm(prev => ({ ...prev, imageUrl: data.url, imageAlt: prev.imageAlt || `${prev.name} logo` }));
        return;
      }
    } catch {
      // fall through to local preview
    } finally {
      setUploading(false);
    }
    // R2 not configured — show local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, imageUrl: reader.result as string, imageAlt: prev.imageAlt || `${prev.name} logo` }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{logo ? "Edit Logo" : "Add Logo"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Logo Image</label>
            <label className="flex-1 cursor-pointer">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                {uploading ? "Uploading..." : form.imageUrl ? "Change Image" : "Upload Image"}
              </div>
            </label>
          </div>
          {form.imageUrl && (
            <div className="flex items-center gap-3">
              <div className="w-20 h-12 bg-white/5 rounded flex items-center justify-center p-2">
                <img src={form.imageUrl} alt={form.name} className="max-h-full max-w-full object-contain" />
              </div>
              <button onClick={() => setForm(prev => ({ ...prev, imageUrl: "" }))} className="text-slate-400 hover:text-red-400 text-sm">
                Remove
              </button>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Alt Text</label>
            <input
              type="text"
              value={form.imageAlt}
              onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Link (optional)</label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://example.com"
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
            />
          </div>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-5 h-5 rounded"
            />
            <span className="text-white">Active</span>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button onClick={() => onSave(form)} className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02]">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
