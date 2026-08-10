"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
  <Image src="/logo.jpeg" alt="InvoicePro logo" width={32} height={32} className="w-8 h-8" />
  <span className="font-semibold text-lg">
    <span className="text-[var(--foreground)]">Invoice</span>
    <span className="text-[var(--primary)]">Pro</span>
  </span>
</Link>

        {/* Nav links - desktop only */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            FAQ
          </a>
        </div>

        {/* Right side actions */}
        {/* Right side actions */}
<div className="flex items-center gap-2 sm:gap-3">
  <ThemeToggle />
  <Link
    href="/login"
    className="text-xs sm:text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors whitespace-nowrap"
  >
    Log in
  </Link>
  <Link
    href="/signup"
    className="text-xs sm:text-sm font-medium bg-[var(--primary)] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
  >
    Get Started
  </Link>
</div>
      </div>
    </motion.nav>
  );
}