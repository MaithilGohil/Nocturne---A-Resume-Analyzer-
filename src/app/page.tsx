import CustomCursor from "@/components/ui/CustomCursor";
import FloatingNav from "@/components/ui/FloatingNav";
import HeroSection from "@/components/hero/HeroSection";
import ShowcaseMarquee from "@/components/sections/ShowcaseMarquee";
import PlatformSection from "@/components/sections/PlatformSection";
import HowItWorksNew from "@/components/sections/HowItWorksNew";
import AITailorIntelligence from "@/components/sections/AITailorIntelligence";
import PricingSection from "@/components/sections/PricingSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <FloatingNav />
      <main>
        <HeroSection />
        <ShowcaseMarquee />
        <PlatformSection />
        <HowItWorksNew />
        <AITailorIntelligence />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
