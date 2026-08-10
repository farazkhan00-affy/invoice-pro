"use client";

import { Menu, Search, Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 md:px-6 py-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-lg">
      {/* Mobile menu button */}
      <button onClick={onMenuClick} className="lg:hidden text-[var(--foreground)]">
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          placeholder="Search invoices, clients..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="relative text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          <Bell size={19} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--primary)]" />
        </button>
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-semibold">
          FH
        </div>
      </div>
    </header>
  );
}