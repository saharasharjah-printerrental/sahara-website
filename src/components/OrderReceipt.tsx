"use client";

import { formatAED } from "@/lib/price";

export interface ReceiptLine {
  name: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ReceiptOrder {
  ref: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  deliveryAddress: string;
  emirate?: string;
  preferredDate?: string;
  instructions?: string;
  items: ReceiptLine[];
  subtotal: number;
  total: number;
  status: string;
  createdAt?: string;
}

export default function OrderReceipt({ order }: { order: ReceiptOrder }) {
  const placed = order.createdAt ? new Date(order.createdAt) : new Date();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="receipt-printable bg-white text-slate-800 rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-5 mb-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Sahara Office Equipments</h1>
            <p className="text-xs text-slate-500 mt-1">Printer & Photocopier Solutions · UAE</p>
            <p className="text-xs text-slate-500">+971 50 382 3969 · www.saharaprinter.com</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Order Receipt</p>
            <p className="text-lg font-bold text-slate-900">{order.ref}</p>
            <p className="text-xs text-slate-500">{placed.toLocaleString("en-AE")}</p>
            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              {order.status}
            </span>
          </div>
        </div>

        {/* Customer + delivery */}
        <div className="grid grid-cols-2 gap-6 mb-5 text-sm">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Customer</p>
            <p className="font-semibold text-slate-900">{order.customerName}</p>
            {order.customerCompany && <p className="text-slate-600">{order.customerCompany}</p>}
            <p className="text-slate-600">{order.customerEmail}</p>
            <p className="text-slate-600">{order.customerPhone}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Deliver To</p>
            <p className="text-slate-700">{order.deliveryAddress}</p>
            {order.emirate && <p className="text-slate-700">{order.emirate}</p>}
            {order.preferredDate && <p className="text-slate-600 mt-1">Preferred date: {order.preferredDate}</p>}
          </div>
        </div>

        {/* Items */}
        <table className="w-full text-sm border-collapse mb-5">
          <thead>
            <tr className="bg-slate-100 text-slate-500 text-[10px] uppercase tracking-widest">
              <th className="text-left font-bold p-2">Item</th>
              <th className="text-center font-bold p-2">Qty</th>
              <th className="text-right font-bold p-2">Unit</th>
              <th className="text-right font-bold p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="p-2 text-slate-800">
                  {it.name}
                  {it.brand && <span className="block text-[11px] text-slate-400">{it.brand}</span>}
                </td>
                <td className="p-2 text-center text-slate-700">{it.quantity}</td>
                <td className="p-2 text-right text-slate-700">{formatAED(it.unitPrice)}</td>
                <td className="p-2 text-right font-medium text-slate-900">{formatAED(it.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="p-2 text-right font-bold text-slate-900">Order Total</td>
              <td className="p-2 text-right font-bold text-lg text-slate-900">{formatAED(order.total)}</td>
            </tr>
          </tfoot>
        </table>

        {order.instructions && (
          <div className="mb-5 text-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Instructions</p>
            <p className="text-slate-600 italic">{order.instructions}</p>
          </div>
        )}

        <p className="text-[11px] text-slate-400 border-t border-slate-200 pt-4">
          Thank you for your order. Our team will contact you to confirm delivery and payment.
          Keep this receipt — reference <strong>{order.ref}</strong> for any enquiry.
        </p>
      </div>

      {/* Actions — not printed */}
      <div className="no-print flex flex-wrap gap-3 justify-center mt-6">
        <button
          onClick={() => window.print()}
          className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform"
        >
          Print / Save as PDF
        </button>
        <a
          href="/services/printer-spare-parts/"
          className="px-6 py-3 rounded-xl font-bold border border-[#f5be53]/30 text-[#f5be53] hover:bg-[#f5be53]/10 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
