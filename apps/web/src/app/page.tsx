'use client';

import {
  BottomCta,
  FeaturesSection,
  Hero,
  TestimonialsSection,
} from '@/components/feature/homepage';
import { PricingSection } from '@/components/feature/pricing';
import { Navigation } from '@/components/shared';
import { Footer } from '@/components/shared/footer';

const RootPage = () => {
  return (
    <div className="container mx-auto min-h-screen text-foreground">
      <Navigation />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <BottomCta />
      <Footer />
    </div>
  );
};
export default RootPage;
