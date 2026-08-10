"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const clients = ["Acme Corp", "Bright Studio", "Nova Tech", "Pixel Labs", "Orbit Digital"];

interface LineItem {
  id: number;
  description: string;
  qty: number;
  rate: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [client, setClient] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: "", qty: 1, rate: 0 },
  ]);

  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now(), description: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend once database is set up
    router.push("/dashboard/invoices");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/invoices"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">New Invoice</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">Create a professional invoice</p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Client + Due date */}
        <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Client</label>
            <select
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            >
              <option value="">Select a client</option>
              {clients.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Due date</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            />
          </div>
        </div>

        {/* Line items */}
        <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <h3 className="font-semibold text-[var(--foreground)] mb-4">Line Items</h3>

          <div className="space-y-3">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="grid grid-cols-1 sm:grid-cols-[1fr_80px_100px_100px_36px] gap-2 items-center"
              >
                <input
                  type="text"
                  required
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Item description"
                  className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
                />
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))}
                  placeholder="Qty"
                  className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
                />
                <input
                  type="number"
                  min={0}
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                  placeholder="Rate"
                  className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
                />
                <div className="px-3 py-2 text-sm text-[var(--foreground)] font-medium text-right sm:text-left">
                  ${(item.qty * item.rate).toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={15} />
                </button>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1.5 text-sm text-[var(--primary)] hover:underline mt-4"
          >
            <Plus size={14} />
            Add line item
          </button>
        </div>

        {/* Totals */}
        <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div className="max-w-xs ml-auto space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span className="text-[var(--foreground)]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">Tax (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-20 px-2 py-1 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm text-right focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">Tax amount</span>
              <span className="text-[var(--foreground)]">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
              <span className="font-semibold text-[var(--foreground)]">Total</span>
              <span className="font-bold text-lg text-[var(--primary)]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex-1 sm:flex-none sm:px-8 bg-[var(--primary)] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create Invoice
          </button>
          <Link
            href="/dashboard/invoices"
            className="flex-1 sm:flex-none sm:px-8 text-center py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--border)]/30 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}