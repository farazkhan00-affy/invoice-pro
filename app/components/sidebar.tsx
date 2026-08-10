"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const NavLinks = () => (
    <nav className="flex-1 px-3 space-y-1">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                : "text-[var(--muted)] hover:bg-[var(--border)]/40 hover:text-[var(--foreground)]"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar - always visible */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-[var(--border)] h-screen sticky top-0 py-6">
        <Link href="/" className="flex items-center gap-2 px-4 mb-8">
          <Image src="/logo.jpeg" alt="InvoicePro logo" width={28} height={28} className="w-7 h-7" />
          <span className="font-semibold">
            <span className="text-[var(--foreground)]">Invoice</span>
            <span className="text-[var(--primary)]">Pro</span>
          </span>
        </Link>
        <NavLinks />
      </aside>

      {/* Mobile sidebar - slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed left-0 top-0 h-screen w-60 bg-[var(--background)] border-r border-[var(--border)] z-50 flex flex-col py-6 lg:hidden"
            >
              <div className="flex items-center justify-between px-4 mb-8">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo.jpeg" alt="InvoicePro logo" width={28} height={28} className="w-7 h-7" />
                  <span className="font-semibold">
                    <span className="text-[var(--foreground)]">Invoice</span>
                    <span className="text-[var(--primary)]">Pro</span>
                  </span>
                </Link>
                <button onClick={onClose} className="text-[var(--muted)]">
                  <X size={20} />
                </button>
              </div>
              <NavLinks />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}