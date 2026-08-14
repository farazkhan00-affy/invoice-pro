"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Building2, Bell, Save, Check, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState("0");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setName(data.name ?? "");
          setAvatarUrl(data.avatarUrl ?? null);
          setBusinessName(data.businessName ?? "");
          setBusinessAddress(data.businessAddress ?? "");
          setCurrency(data.currency ?? "USD");
          setTaxRate(String(data.taxRate ?? 0));
        }
      });
  }, []);

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File must be under 2MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (res.ok) {
      const data = await res.json();
      setAvatarUrl(data.avatarUrl);
      await update({ avatarUrl: data.avatarUrl });
    } else {
      alert("Upload failed. Please try again.");
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    await update({ name });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveBusiness = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName,
        businessAddress,
        currency,
        taxRate: Number(taxRate),
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xl font-semibold overflow-hidden relative">
              {uploading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
              ) : (
                initials
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/jpeg,image/png"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-sm text-[var(--primary)] hover:underline disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Change photo"}
              </button>
              <p className="text-xs text-[var(--muted)] mt-0.5">JPG or PNG, max 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Email</label>
              <input
                type="email"
                defaultValue={session?.user?.email ?? ""}
                disabled
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] text-sm opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
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
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Your business name"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Business address</label>
            <input
              type="text"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              placeholder="Address shown on invoices"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Default currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
              >
                <option value="USD">USD ($)</option>
                <option value="PKR">PKR (₨)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[var(--foreground)] mb-1.5 block">Default tax rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
              />
            </div>
          </div>
          <button
            onClick={saveBusiness}
            disabled={saving}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
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
          <p className="text-xs text-[var(--muted)] pb-3 border-b border-[var(--border)] mb-2">
            These preferences aren&apos;t saved yet — coming in a future update.
          </p>
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