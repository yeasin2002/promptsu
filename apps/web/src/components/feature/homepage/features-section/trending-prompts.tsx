import { WandIcon } from "lucide-react";
import Image from "next/image";
import chatImg from "@/assets/demo-generate-video-example.png";
import { Button } from "@/components/ui/button";

interface Props extends React.ComponentProps<"div"> {}

export const TrendingPrompts = ({ ...props }: Props) => {
  return (
    <div
      className="flex w-full max-w-[1309px] flex-col items-center gap-16 lg:gap-[124px]"
      {...props}
    >
      <div className="flex w-full max-w-[833px] flex-col items-center gap-5 lg:gap-7">
        <h2 className="section-title">See Trending Prompts</h2>

        <p className="section-subtitle">
          Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly.
        </p>

        <div className="flex flex-col items-center gap-4 *:cursor-pointer sm:flex-row lg:gap-7">
          <Button
            className="h-auto gap-2 rounded-[55px] border-[1.4px] border-white border-solid bg-transparent px-6 py-3 transition-colors duration-300 hover:bg-white hover:text-black lg:px-[34px] lg:py-3.5"
            variant="outline"
          >
            <span className="text-center font-medium font-poppins text-sm text-white leading-[normal] tracking-[0] hover:text-black lg:text-base">
              Start Generating
            </span>
            <WandIcon className="h-5 w-5 lg:h-6 lg:w-6" />
          </Button>

          <Button className="h-auto rounded-[55px] bg-white px-6 py-3 transition-colors duration-300 hover:bg-gray-100 lg:px-[34px] lg:py-3.5">
            <span className="text-center font-medium font-poppins text-black text-sm leading-[normal] tracking-[0] lg:text-base">
              Download
            </span>
          </Button>
        </div>
      </div>

      <div className=" w-[80vw] max-w-[1309px] lg:w-full">
        <Image
          alt="AI Dashboard Interface"
          className="h-auto w-full rounded-lg"
          height={1200}
          src={chatImg}
          width={1200}
        />
      </div>
    </div>
  );
};
