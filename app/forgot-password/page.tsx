"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--background)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Image src="/logo.jpeg" alt="InvoicePro logo" width={32} height={32} className="w-8 h-8" />
          <span className="font-semibold text-lg">
            <span className="text-[var(--foreground)]">Invoice</span>
            <span className="text-[var(--primary)]">Pro</span>
          </span>
        </Link>

        <div className="border border-[var(--border)] rounded-2xl p-8 bg-[var(--card)]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-xl font-semibold text-[var(--foreground)] text-center">
                  Forgot password?
                </h1>
                <p className="text-sm text-[var(--muted)] text-center mt-1 mb-6">
                  Enter your email and we&apos;ll send you a reset link
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-[var(--foreground)] mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--primary)] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Send reset link
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 size={28} className="text-[var(--primary)]" />
                </motion.div>
                <h1 className="text-xl font-semibold text-[var(--foreground)]">
                  Check your inbox
                </h1>
                <p className="text-sm text-[var(--muted)] mt-2">
                  We&apos;ve sent a password reset link to your email
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href="/login"
            className="flex items-center justify-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mt-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}