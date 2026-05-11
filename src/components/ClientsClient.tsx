"use client";

import { useState, useEffect } from "react";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  isActive: boolean;
  sortOrder: number;
}

export default function ClientsGrid() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/logos')
      .then(res => res.json())
      .then(data => {
        if (data.logos && data.logos.length > 0) {
          const mapped: Client[] = data.logos.map((l: any) => ({
            id: l.id, name: l.name, logoUrl: l.imageUrl || '',
            website: l.link || '', isActive: l.isActive === 1, sortOrder: l.sortOrder || 0,
          }));
          const active = mapped.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
          setClients(active);
          localStorage.setItem("sahara_clients", JSON.stringify(mapped));
        } else {
          const stored = localStorage.getItem("sahara_clients");
          if (stored) {
            const parsed: Client[] = JSON.parse(stored);
            setClients(parsed.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder));
          }
        }
      })
      .catch(() => {
        const stored = localStorage.getItem("sahara_clients");
        if (stored) {
          const parsed: Client[] = JSON.parse(stored);
          setClients(parsed.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
      ))}
    </div>
  );
}

export function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/logos')
      .then(res => res.json())
      .then(data => {
        if (data.logos && data.logos.length > 0) {
          const mapped: Client[] = data.logos.map((l: any) => ({
            id: l.id, name: l.name, logoUrl: l.imageUrl || '',
            website: l.link || '', isActive: l.isActive === 1, sortOrder: l.sortOrder || 0,
          }));
          const active = mapped.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
          setClients(active);
          localStorage.setItem("sahara_clients", JSON.stringify(mapped));
        } else {
          const stored = localStorage.getItem("sahara_clients");
          if (stored) {
            const parsed: Client[] = JSON.parse(stored);
            setClients(parsed.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder));
          }
        }
      })
      .catch(() => {
        const stored = localStorage.getItem("sahara_clients");
        if (stored) {
          const parsed: Client[] = JSON.parse(stored);
          setClients(parsed.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="material-symbols-outlined text-6xl text-slate-600">business</span>
        <p className="text-slate-400 mt-4">No clients to display yet.</p>
      </div>
    );
  }

  return (
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
  );
}