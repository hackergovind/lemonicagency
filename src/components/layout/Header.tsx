"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Approach", href: "/approach" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#191A16]/90 backdrop-blur-md border-b border-[#2C2E26] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-white font-semibold tracking-wider text-base sm:text-lg focus-visible:ring-1 focus-visible:ring-[#DDF45B]"
          aria-label="Lemonic.tech homepage"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#DDF45B] group-hover:scale-125 transition-transform" />
          <span>LEMONIC<span className="text-[#8E9085]">.TECH</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-[#DDF45B] font-medium"
                    : "text-[#8E9085] hover:text-[#F6F6F0]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] rounded-full hover:bg-[#E8FA72] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DDF45B]"
          >
            Discuss a project
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8E9085] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DDF45B]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bottom-0 bg-[#191A16] border-t border-[#2C2E26] px-6 py-8 flex flex-col justify-between z-40">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#F6F6F0] hover:text-[#DDF45B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#2C2E26]">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3 text-sm font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] rounded-full hover:bg-[#E8FA72] transition-colors"
            >
              Discuss a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
