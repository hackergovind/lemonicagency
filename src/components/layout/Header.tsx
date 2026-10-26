"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
    { label: "SERVICES", href: "#services" },
    { label: "SHOWCASE", href: "#showcase" },
    { label: "PHILOSOPHY", href: "#philosophy" },
    { label: "PROCESS", href: "#process" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-20 bg-[#f2f2f2]/90 backdrop-blur-[12px] border-b border-[#1e1e1e]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
        {/* Brand in Clash Display */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-clash text-2xl font-bold tracking-[-0.05em] text-[#111111]"
          aria-label="Lemonic homepage"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#111111] group-hover:scale-125 transition-transform" />
          <span>LEMONIC</span>
        </Link>

        {/* Desktop Navigation: 14px uppercase Satoshi with 120ms transition to #b6b5b5 */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-satoshi text-[14px] uppercase tracking-wider text-[#111111] hover:text-[#b6b5b5] transition-colors duration-120 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Pill-shaped contact button with 1px solid #1e1e1e border that inverts on hover */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#1e1e1e] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#f2f2f2] font-satoshi text-[13px] uppercase tracking-wider font-semibold transition-all duration-200"
          >
            DISCUSS A PROJECT
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#111111] focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-[1.5px] bg-[#111111] transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-[1.5px] bg-[#111111] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] bg-[#111111] transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-[#f2f2f2] border-b border-[#1e1e1e]/10 px-6 py-8 flex flex-col gap-6 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-clash text-2xl text-[#111111] hover:text-[#b6b5b5] tracking-tight"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-full border border-[#1e1e1e] bg-[#111111] text-[#f2f2f2] font-satoshi text-sm uppercase tracking-wider font-semibold"
          >
            DISCUSS A PROJECT
          </Link>
        </div>
      )}
    </header>
  );
}
