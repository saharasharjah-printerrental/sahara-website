"use client";

import { useState, useEffect } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: string;
  notes: string;
  createdAt: string;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_inquiries");
    if (stored) {
      setInquiries(JSON.parse(stored));
    }
    setMounted(true);
  }, []);

  const saveInquiries = (newInquiries: Inquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem("sahara_inquiries", JSON.stringify(newInquiries));
  };

  const updateStatus = (id: string, status: string) => {
    saveInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
  };

  const updateNotes = (id: string, notes: string) => {
    saveInquiries(inquiries.map(i => i.id === id ? { ...i, notes } : i));
  };

  const filteredInquiries = inquiries.filter(i => {
    if (filter === "pending") return i.status === "pending";
    if (filter === "completed") return i.status === "completed";
    if (filter === "contacted") return i.status === "contacted";
    return true;
  });

  const statusCounts = {
    all: inquiries.length,
    pending: inquiries.filter(i => i.status === "pending").length,
    contacted: inquiries.filter(i => i.status === "contacted").length,
    completed: inquiries.filter(i => i.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Inquiries</h1>
            <p className="text-slate-400 mt-1">Manage customer inquiries and leads</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {Object.entries(statusCounts).map(([key, count]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`glass-card rounded-xl p-4 text-left transition-all ${
                  filter === key ? "border-[#f5be53]" : ""
                }`}
              >
                <p className="text-2xl font-bold text-white">{count}</p>
                <p className="text-sm text-slate-400 capitalize">{key}</p>
              </button>
            ))}
          </div>

          {/* Inquiries List */}
          <div className="glass-card rounded-2xl overflow-hidden">
            {!mounted || filteredInquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-sm font-medium text-slate-400 p-4">Name</th>
                      <th className="text-left text-sm font-medium text-slate-400 p-4">Contact</th>
                      <th className="text-left text-sm font-medium text-slate-400 p-4">Service</th>
                      <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                      <th className="text-left text-sm font-medium text-slate-400 p-4">Date</th>
                      <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!mounted ? (
                      Array(5).fill(null).map((_, i) => (
                        <tr key={`skel-${i}`} className="border-b border-white/5">
                          <td className="p-4">
                            <div className="h-4 w-28 rounded bg-[#1a2d4a] mb-1.5" />
                            <div className="h-3 w-20 rounded bg-[#1a2d4a]" />
                          </td>
                          <td className="p-4">
                            <div className="h-3.5 w-36 rounded bg-[#1a2d4a] mb-1.5" />
                            <div className="h-3 w-24 rounded bg-[#1a2d4a]" />
                          </td>
                          <td className="p-4"><div className="h-4 w-20 rounded bg-[#1a2d4a]" /></td>
                          <td className="p-4"><div className="h-6 w-20 rounded-full bg-[#1a2d4a]" /></td>
                          <td className="p-4"><div className="h-4 w-20 rounded bg-[#1a2d4a]" /></td>
                          <td className="p-4"><div className="h-7 w-12 rounded-lg bg-[#1a2d4a]" /></td>
                        </tr>
                      ))
                    ) : filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b border-white/5">
                        <td className="p-4">
                          <p className="font-medium text-white">{inquiry.name}</p>
                          {inquiry.company && <p className="text-sm text-slate-400">{inquiry.company}</p>}
                        </td>
                        <td className="p-4">
                          <p className="text-slate-300 text-sm">{inquiry.email}</p>
                          <p className="text-slate-400 text-sm">{inquiry.phone}</p>
                        </td>
                        <td className="p-4 text-slate-300">{inquiry.service}</td>
                        <td className="p-4">
                          <select
                            value={inquiry.status}
                            onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-transparent border-0 cursor-pointer ${
                              inquiry.status === "pending" ? "text-yellow-400" :
                              inquiry.status === "contacted" ? "text-blue-400" :
                              "text-green-400"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">{inquiry.createdAt}</td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="px-3 py-1 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                No inquiries found. When customers submit the contact form, they will appear here.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="glass-card rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Inquiry Details</h2>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Name</p>
                  <p className="text-white font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Company</p>
                  <p className="text-white">{selectedInquiry.company || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white">{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-white">{selectedInquiry.phone}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-400">Service Interested</p>
                <p className="text-white">{selectedInquiry.service}</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Message</p>
                <p className="text-white">{selectedInquiry.message}</p>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">Status</p>
                <div className="flex gap-2">
                  {["pending", "contacted", "completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => { updateStatus(selectedInquiry.id, status); setSelectedInquiry({ ...selectedInquiry, status }); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        selectedInquiry.status === status
                          ? "bg-[#f5be53] text-[#412d00]"
                          : "bg-[#101c2e] text-slate-400 hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">Notes</p>
                <textarea
                  value={selectedInquiry.notes}
                  onChange={(e) => updateNotes(selectedInquiry.id, e.target.value)}
                  placeholder="Add notes about this inquiry..."
                  className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 h-24"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex-1 py-3 rounded-xl bg-blue-500/20 text-blue-400 text-center font-medium hover:bg-blue-500/30 transition-colors"
                >
                  Send Email
                </a>
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 text-center font-medium hover:bg-green-500/30 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}