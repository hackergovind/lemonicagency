import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { SERVICES, getServiceBySlug } from "@/data/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`
    }
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#191A16] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#8E9085] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#F6F6F0]">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#F6F6F0]">Services</Link>
          <span>/</span>
          <span className="text-[#DDF45B]">{service.title}</span>
        </nav>

        {/* Hero Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6">
            <span>SERVICE SPECIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F6F6F0] mb-6">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-[#8E9085] leading-relaxed mb-8">
            {service.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/contact?service=${service.slug}`}
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
            >
              Discuss {service.shortTitle} Project
            </Link>
            <a
              href="#scope"
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F6F0] bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B] transition-colors"
            >
              Review Scope Boundaries
            </a>
          </div>
        </div>

        {/* Problems Solved */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#DDF45B] mb-4">
            Problems We Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.problemsSolved.map((problem, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-[#F6F6F0]/90">
                <span className="text-[#DDF45B] font-mono mt-0.5">[{idx + 1}]</span>
                <p>{problem}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-6">
            Engineering Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#20211B] border border-[#2C2E26]"
              >
                <h3 className="text-base font-semibold text-[#F6F6F0] mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs text-[#8E9085] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-6">
            Concrete Deliverables
          </h2>
          <ul className="space-y-3 text-xs text-[#8E9085]">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-[#DDF45B] text-sm leading-none mt-0.5">✓</span>
                <span className="text-[#F6F6F0]/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scope Boundaries (Included vs Excluded) */}
        <div id="scope" className="mb-16 scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-6">
            Scope Boundaries & Exclusions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included */}
            <div className="p-6 rounded-lg bg-[#20211B] border border-[#2C2E26]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#DDF45B] mb-4">
                <span>In-Scope Coverage</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#8E9085]">
                {service.scopeBoundaries.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#DDF45B] mt-0.5">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className="p-6 rounded-lg bg-[#20211B] border border-[#2C2E26]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8E9085] mb-4">
                <span>Explicit Exclusions</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#8E9085]">
                {service.scopeBoundaries.excluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">−</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Process Phases */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-6">
            Execution Lifecycle
          </h2>
          <div className="space-y-4">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-[#20211B] border border-[#2C2E26] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[#DDF45B] font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#F6F6F0]">
                    {step.phase}
                  </span>
                </div>
                <p className="text-xs text-[#8E9085] max-w-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Service-Specific FAQs */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#20211B] border border-[#2C2E26]"
              >
                <h3 className="text-sm font-semibold text-[#F6F6F0] mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#8E9085] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-xl bg-[#20211B] border border-[#2C2E26] text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#F6F6F0] mb-4">
            Ready to initiate {service.title}?
          </h2>
          <p className="text-sm text-[#8E9085] max-w-xl mx-auto mb-8">
            Tell us about your systems, scope, and target timeframe. We will review your requirements and provide an honest technical assessment.
          </p>
          <Link
            href={`/contact?service=${service.slug}`}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Start Project Enquiry with Preselected Scope
          </Link>
        </div>
      </div>
    </div>
  );
}
