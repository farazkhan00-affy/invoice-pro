"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, Bell, Save } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Settings</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4"
        >
          <div className="flex items-center gap-4 pb-4 border-b border-[var(--border)]">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xl font-semibold">
              FH
            </div>
            <div>
              <button type="button" className="text-sm text-[var(--primary)] hover:underline">
                Change photo
              </button>
              <p className="text-xs text-[var(--muted)] mt-0.5">JPG or PNG, max 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Full name</label>
              <input
                type="text"
                defaultValue="Faraz Hussain"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Email</label>
              <input
                type="email"
                defaultValue="fh210642@gmail.com"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Save size={15} />
            Save changes
          </button>
        </motion.div>
      )}

      {/* Business tab */}
      {activeTab === "business" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4"
        >
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Business name</label>
            <input
              type="text"
              placeholder="Your business name"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Business address</label>
            <input
              type="text"
              placeholder="Address shown on invoices"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Default currency</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all">
                <option>USD ($)</option>
                <option>PKR (₨)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Default tax rate (%)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Save size={15} />
            Save changes
          </button>
        </motion.div>
      )}

      {/* Notifications tab */}
      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1"
        >
          {[
            { label: "Payment received", desc: "Get notified when a client pays an invoice" },
            { label: "Invoice overdue", desc: "Get notified when an invoice becomes overdue" },
            { label: "New client added", desc: "Get notified when a new client is added" },
            { label: "Weekly summary", desc: "Receive a weekly performance summary email" },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className={`flex items-center justify-between py-4 ${i !== arr.length - 1 ? "border-b border-[var(--border)]" : ""}`}
            >
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{item.label}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5.5 bg-[var(--border)] peer-checked:bg-[var(--primary)] rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}