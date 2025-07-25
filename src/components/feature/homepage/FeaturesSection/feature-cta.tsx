import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const FeatureCta = () => {
  return (
    <Card className="w-full max-w-[1308px] min-h-[300px] lg:h-[474px] bg-[#0d0d0d] border-gray-800 rounded-lg lg:rounded-[19px] overflow-hidden">
      <CardContent className="flex items-center justify-center h-full p-6 lg:p-0 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>

        {/* Floating elements */}
        <div className="absolute top-4 right-4 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-60"></div>
        <div className="absolute bottom-8 left-8 w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 left-4 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-50"></div>

        <div className="flex flex-col items-center gap-8 lg:gap-[58px] z-10 text-center">
          <h2 className="w-full max-w-[984.72px] font-manrope font-semibold text-white text-2xl lg:text-5xl text-center tracking-[-0.48px] leading-tight lg:leading-[74px]">
            Promptverse has no limitation. <br />
            Get Started in a journey with promptverse.
          </h2>

          <Button className="bg-white hover:bg-gray-100 px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto transition-colors duration-300">
            <span className="font-poppins font-medium text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
              Create an Account
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
