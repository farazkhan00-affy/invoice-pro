"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Mail, Phone, MoreVertical, Loader2 } from "lucide-react";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  invoices: { id: string }[];
}

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        setClients(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-[var(--primary)]" />
        </div>
      ) : (
        <>
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
                        {getInitials(client.name)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--foreground)] text-sm">{client.name}</h3>
                        <p className="text-xs text-[var(--muted)] mt-0.5">{client.invoices.length} invoices</p>
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
                    {client.phone && (
                      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                        <Phone size={13} />
                        {client.phone}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--muted)] text-sm">
              {clients.length === 0
                ? "No clients yet. Add your first one to get started."
                : `No clients found matching "${search}"`}
            </div>
          )}
        </>
      )}
    </div>
  );
}