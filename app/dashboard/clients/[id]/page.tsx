"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Plus, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface InvoiceItem {
  qty: number;
  rate: number;
}

interface Invoice {
  id: string;
  number: string;
  status: string;
  createdAt: string;
  items: InvoiceItem[];
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  invoices: Invoice[];
}

const statusStyles: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Overdue: "bg-red-500/10 text-red-500",
};

export default function ClientDetailPage() {
  const params = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/clients/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setClient(data);
        setLoading(false);
      });
  }, [params.id]);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const invoiceTotal = (invoice: Invoice) =>
    invoice.items.reduce((sum, item) => sum + item.qty * item.rate, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (notFound || !client) {
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
            {getInitials(client.name)}
          </div>
          <div>
            <h2 className="font-semibold text-lg text-[var(--foreground)]">{client.name}</h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Mail size={15} />
            {client.email}
          </div>
          {client.phone && (
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Phone size={15} />
              {client.phone}
            </div>
          )}
          {client.address && (
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <MapPin size={15} />
              {client.address}
            </div>
          )}
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

        {client.invoices.length > 0 ? (
          <div className="divide-y divide-[var(--border)]">
            {client.invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-[var(--muted)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{inv.number}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {new Date(inv.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[var(--foreground)]">${invoiceTotal(inv).toFixed(2)}</span>
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