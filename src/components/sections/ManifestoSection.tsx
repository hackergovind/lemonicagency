import Link from "next/link";

export default function ManifestoSection() {
  return (
    <section className="py-24 md:py-32 border-b border-[#2C2E26] bg-[#191A16] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-8">
          <span>THE STANCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#F6F6F0] leading-tight mb-8">
          Websites, apps, automation, and security, built around your business.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[#8E9085] leading-relaxed max-w-3xl mx-auto mb-10">
          Lemonic.tech helps teams build digital products, improve search discovery, connect business workflows, and test or monitor security within an agreed scope. We write clean code, document our work, and never make unverified promises.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Explore 8 Service Lines
          </Link>
          <Link
            href="/approach"
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F6F0] bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B] transition-colors"
          >
            Our Delivery Approach
          </Link>
        </div>
      </div>
    </section>
  );
}
