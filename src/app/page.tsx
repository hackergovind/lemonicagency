import HeroStage from "@/components/scroll/HeroStage";
import ManifestoSection from "@/components/sections/ManifestoSection";
import AsymmetricalShowcase from "@/components/sections/AsymmetricalShowcase";
import ServicesOverview from "@/components/sections/ServicesOverview";
import DeliveryProcess from "@/components/sections/DeliveryProcess";
import WhyLemonic from "@/components/sections/WhyLemonic";
import FaqSection from "@/components/sections/FaqSection";
import ClosingCta from "@/components/sections/ClosingCta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] text-[#111111]">
      {/* 1. Motion Design Scroll Film + Typographic Echo Stack */}
      <HeroStage />

      {/* 2. Philosophy / Narrative Section with Hairline Divider & Italic Keyword */}
      <ManifestoSection />

      {/* 3. Asymmetrical Showcase Grid (12-col mixed aspect ratio, pill container, grayscale-to-color) */}
      <AsymmetricalShowcase />

      {/* 4. Bespoke Service Cards (3-column grid, rotating geometric icon containers) */}
      <ServicesOverview />

      {/* 5. 4-Stage Lifecycle Process */}
      <DeliveryProcess />

      {/* 6. Operating Standards */}
      <WhyLemonic />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Action-Oriented Closing CTA */}
      <ClosingCta />
    </main>
  );
}
