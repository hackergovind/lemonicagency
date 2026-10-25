import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-36 pb-24 md:pt-48 md:pb-36 bg-[#191A16] min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6">
          <span>HTTP 404 // ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#F6F6F0] mb-4">
          Page Not Located
        </h1>

        <p className="text-sm text-[#8E9085] leading-relaxed mb-8">
          The requested URL does not correspond to an active service specification or content page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F6F0] bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B] transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
