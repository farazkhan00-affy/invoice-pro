"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Up to 5 clients", "10 invoices/month", "Basic PDF export", "Email support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    features: ["Unlimited clients", "Unlimited invoices", "Custom branding", "Analytics dashboard", "Priority support"],
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$29",
    period: "/month",
    features: ["Everything in Pro", "Team seats (5)", "Multiple businesses", "API access"],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-[var(--muted)]">Start free. Upgrade when you need to.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative p-8 rounded-2xl border ${
              plan.highlighted
                ? "border-[var(--primary)] bg-[var(--primary)]/5 md:scale-105"
                : "border-[var(--border)] bg-[var(--card)]"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="font-semibold text-lg text-[var(--foreground)]">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[var(--foreground)]">{plan.price}</span>
              <span className="text-[var(--muted)] text-sm">{plan.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                  <Check size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className={`mt-8 block text-center py-2.5 rounded-lg font-medium transition-opacity hover:opacity-90 ${
                plan.highlighted ? "bg-[var(--primary)] text-white" : "border border-[var(--border)] text-[var(--foreground)]"
              }`}
            >
              Get Started
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}