import { Button } from "@/components/ui/button";
import { WandIcon } from "lucide-react";
import React from "react";

export const InspirationSection = () => {
  // Navigation menu items
  const navMenuLeft = ["About", "Technologies", "Products", "Discover"];
  const navMenuRight = ["Team", "Pricing", "Buy Premium"];

  // Star decorations data
  const starDecorations = [
    {
      width: "w-3.5",
      height: "h-3.5",
      top: "top-[289px]",
      left: "left-[349px]",
    },
    {
      width: "w-[21px]",
      height: "h-[21px]",
      top: "top-[595px]",
      left: "left-[129px]",
    },
    { width: "w-14", height: "h-6", top: "top-[900px]", left: "left-[661px]" },
    { width: "w-7", height: "h-7", top: "top-[46px]", left: "left-[607px]" },
    { width: "w-7", height: "h-7", top: "top-[221px]", left: "left-[1810px]" },
    {
      width: "w-3.5",
      height: "h-3.5",
      top: "top-[30px]",
      left: "left-[1296px]",
    },
    {
      width: "w-3.5",
      height: "h-3.5",
      top: "top-[723px]",
      left: "left-[1648px]",
    },
    { width: "w-4", height: "h-4", top: "top-[130px]", left: "left-[122px]" },
  ];

  return (
    <div className="relative w-full min-h-screen lg:h-[1099px]">
      <div className="relative h-full">
        <div className="relative w-full h-full">
          <div className="relative w-full h-auto lg:h-[924px] mt-[120px] lg:mt-[175px] mx-auto px-4 lg:px-0">
            <div className="flex flex-col w-full max-w-[878px] items-center gap-8 lg:gap-12 absolute top-[60px] lg:top-[139px] left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-5 lg:gap-7 relative self-stretch w-full">
                <div className="inline-flex flex-col items-center gap-2 relative">
                  <div className="relative w-fit mt-[-1.00px] font-semibold tracking-[-0.40px] [font-family:'Manrope',Helvetica] text-white text-lg lg:text-[22px] leading-[normal]">
                    Promptverse AI
                  </div>

                  <h1 className="relative w-full max-w-[674.68px] [font-family:'Manrope',Helvetica] font-medium text-white text-3xl sm:text-4xl lg:text-[64px] text-center tracking-[-0.64px] leading-tight lg:leading-[74px] px-4 lg:px-0">
                    Find Inspiration.
                    <br />
                    Create, Generate, Produce & Automate.
                  </h1>
                </div>

                <p className="relative w-full max-w-[735.65px] [font-family:'Manrope',Helvetica] font-normal text-[#ffffff99] text-sm lg:text-base text-center tracking-[-0.29px] leading-6 lg:leading-7 px-4 lg:px-0">
                  Welcome to PromptVerse. Effortlessly create content, explore
                  endless prompts, and stay ahead with real-time trends.
                  Automate emails, social media, and more while our AI extracts
                  knowledge from any document or URL. Experience a stunning,
                  futuristic design that boosts productivity.
                </p>
              </div>

              <div className="inline-flex flex-col sm:flex-row items-center gap-4 lg:gap-7 relative">
                <Button
                  variant="outline"
                  className="gap-2 border-[1.4px] border-solid border-white inline-flex items-center justify-center px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto hover:bg-white hover:text-black transition-colors duration-300"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-white hover:text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                    Start Generating
                  </span>
                  <WandIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>

                <Button className="bg-white hover:bg-gray-100 inline-flex items-center justify-center px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto transition-colors duration-300">
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                    Download
                  </span>
                </Button>
              </div>
            </div>

            {/* Background decoration - hidden on mobile */}
            <div className="hidden lg:block absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent rounded-full blur-3xl"></div>

            {/* Star decorations - hidden on mobile for cleaner look */}
            <div className="hidden lg:block">
              {starDecorations.slice(0, 7).map((star, index) => (
                <div
                  key={`star-${index}`}
                  className={`absolute ${star.width} ${star.height} ${star.top} ${star.left} bg-white rounded-full opacity-60`}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:block absolute w-4 h-4 top-[130px] left-[122px] bg-white rounded-full opacity-60" />
        </div>

        {/* Navigation Bar */}
        <header className="flex flex-col items-start py-2 lg:py-4 fixed top-0 left-0 right-0 w-full bg-black/80 border-b border-[#ffffff33] backdrop-blur-md z-50">
          <div className="w-full px-4 lg:px-[306px] py-2 lg:py-4">
            <nav className="flex w-full items-center justify-between">
              {/* Left menu items - hidden on mobile */}
              <div className="hidden lg:flex h-[41px] items-center gap-6">
                {navMenuLeft.map((item, index) => (
                  <Button
                    key={`nav-left-${index}`}
                    variant="link"
                    className="text-white text-sm font-normal [font-family:'Poppins',Helvetica] p-0 h-auto hover:text-gray-300 transition-colors duration-300"
                  >
                    {item}
                  </Button>
                ))}
              </div>

              {/* Logo */}
              <div className="flex items-center justify-center gap-2 lg:gap-[15px]">
                <div className="w-6 h-6 lg:w-[30.75px] lg:h-[30.75px] bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs lg:text-sm">
                    P
                  </span>
                </div>
                <div className="relative">
                  <span className="font-medium text-center tracking-[0] [font-family:'Manrope',Helvetica] text-white text-lg lg:text-[22px] leading-[normal]">
                    Promptverse
                  </span>
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-lg lg:text-[22px] text-center tracking-[0] text-white leading-[normal] ml-1">
                    AI
                  </span>
                </div>
              </div>

              {/* Right menu items */}
              <div className="flex h-[41px] items-center gap-2 lg:gap-6">
                {/* Hide some menu items on mobile */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                  {navMenuRight.slice(0, 2).map((item, index) => (
                    <Button
                      key={`nav-right-${index}`}
                      variant="link"
                      className="text-white text-sm font-normal [font-family:'Poppins',Helvetica] p-0 h-auto hover:text-gray-300 transition-colors duration-300"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                <Button className="bg-white hover:bg-gray-100 text-black rounded-[55px] px-4 lg:px-[34px] py-2 lg:py-3.5 h-auto transition-colors duration-300">
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-xs lg:text-base">
                    Get Started
                  </span>
                </Button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};
