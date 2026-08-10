"use client";

import { motion } from "framer-motion";
import { FileText, Users, BarChart3, Clock, Shield, Zap } from "lucide-react";

const features = [
  { icon: FileText, title: "Professional Invoices", desc: "Create branded invoices in seconds with line items, tax, and discounts." },
  { icon: Users, title: "Client Management", desc: "Keep every client's details, history, and notes organized in one place." },
  { icon: BarChart3, title: "Income Analytics", desc: "Track revenue trends, top clients, and outstanding payments visually." },
  { icon: Clock, title: "Payment Tracking", desc: "See what's paid, pending, or overdue at a glance — no spreadsheets." },
  { icon: Shield, title: "Secure & Private", desc: "Your financial data is encrypted and never shared with third parties." },
  { icon: Zap, title: "Instant PDF Export", desc: "Download or email polished invoice PDFs directly to your clients." },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          Everything you need, nothing you don&apos;t
        </h2>
        <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
          Built specifically for freelancers who want to look professional without the complexity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
              <f.icon size={20} className="text-[var(--primary)]" />
            </div>
            <h3 className="font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
            <p className="text-sm text-[var(--muted)]">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}