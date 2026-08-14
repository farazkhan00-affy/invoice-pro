"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, FileText, Users, Clock, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface DashboardData {
  totalRevenue: number;
  outstanding: number;
  outstandingCount: number;
  clientCount: number;
  invoicesSent: number;
  recentInvoices: {
    id: string;
    number: string;
    client: string;
    amount: number;
    status: string;
    date: string;
  }[];
}

const statusStyles: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Overdue: "bg-red-500/10 text-red-500",
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  const stats = [
    { label: "Total Revenue", value: `$${data.totalRevenue.toFixed(2)}`, change: "From paid invoices", icon: DollarSign },
    { label: "Outstanding", value: `$${data.outstanding.toFixed(2)}`, change: `${data.outstandingCount} invoices`, icon: Clock },
    { label: "Total Clients", value: String(data.clientCount), change: "All time", icon: Users },
    { label: "Invoices Sent", value: String(data.invoicesSent), change: "All time", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back, {firstName}</h1>
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
            <p className="text-xs text-[var(--muted)] mt-2">{stat.change}</p>
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

        {data.recentInvoices.length === 0 ? (
          <p className="text-center py-10 text-sm text-[var(--muted)]">No invoices yet.</p>
        ) : (
          <>
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
                  {data.recentInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--border)]/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[var(--foreground)]">{inv.number}</td>
                      <td className="px-5 py-3.5 text-[var(--muted)]">{inv.client}</td>
                      <td className="px-5 py-3.5 text-[var(--foreground)]">${inv.amount.toFixed(2)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[var(--muted)]">
                        {new Date(inv.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards - mobile */}
            <div className="sm:hidden divide-y divide-[var(--border)]">
              {data.recentInvoices.map((inv) => (
                <div key={inv.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">{inv.number}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {inv.client} · {new Date(inv.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--foreground)]">${inv.amount.toFixed(2)}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}