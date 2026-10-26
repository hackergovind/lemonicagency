import Link from "next/link";
import { SERVICES } from "@/data/services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#1e1e1e] pt-20 pb-12 text-[#f6f6f6]/60 font-satoshi">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand Summary */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-clash text-2xl font-bold tracking-tight text-[#f6f6f6] mb-5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#f6f6f6]" />
              <span>LEMONIC</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#f6f6f6]/60 mb-6">
              A sophisticated, typography-first engineering system. We design production web platforms, automated workflows, and verified cybersecurity perimeters.
            </p>
            {/* Lucide-style line icons */}
            <div className="flex items-center gap-4 text-[#f6f6f6]/60">
              {/* GitHub */}
              <a
                href="https://github.com/hackergovind/lemonicagency"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#f6f6f6] transition-colors p-2 rounded-full border border-white/10 hover:border-white/30"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#f6f6f6] transition-colors p-2 rounded-full border border-white/10 hover:border-white/30"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Mail */}
              <a
                href="mailto:hello@lemonic.tech"
                className="hover:text-[#f6f6f6] transition-colors p-2 rounded-full border border-white/10 hover:border-white/30"
                aria-label="Email"
              >
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation (Capabilities) */}
          <div>
            <h3 className="font-clash text-xs uppercase tracking-widest text-[#f6f6f6] mb-5 font-bold">
              Capabilities
            </h3>
            <ul className="space-y-3 text-xs">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#f6f6f6] transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h3 className="font-clash text-xs uppercase tracking-widest text-[#f6f6f6] mb-5 font-bold">
              Company
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="#philosophy" className="hover:text-[#f6f6f6] transition-colors">
                  Philosophy & Stance
                </Link>
              </li>
              <li>
                <Link href="#showcase" className="hover:text-[#f6f6f6] transition-colors">
                  Selected Showcase
                </Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-[#f6f6f6] transition-colors">
                  Delivery Process
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#f6f6f6] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#f6f6f6] transition-colors">
                  Engagement Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="font-clash text-xs uppercase tracking-widest text-[#f6f6f6] mb-5 font-bold">
              Direct Contact
            </h3>
            <div className="space-y-3 text-xs text-[#f6f6f6]/60">
              <p>
                Inquiries:{" "}
                <a href="mailto:hello@lemonic.tech" className="text-[#f6f6f6] underline hover:text-white">
                  hello@lemonic.tech
                </a>
              </p>
              <p>Engineering Office: Remote / Global</p>
              <p>Written Scope: Delivered within 48h</p>
              <p className="pt-2 text-[11px] text-[#f6f6f6]/40">
                Swiss Minimalist & Editorial Brutalism System
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f6f6f6]/40 gap-4">
          <p>© {currentYear} LEMONIC. All rights reserved.</p>
          <p className="font-satoshi">Engineered with Next.js, Clash Display & Satoshi.</p>
        </div>
      </div>
    </footer>
  );
}
