import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { InspirationSection } from "@/components/sections/InspirationSection";
import { TrendingPromptsSection } from "@/components/sections/TrendingPromptsSection";

export const Design = () => {
  return (
    <div className="bg-black flex flex-col items-center w-full overflow-x-hidden">
      <div className="bg-black w-full max-w-[1920px]">
        <InspirationSection />
        <TrendingPromptsSection />
        <FeaturesSection />
        <FooterSection />
      </div>
    </div>
  );
};
