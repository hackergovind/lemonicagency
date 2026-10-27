"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkHero, setIsDarkHero] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // If we are on homepage and scrollY is within hero stage (~2.4 viewport heights)
      if (pathname === "/") {
        const heroThreshold = window.innerHeight * 2.4;
        setIsDarkHero(window.scrollY < heroThreshold);
      } else {
        setIsDarkHero(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header
      className={`sticky top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isDarkHero
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 text-white"
          : "bg-[#f2f2f2]/90 backdrop-blur-[12px] border-b border-[#1e1e1e]/10 text-[#111111]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
        {/* Brand in Clash Display */}
        <Link
          href="/"
          className={`group flex items-center gap-2.5 font-clash text-2xl font-bold tracking-[-0.05em] transition-colors ${
            isDarkHero ? "text-white" : "text-[#111111]"
          }`}
          aria-label="Lemonic homepage"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all group-hover:scale-125 ${
              isDarkHero ? "bg-white" : "bg-[#111111]"
            }`}
          />
          <span>LEMONIC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-satoshi text-[13px] uppercase tracking-wider font-semibold transition-colors duration-150 ${
                isDarkHero
                  ? "text-white/80 hover:text-white"
                  : "text-[#111111] hover:text-[#838282]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Pill-shaped contact button that adapts */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full font-satoshi text-[13px] uppercase tracking-wider font-semibold transition-all duration-200 ${
              isDarkHero
                ? "border border-white/30 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-sm"
                : "border border-[#1e1e1e] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#f2f2f2]"
            }`}
          >
            DISCUSS A PROJECT
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 focus:outline-none transition-colors ${
            isDarkHero ? "text-white" : "text-[#111111]"
          }`}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-[1.5px] transition-transform ${
                isDarkHero ? "bg-white" : "bg-[#111111]"
              }`}
              style={{
                transform: mobileMenuOpen ? "rotate(45deg) translateY(8px)" : "none",
              }}
            />
            <span
              className={`block h-[1.5px] transition-opacity ${
                isDarkHero ? "bg-white" : "bg-[#111111]"
              } ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] transition-transform ${
                isDarkHero ? "bg-white" : "bg-[#111111]"
              }`}
              style={{
                transform: mobileMenuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-x-0 top-20 border-b px-6 py-8 flex flex-col gap-6 shadow-2xl transition-colors ${
            isDarkHero
              ? "bg-[#111111] border-white/10 text-white"
              : "bg-[#f2f2f2] border-[#1e1e1e]/10 text-[#111111]"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-clash text-2xl tracking-tight ${
                isDarkHero
                  ? "text-white hover:text-white/60"
                  : "text-[#111111] hover:text-[#838282]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-satoshi text-sm uppercase tracking-wider font-semibold text-center mt-2 ${
              isDarkHero
                ? "bg-white text-black"
                : "bg-[#111111] text-[#f2f2f2]"
            }`}
          >
            DISCUSS A PROJECT
          </Link>
        </div>
      )}
    </header>
  );
}
