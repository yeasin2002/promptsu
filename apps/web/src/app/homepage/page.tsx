import { FeaturesSection } from '@/components/feature/homepage-legacy/features-section';
import { FooterSection } from '@/components/feature/homepage-legacy/footer-section';
import { HeroSection } from '@/components/feature/homepage-legacy/hero';
import { TrendingPromptsSection } from '@/components/feature/homepage-legacy/trending-prompts-section';
import { NavigationBar } from '@/components/shared/navigation-bar';

const RootPage = () => {
  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden bg-black px-4">
      <NavigationBar />
      <HeroSection />
      <TrendingPromptsSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
};
export default RootPage;
