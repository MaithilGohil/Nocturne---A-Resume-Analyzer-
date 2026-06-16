import CustomCursor from "@/components/ui/CustomCursor";
import FloatingNav from "@/components/ui/FloatingNav";
import HeroSection from "@/components/hero/HeroSection";
import FeaturesMarquee from "@/components/sections/FeaturesMarquee";
import ServicesGrid from "@/components/sections/ServicesGrid";
import HowItWorks from "@/components/sections/HowItWorks";

import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <FloatingNav />
      <main>
        <HeroSection />
        <FeaturesMarquee />
        <ServicesGrid />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
