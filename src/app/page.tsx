import CustomCursor from "@/components/ui/CustomCursor";
import FloatingNav from "@/components/ui/FloatingNav";
import HeroSection from "@/components/hero/HeroSection";
import ShowcaseMarquee from "@/components/sections/ShowcaseMarquee";
import FeaturesMarquee from "@/components/sections/FeaturesMarquee";
import PlatformSection from "@/components/sections/PlatformSection";
import HowItWorksNew from "@/components/sections/HowItWorksNew";
import IntelligenceSection from "@/components/sections/IntelligenceSection";
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
        <FeaturesMarquee />
        <PlatformSection />
        <HowItWorksNew />
        <IntelligenceSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
