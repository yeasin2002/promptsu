import Marquee from "react-fast-marquee";
import { PromptsItems } from "./prompts-items";

export const TrendingPromptsSection = () => {
  const promptData = {
    text: "Write a attractive hero title for the following website",
    url: "https://zeltalabs.com/",
  };

  // Create arrays for each row of prompts
  const createPromptRow = (count: number) => Array(count).fill(promptData);
  const topRowPrompts = createPromptRow(8);
  const middleRowPrompts = createPromptRow(8);
  const bottomRowPrompts = createPromptRow(8);

  return (
    <section className="flex flex-col items-center gap-16 lg:gap-[124px] w-full px-4 lg:px-0">
      {/* Heading and description */}
      <div className="flex flex-col w-full max-w-[833px] items-center gap-5 lg:gap-7">
        <h2 className="w-full font-manrope font-medium text-white text-3xl lg:text-5xl text-center tracking-[-0.48px] leading-tight lg:leading-[56px]">
          Create more with Promptverse
        </h2>

        <p className="w-full font-poppins font-normal text-[#ffffff99] text-sm lg:text-base text-center tracking-[-0.29px] leading-6 lg:leading-[28.8px]">
          Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly.
        </p>
      </div>

      {/* Scrolling prompts container */}
      <div className="w-full h-auto overflow-hidden relative">
        {/* Top row of prompts */}

        <div className="w-full h-auto mb-4 lg:mb-0">
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            direction="left"
            className="gap-4 lg:gap-[30px]"
          >
            <PromptsItems prompts={topRowPrompts} />
          </Marquee>
        </div>
        {/* Middle row of prompts */}
        <div className="w-full h-auto  mb-4 lg:mb-0 lg:mt-[28px]">
          <Marquee direction="right">
            <PromptsItems prompts={middleRowPrompts} />
          </Marquee>
        </div>

        {/* Bottom row of prompts */}
        <div className="w-full h-auto  lg:mt-[28px]">
          <Marquee>
            <PromptsItems prompts={bottomRowPrompts} />
          </Marquee>
        </div>
      </div>
    </section>
  );
};
