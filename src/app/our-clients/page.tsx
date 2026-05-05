"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsClay from "@/components/StatsClay";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  isActive: boolean;
  sortOrder: number;
}

export default function OurClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seedClients: Client[] = [
      { id: "1", name: "HP", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/HP_logo.svg", website: "https://www.hp.com", isActive: true, sortOrder: 1 },
      { id: "2", name: "Canon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Canon_logo.svg", website: "https://www.canon.com", isActive: true, sortOrder: 2 },
      { id: "3", name: "Xerox", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Xerox_logo.svg", website: "https://www.xerox.com", isActive: true, sortOrder: 3 },
      { id: "4", name: "Ricoh", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Ricoh_logo.svg", website: "https://www.ricoh.com", isActive: true, sortOrder: 4 },
      { id: "5", name: "Kyocera", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Kyocera_logo.svg", website: "https://www.kyocera.com", isActive: true, sortOrder: 5 },
      { id: "6", name: "Brother", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Brother_Logo.svg", website: "https://www.brother.com", isActive: true, sortOrder: 6 },
    ];

    const stored = localStorage.getItem("sahara_clients");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setClients(parsed.filter((c: Client) => c.isActive).sort((a: Client, b: Client) => a.sortOrder - b.sortOrder));
        setLoading(false);
        return;
      }
    }
    // Try API
    fetch('/api/logos')
      .then(res => res.json())
      .then(data => {
        if (data.logos && data.logos.length > 0) {
          const mapped = data.logos.map((l: any) => ({
            id: l.id,
            name: l.name,
            logoUrl: l.imageUrl || '',
            website: l.link || '',
            isActive: l.isActive === 1,
            sortOrder: l.sortOrder || 0,
          }));
          setClients(mapped.filter((c: Client) => c.isActive).sort((a: Client, b: Client) => a.sortOrder - b.sortOrder));
          localStorage.setItem("sahara_clients", JSON.stringify(mapped));
        } else {
          setClients(seedClients);
          localStorage.setItem("sahara_clients", JSON.stringify(seedClients));
        }
      })
      .catch(() => {
        setClients(seedClients);
        localStorage.setItem("sahara_clients", JSON.stringify(seedClients));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#030e20]">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5be53]/10 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Happy <span className="text-[#f5be53]">Clients</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Trusted by 1500+ businesses across the UAE. We take pride in building lasting partnerships with companies that value quality and reliability.
            </p>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="py-12 px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {clients.map((client) => (
                  <a
                    key={client.id}
                    href={client.website || "#"}
                    target={client.website ? "_blank" : "_self"}
                    rel={client.website ? "noopener noreferrer" : undefined}
                    className="group aspect-square bg-white/5 rounded-2xl p-6 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                      />
                    ) : (
                      <div className="text-center">
                        <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-[#f5be53] transition-colors">
                          business
                        </span>
                        <p className="text-sm text-slate-500 mt-2 group-hover:text-white transition-colors line-clamp-2">
                          {client.name}
                        </p>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}

            {!loading && clients.length === 0 && (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-slate-600">business</span>
                <p className="text-slate-400 mt-4">No clients to display yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <StatsClay />
      </div>

      <Footer />
    </main>
  );
}