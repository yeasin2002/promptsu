import { Button } from "@/components/ui/button";

interface Props extends React.ComponentProps<"nav"> {}

const navMenuLeft = ["About", "Technologies", "Products", "Discover"];
const navMenuRight = ["Team", "Pricing", "Buy Premium"];

export const NavigationBar = ({ ...props }: Props) => {
  return (
    <header
      className="flex flex-col items-start py-2 fixed top-0 left-0 right-0 w-full bg-black/80 border-b border-[#ffffff33] backdrop-blur-md z-50"
      {...props}
    >
      <div className="w-full px-4 lg:px-[306px] py-2 lg:py-4">
        <nav className="flex w-full items-center justify-between">
          {/* Left menu items - hidden on mobile */}
          <div className="hidden lg:flex h-[41px] items-center gap-6">
            {navMenuLeft.map((item, index) => (
              <Button
                key={`nav-left-${index}`}
                variant="link"
                className="text-white text-sm font-normal p-0 h-auto hover:text-gray-300 transition-colors duration-300 font-poppins cursor-pointer"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 lg:gap-[15px]">
            <div className="w-6 h-6 lg:w-[30.75px] lg:h-[30.75px] bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs lg:text-sm">P</span>
            </div>
            <div className="relative">
              <span className="font-medium text-center tracking-[0] font-manrope text-white text-lg lg:text-[22px] leading-[normal]">
                Promptverse
              </span>
              <span className="font-poppins font-n ormal text-lg lg:text-[22px] text-center tracking-[0] text-white leading-[normal] ml-1">
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
                  className="text-white text-sm font-normal font-poppins p-0 h-auto hover:text-gray-300 transition-colors duration-300"
                >
                  {item}
                </Button>
              ))}
            </div>
            <Button className="bg-white hover:bg-gray-100 text-black rounded-[55px] px-4 lg:px-[34px] py-2 lg:py-3.5 h-auto transition-colors duration-300">
              <span className="font-poppins font-medium text-xs lg:text-base">
                Get Started
              </span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
