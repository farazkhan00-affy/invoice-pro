import Link from "next/link";
import Image from "next/image";
import { FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  { icon: FaGithub, href: "https://github.com/farazkhan00-affy", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/faraz-hussain-a50b7b288/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:fh210642@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.jpeg" alt="InvoicePro logo" width={32} height={32} className="w-8 h-8" />
              <span className="font-semibold">
  <span className="text-[var(--foreground)]">Invoice</span>
  <span className="text-[var(--primary)]">Pro</span>
</span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-xs">
              Invoices and client management, built for freelancers who want to look professional.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li><a href="#features" className="hover:text-[var(--foreground)] transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-[var(--foreground)] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li><Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] text-sm text-[var(--muted)] text-center">
          © 2026 InvoicePro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}