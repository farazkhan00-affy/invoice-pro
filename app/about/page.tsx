import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">About InvoicePro</h1>
        <div className="space-y-4 text-[var(--muted)] text-sm leading-relaxed">
          <p>
            InvoicePro was built for freelancers and small agencies who want to look professional
            without wrestling with spreadsheets or clunky software.
          </p>
          <p>
            Create clean invoices, keep track of your clients, and see exactly where your business
            stands — all from one simple dashboard.
          </p>
          <p>
            We&apos;re a small, independent project focused on doing the essentials well: invoicing,
            client management, and clear analytics.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}