"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const invoices = [
  {
    id: "INV-0047",
    client: "Acme Corp",
    clientEmail: "hello@acme.com",
    clientAddress: "12 Market St, New York",
    status: "Paid",
    date: "Aug 8, 2026",
    dueDate: "Aug 22, 2026",
    items: [
      { description: "Website redesign", qty: 1, rate: 800 },
      { description: "Logo design", qty: 1, rate: 400 },
    ],
    taxRate: 0,
  },
  {
    id: "INV-0046",
    client: "Bright Studio",
    clientEmail: "contact@brightstudio.com",
    clientAddress: "45 Design Ave, LA",
    status: "Pending",
    date: "Aug 6, 2026",
    dueDate: "Aug 20, 2026",
    items: [{ description: "Brand consultation", qty: 5, rate: 170 }],
    taxRate: 5,
  },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Overdue: "bg-red-500/10 text-red-500",
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const invoice = invoices.find((inv) => inv.id === params.id) ?? invoices[0];

  const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const taxAmount = (subtotal * invoice.taxRate) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/invoices"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{invoice.id}</h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">Invoice details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]/30 transition-colors">
            <Mail size={15} />
            Email
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Download size={15} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Invoice document preview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 rounded-xl border border-[var(--border)] bg-[var(--card)]"
      >
        {/* Top: brand + status */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="font-semibold text-lg">
              <span className="text-[var(--foreground)]">Invoice</span>
              <span className="text-[var(--primary)]">Pro</span>
            </span>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusStyles[invoice.status]}`}>
            {invoice.status}
          </span>
        </div>

        {/* Bill to / dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-[var(--border)]">
          <div>
            <p className="text-xs text-[var(--muted)] mb-1.5">Billed to</p>
            <p className="font-semibold text-[var(--foreground)]">{invoice.client}</p>
            <p className="text-sm text-[var(--muted)]">{invoice.clientEmail}</p>
            <p className="text-sm text-[var(--muted)]">{invoice.clientAddress}</p>
          </div>
          <div className="sm:text-right">
            <div className="flex sm:justify-end gap-2 text-sm mb-1">
              <span className="text-[var(--muted)]">Issued:</span>
              <span className="text-[var(--foreground)]">{invoice.date}</span>
            </div>
            <div className="flex sm:justify-end gap-2 text-sm">
              <span className="text-[var(--muted)]">Due:</span>
              <span className="text-[var(--foreground)]">{invoice.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Line items */}
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium text-right">Qty</th>
              <th className="pb-3 font-medium text-right">Rate</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b border-[var(--border)] last:border-0">
                <td className="py-3 text-[var(--foreground)]">{item.description}</td>
                <td className="py-3 text-right text-[var(--muted)]">{item.qty}</td>
                <td className="py-3 text-right text-[var(--muted)]">${item.rate.toFixed(2)}</td>
                <td className="py-3 text-right text-[var(--foreground)]">${(item.qty * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="max-w-xs ml-auto space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">Subtotal</span>
            <span className="text-[var(--foreground)]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">Tax ({invoice.taxRate}%)</span>
            <span className="text-[var(--foreground)]">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
            <span className="font-semibold text-[var(--foreground)]">Total</span>
            <span className="font-bold text-lg text-[var(--primary)]">${total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}