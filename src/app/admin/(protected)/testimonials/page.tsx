"use client";

import { useState, useEffect, useRef } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

const SAFE_DEFAULTS: Testimonial[] = [
  { id: "1", name: "Marcus Thorne", role: "Architectural Lead", company: "Studio 91", text: "Exceptional service. They repaired our office plotter within 4 hours. Absolute lifesavers!", rating: 5, image_url: "", is_active: true, sort_order: 1 },
  { id: "2", name: "Sarah Jenkins", role: "Operations Manager", company: "TechFlow Solutions", text: "The Printer rental program saved us 40% on operational costs this quarter. Professional and reliable.", rating: 5, image_url: "", is_active: true, sort_order: 2 },
  { id: "3", name: "David Chen", role: "IT Director", company: "DataCore Systems", text: "Prompt toner delivery. Never had to wait more than a day. Highly recommend Sahara.", rating: 5, image_url: "", is_active: true, sort_order: 3 },
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.testimonials && data.testimonials.length > 0) {
        const mapped = data.testimonials.map((t: any) => ({
          id: t.id,
          name: t.name,
          role: t.role || '',
          company: t.company || '',
          text: t.text,
          rating: t.rating || 5,
          image_url: t.image_url || '',
          is_active: t.is_active === 1,
          sort_order: t.sort_order || 0,
        }));
        setTestimonials(mapped);
        localStorage.setItem("sahara_testimonials", JSON.stringify(mapped));
      } else {
        const stored = localStorage.getItem("sahara_testimonials");
        if (stored) {
          setTestimonials(JSON.parse(stored));
        } else {
          setTestimonials(SAFE_DEFAULTS);
          localStorage.setItem("sahara_testimonials", JSON.stringify(SAFE_DEFAULTS));
        }
      }
    } catch {
      const stored = localStorage.getItem("sahara_testimonials");
      if (stored) {
        setTestimonials(JSON.parse(stored));
      } else {
        setTestimonials(SAFE_DEFAULTS);
        localStorage.setItem("sahara_testimonials", JSON.stringify(SAFE_DEFAULTS));
      }
    }
    setLoading(false);
  };

  const saveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    localStorage.setItem("sahara_testimonials", JSON.stringify(newTestimonials));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    
    const optimistic = testimonials.filter(t => t.id !== id);
    saveTestimonials(optimistic);

    try {
      await fetch(`/api/testimonials?id=${id}`, {
        method: 'Delete',
        headers: { 'X-Sahara-Admin': '1' }
      });
    } catch (e) {
      console.error('Delete failed:', e);
    }
    
    loadTestimonials();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleToggle = async (id: string) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (!testimonial) return;
    
    const updated = { ...testimonial, is_active: !testimonial.is_active };
    const optimistic = testimonials.map(t => t.id === id ? updated : t);
    saveTestimonials(optimistic);

    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Sahara-Admin': '1'
        },
        body: JSON.stringify({
          ...updated,
          is_active: updated.is_active ? 1 : 0
        })
      });
    } catch (e) {
      console.error('Toggle failed:', e);
    }
    
    loadTestimonials();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSave = async (testimonial: Testimonial) => {
    const isUpdate = !!testimonial.id;
    const optimistic = isUpdate
      ? testimonials.map(t => t.id === testimonial.id ? testimonial : t)
      : [...testimonials, { ...testimonial, id: Date.now().toString() }];
    saveTestimonials(optimistic);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Sahara-Admin': '1'
        },
        body: JSON.stringify({
          ...testimonial,
          is_active: testimonial.is_active ? 1 : 0
        })
      });
    } catch (e) {
      console.error('Save failed:', e);
    }

    await loadTestimonials();
    setShowModal(false);
    setEditingTestimonial(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...testimonials];
    [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
    const reordered = newList.map((t, i) => ({ ...t, sort_order: i + 1 }));
    saveTestimonials(reordered);
  };

  const moveDown = (index: number) => {
    if (index === testimonials.length - 1) return;
    const newList = [...testimonials];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    const reordered = newList.map((t, i) => ({ ...t, sort_order: i + 1 }));
    saveTestimonials(reordered);
  };

  const handleDuplicate = (testimonial: Testimonial) => {
    const duplicate: Testimonial = {
      ...testimonial,
      id: Date.now().toString(),
      name: `${testimonial.name} (Copy)`,
      sort_order: testimonials.length + 1,
    };
    handleSave(duplicate);
  };

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const activeTestimonials = testimonials.filter(t => t.is_active);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-[#f5be53] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Testimonials</h1>
              <p className="text-slate-400 mt-1">Manage customer testimonials displayed on the homepage</p>
            </div>
            <div className="flex items-center gap-4">
              {saved && (
                <span className="text-green-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Saved!
                </span>
              )}
              <button 
                onClick={() => { setEditingTestimonial(null); setShowModal(true); }} 
                className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add</span>
                Add Testimonial
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4 w-16">Order</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Photo</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Customer</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Review</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4 w-24">Rating</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4 w-20">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4 w-12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial, index) => (
                    <tr key={testimonial.id} className="border-b border-white/5">
                      <td className="p-4">
                        <button 
                          onClick={() => moveDown(index)} 
                          disabled={index === testimonials.length - 1}
                          className="p-1 rounded bg-[#101c2e] text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed mr-1"
                          title="Move down"
                        >
                          <span className="material-symbols-outlined text-lg">drag_handle</span>
                        </button>
                      </td>
                      <td className="p-4">
                        {testimonial.image_url ? (
                          <img src={testimonial.image_url} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#f5be53] flex items-center justify-center text-[#412d00] font-medium text-sm">
                            {getInitials(testimonial.name)}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-white">{testimonial.name}</p>
                          <p className="text-slate-400 text-sm">{testimonial.role}{testimonial.company ? ` at ${testimonial.company}` : ''}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-300 text-sm line-clamp-2" title={testimonial.text}>{testimonial.text}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex text-[#f5be53]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-sm">
                              {i < testimonial.rating ? "StarIcon" : "StarIcon_border"}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleToggle(testimonial.id)} 
                          className={`relative w-12 h-6 rounded-full transition-colors ${testimonial.is_active ? "bg-green-500" : "bg-slate-600"}`}
                          title={testimonial.is_active ? "Active" : "Inactive"}
                        >
                          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${testimonial.is_active ? "left-7" : "left-1"}`} />
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === testimonial.id ? null : testimonial.id)}
                            className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white"
                          >
                            <span className="material-symbols-outlined text-sm">more_horiz</span>
                          </button>
                          {openMenuId === testimonial.id && (
                            <div className="absolute right-0 top-full mt-1 bg-[#101c2e] border border-white/10 rounded-lg py-1 min-w-32 z-10">
                              <button 
                                onClick={() => { setEditingTestimonial(testimonial); setShowModal(true); setOpenMenuId(null); }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5"
                              >
                                <span className="material-symbols-outlined text-sm">edit</span>
                                Edit
                              </button>
                              <button 
                                onClick={() => { handleDuplicate(testimonial); setOpenMenuId(null); }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5"
                              >
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                                Duplicate
                              </button>
                              <button 
                                onClick={() => { handleDelete(testimonial.id); setOpenMenuId(null); }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-red-500/10"
                              >
                                <span className="material-symbols-outlined text-sm">Delete</span>
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {testimonials.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                <p>No testimonials yet. Click "Add Testimonial" to create one.</p>
              </div>
            )}
          </div>
        </div>

      {showModal && (
        <TestimonialModal
          testimonial={editingTestimonial}
          onSave={handleSave}
          onCloseIcon={() => { setShowModal(false); setEditingTestimonial(null); }}
        />
      )}
    </div>
  );
}

function TestimonialModal({ 
  testimonial, 
  onSave, 
  onCloseIcon 
}: { 
  testimonial: Testimonial | null; 
  onSave: (t: Testimonial) => void; 
  onCloseIcon: () => void;
}) {
  const [form, setForm] = useState<Testimonial>(testimonial || {
    id: "",
    name: "",
    role: "",
    company: "",
    text: "",
    rating: 5,
    image_url: "",
    is_active: true,
    sort_order: 0,
  });
  const [textError, setTextError] = useState("");
  const [useExternalUrl, setUseExternalUrl] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File too large. Maximum size is 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/convert-image", { method: "POST", body: formData });
      const data = await res.json();
      
      if (data.url) {
        setForm(prev => ({ ...prev, image_url: data.url }));
      } else {
        setForm(prev => ({ ...prev, image_url: reader.result as string }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setForm(prev => ({ ...prev, image_url: reader.result as string }));
    } finally {
      setUploading(false);
      setLocalPreview("");
    }
  };

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image_url: "" }));
    setLocalPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTextChange = (value: string) => {
    if (value.length > 500) return;
    setTextError("");
    setForm({ ...form, text: value });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (!form.text.trim()) return;
    if (form.text.length > 500) {
      setTextError("Review text must be 500 characters or less");
      return;
    }
    onSave(form);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{testimonial ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <button onClick={onCloseIcon} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">CloseIcon</span>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
            <input 
              type="text" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
              placeholder="Customer name..." 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role/Title</label>
              <input 
                type="text" 
                value={form.role} 
                onChange={(e) => setForm({ ...form, role: e.target.value })} 
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                placeholder="e.g. Operations Manager" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
              <input 
                type="text" 
                value={form.company} 
                onChange={(e) => setForm({ ...form, company: e.target.value })} 
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                placeholder="Company name..." 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Review Text *
              <span className="text-slate-500 text-xs ml-2">({form.text.length}/500)</span>
            </label>
            <textarea 
              value={form.text} 
              onChange={(e) => handleTextChange(e.target.value)} 
              rows={4} 
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white resize-none" 
              placeholder="What did the customer say about your service?" 
            />
            {textError && <p className="text-red-400 text-xs mt-1">{textError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((StarIcon) => (
                <button
                  key={StarIcon}
                  type="button"
                  onClick={() => setForm({ ...form, rating: StarIcon })}
                  className="p-1 text-[#f5be53] transition-transform hover:scale-110"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {StarIcon <= form.rating ? "StarIcon" : "StarIcon_border"}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Photo</label>
            {!useExternalUrl ? (
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[#f5be53] file:text-[#412d00] hover:file:bg-[#c8962e] cursor-pointer"
                />
                <label className="flex items-center gap-2 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={useExternalUrl}
                    onChange={(e) => setUseExternalUrl(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#101c2e] border-white/10"
                  />
                  Use external URL instead
                </label>
                {(localPreview || form.image_url) && (
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      {uploading ? (
                        <div className="w-6 h-6 border-2 border-[#f5be53] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <img src={localPreview || form.image_url} alt="Preview" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <button onClick={handleRemoveImage} className="text-slate-400 hover:text-red-400 text-sm">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <input 
                  type="url" 
                  value={form.image_url} 
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })} 
                  className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                  placeholder="https://..." 
                />
                <label className="flex items-center gap-2 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={useExternalUrl}
                    onChange={(e) => setUseExternalUrl(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#101c2e] border-white/10"
                  />
                  Use external URL instead
                </label>
                {form.image_url && (
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <button onClick={handleRemoveImage} className="text-slate-400 hover:text-red-400 text-sm">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-slate-300">Active</span>
            </label>
            <button
              type="button"
              onClick={() => setForm({ ...form, is_active: !form.is_active })}
              className={`relative w-12 h-6 rounded-full transition-colors ${form.is_active ? "bg-green-500" : "bg-slate-600"}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.is_active ? "left-7" : "left-1"}`} />
            </button>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={onCloseIcon} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02]">
              {testimonial ? "Update Testimonial" : "Save Testimonial"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
