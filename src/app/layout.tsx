import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lemonic.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lemonic.tech — Websites, Apps, Automation & Security",
    template: "%s | Lemonic.tech"
  },
  description:
    "Engineering-led digital agency building web platforms, mobile applications, deterministic workflow automations, and scoped cybersecurity services.",
  keywords: [
    "Web Development",
    "App Engineering",
    "Next.js Agency",
    "Workflow Automation",
    "AI Integration",
    "SOC Services",
    "VAPT",
    "Penetration Testing"
  ],
  authors: [{ name: "Lemonic.tech Engineering" }],
  creator: "Lemonic.tech",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Lemonic.tech — Websites, Apps, Automation & Security",
    description:
      "Engineering-led digital agency building web platforms, mobile applications, deterministic workflow automations, and scoped cybersecurity services.",
    siteName: "Lemonic.tech"
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemonic.tech — Websites, Apps, Automation & Security",
    description:
      "Web development, app engineering, workflow automation, and scoped cybersecurity services with transparent specifications."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Lemonic.tech",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description:
          "Engineering-led digital agency delivering web platforms, automations, and cybersecurity evaluations.",
        email: "hello@lemonic.tech"
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Lemonic.tech",
        publisher: {
          "@id": `${siteUrl}/#organization`
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#191A16] text-[#F6F6F0] min-h-screen flex flex-col`}
      >
        {/* Skip to Main Content Link for WCAG 2.2 AA Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#DDF45B] focus:text-[#191A16] focus:font-semibold focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        <SmoothScroll>
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
