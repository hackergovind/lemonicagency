import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Accurate disclosure of data handling and processing on the Lemonic.tech website."
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#191A16] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F6F6F0] mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#8E9085] mb-8">
          Effective Date: October 2026
        </p>

        <div className="space-y-8 text-xs sm:text-sm text-[#8E9085] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-2">
              We collect information that you explicitly submit through our contact form:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#F6F6F0]/80">
              <li>Full Name</li>
              <li>Work Email Address</li>
              <li>Company Name or Website URL (optional)</li>
              <li>Service of interest and project specifications</li>
              <li>Budget range and timeline indicators (optional)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              2. How We Use Submitted Information
            </h2>
            <p>
              Submitted details are used solely to evaluate project scope, determine technical feasibility, and respond to your direct inquiry. We do not sell your personal data or provide it to third-party marketing networks.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              This website does not deploy third-party advertising cookies, cross-site behavioral trackers, or intrusive session-recording scripts by default. Standard server access logs (such as IP addresses and browser user-agent headers) are processed transiently for network security and denial-of-service mitigation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              4. Data Retention and Security
            </h2>
            <p>
              Contact form inquiries are delivered to secure email endpoints managed by our engineering leads and retained only as long as necessary to conduct business discussions. We apply HTTPS encryption in transit across all pages and endpoints.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F6F6F0] mb-2">
              5. Your Privacy Rights
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of any contact information you have submitted to us. To exercise these rights, please contact us directly at{" "}
              <a href="mailto:hello@lemonic.tech" className="text-[#DDF45B] underline">
                hello@lemonic.tech
              </a>.
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
