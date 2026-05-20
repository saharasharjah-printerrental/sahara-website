"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-[#f5be53]/20 text-[#f5be53] border-[#f5be53]/30",
  contacted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  quoted: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  closed: "bg-green-500/20 text-green-300 border-green-500/30",
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState("all");
  const { showToast, ToastElement } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries/?limit=100');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch {
      showToast('error', 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/inquiries/?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
      showToast('success', 'Status updated');
    } catch {
      showToast('error', 'Failed to update status');
    }
  };

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {ToastElement}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Enquiries</h1>
          <p className="text-slate-400 mt-1">All quote requests and contact form submissions</p>
        </div>
        <button onClick={load} className="px-4 py-2 rounded-xl bg-[#f5be53]/10 border border-[#f5be53]/20 text-[#f5be53] text-sm font-semibold hover:bg-[#f5be53]/20 transition-colors">
          ↻ Refresh
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'new', 'contacted', 'quoted', 'closed'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all border ${filter === s ? 'bg-[#f5be53] text-[#412d00] border-[#f5be53]' : 'border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white'}`}
          >
            {s === 'all' ? `All (${inquiries.length})` : `${s} (${inquiries.filter(i => i.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-slate-600">inbox</span>
          <p className="text-slate-400 mt-4">No enquiries yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3 overflow-y-auto max-h-[70vh] pr-1">
            {filtered.map(inq => (
              <button
                key={inq.id}
                onClick={() => setSelected(inq)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${selected?.id === inq.id ? 'border-[#f5be53]/40 bg-[#142032]' : 'border-white/5 bg-white/3 hover:border-white/15'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-white font-semibold text-sm truncate">{inq.name}</span>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[inq.status] || STATUS_COLORS.new}`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-slate-400 text-xs truncate">{inq.email}</p>
                <p className="text-slate-500 text-xs mt-1">{inq.service || 'General enquiry'}</p>
                <p className="text-slate-600 text-[10px] mt-1">{inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-AE') : ''}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-[#101c2e] border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                    <p className="text-slate-400 text-sm">{selected.email}{selected.phone ? ` · ${selected.phone}` : ''}</p>
                    {selected.company && <p className="text-slate-400 text-sm">{selected.company}</p>}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_COLORS[selected.status] || STATUS_COLORS.new}`}>
                    {selected.status}
                  </span>
                </div>

                {selected.service && (
                  <div className="mb-4">
                    <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-1">Service</p>
                    <p className="text-white text-sm">{selected.service}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-1">Message</p>
                  <p className="text-[#d3c5b0] text-sm leading-relaxed whitespace-pre-wrap">{selected.message || 'No message provided.'}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Received</p>
                  <p className="text-slate-400 text-sm">{selected.createdAt ? new Date(selected.createdAt).toLocaleString('en-AE') : '—'}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'contacted', 'quoted', 'closed'].map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        disabled={selected.status === s}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${selected.status === s ? 'opacity-50 cursor-default border-white/10 text-slate-400' : 'border-[#f5be53]/30 text-[#f5be53] hover:bg-[#f5be53]/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex gap-3">
                  <a
                    href={`mailto:${selected.email}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] text-sm font-bold hover:scale-105 transition-transform"
                  >
                    Reply via Email
                  </a>
                  {selected.phone && (
                    <a
                      href={`tel:${selected.phone}`}
                      className="px-4 py-2 rounded-xl border border-[#f5be53]/30 text-[#f5be53] text-sm font-semibold hover:bg-[#f5be53]/10 transition-colors"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Select an enquiry to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
