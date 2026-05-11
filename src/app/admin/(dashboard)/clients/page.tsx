"use client";

import { useState, useEffect } from "react";
import { CloudUpload, Delete, Edit, Link as LinkIcon, Add } from "@mui/icons-material";
import { useToast } from "@/components/admin/Toast";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  isActive: boolean;
  sortOrder: number;
}

const API_BASE = '/api/';

const defaultClients: Client[] = [
  { id: "1", name: "Emirates Global Aluminium", logoUrl: "", website: "https://www.ega.com", isActive: true, sortOrder: 1 },
  { id: "2", name: "Emirates Dubai", logoUrl: "", website: "https://www.emirates.com", isActive: true, sortOrder: 2 },
  { id: "3", name: "Flydubai", logoUrl: "", website: "https://www.flydubai.com", isActive: true, sortOrder: 3 },
  { id: "4", name: "Abu Dhabi National Oil Company", logoUrl: "", website: "https://www.adnoc.ae", isActive: true, sortOrder: 4 },
  { id: "5", name: "Mubadala", logoUrl: "", website: "https://www.mubadala.com", isActive: true, sortOrder: 5 },
  { id: "6", name: "Abu Dhabi Commercial Bank", logoUrl: "", website: "https://www.adcb.com", isActive: true, sortOrder: 6 },
  { id: "7", name: "First Abu Dhabi Bank", logoUrl: "", website: "https://www.fabbank.com", isActive: true, sortOrder: 7 },
  { id: "8", name: "Abu Dhabi Islamic Bank", logoUrl: "", website: "https://www.adib.ae", isActive: true, sortOrder: 8 },
  { id: "9", name: "Aldar Properties", logoUrl: "", website: "https://www.aldar.com", isActive: true, sortOrder: 9 },
  { id: "10", name: "Sharaf Group", logoUrl: "", website: "https://www.sharafgroup.com", isActive: true, sortOrder: 10 },
  { id: "11", name: "Al-Futtaim Group", logoUrl: "", website: "https://www.alfuttaim.com", isActive: true, sortOrder: 11 },
  { id: "12", name: "Almarai", logoUrl: "", website: "https://www.almarai.com", isActive: true, sortOrder: 12 },
  { id: "13", name: "Alshaya Group", logoUrl: "", website: "https://www.alshaya.com", isActive: true, sortOrder: 13 },
  { id: "14", name: "Aramco", logoUrl: "", website: "https://www.aramco.com", isActive: true, sortOrder: 14 },
  { id: "15", name: "Saudi Arabian Airlines", logoUrl: "", website: "https://www.saudia.com", isActive: true, sortOrder: 15 },
  { id: "16", name: "Qatar Airways", logoUrl: "", website: "https://www.qatarairways.com", isActive: true, sortOrder: 16 },
  { id: "17", name: "Qatar National Bank", logoUrl: "", website: "https://www.qnb.com", isActive: true, sortOrder: 17 },
  { id: "18", name: "Ooredoo", logoUrl: "", website: "https://www.ooredoo.com", isActive: true, sortOrder: 18 },
  { id: "19", name: "Vodafone Qatar", logoUrl: "", website: "https://www.vodafone.qa", isActive: true, sortOrder: 19 },
  { id: "20", name: "Kuwait Airways", logoUrl: "", website: "https://www.kuwaitairways.com", isActive: true, sortOrder: 20 },
  { id: "21", name: "National Bank of Kuwait", logoUrl: "", website: "https://www.nbk.com", isActive: true, sortOrder: 21 },
  { id: "22", name: "Kuwait Finance House", logoUrl: "", website: "https://www.kfh.com", isActive: true, sortOrder: 22 },
  { id: "23", name: "Zain Kuwait", logoUrl: "", website: "https://www.zain.com", isActive: true, sortOrder: 23 },
  { id: "24", name: "Oman Airways", logoUrl: "", website: "https://www.omanair.com", isActive: true, sortOrder: 24 },
  { id: "25", name: "Bank Muscat", logoUrl: "", website: "https://www.bankmuscat.com", isActive: true, sortOrder: 25 },
  { id: "26", name: "OQ", logoUrl: "", website: "https://www.oq.com", isActive: true, sortOrder: 26 },
  { id: "27", name: "Omantel", logoUrl: "", website: "https://www.omantel.com", isActive: true, sortOrder: 27 },
  { id: "28", name: "Bahrain National Gas", logoUrl: "", website: "https://www.bngc.com", isActive: true, sortOrder: 28 },
  { id: "29", name: "Bapco", logoUrl: "", website: "https://www.bapco.gov.bh", isActive: true, sortOrder: 29 },
  { id: "30", name: "Batelco", logoUrl: "", website: "https://www.batelco.com", isActive: true, sortOrder: 30 },
  { id: "31", name: "National Bank of Bahrain", logoUrl: "", website: "https://www.nbb.com", isActive: true, sortOrder: 31 },
  { id: "32", name: "Aluminum Bahrain", logoUrl: "", website: "https://www.aluminium.com", isActive: true, sortOrder: 32 },
  { id: "33", name: "Dubai Police", logoUrl: "", website: "https://www.dubaipolice.gov.ae", isActive: true, sortOrder: 33 },
  { id: "34", name: "Dubai Municipality", logoUrl: "", website: "https://www.dm.gov.ae", isActive: true, sortOrder: 34 },
  { id: "35", name: "RTA Dubai", logoUrl: "", website: "https://www.rta.ae", isActive: true, sortOrder: 35 },
  { id: "36", name: "DEWA", logoUrl: "", website: "https://www.dewa.gov.ae", isActive: true, sortOrder: 36 },
  { id: "37", name: " ADNOC Distribution", logoUrl: "", website: "https://www.adnocdistribution.ae", isActive: true, sortOrder: 37 },
  { id: "38", name: "Sharjah Electricity Authority", logoUrl: "", website: "https://www.sea.gov.ae", isActive: true, sortOrder: 38 },
  { id: "39", name: "Ajman Municipality", logoUrl: "", website: "https://www.ajman.gov.ae", isActive: true, sortOrder: 39 },
  { id: "40", name: "UAE Ministry of Interior", logoUrl: "", website: "https://www.moi.gov.ae", isActive: true, sortOrder: 40 },
  { id: "41", name: "UAE Ministry of Finance", logoUrl: "", website: "https://www.mof.gov.ae", isActive: true, sortOrder: 41 },
  { id: "42", name: "Dubai Health Authority", logoUrl: "", website: "https://www.dha.gov.ae", isActive: true, sortOrder: 42 },
  { id: "43", name: "SEHA", logoUrl: "", website: "https://www.seha.ae", isActive: true, sortOrder: 43 },
  { id: "44", name: "Mubadala Healthcare", logoUrl: "", website: "https://www.mubadalahealthcare.com", isActive: true, sortOrder: 44 },
  { id: "45", name: "American Hospital", logoUrl: "", website: "https://www.american-hospital.org", isActive: true, sortOrder: 45 },
  { id: "46", name: "Cleveland Clinic Abu Dhabi", logoUrl: "", website: "https://www.clevelandclinicabudhabi.ae", isActive: true, sortOrder: 46 },
  { id: "47", name: "Burjeel Hospital", logoUrl: "", website: "https://www.burjeel.com", isActive: true, sortOrder: 47 },
  { id: "48", name: "Aster DM Healthcare", logoUrl: "", website: "https://www.asterdmhealthcare.com", isActive: true, sortOrder: 48 },
  { id: "49", name: "NMC Healthcare", logoUrl: "", website: "https://www.nmchealth.com", isActive: true, sortOrder: 49 },
  { id: "50", name: "Mediclinic Middle East", logoUrl: "", website: "https://www.mediclinic.ae", isActive: true, sortOrder: 50 },
  { id: "51", name: "Abu Dhabi University", logoUrl: "", website: "https://www.adu.ac.ae", isActive: true, sortOrder: 51 },
  { id: "52", name: "American University of Sharjah", logoUrl: "", website: "https://www.aus.edu", isActive: true, sortOrder: 52 },
  { id: "53", name: "Khalifa University", logoUrl: "", website: "https://www.ku.ac.ae", isActive: true, sortOrder: 53 },
  { id: "54", name: "University of Dubai", logoUrl: "", website: "https://www.ud.edu.ae", isActive: true, sortOrder: 54 },
  { id: "55", name: "Higher Colleges of Technology", logoUrl: "", website: "https://www.hct.ac.ae", isActive: true, sortOrder: 55 },
  { id: "56", name: "Zayed University", logoUrl: "", website: "https://www.zu.ac.ae", isActive: true, sortOrder: 56 },
  { id: "57", name: "UAE University", logoUrl: "", website: "https://www.uaeu.ac.ae", isActive: true, sortOrder: 57 },
  { id: "58", name: "Emirates Academy of Hospitality", logoUrl: "", website: "https://www.eah.edu.ae", isActive: true, sortOrder: 58 },
  { id: "59", name: "Emaar Properties", logoUrl: "", website: "https://www.emaar.com", isActive: true, sortOrder: 59 },
  { id: "60", name: "Nakheel Properties", logoUrl: "", website: "https://www.nakheel.com", isActive: true, sortOrder: 60 },
  { id: "61", name: "Dubai Properties", logoUrl: "", website: "https://www.dubaiproperties.com", isActive: true, sortOrder: 61 },
  { id: "62", name: "Meydan", logoUrl: "", website: "https://www.meydan.ae", isActive: true, sortOrder: 62 },
  { id: "63", name: "Dubai Sports City", logoUrl: "", website: "https://www.dubaisportscity.com", isActive: true, sortOrder: 63 },
  { id: "64", name: "Dubai Silicon Oasis", logoUrl: "", website: "https://www.dsio.gov.ae", isActive: true, sortOrder: 64 },
  { id: "65", name: "Dubai Multi Commodities Centre", logoUrl: "", website: "https://www.dmcc.ae", isActive: true, sortOrder: 65 },
  { id: "66", name: "Dubai International Financial Centre", logoUrl: "", website: "https://www.difc.ae", isActive: true, sortOrder: 66 },
  { id: "67", name: "Abu Dhabi Global Market", logoUrl: "", website: "https://www.adgm.com", isActive: true, sortOrder: 67 },
  { id: "68", name: "Dubai Chamber of Commerce", logoUrl: "", website: "https://www.dubaichamber.com", isActive: true, sortOrder: 68 },
  { id: "69", name: "Abu Dhabi Chamber of Commerce", logoUrl: "", website: "https://www.adchamber.com", isActive: true, sortOrder: 69 },
  { id: "70", name: "Dubai Customs", logoUrl: "", website: "https://www.dubaicustoms.gov.ae", isActive: true, sortOrder: 70 },
  { id: "71", name: "Federal Customs Authority", logoUrl: "", website: "https://www.fca.gov.ae", isActive: true, sortOrder: 71 },
  { id: "72", name: "Trivago", logoUrl: "", website: "https://www.trivago.com", isActive: true, sortOrder: 72 },
  { id: "73", name: "Booking.com", logoUrl: "", website: "https://www.booking.com", isActive: true, sortOrder: 73 },
  { id: "74", name: "Ctrip", logoUrl: "", website: "https://www.ctrip.com", isActive: true, sortOrder: 74 },
  { id: "75", name: "MakeMyTrip", logoUrl: "", website: "https://www.makemytrip.com", isActive: true, sortOrder: 75 },
  { id: "76", name: "Serco", logoUrl: "", website: "https://www.serco.com", isActive: true, sortOrder: 76 },
  { id: "77", name: "Al Khaja", logoUrl: "", website: "", isActive: true, sortOrder: 77 },
  { id: "78", name: " Gargash", logoUrl: "", website: "", isActive: true, sortOrder: 78 },
  { id: "79", name: "Juma Al Majid", logoUrl: "", website: "https://www.jumaalmajid.com", isActive: true, sortOrder: 79 },
  { id: "80", name: "Al Fareej", logoUrl: "", website: "", isActive: true, sortOrder: 80 },
  { id: "81", name: "Al Mulla", logoUrl: "", website: "", isActive: true, sortOrder: 81 },
  { id: "82", name: "Yousif Al Mulla", logoUrl: "", website: "", isActive: true, sortOrder: 82 },
  { id: "83", name: "Khazan", logoUrl: "", website: "https://www.khazan.com", isActive: true, sortOrder: 83 },
  { id: "84", name: "Jimared", logoUrl: "", website: "", isActive: true, sortOrder: 84 },
  { id: "85", name: "Sahara", logoUrl: "", website: "", isActive: true, sortOrder: 85 },
  { id: "86", name: "National Electronics", logoUrl: "", website: "", isActive: true, sortOrder: 86 },
  { id: "87", name: "Al Safeer", logoUrl: "", website: "", isActive: true, sortOrder: 87 },
  { id: "88", name: "Al Labeeb", logoUrl: "", website: "", isActive: true, sortOrder: 88 },
  { id: "89", name: "Dubai Global", logoUrl: "", website: "", isActive: true, sortOrder: 89 },
  { id: "90", name: "Al Ghaff", logoUrl: "", website: "", isActive: true, sortOrder: 90 },
  { id: "91", name: "Al Hashmi", logoUrl: "", website: "", isActive: true, sortOrder: 91 },
  { id: "92", name: "Al Mazroui", logoUrl: "", website: "https://www.almazroui.com", isActive: true, sortOrder: 92 },
  { id: "93", name: "Bin Brothers", logoUrl: "", website: "", isActive: true, sortOrder: 93 },
];

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastElement } = useToast();

  useEffect(() => { fetchClients(); }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_BASE}/clients`);
      const data = await res.json();
      if (data.clients && data.clients.length > 0) {
        const mapped = data.clients.map((l: any) => ({
          id: l.id, name: l.name, logoUrl: l.logoUrl || '',
          website: l.website || '', isActive: l.isActive === 1, sortOrder: l.sortOrder || 0,
        }));
        setClients(mapped);
        localStorage.setItem("sahara_clients", JSON.stringify(mapped));
      } else if (data.error) {
        // DB not configured — skip seed, use localStorage or defaults
        const stored = localStorage.getItem("sahara_clients");
        if (stored) setClients(JSON.parse(stored));
        else setClients(defaultClients);
      } else {
        const stored = localStorage.getItem("sahara_clients");
        if (stored) {
          setClients(JSON.parse(stored));
        } else {
          setClients(defaultClients);
          await seedDefaultClients(defaultClients);
        }
      }
    } catch {
      const stored = localStorage.getItem("sahara_clients");
      if (stored) setClients(JSON.parse(stored));
      else setClients(defaultClients);
    } finally {
      setLoading(false);
    }
  };

  const seedDefaultClients = async (list: Client[]) => {
    // Batch into groups of 10 to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < list.length; i += batchSize) {
      const batch = list.slice(i, i + batchSize);
      await Promise.allSettled(batch.map((c, j) =>
        fetch(`${API_BASE}/clients`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: c.id, name: c.name, logoUrl: c.logoUrl, website: c.website, isActive: c.isActive ? 1 : 0, sortOrder: i + j + 1 }),
        })
      ));
      // Small delay between batches
      if (i + batchSize < list.length) {
        await new Promise(r => setTimeout(r, 200));
      }
    }
  };

  const syncToAPI = async (client: Client) => {
    const res = await fetch(`${API_BASE}/clients`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: client.id, name: client.name, logoUrl: client.logoUrl, website: client.website, isActive: client.isActive ? 1 : 0, sortOrder: client.sortOrder }),
    });
    return res.ok;
  };

  const saveClients = (newClients: Client[]) => {
    setClients(newClients);
    localStorage.setItem("sahara_clients", JSON.stringify(newClients));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    try {
      await fetch(`${API_BASE}/clients?id=${id}`, { method: 'DELETE' });
    } catch { /* continue with local */ }
    saveClients(clients.filter(c => c.id !== id));
    showToast('success', 'Client deleted');
  };

  const handleToggle = async (id: string) => {
    const client = clients.find(c => c.id === id);
    if (!client) return;
    const updated = { ...client, isActive: !client.isActive };
    try { await syncToAPI(updated); } catch { /* continue */ }
    saveClients(clients.map(c => c.id === id ? updated : c));
  };

  const handleSave = async (client: Client) => {
    try {
      const ok = await syncToAPI(client);
      if (!ok) { showToast('error', 'Failed to save to database'); return; }
    } catch { showToast('error', 'Network error. Please try again.'); return; }
    if (editingClient) {
      saveClients(clients.map(c => c.id === client.id ? client : c));
    } else {
      saveClients([...clients, { ...client, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingClient(null);
    showToast('success', editingClient ? 'Client updated' : 'Client added');
    // Re-fetch to confirm persistence
    await fetchClients();
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newClients = [...clients];
    const [removed] = newClients.splice(fromIndex, 1);
    newClients.splice(toIndex, 0, removed);
    const reordered = newClients.map((c, i) => ({ ...c, sortOrder: i + 1 }));
    saveClients(reordered);
  };

  const filteredClients = clients
    .filter(c => !showActiveOnly || c.isActive)
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const activeCount = clients.filter(c => c.isActive).length;

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Clients</h1>
              <p className="text-slate-400 mt-1">Manage client logos — {clients.length} companies ({activeCount} active)</p>
            </div>
            <button 
              onClick={() => { setEditingClient(null); setShowModal(true); }} 
              className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2"
            >
              <Add />
              Add Client
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white pl-10"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-[#101c2e] border border-white/10 rounded-xl px-4 py-3">
              <input 
                type="checkbox" 
                checked={showActiveOnly} 
                onChange={(e) => setShowActiveOnly(e.target.checked)} 
                className="w-4 h-4 rounded" 
              />
              <span className="text-slate-300">Active only</span>
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredClients.map((client, index) => (
              <div 
                key={client.id} 
                className={`glass-card rounded-2xl p-4 relative group ${!client.isActive ? 'opacity-50' : ''}`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("index", index.toString())}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const fromIndex = parseInt(e.dataTransfer.getData("index"));
                  if (fromIndex !== index) handleReorder(fromIndex, index);
                }}
              >
                <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
                  {client.logoUrl ? (
                    <img src={client.logoUrl} alt={client.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-slate-600">business</span>
                  )}
                </div>
                <h3 className="font-medium text-white text-sm truncate">{client.name}</h3>
                {client.website && (
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-[#f5be53] hover:underline flex items-center gap-1 mt-1"
                  >
                    <LinkIcon sx={{ fontSize: 12 }} /> Visit
                  </a>
                )}
                <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setEditingClient(client); setShowModal(true); }} 
                    className="flex-1 p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white text-xs flex items-center justify-center gap-1"
                  >
                    <Edit sx={{ fontSize: 14 }} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(client.id)} 
                    className="flex-1 p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400 text-xs flex items-center justify-center gap-1"
                  >
                    <Delete sx={{ fontSize: 14 }} /> Delete
                  </button>
                </div>
                <button 
                  onClick={() => handleToggle(client.id)}
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    client.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {client.isActive ? "Active" : "Inactive"}
                </button>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="glass-card rounded-2xl p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-600">business</span>
              <h3 className="text-xl font-bold text-white mt-4">No clients found</h3>
              <p className="text-slate-400 mt-2">Add your first client to get started</p>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <ClientModal 
          client={editingClient} 
          onSave={handleSave} 
          onClose={() => { setShowModal(false); setEditingClient(null); }} 
        />
      )}
    </div>
  );
}

function ClientModal({ client, onSave, onClose }: { client: Client | null; onSave: (c: Client) => void; onClose: () => void }) {
  const [form, setForm] = useState<Client>(client || {
    id: "",
    name: "",
    logoUrl: "",
    website: "",
    isActive: true,
    sortOrder: 0
  });
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [fetchUrl, setFetchUrl] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/convert-image", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setForm(prev => ({ ...prev, logoUrl: data.url }));
      } else {
        // Fallback to local preview if Cloudinary not configured
        const reader = new FileReader();
        reader.onloadend = () => setForm(prev => ({ ...prev, logoUrl: reader.result as string }));
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlFetch = async () => {
    if (!fetchUrl) return;
    setConverting(true);
    try {
      const res = await fetch("/api/convert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: fetchUrl })
      });
      const data = await res.json();
      setForm(prev => ({ ...prev, logoUrl: data.url || fetchUrl }));
      setFetchUrl("");
    } catch (error) {
      console.error("Fetch failed:", error);
      setForm(prev => ({ ...prev, logoUrl: fetchUrl }));
      setFetchUrl("");
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{client ? "Edit Client" : "Add Client"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
            <input 
              type="text" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
              placeholder="e.g., Emirates Global Aluminium"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Website URL</label>
            <input 
              type="text" 
              value={form.website} 
              onChange={(e) => setForm({ ...form, website: e.target.value })} 
              className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
              placeholder="https://www.company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Logo Image</label>
            <div className="flex items-center gap-3 mb-3">
              <label className="flex-1 cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors flex items-center justify-center gap-2">
                  <CloudUpload />
                  {uploading ? "Uploading..." : form.logoUrl ? "Change Logo" : "Upload Logo"}
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Or fetch from URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={fetchUrl} 
                onChange={(e) => setFetchUrl(e.target.value)} 
                className="flex-1 bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                placeholder="https://example.com/logo.png" 
              />
              <button 
                onClick={handleUrlFetch} 
                disabled={converting || !fetchUrl}
                className="px-4 py-2 rounded-xl bg-[#f5be53] text-[#412d00] font-medium hover:bg-[#c8962e] disabled:opacity-50"
              >
                {converting ? "..." : "Fetch"}
              </button>
            </div>
          </div>

          {form.logoUrl && (
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                <img src={form.logoUrl} alt="Preview" className="w-full h-full object-contain p-1" />
              </div>
              <button onClick={() => setForm(prev => ({ ...prev, logoUrl: "" }))} className="text-slate-400 hover:text-red-400 text-sm">
                Remove
              </button>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button 
              onClick={() => onSave(form)} 
              disabled={!form.name.trim()}
              className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02] disabled:opacity-50"
            >
              Save Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}