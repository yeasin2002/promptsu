import { StarIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { starDecorations } from '@/data';
import { WandIcon } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen lg:h-[924px] overflow-x-hidden overflow-y-hidden">
      <div className="relative w-full h-auto  mt-[120px] lg:mt-[175px] mx-auto px-4 lg:px-0">
        <div className="flex flex-col w-full max-w-[878px] items-center gap-8 lg:gap-12 absolute top-[60px] lg:top-[139px] left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-5 lg:gap-7 relative self-stretch w-full">
            <div className="inline-flex flex-col items-center gap-2 relative">
              <div className="relative w-fit mt-[-1.00px] font-semibold tracking-[-0.40px] font-manrope  text-white text-lg lg:text-[22px] leading-[normal] ">
                Promptverse AI
              </div>
              <h1 className="relative w-full max-w-xl font-manrope  font-medium text-white text-3xl sm:text-4xl lg:text-[64px] text-center tracking-[-0.64px] leading-tight lg:leading-[74px] px-4 lg:px-0">
                Find Inspiration.
                <br />
                Create, Generate, Produce & Automate.
              </h1>
            </div>
            <p className="relative w-full max-w-xl font-manrope  font-normal text-[#ffffff99] text-sm lg:text-base text-center tracking-[-0.29px] leading-6 lg:leading-7 px-4 lg:px-0">
              Welcome to PromptVerse. Effortlessly create content, explore
              endless prompts, and stay ahead with real-time trends. Automate
              emails, social media, and more while our AI extracts knowledge
              from any document or URL. Experience a stunning, futuristic design
              that boosts productivity.
            </p>
          </div>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 lg:gap-7 relative">
            <Button
              variant="outline"
              className="gap-2 border-[1.4px] border-solid border-white inline-flex items-center justify-center px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto text hover:text-black transition-colors duration-300 bg-transparent"
            >
              <span className="font-poppins font-medium text-white hover:text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                Start Generating
              </span>
              <WandIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            </Button>
            <Button className="bg-white hover:bg-gray-100 inline-flex items-center justify-center px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto transition-colors duration-300">
              <span className="font-poppins font-medium text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                Download
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration -  */}
      <div className="overflow-y-hidden ">
        <div className="hidden lg:block absolute w-full h-full bottom-0 left-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent rounded-full blur-3xl"></div>
        <div className="hidden lg:block">
          {starDecorations.slice(0, 7).map((star, index) => (
            <StarIcon
              key={`star-${index}`}
              className={`absolute ${star.width} ${star.height} ${star.top} ${star.left} `}
            />
          ))}
        </div>

        <div
          className="hidden lg:block absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-[1000px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.1) 50%, transparent 80%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-[600px] h-[400px] rounded-full "
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
