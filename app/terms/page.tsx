import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">Terms of Service</h1>
        <p className="text-xs text-[var(--muted)] mb-8">Last updated: August 2026</p>

        <div className="space-y-6 text-sm text-[var(--muted)] leading-relaxed">
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Using InvoicePro</h2>
            <p>
              By creating an account, you agree to use InvoicePro to manage your own invoicing and
              client data responsibly and lawfully.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Your account</h2>
            <p>
              You&apos;re responsible for keeping your login credentials secure and for all activity
              under your account.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Free plan</h2>
            <p>
              The Free plan is provided as-is with reasonable usage limits. Features and limits may
              change as the product evolves.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Limitation of liability</h2>
            <p>
              InvoicePro is provided &quot;as is&quot; without warranties. We&apos;re not liable for any
              losses resulting from use of the service, including invoice or payment errors — always
              double-check invoice details before sending.
            </p>
          </div>
          <div>
            <h2 className="text-[var(--foreground)] font-semibold mb-2">Changes</h2>
            <p>We may update these terms from time to time. Continued use means you accept the changes.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}