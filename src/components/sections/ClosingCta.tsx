"use client";

import Link from "next/link";

export default function ClosingCta() {
  return (
    <section className="py-28 sm:py-36 bg-[#f2f2f2] relative overflow-hidden text-[#111111]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e1e1e]/15 bg-white text-xs font-satoshi uppercase tracking-widest text-[#111111] font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          <span>INITIALIZE // ENGAGEMENT</span>
        </div>

        <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.05em] leading-[0.92] text-[#111111] max-w-4xl mx-auto mb-8">
          Discuss your project scope with an engineer.
        </h2>

        <p className="font-satoshi text-base sm:text-xl text-[#838282] max-w-2xl mx-auto mb-12 leading-relaxed">
          Share your goals, technical constraints, and target timeline. We provide a truthful assessment of architecture, feasibility, and written scope.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-9 py-4 rounded-full border border-[#1e1e1e] bg-[#111111] text-[#f2f2f2] hover:bg-transparent hover:text-[#111111] font-satoshi text-xs font-bold uppercase tracking-wider transition-all duration-200"
          >
            Start Project Enquiry
          </Link>
          <a
            href="mailto:hello@lemonic.tech"
            className="w-full sm:w-auto px-9 py-4 rounded-full border border-[#1e1e1e]/20 bg-white text-[#111111] hover:border-[#111111] font-satoshi text-xs font-bold uppercase tracking-wider transition-all duration-200"
          >
            hello@lemonic.tech
          </a>
        </div>
      </div>
    </section>
  );
}
