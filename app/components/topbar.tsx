"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface TopbarProps {
  onMenuClick: () => void;
}

interface NotificationItem {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = () => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.notifications ?? []);
        setUnreadCount(data.unreadCount ?? 0);
      });
  };

  // Refetch whenever the route changes (e.g. after creating a client/invoice and navigating back)
  useEffect(() => {
    fetchNotifications();
  }, [pathname]);

  // Also poll every 15 seconds as a fallback, so notifications show up without needing navigation
  useEffect(() => {
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = async () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && unreadCount > 0) {
      await fetch("/api/notifications", { method: "PATCH" });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const avatarUrl = session?.user?.avatarUrl;

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="relative text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--primary)]" />
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50">
              <div className="px-4 py-3 border-b border-[var(--border)]">
                <h4 className="font-semibold text-sm text-[var(--foreground)]">Notifications</h4>
              </div>
              {notifications.length === 0 ? (
                <p className="text-center py-8 text-sm text-[var(--muted)]">No notifications yet</p>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3">
                      <p className="text-sm text-[var(--foreground)]">{n.message}</p>
                      <p className="text-xs text-[var(--muted)] mt-1">{timeAgo(n.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-semibold overflow-hidden relative">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
          ) : (
            initials
          )}
        </div>
      </div>
    </header>
  );
}