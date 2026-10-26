import HeroStage from "@/components/scroll/HeroStage";
import ManifestoSection from "@/components/sections/ManifestoSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import DeliveryProcess from "@/components/sections/DeliveryProcess";
import WhyLemonic from "@/components/sections/WhyLemonic";
import FaqSection from "@/components/sections/FaqSection";
import ClosingCta from "@/components/sections/ClosingCta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#191A16] text-[#F6F6F0]">
      {/* 1. Opening Cinematic Scroll Film Stage */}
      <HeroStage />

      {/* 2. Brand Manifesto & Core Stance */}
      <ManifestoSection />

      {/* 3. 8-Service Spectrum Grid */}
      <ServicesOverview />

      {/* 4. Practical 4-Stage Delivery Process */}
      <DeliveryProcess />

      {/* 5. Concrete Operating Standards */}
      <WhyLemonic />

      {/* 6. Frequently Asked Questions */}
      <FaqSection />

      {/* 7. Action-Oriented Closing CTA */}
      <ClosingCta />
    </main>
  );
}
