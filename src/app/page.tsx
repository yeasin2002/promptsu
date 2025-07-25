import { FeaturesSection } from "@/components/feature/homepage/FeaturesSection";
import { FooterSection } from "@/components/feature/homepage/FooterSection";
import { HeroSection } from "@/components/feature/homepage/hero";
import { TrendingPromptsSection } from "@/components/feature/homepage/TrendingPromptsSection";

const RootPage = () => {
  return (
    <div className="bg-black flex flex-col items-center w-full overflow-x-hidden">
      <HeroSection />
      <TrendingPromptsSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
};
export default RootPage;
