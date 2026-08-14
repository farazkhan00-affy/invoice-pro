"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePdf } from "@/app/components/invoice-pdf";

interface InvoiceItem {
  description: string;
  qty: number;
  rate: number;
}

interface Invoice {
  id: string;
  number: string;
  status: string;
  createdAt: string;
  dueDate: string;
  taxRate: number;
  items: InvoiceItem[];
  client: {
    name: string;
    email: string;
    address: string | null;
  };
}

const statusStyles: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Overdue: "bg-red-500/10 text-red-500",
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/invoices/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setInvoice(data);
        setLoading(false);
      });
  }, [params.id]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    await fetch(`/api/invoices/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInvoice((prev) => (prev ? { ...prev, status } : prev));
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-20 text-[var(--muted)]">
        Invoice not found.
        <Link href="/dashboard/invoices" className="block mt-2 text-[var(--primary)] hover:underline">
          Back to invoices
        </Link>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{invoice.number}</h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">Invoice details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]/30 transition-colors">
            <Mail size={15} />
            Email
          </button>
          <PDFDownloadLink
            document={<InvoicePdf {...invoice} />}
            fileName={`${invoice.number}.pdf`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download size={15} />
            Download PDF
          </PDFDownloadLink>
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
          <div className="flex items-center gap-2">
            {updating && <Loader2 size={14} className="animate-spin text-[var(--muted)]" />}
            <select
              value={invoice.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updating}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 disabled:opacity-60 ${statusStyles[invoice.status]}`}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Bill to / dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-[var(--border)]">
          <div>
            <p className="text-xs text-[var(--muted)] mb-1.5">Billed to</p>
            <p className="font-semibold text-[var(--foreground)]">{invoice.client.name}</p>
            <p className="text-sm text-[var(--muted)]">{invoice.client.email}</p>
            {invoice.client.address && (
              <p className="text-sm text-[var(--muted)]">{invoice.client.address}</p>
            )}
          </div>
          <div className="sm:text-right">
            <div className="flex sm:justify-end gap-2 text-sm mb-1">
              <span className="text-[var(--muted)]">Issued:</span>
              <span className="text-[var(--foreground)]">
                {new Date(invoice.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <div className="flex sm:justify-end gap-2 text-sm">
              <span className="text-[var(--muted)]">Due:</span>
              <span className="text-[var(--foreground)]">
                {new Date(invoice.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
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