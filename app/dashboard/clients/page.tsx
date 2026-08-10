"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Mail, Phone, MoreVertical } from "lucide-react";
import Link from "next/link";

const clients = [
  { id: 1, name: "Acme Corp", email: "hello@acme.com", phone: "+1 555-0101", invoices: 8, totalBilled: "$9,600", initials: "AC" },
  { id: 2, name: "Bright Studio", email: "contact@brightstudio.com", phone: "+1 555-0102", invoices: 5, totalBilled: "$4,250", initials: "BS" },
  { id: 3, name: "Nova Tech", email: "billing@novatech.io", phone: "+1 555-0103", invoices: 3, totalBilled: "$7,200", initials: "NT" },
  { id: 4, name: "Pixel Labs", email: "finance@pixellabs.com", phone: "+1 555-0104", invoices: 6, totalBilled: "$3,600", initials: "PL" },
  { id: 5, name: "Orbit Digital", email: "team@orbitdigital.com", phone: "+1 555-0105", invoices: 2, totalBilled: "$1,800", initials: "OD" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Clients</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{clients.length} total clients</p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Client
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
        />
      </div>

      {/* Clients grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={`/dashboard/clients/${client.id}`}
              className="block p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-semibold text-sm">
                    {client.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)] text-sm">{client.name}</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{client.invoices} invoices</p>
                  </div>
                </div>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Mail size={13} />
                  {client.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Phone size={13} />
                  {client.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">Total billed</span>
                <span className="text-sm font-semibold text-[var(--foreground)]">{client.totalBilled}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--muted)] text-sm">
          No clients found matching &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}