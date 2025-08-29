'use client';

import {
  BottomCta,
  FeaturesSection,
  Hero,
  TestimonialsSection,
} from '@/components/feature/homepage';
import { IntegrationsFeature } from '@/components/feature/homepage/integrations-feature';
import { PricingSection } from '@/components/feature/pricing';
import { Footer, Navigation } from '@/components/shared';

const RootPage = () => {
  return (
    <div className="container mx-auto min-h-screen text-foreground">
      <Navigation />
      <Hero />
      <FeaturesSection />
      <IntegrationsFeature />
      <PricingSection />
      <TestimonialsSection />
      <BottomCta />
      <Footer />
    </div>
  );
};
export default RootPage;
