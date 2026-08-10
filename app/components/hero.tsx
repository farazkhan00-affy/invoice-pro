"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Soft background glow - subtle, not neon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] text-sm text-[var(--muted)] mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Built for freelancers & agencies
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]"
        >
          Invoices & clients,
          <br />
          <span className="text-[var(--primary)]">handled effortlessly.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-[var(--muted)] max-w-2xl mx-auto"
        >
          Create professional invoices, track clients, and get paid faster —
          all from one clean dashboard built for freelancers.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
          >
            Start for free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="px-6 py-3 rounded-lg font-medium border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--border)]/30 transition-colors w-full sm:w-auto text-center"
          >
            See features
          </a>
        </motion.div>

        {/* Trust points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]"
        >
          {["No credit card required", "Free forever plan", "Setup in 2 minutes"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[var(--primary)]" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}