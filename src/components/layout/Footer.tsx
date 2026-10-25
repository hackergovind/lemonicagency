import Link from "next/link";
import { SERVICES } from "@/data/services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2C2E26] bg-[#191A16] pt-16 pb-12 text-[#8E9085]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-semibold tracking-wider text-lg mb-4"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#DDF45B]" />
              <span>LEMONIC<span className="text-[#8E9085]">.TECH</span></span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-[#8E9085] mb-6">
              Engineering-led digital agency providing web and application development, marketing infrastructure, workflow automation, and scoped cybersecurity services.
            </p>
            <div className="text-xs text-[#8E9085] flex flex-col gap-1">
              <span>Direct inquiries: <a href="mailto:hello@lemonic.tech" className="text-[#F6F6F0] hover:text-[#DDF45B] underline">hello@lemonic.tech</a></span>
              <span>Engineering office: Remote / Distributed</span>
            </div>
          </div>

          {/* Development Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F6F6F0] mb-4">
              Build & Automate
            </h3>
            <ul className="space-y-2.5 text-xs">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#F6F6F0] transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Automation & Security */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F6F6F0] mb-4">
              Intelligence & Security
            </h3>
            <ul className="space-y-2.5 text-xs">
              {SERVICES.slice(4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#F6F6F0] transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F6F6F0] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/approach" className="hover:text-[#F6F6F0] transition-colors">
                  Delivery Approach
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F6F6F0] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F6F6F0] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F6F6F0] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F6F6F0] transition-colors">
                  Engagement Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2C2E26] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E9085]">
          <p>© {currentYear} Lemonic.tech. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Engineered with strict accessibility, privacy compliance, and verified performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
