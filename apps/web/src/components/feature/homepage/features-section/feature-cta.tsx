import { Button } from '@workspace/ui/shadcn/button';
import { Card, CardContent } from '@workspace/ui/shadcn/card';

export const FeatureCta = () => {
  return (
    <Card className="min-h-[300px] w-full max-w-[1308px] overflow-hidden rounded-lg border-gray-800 bg-[#0d0d0d] lg:h-[474px] lg:rounded-[19px]">
      <CardContent className="relative flex h-full items-center justify-center p-6 lg:p-0">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />

        {/* Floating elements */}
        <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 opacity-60 lg:h-12 lg:w-12" />
        <div className="absolute bottom-8 left-8 h-6 w-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-40 lg:h-10 lg:w-10" />
        <div className="absolute top-1/3 left-4 h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-50 lg:h-6 lg:w-6" />

        <div className="z-10 flex flex-col items-center gap-8 text-center lg:gap-[58px]">
          <h2 className="w-full max-w-[984.72px] text-center font-manrope font-semibold text-2xl text-white leading-tight tracking-[-0.48px] lg:text-5xl lg:leading-[74px]">
            Promptverse has no limitation. <br />
            Get Started in a journey with promptverse.
          </h2>

          <Button className="h-auto rounded-[55px] bg-white px-6 py-3 transition-colors duration-300 hover:bg-gray-100 lg:px-[34px] lg:py-3.5">
            <span className="text-center font-medium font-poppins text-black text-sm leading-[normal] tracking-[0] lg:text-base">
              Create an Account
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
