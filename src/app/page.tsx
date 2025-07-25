import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/InspirationSection";
import { TrendingPromptsSection } from "@/components/sections/TrendingPromptsSection";

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
