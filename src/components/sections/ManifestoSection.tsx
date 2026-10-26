"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ManifestoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const headline = "Websites, apps, automation, and security, built around your business.";
  const words = headline.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const wordSpans = textRef.current?.querySelectorAll(".manifesto-word");

      // Laser scrub progress line
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 0.5
            }
          }
        );
      }

      // Word-by-word incandescent illumination tied directly to scroll
      if (wordSpans && wordSpans.length > 0) {
        gsap.to(wordSpans, {
          color: "#F6F6F0",
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: 0.8
          }
        });
      }

      // Badge entrance
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Supporting paragraph reveal
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: copyRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Action buttons reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] border-b border-[#2C2E26] bg-[#191A16] flex flex-col justify-center items-center overflow-hidden py-24 sm:py-32"
    >
      {/* Laser scrub progress tracker */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#2C2E26]">
        <div
          ref={progressLineRef}
          className="h-full bg-gradient-to-r from-[#DDF45B]/20 via-[#DDF45B] to-[#DDF45B]/20 scale-x-0 origin-left"
        />
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#DDF45B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        {/* Animated Beacon Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-8 sm:mb-12 shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
          <span>THE STANCE // SCROLL KINETICS</span>
        </div>

        {/* Word-by-word scroll scrubbed typography */}
        <h2
          ref={textRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.15] mb-8 sm:mb-12 max-w-4xl mx-auto"
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="manifesto-word inline-block mr-[0.28em] transition-colors duration-100"
              style={{ color: "#383A32", opacity: 0.35 }}
            >
              {w}
            </span>
          ))}
        </h2>

        {/* Supporting description */}
        <p
          ref={copyRef}
          className="text-base sm:text-lg md:text-xl text-[#A8AAA0] leading-relaxed max-w-3xl mx-auto mb-10 font-sans"
        >
          Lemonic.tech helps teams build digital products, improve search discovery, connect business workflows, and test or monitor security within an agreed scope. We write clean code, document our work, and never make unverified promises.
        </p>

        {/* Action Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none"
        >
          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#DDF45B]/15"
          >
            Explore 8 Service Lines
          </Link>
          <Link
            href="/approach"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F6F0] bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B] hover:bg-[#262821] transition-all hover:scale-105 active:scale-95"
          >
            Our Delivery Approach
          </Link>
        </div>
      </div>
    </section>
  );
}
