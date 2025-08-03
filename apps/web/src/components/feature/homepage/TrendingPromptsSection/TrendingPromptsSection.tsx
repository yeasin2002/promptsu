import Marquee from 'react-fast-marquee';
import { PromptsItems } from './prompts-items';

export const TrendingPromptsSection = () => {
  const promptData = {
    text: 'Write a attractive hero title for the following website',
    url: 'https://zeltalabs.com/',
  };

  // Create arrays for each row of prompts
  const createPromptRow = (count: number) => Array(count).fill(promptData);
  const topRowPrompts = createPromptRow(8);
  const middleRowPrompts = createPromptRow(8);
  const bottomRowPrompts = createPromptRow(8);

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-16 px-4 pt-32 lg:px-0">
      {/* Heading and description */}
      <div className="flex w-full max-w-[833px] flex-col items-center gap-5 lg:gap-7">
        <h2 className="w-full text-center font-manrope font-medium text-3xl text-white leading-tight tracking-[-0.48px] lg:text-5xl lg:leading-[56px]">
          Create more with Promptverse
        </h2>

        <p className="w-full text-center font-normal font-poppins text-[#ffffff99] text-sm leading-6 tracking-[-0.29px] lg:text-base lg:leading-[28.8px]">
          Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly.
        </p>
      </div>

      {/* Scrolling prompts container */}
      <div className="relative h-auto w-full overflow-hidden">
        <div className="mb-4 h-auto w-full lg:mb-0">
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
        <div className="mb-4 h-auto w-full lg:mt-[28px] lg:mb-0">
          <Marquee direction="right">
            <PromptsItems prompts={middleRowPrompts} />
          </Marquee>
        </div>

        {/* Bottom row of prompts */}
        <div className="h-auto w-full lg:mt-[28px]">
          <Marquee>
            <PromptsItems prompts={bottomRowPrompts} />
          </Marquee>
        </div>
      </div>
    </section>
  );
};
