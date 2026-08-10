"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FileText } from "lucide-react";
import Link from "next/link";

const invoices = [
  { id: "INV-0047", client: "Acme Corp", amount: "$1,200", status: "Paid", date: "Aug 8, 2026" },
  { id: "INV-0046", client: "Bright Studio", amount: "$850", status: "Pending", date: "Aug 6, 2026" },
  { id: "INV-0045", client: "Nova Tech", amount: "$2,400", status: "Overdue", date: "Jul 29, 2026" },
  { id: "INV-0044", client: "Pixel Labs", amount: "$600", status: "Paid", date: "Jul 25, 2026" },
  { id: "INV-0043", client: "Orbit Digital", amount: "$1,800", status: "Paid", date: "Jul 18, 2026" },
  { id: "INV-0038", client: "Bright Studio", amount: "$900", status: "Paid", date: "Jul 2, 2026" },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Overdue: "bg-red-500/10 text-red-500",
};

const filters = ["All", "Paid", "Pending", "Overdue"];

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || inv.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Invoices</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{invoices.length} total invoices</p>
        </div>
        <Link
          href="/dashboard/invoices/new"
          className="flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          New Invoice
        </Link>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice or client..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices table */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
                <th className="px-5 py-3 font-medium">Invoice</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--border)]/20 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <Link href={`/dashboard/invoices/${inv.id}`} className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
                      {inv.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--muted)]">{inv.client}</td>
                  <td className="px-5 py-3.5 text-[var(--foreground)]">{inv.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--muted)]">{inv.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-[var(--border)]">
          {filtered.map((inv) => (
            <Link
              key={inv.id}
              href={`/dashboard/invoices/${inv.id}`}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-[var(--muted)]" />
                <div>
                  <p className="font-medium text-[var(--foreground)] text-sm">{inv.id}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{inv.client} · {inv.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--foreground)]">{inv.amount}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                  {inv.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-16 text-sm text-[var(--muted)]">No invoices found.</p>
        )}
      </div>
    </div>
  );
}