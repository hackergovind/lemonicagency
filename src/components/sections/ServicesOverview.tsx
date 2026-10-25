import Link from "next/link";
import { SERVICES } from "@/data/services";

export default function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 border-b border-[#2C2E26] bg-[#191A16]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#2C2E26]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-3">
              <span>Capabilities Spectrum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F6F6F0]">
              Core Service Lines
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#8E9085] max-w-md">
            Each service operates with written specifications, explicit inclusion boundaries, and verified deliverables.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const indexString = String(index + 1).padStart(2, "0");

            return (
              <div
                key={service.slug}
                className="group p-6 rounded-lg bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E9085] mb-5">
                    <span className="text-[#DDF45B] font-semibold">[{indexString}]</span>
                    <span className="text-[11px] uppercase tracking-wider">{service.shortTitle}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#F6F6F0] group-hover:text-[#DDF45B] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#8E9085] leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  <div className="pt-4 border-t border-[#2C2E26] mb-6">
                    <p className="text-[11px] font-mono uppercase text-[#8E9085] mb-1.5">
                      Problem Addressed:
                    </p>
                    <p className="text-xs text-[#F6F6F0]/90 leading-snug">
                      {service.problemsSolved[0]}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-between text-xs font-medium text-[#DDF45B] hover:text-[#E8FA72] pt-2"
                >
                  <span>Explore service scope</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
