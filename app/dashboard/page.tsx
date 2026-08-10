"use client";

import { motion } from "framer-motion";
import { DollarSign, FileText, Users, Clock, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Revenue", value: "$24,580", change: "+12.5%", icon: DollarSign },
  { label: "Outstanding", value: "$3,240", change: "5 invoices", icon: Clock },
  { label: "Total Clients", value: "18", change: "+2 this month", icon: Users },
  { label: "Invoices Sent", value: "47", change: "+8 this month", icon: FileText },
];

const recentInvoices = [
  { id: "INV-0047", client: "Acme Corp", amount: "$1,200", status: "Paid", date: "Aug 8" },
  { id: "INV-0046", client: "Bright Studio", amount: "$850", status: "Pending", date: "Aug 6" },
  { id: "INV-0045", client: "Nova Tech", amount: "$2,400", status: "Overdue", date: "Jul 29" },
  { id: "INV-0044", client: "Pixel Labs", amount: "$600", status: "Paid", date: "Jul 25" },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Overdue: "bg-red-500/10 text-red-500",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back, Faraz</h1>
          <p className="text-sm text-[var(--muted)] mt-1">Here&apos;s what&apos;s happening with your business</p>
        </div>
        <Link
          href="/dashboard/invoices/new"
          className="hidden sm:flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          New Invoice
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                <stat.icon size={17} className="text-[var(--primary)]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
            <p className="text-xs text-green-500 mt-2">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent invoices */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--foreground)]">Recent Invoices</h2>
          <Link href="/dashboard/invoices" className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Table - desktop */}
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
              {recentInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--border)]/20 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-[var(--foreground)]">{inv.id}</td>
                  <td className="px-5 py-3.5 text-[var(--muted)]">{inv.client}</td>
                  <td className="px-5 py-3.5 text-[var(--foreground)]">{inv.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--muted)]">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards - mobile */}
        <div className="sm:hidden divide-y divide-[var(--border)]">
          {recentInvoices.map((inv) => (
            <div key={inv.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--foreground)] text-sm">{inv.id}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{inv.client} · {inv.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--foreground)]">{inv.amount}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}