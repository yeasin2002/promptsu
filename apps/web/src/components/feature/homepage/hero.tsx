import { Button } from '@workspace/ui/shadcn/button';
import { WandIcon } from 'lucide-react';
import { StarIcon } from '@/components/icons';
import { starDecorations } from '@/data';

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-hidden lg:h-[924px]">
      <div className="relative mx-auto mt-[120px] h-auto w-full px-4 lg:mt-[175px] lg:px-0">
        <div className="-translate-x-1/2 absolute top-[60px] left-1/2 flex w-full max-w-[878px] flex-col items-center gap-8 lg:top-[139px] lg:gap-12">
          <div className="relative flex w-full flex-col items-center gap-5 self-stretch lg:gap-7">
            <div className="relative inline-flex flex-col items-center gap-2">
              <div className="relative mt-[-1.00px] w-fit font-manrope font-semibold text-lg text-white leading-[normal] tracking-[-0.40px] lg:text-[22px] ">
                Promptverse AI
              </div>
              <h1 className="relative w-full max-w-xl px-4 text-center font-manrope font-medium text-3xl text-white leading-tight tracking-[-0.64px] sm:text-4xl lg:px-0 lg:text-[64px] lg:leading-[74px]">
                Find Inspiration.
                <br />
                Create, Generate, Produce & Automate.
              </h1>
            </div>
            <p className="relative w-full max-w-xl px-4 text-center font-manrope font-normal text-[#ffffff99] text-sm leading-6 tracking-[-0.29px] lg:px-0 lg:text-base lg:leading-7">
              Welcome to PromptVerse. Effortlessly create content, explore
              endless prompts, and stay ahead with real-time trends. Automate
              emails, social media, and more while our AI extracts knowledge
              from any document or URL. Experience a stunning, futuristic design
              that boosts productivity.
            </p>
          </div>
          <div className="relative inline-flex flex-col items-center gap-4 sm:flex-row lg:gap-7">
            <Button
              className="text inline-flex h-auto items-center justify-center gap-2 rounded-[55px] border-[1.4px] border-white border-solid bg-transparent px-6 py-3 transition-colors duration-300 hover:text-black lg:px-[34px] lg:py-3.5"
              variant="outline"
            >
              <span className="text-center font-medium font-poppins text-sm text-white leading-[normal] tracking-[0] hover:text-black lg:text-base">
                Start Generating
              </span>
              <WandIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            </Button>
            <Button className="inline-flex h-auto items-center justify-center rounded-[55px] bg-white px-6 py-3 transition-colors duration-300 hover:bg-gray-100 lg:px-[34px] lg:py-3.5">
              <span className="text-center font-medium font-poppins text-black text-sm leading-[normal] tracking-[0] lg:text-base">
                Download
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration -  */}
      <div className="overflow-y-hidden ">
        <div className="absolute bottom-0 left-0 hidden h-full w-full rounded-full bg-gradient-to-b from-transparent via-purple-900/10 to-transparent blur-3xl lg:block" />
        <div className="hidden lg:block">
          {starDecorations.slice(0, 7).map((star, index) => (
            <StarIcon
              className={`absolute ${star.width} ${star.height} ${star.top} ${star.left} `}
              key={`star-${index}`}
            />
          ))}
        </div>

        <div
          className="-translate-x-1/2 absolute bottom-0 left-1/2 hidden h-[600px] w-[1000px] translate-y-1/3 transform rounded-full lg:block"
          style={{
            background:
              'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.1) 50%, transparent 80%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="-translate-x-1/2 absolute bottom-0 left-1/2 h-[400px] w-[600px] translate-y-1/4 transform rounded-full "
          style={{
            background:
              'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* <div className="hidden lg:block absolute -bottom-4 inset-x-0 bg-gradient-to-b from-transparent to-black  h-10 blur-xl"></div> */}
      </div>
    </div>
  );
};
