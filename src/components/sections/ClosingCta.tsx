"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ClosingCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 md:py-40 bg-[#191A16] relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#DDF45B]/6 rounded-full blur-[150px] pointer-events-none" />

      <div
        ref={cardRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
          <span>NEXT STEP</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#F6F6F0] mb-6 drop-shadow-sm">
          Discuss your project scope with an engineer.
        </h2>

        <p className="text-sm sm:text-base text-[#8E9085] leading-relaxed max-w-xl mx-auto mb-10 font-sans">
          Share your goals, existing systems, and technical constraints. We will review your requirements and provide an honest assessment of scope, feasibility, and architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#DDF45B]/15"
          >
            Start Project Enquiry
          </Link>
          <a
            href="mailto:hello@lemonic.tech"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F6F0] bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B] hover:bg-[#262821] transition-all hover:scale-105 active:scale-95"
          >
            Email: hello@lemonic.tech
          </a>
        </div>
      </div>
    </section>
  );
}
