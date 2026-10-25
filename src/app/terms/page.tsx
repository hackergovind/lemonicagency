import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Engagement",
  description: "Standard terms and conditions governing project engagements with Lemonic.tech."
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#191A16] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F6F6F0] mb-4">
          Terms of Engagement
        </h1>
        <p className="text-xs font-mono text-[#8E9085] mb-8">
          Last Updated: October 2026 (Editable draft terms subject to bilateral contract execution)
        </p>

        <div className="space-y-8 text-xs sm:text-sm text-[#8E9085] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              1. Scopes of Work and Agreements
            </h2>
            <p>
              All professional services rendered by Lemonic.tech are governed by a mutually executed Statement of Work (SOW) or Rules of Engagement (RoE). Website descriptions serve to illustrate capabilities and do not constitute a binding unilateral contract.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              2. Security Assessment Authorization (VAPT)
            </h2>
            <p>
              Under no circumstances does Lemonic.tech perform penetration testing, vulnerability assessments, or active probes against systems without written, verifiable authorization from the documented asset owner. Clients commissioning security evaluations warrant that they have the full legal right to authorize testing on all specified endpoints.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              3. Intellectual Property Transfer
            </h2>
            <p>
              Unless explicitly agreed otherwise in a Statement of Work, all custom code, configuration scripts, and documentation developed specifically for a client become the client&apos;s property upon full settlement of all associated project invoices.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              4. Warranties and Limitations
            </h2>
            <p>
              Software engineering deliverables include a 30-day post-delivery bug triage period for agreed functional specifications. Because digital environments involve evolving third-party dependencies and operating system updates, no software or security assessment can guarantee 100% invulnerability or error-free continuous operation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              5. Governing Law
            </h2>
            <p>
              Specific jurisdictional governing law and dispute resolution mechanisms are designated within each bilateral Statement of Work signed between Lemonic.tech and the client.
            </p>
          </section>

          <div className="pt-6 border-t border-[#2C2E26]">
            <Link href="/" className="text-xs font-mono text-[#DDF45B] hover:underline">
              ← Return to Lemonic.tech Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
