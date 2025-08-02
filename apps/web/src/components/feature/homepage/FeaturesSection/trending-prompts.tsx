import chatImg from "@/assets/chat-interface.png";
import { Button } from "@/components/ui/button";
import { WandIcon } from "lucide-react";
import Image from "next/image";

interface Props extends React.ComponentProps<"div"> {}

export const TrendingPrompts = ({ ...props }: Props) => {
  return (
    <div
      className="flex flex-col items-center gap-16 lg:gap-[124px] w-full max-w-[1309px]"
      {...props}
    >
      <div className="flex flex-col w-full max-w-[833px] items-center gap-5 lg:gap-7">
        <h2 className="section-title">See Trending Prompts</h2>

        <p className="section-subtitle">
          Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-7 *:cursor-pointer">
          <Button
            variant="outline"
            className="gap-2 border-[1.4px] border-solid border-white px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto bg-transparent hover:bg-white hover:text-black transition-colors duration-300"
          >
            <span className="font-poppins font-medium text-white hover:text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
              Start Generating
            </span>
            <WandIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>

          <Button className="bg-white hover:bg-gray-100 px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto transition-colors duration-300">
            <span className="font-poppins font-medium text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
              Download
            </span>
          </Button>
        </div>
      </div>

      <div className=" w-[80vw] lg:w-full max-w-[1309px]">
        <Image
          width={1200}
          height={1200}
          className="w-full h-auto rounded-lg"
          alt="AI Dashboard Interface"
          src={chatImg}
        />
      </div>
    </div>
  );
};
