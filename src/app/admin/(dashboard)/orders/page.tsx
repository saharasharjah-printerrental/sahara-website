"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";
import { formatAED } from "@/lib/price";

interface OrderLine {
  name: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Order {
  id: string;
  ref: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  deliveryAddress: string;
  emirate: string;
  preferredDate: string;
  instructions: string;
  items: OrderLine[];
  subtotal: number;
  total: number;
  status: string;
  emailSent: boolean;
  createdAt: string;
}

const STATUSES = ["pending", "paid", "processing", "dispatched", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  paid: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  processing: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  dispatched: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState("all");
  const { showToast, ToastElement } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders/?limit=200');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      showToast('error', 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
      showToast('success', `Order marked ${status}`);
    } catch {
      showToast('error', 'Failed to update order status');
    }
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {ToastElement}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>
          <p className="text-slate-400 mt-1">Spare-parts & toner orders from checkout</p>
        </div>
        <button onClick={load} className="px-4 py-2 rounded-xl bg-[#f5be53]/10 border border-[#f5be53]/20 text-[#f5be53] text-sm font-semibold hover:bg-[#f5be53]/20 transition-colors">
          ↻ Refresh
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', ...STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all border ${filter === s ? 'bg-[#f5be53] text-[#412d00] border-[#f5be53]' : 'border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53] hover:text-white'}`}
          >
            {s === 'all' ? `All (${orders.length})` : `${s} (${orders.filter(o => o.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-slate-600">receipt_long</span>
          <p className="text-slate-400 mt-4">No orders yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3 overflow-y-auto max-h-[70vh] pr-1">
            {filtered.map(order => (
              <button
                key={order.id}
                onClick={() => setSelected(order)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${selected?.id === order.id ? 'border-[#f5be53]/40 bg-[#142032]' : 'border-white/5 bg-white/3 hover:border-white/15'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[#f5be53] font-bold text-xs">{order.ref}</span>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-white font-semibold text-sm truncate">{order.customerName}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-slate-500 text-xs">{order.items?.length || 0} item(s)</p>
                  <p className="text-white text-xs font-bold">{formatAED(order.total)}</p>
                </div>
                <p className="text-slate-600 text-[10px] mt-1">{order.createdAt ? new Date(order.createdAt).toLocaleString('en-AE') : ''}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-[#101c2e] border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selected.ref}</h2>
                    <p className="text-slate-400 text-sm">{selected.createdAt ? new Date(selected.createdAt).toLocaleString('en-AE') : ''}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[selected.status] || STATUS_COLORS.pending}`}>
                    {selected.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-1">Customer</p>
                    <p className="text-white text-sm font-semibold">{selected.customerName}</p>
                    {selected.customerCompany && <p className="text-slate-400 text-sm">{selected.customerCompany}</p>}
                    <p className="text-slate-400 text-sm">{selected.customerEmail}</p>
                    <p className="text-slate-400 text-sm">{selected.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-1">Deliver To</p>
                    <p className="text-slate-300 text-sm">{selected.deliveryAddress}</p>
                    {selected.emirate && <p className="text-slate-300 text-sm">{selected.emirate}</p>}
                    {selected.preferredDate && <p className="text-slate-400 text-sm mt-1">Preferred: {selected.preferredDate}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Items</p>
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#142032] text-slate-400 text-xs">
                          <th className="text-left p-2">Item</th>
                          <th className="text-center p-2">Qty</th>
                          <th className="text-right p-2">Unit</th>
                          <th className="text-right p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selected.items || []).map((it, i) => (
                          <tr key={i} className="border-t border-white/5">
                            <td className="p-2 text-white">{it.name}<span className="block text-[11px] text-slate-500">{it.brand}</span></td>
                            <td className="p-2 text-center text-slate-300">{it.quantity}</td>
                            <td className="p-2 text-right text-slate-300">{formatAED(it.unitPrice)}</td>
                            <td className="p-2 text-right text-white font-medium">{formatAED(it.lineTotal)}</td>
                          </tr>
                        ))}
                        <tr className="border-t border-white/10 bg-[#142032]">
                          <td colSpan={3} className="p-2 text-right font-bold text-[#f5be53]">Order Total</td>
                          <td className="p-2 text-right font-bold text-[#f5be53]">{formatAED(selected.total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {selected.instructions && (
                  <div className="mb-6">
                    <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-1">Instructions</p>
                    <p className="text-[#d3c5b0] text-sm leading-relaxed whitespace-pre-wrap">{selected.instructions}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Confirmation Email</p>
                  <p className={`text-sm font-semibold ${selected.emailSent ? 'text-green-300' : 'text-red-300'}`}>
                    {selected.emailSent ? '✓ Sent' : '✕ Not sent'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map(s => (
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
                  <a href={`mailto:${selected.customerEmail}`} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] text-sm font-bold hover:scale-105 transition-transform">
                    Email Customer
                  </a>
                  <a href={`tel:${selected.customerPhone}`} className="px-4 py-2 rounded-xl border border-[#f5be53]/30 text-[#f5be53] text-sm font-semibold hover:bg-[#f5be53]/10 transition-colors">
                    Call
                  </a>
                  <a href={`/checkout/receipt/?ref=${encodeURIComponent(selected.ref)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl border border-white/15 text-slate-300 text-sm font-semibold hover:bg-white/5 transition-colors">
                    View Receipt
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Select an order to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
