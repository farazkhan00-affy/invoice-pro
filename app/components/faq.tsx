"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Do I need a credit card to sign up?", a: "No, the Free plan requires no credit card. You can upgrade anytime when you're ready." },
  { q: "Can I customize my invoices?", a: "Yes, Pro and Agency plans let you add your logo, brand colors, and custom footer notes." },
  { q: "How do clients receive invoices?", a: "You can export as PDF and send however you like, or email directly from the dashboard." },
  { q: "Can I cancel anytime?", a: "Yes, there are no long-term contracts. Cancel or downgrade anytime from settings." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-24 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-12"
      >
        Frequently asked questions
      </motion.h2>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div key={item.q} className="border border-[var(--border)] rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-[var(--foreground)]">{item.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={18} className="text-[var(--muted)]" />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-[var(--muted)]">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}