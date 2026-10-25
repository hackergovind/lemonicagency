import Link from "next/link";

export default function ClosingCta() {
  return (
    <section className="py-24 md:py-32 bg-[#191A16] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6">
          <span>NEXT STEP</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F6F6F0] mb-6">
          Discuss your project scope with an engineer.
        </h2>

        <p className="text-sm sm:text-base text-[#8E9085] leading-relaxed max-w-xl mx-auto mb-10">
          Share your goals, existing systems, and technical constraints. We will review your requirements and provide an honest assessment of scope, feasibility, and architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Start Project Enquiry
          </Link>
          <a
            href="mailto:hello@lemonic.tech"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F6F0] bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B] transition-colors"
          >
            Email: hello@lemonic.tech
          </a>
        </div>
      </div>
    </section>
  );
}
