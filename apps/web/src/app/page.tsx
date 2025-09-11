'use client';

import { BottomCta, FeaturesSection, Hero, TestimonialsSection } from '@/components/feature/homepage';
import { FlowingWaveRays } from '@/components/feature/homepage/flowing-wave-rays';
import { PricingSection } from '@/components/feature/pricing';
import { Footer, Navigation } from '@/components/shared';

const RootPage = () => {
  return (
    <div className=" absolute inset-0 bg-black">
      <FlowingWaveRays />

      <div className="container mx-auto min-h-screen text-foreground">
        <Navigation />
        <Hero />
        <FeaturesSection />
        <BottomCta />
        <PricingSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
};
export default RootPage;
