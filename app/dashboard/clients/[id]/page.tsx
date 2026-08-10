"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Plus, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const clients = [
  { id: 1, name: "Acme Corp", email: "hello@acme.com", phone: "+1 555-0101", address: "12 Market St, New York", initials: "AC" },
  { id: 2, name: "Bright Studio", email: "contact@brightstudio.com", phone: "+1 555-0102", address: "45 Design Ave, LA", initials: "BS" },
  { id: 3, name: "Nova Tech", email: "billing@novatech.io", phone: "+1 555-0103", address: "8 Innovation Rd, Austin", initials: "NT" },
  { id: 4, name: "Pixel Labs", email: "finance@pixellabs.com", phone: "+1 555-0104", address: "21 Creative Blvd, Seattle", initials: "PL" },
  { id: 5, name: "Orbit Digital", email: "team@orbitdigital.com", phone: "+1 555-0105", address: "3 Orbit Lane, Miami", initials: "OD" },
];

const invoiceHistory = [
  { id: "INV-0047", amount: "$1,200", status: "Paid", date: "Aug 8, 2026" },
  { id: "INV-0038", amount: "$900", status: "Paid", date: "Jul 2, 2026" },
  { id: "INV-0029", amount: "$1,500", status: "Paid", date: "Jun 5, 2026" },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Overdue: "bg-red-500/10 text-red-500",
};

export default function ClientDetailPage() {
  const params = useParams();
  const client = clients.find((c) => c.id === Number(params.id));

  if (!client) {
    return (
      <div className="text-center py-20 text-[var(--muted)]">
        Client not found.
        <Link href="/dashboard/clients" className="block mt-2 text-[var(--primary)] hover:underline">
          Back to clients
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/clients"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Client Details</h1>
      </div>

      {/* Client info card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-semibold text-lg">
            {client.initials}
          </div>
          <div>
            <h2 className="font-semibold text-lg text-[var(--foreground)]">{client.name}</h2>
            <p className="text-sm text-[var(--muted)]">Client since Jan 2026</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Mail size={15} />
            {client.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Phone size={15} />
            {client.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <MapPin size={15} />
            {client.address}
          </div>
        </div>
      </motion.div>

      {/* Invoice history */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h3 className="font-semibold text-[var(--foreground)]">Invoice History</h3>
          <Link
            href="/dashboard/invoices/new"
            className="flex items-center gap-1.5 text-sm text-[var(--primary)] hover:underline"
          >
            <Plus size={14} />
            New Invoice
          </Link>
        </div>

        {invoiceHistory.length > 0 ? (
          <div className="divide-y divide-[var(--border)]">
            {invoiceHistory.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-[var(--muted)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{inv.id}</p>
                    <p className="text-xs text-[var(--muted)]">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[var(--foreground)]">{inv.amount}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-sm text-[var(--muted)]">No invoices yet for this client.</p>
        )}
      </motion.div>
    </div>
  );
}