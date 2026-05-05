"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  pageSlug: string;
  isActive: boolean;
  sortOrder: number;
}

interface PageOption {
  value: string;
  label: string;
}

const pageOptions: PageOption[] = [
  { value: "homepage", label: "Homepage" },
  { value: "printer-rental-dubai", label: "Printer Rental Dubai" },
  { value: "printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi" },
  { value: "photocopier-rental-sharjah", label: "Photocopier Rental Sharjah" },
  { value: "copier-lease-uae", label: "Copier Lease UAE" },
  { value: "services/printer-rental", label: "Printer Rental Services" },
  { value: "services/repair", label: "Repair Services" },
  { value: "services/toner", label: "Toner Services" },
  { value: "services/amc", label: "AMC Services" },
  { value: "services/sales", label: "Sales Services" },
  { value: "contact", label: "Contact" },
  { value: "products", label: "Products" },
  { value: "blog", label: "Blog" },
];

const defaultFAQs: FAQ[] = [
  { id: "1", question: "What is the duration of your printer rental plans?", answer: "We offer flexible rental periods starting from short-term event hire (1-7 days) to long-term corporate leases (12-36 months), all with included maintenance.", pageSlug: "homepage", isActive: true, sortOrder: 1 },
  { id: "2", question: "Do you provide on-site repair services?", answer: "Yes, our factory-certified technicians provide on-site repairs across all major service areas. We aim for a 4-hour response time for critical failures.", pageSlug: "homepage", isActive: true, sortOrder: 2 },
  { id: "3", question: "Are the spare parts and toners original?", answer: "Exclusively. Sahara only supplies OEM (Original Equipment Manufacturer) consumables and parts to ensure the longevity of your hardware.", pageSlug: "homepage", isActive: true, sortOrder: 3 },
  { id: "4", question: "Can I upgrade my rented equipment during the contract?", answer: "Absolutely. Our 'Growth Guard' policy allows you to upgrade your fleet as your office printing demands increase without hefty termination fees.", pageSlug: "homepage", isActive: true, sortOrder: 4 },
  { id: "5", question: "How much does printer rental cost in Dubai?", answer: "Our printer rental in Dubai starts from AED 250/month for basic A4 printers, with enterprise A3 copiers available from AED 500-2000/month. All plans include free toner and maintenance.", pageSlug: "printer-rental-dubai", isActive: true, sortOrder: 1 },
  { id: "6", question: "Do you offer zero deposit printer rental in Dubai?", answer: "Yes! We offer zero deposit printer rental options in Dubai. Pay only for your monthly rental with no upfront security deposit required.", pageSlug: "printer-rental-dubai", isActive: true, sortOrder: 2 },
  { id: "7", question: "How much does printer rental cost in Abu Dhabi?", answer: "Our printer rental in Abu Dhabi starts from AED 250/month for basic printers, with enterprise copiers from AED 500-2000/month. All plans include free toner and maintenance.", pageSlug: "printer-rental-abu-dhabi", isActive: true, sortOrder: 1 },
  { id: "8", question: "Do you offer photocopier rental in Abu Dhabi?", answer: "Yes! We provide comprehensive photocopier rental services across Abu Dhabi including Mussafah, Al Reem Island, Khalifa City, and all other areas.", pageSlug: "printer-rental-abu-dhabi", isActive: true, sortOrder: 2 },
  { id: "9", question: "How much does photocopier rental cost in Sharjah?", answer: "Our photocopier rental in Sharjah starts from AED 250/month. We offer competitive rates with zero deposit and free toner included in all plans.", pageSlug: "photocopier-rental-sharjah", isActive: true, sortOrder: 1 },
  { id: "10", question: "Do you offer printer rental in Sharjah?", answer: "Yes! We provide full printer and photocopier rental services across Sharjah including Industrial Area, Al Majaz, and SAIF Zone.", pageSlug: "photocopier-rental-sharjah", isActive: true, sortOrder: 2 },
];

export default function AdminFAQs() {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [filterPage, setFilterPage] = useState<string>("all");
  const { showToast, ToastElement } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("sahara_faqs");
    if (stored) {
      setFAQs(JSON.parse(stored));
    } else {
      setFAQs(defaultFAQs);
      localStorage.setItem("sahara_faqs", JSON.stringify(defaultFAQs));
    }
  }, []);

  const saveFAQs = (newFAQs: FAQ[]) => {
    setFAQs(newFAQs);
    localStorage.setItem("sahara_faqs", JSON.stringify(newFAQs));
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this FAQ?")) {
      saveFAQs(faqs.filter(f => f.id !== id));
    }
  };

  const handleToggle = (id: string) => {
    saveFAQs(faqs.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f));
  };

  const handleSave = (faq: FAQ) => {
    if (editingFAQ) {
      saveFAQs(faqs.map(f => f.id === faq.id ? faq : f));
    } else {
      saveFAQs([...faqs, { ...faq, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingFAQ(null);
    showToast('success', editingFAQ ? 'FAQ updated' : 'FAQ created');
  };

  const filteredFAQs = filterPage === "all" ? faqs : faqs.filter(f => f.pageSlug === filterPage);

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">FAQs</h1>
              <p className="text-slate-400 mt-1">Manage frequently asked questions for each page</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => { setEditingFAQ(null); setShowModal(true); }} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
                <span className="material-symbols-outlined">add</span>
                Add FAQ
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Page</label>
            <select value={filterPage} onChange={(e) => setFilterPage(e.target.value)} className="bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white w-64">
              <option value="all">All Pages</option>
              {pageOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Question</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Page</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Order</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFAQs.map((faq) => (
                    <tr key={faq.id} className="border-b border-white/5">
                      <td className="p-4">
                        <p className="font-medium text-white">{faq.question}</p>
                      </td>
                      <td className="p-4 text-slate-300">
                        <span className="px-3 py-1 rounded-full bg-[#101c2e] text-xs">
                          {pageOptions.find(p => p.value === faq.pageSlug)?.label || faq.pageSlug}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => handleToggle(faq.id)} className={`px-3 py-1 rounded-full text-xs font-medium ${faq.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {faq.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4 text-slate-400">{faq.sortOrder}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingFAQ(faq); setShowModal(true); }} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handleDelete(faq.id)} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400">
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
        <FAQModal faq={editingFAQ} pageOptions={pageOptions} onSave={handleSave} onClose={() => { setShowModal(false); setEditingFAQ(null); }} />
      )}
    </div>
  );
}

function FAQModal({ faq, pageOptions, onSave, onClose }: { faq: FAQ | null; pageOptions: PageOption[]; onSave: (f: FAQ) => void; onClose: () => void }) {
  const [form, setForm] = useState<FAQ>(faq || {
    id: "", question: "", answer: "", pageSlug: "homepage", isActive: true, sortOrder: 0
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{faq ? "Edit FAQ" : "Add FAQ"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Page</label>
            <select value={form.pageSlug} onChange={(e) => setForm({ ...form, pageSlug: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white">
              {pageOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Question</label>
            <input type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" placeholder="Enter the question..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Answer</label>
            <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white resize-none" placeholder="Enter the answer..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-5 h-5 rounded bg-[#101c2e] border-white/10" />
                <span className="text-slate-300">Active</span>
              </label>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button onClick={() => onSave(form)} className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02]">Save FAQ</button>
          </div>
        </div>
      </div>
    </div>
  );
}