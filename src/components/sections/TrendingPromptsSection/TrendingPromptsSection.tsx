import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";
import React from "react";

export const TrendingPromptsSection = () => {
  // Sample prompt data that can be mapped over
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
      <div className="w-full h-auto lg:h-[398px] overflow-hidden relative">
        {/* Top row of prompts */}
        <div className="w-full h-auto lg:h-[114px] overflow-hidden mb-4 lg:mb-0">
          <div className="flex items-start gap-4 lg:gap-[30px] animate-scroll-left">
            {topRowPrompts.map((prompt, index) => (
              <Card
                key={`top-prompt-${index}`}
                className="flex-none bg-[#0d0d0d] border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors duration-300"
              >
                <CardContent className="flex items-start justify-end gap-2.5 px-4 lg:px-[26px] py-4 lg:py-[27px]">
                  <div className="w-fit mt-[-1.00px] font-poppins font-normal text-lg lg:text-xl tracking-[0] leading-[normal]">
                    <span className="text-white">{prompt.text} </span>
                    <span className="text-[#1d72f2]">{prompt.url}</span>
                  </div>
                  <ArrowUpIcon className="w-6 h-6 lg:w-[31px] lg:h-[31px] text-white flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Middle row of prompts */}
        <div className="w-full h-auto lg:h-[114px] mb-4 lg:mb-0 lg:mt-[28px]">
          <div className="flex items-start gap-4 lg:gap-[30px] animate-scroll-right lg:relative lg:right-[200px]">
            {middleRowPrompts.map((prompt, index) => (
              <Card
                key={`middle-prompt-${index}`}
                className="flex-none bg-[#0d0d0d] border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors duration-300"
              >
                <CardContent className="flex items-start justify-end gap-2.5 px-4 lg:px-[26px] py-4 lg:py-[27px]">
                  <div className="w-fit mt-[-1.00px] font-poppins font-normal text-lg lg:text-xl tracking-[0] leading-[normal]">
                    <span className="text-white">{prompt.text} </span>
                    <span className="text-[#1d72f2]">{prompt.url}</span>
                  </div>
                  <ArrowUpIcon className="w-6 h-6 lg:w-[31px] lg:h-[31px] text-white flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom row of prompts */}
        <div className="w-full h-auto lg:h-[114px] lg:mt-[28px]">
          <div className="flex items-start gap-4 lg:gap-[30px] animate-scroll-left">
            {bottomRowPrompts.map((prompt, index) => (
              <Card
                key={`bottom-prompt-${index}`}
                className="flex-none bg-[#0d0d0d] border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors duration-300"
              >
                <CardContent className="flex items-start justify-end gap-2.5 px-4 lg:px-[26px] py-4 lg:py-[27px]">
                  <div className="w-fit mt-[-1.00px] font-poppins font-normal text-lg lg:text-xl tracking-[0] leading-[normal]">
                    <span className="text-white">{prompt.text} </span>
                    <span className="text-[#1d72f2]">{prompt.url}</span>
                  </div>
                  <ArrowUpIcon className="w-6 h-6 lg:w-[31px] lg:h-[31px] text-white flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
