import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">Privacy Policy</h1>
        <p className="text-xs text-[var(--muted)] mb-8">Last updated: August 2026</p>

        <div className="space-y-6 text-sm text-[var(--muted)] leading-relaxed">
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Information we collect</h2>
            <p>
              When you create an account, we collect your name, email address, and any business
              information you choose to add (business name, address, tax settings). When you add
              clients or create invoices, that data is stored so you can manage your business.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">How we use your data</h2>
            <p>
              Your data is used solely to provide the InvoicePro service — generating invoices,
              displaying your dashboard, and sending emails you request (like invoices to your clients).
              We do not sell your data to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Data storage</h2>
            <p>
              Your data is stored securely in our database. Passwords are hashed and never stored in
              plain text. Profile photos are stored via our image hosting provider.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Your rights</h2>
            <p>
              You can update or delete your account information at any time from Settings. If you&apos;d
              like your account and all associated data deleted, contact us.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Contact</h2>
            <p>Questions about this policy? Reach out via our Contact page.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}