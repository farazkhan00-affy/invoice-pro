"use client";

import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Mail, Check } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSending(false);

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main>
      <Navbar />
      <section className="max-w-xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3">Contact us</h1>
        <p className="text-[var(--muted)] text-sm mb-8">
          Have a question or feedback? Send us a message and we&apos;ll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--foreground)] mb-1.5 block">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {sent ? <Check size={15} /> : <Mail size={15} />}
            {sending ? "Sending..." : sent ? "Message sent!" : "Send message"}
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}