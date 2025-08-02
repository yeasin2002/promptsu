import { FeaturesSection } from '@/components/feature/homepage/FeaturesSection';
import { FooterSection } from '@/components/feature/homepage/FooterSection';
import { HeroSection } from '@/components/feature/homepage/hero';
import { TrendingPromptsSection } from '@/components/feature/homepage/TrendingPromptsSection';
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
