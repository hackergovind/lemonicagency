import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Lemonic.tech is an engineering-led digital agency delivering web platforms, automations, and cybersecurity services with strict technical standards."
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#191A16] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6">
            <span>ABOUT LEMONIC.TECH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#F6F6F0] mb-6">
            An engineering-led digital agency.
          </h1>
          <p className="text-base sm:text-lg text-[#8E9085] leading-relaxed">
            Lemonic.tech was founded on a simple principle: technical excellence, clear scopes, and honest communication produce far better business outcomes than aggressive sales rhetoric.
          </p>
        </div>

        {/* Agency Focus */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-4">
            What We Do
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9085] leading-relaxed mb-6">
            We focus on four complementary technical domains that modern digital organizations rely on:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-[#F6F6F0]/90">
            <div>
              <h3 className="font-semibold text-[#DDF45B] mb-1.5">Product Engineering</h3>
              <p className="text-[#8E9085]">Full-stack web applications, authenticated portals, and customer-facing interfaces engineered with TypeScript and Next.js.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#DDF45B] mb-1.5">Search & Technical Discovery</h3>
              <p className="text-[#8E9085]">Core Web Vitals hygiene, JSON-LD structured schema, and Answer Engine Optimization (AEO) designed for search engines and AI assistants.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#DDF45B] mb-1.5">Systems Automation</h3>
              <p className="text-[#8E9085]">Deterministic data pipelines, webhook synchronization, and practical AI tools with human review checkpoints.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#DDF45B] mb-1.5">Cybersecurity</h3>
              <p className="text-[#8E9085]">Authorized penetration testing (VAPT), reproducible vulnerability reports, and structured SOC alert triage workflows.</p>
            </div>
          </div>
        </div>

        {/* Operating Philosophy */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-4">
            Operating Principles
          </h2>
          <ul className="space-y-4 text-xs sm:text-sm text-[#8E9085] leading-relaxed">
            <li>
              <strong className="text-[#F6F6F0]">Code Over Rhetoric:</strong> We deliver functioning software, test suites, and deployment configurations rather than lengthy conceptual slide presentations.
            </li>
            <li>
              <strong className="text-[#F6F6F0]">No Fabricated Social Proof:</strong> We respect client confidentiality. We do not invent client testimonials, publish unverified statistics, or make claims we cannot substantiate.
            </li>
            <li>
              <strong className="text-[#F6F6F0]">Safety & Authorization:</strong> For security assessments, we maintain strict written Rules of Engagement and never conduct unauthorized scanning.
            </li>
            <li>
              <strong className="text-[#F6F6F0]">Complete Client Independence:</strong> We write maintainable code and provide comprehensive documentation so that your internal team can operate the systems we build without forced dependency.
            </li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="p-8 sm:p-10 rounded-xl bg-[#20211B] border border-[#2C2E26] text-center">
          <h3 className="text-xl font-semibold text-[#F6F6F0] mb-3">
            Want to learn more about working with us?
          </h3>
          <p className="text-sm text-[#8E9085] max-w-md mx-auto mb-6">
            We are always open to discussing new technical projects and architectural challenges.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
