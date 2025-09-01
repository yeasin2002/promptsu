import {
  BottomCta,
  FeaturesSection,
  Hero,
  TestimonialsSection,
} from '@/components/feature/homepage';
import { PricingSection } from '@/components/feature/pricing';
import { Footer, Navigation } from '@/components/shared';

const RootPage = () => {
  return (
    <div className="container mx-auto min-h-screen text-foreground">
      <Navigation />
      <Hero />
      <FeaturesSection />
      <BottomCta />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};
export default RootPage;
