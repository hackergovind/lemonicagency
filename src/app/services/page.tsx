import { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services Spectrum",
  description: "Web development, app engineering, workflow automation, technical marketing, and scoped cybersecurity services."
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#191A16] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6">
            <span>SERVICE SPECTRUM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#F6F6F0] mb-6">
            Engineered digital services with clear boundaries.
          </h1>
          <p className="text-base sm:text-lg text-[#8E9085] leading-relaxed">
            We provide eight specialized service lines across product engineering, search visibility, automation pipelines, and cybersecurity. Every project begins with an explicit functional scope and concludes with complete code and documentation handover.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-8">
          {SERVICES.map((service, index) => {
            const indexString = String(index + 1).padStart(2, "0");

            return (
              <div
                key={service.slug}
                id={service.slug}
                className="p-8 sm:p-10 rounded-xl bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B]/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#DDF45B] mb-3">
                      <span>[{indexString}]</span>
                      <span className="text-[#8E9085] uppercase tracking-wider">{service.shortTitle}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#F6F6F0] mb-4">
                      {service.title}
                    </h2>
                    <p className="text-sm text-[#8E9085] leading-relaxed mb-6">
                      {service.intro}
                    </p>

                    <div>
                      <h3 className="text-xs font-mono uppercase text-[#F6F6F0] mb-3">
                        Key Deliverables:
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#8E9085]">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#DDF45B] mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Box */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-56 pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-center text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
                    >
                      View Service Detail
                    </Link>
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-center text-[#F6F6F0] bg-[#191A16] border border-[#2C2E26] hover:border-[#DDF45B] transition-colors"
                    >
                      Discuss This Scope
                    </Link>
                  </div>
                </div>

                {/* Problems Solved Row */}
                <div className="pt-6 border-t border-[#2C2E26] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-mono uppercase text-[#8E9085] block mb-1">
                      Target Challenge:
                    </span>
                    <p className="text-[#F6F6F0]/90 leading-relaxed">
                      {service.problemsSolved[0]}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono uppercase text-[#8E9085] block mb-1">
                      Secondary Challenge:
                    </span>
                    <p className="text-[#F6F6F0]/90 leading-relaxed">
                      {service.problemsSolved[1]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Contact Notice */}
        <div className="mt-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26] text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-[#F6F6F0] mb-3">
            Looking for a combination of services?
          </h3>
          <p className="text-sm text-[#8E9085] mb-6">
            Many engagements combine web development with automated data pipelines and security testing. We can tailor an integrated specification to fit your architecture.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Start a Multi-Service Enquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
