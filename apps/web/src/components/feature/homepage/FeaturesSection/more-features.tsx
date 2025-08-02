import { featureCards } from "@/data";

export const MoreFeatures = () => {
  return (
    <div className="flex flex-col w-full max-w-[1309px] items-center justify-center gap-8 lg:gap-7">
      <div className="flex w-full">
        <h2 className="flex-1 font-manrope font-medium text-3xl lg:text-[64px] tracking-[-1.16px] leading-tight lg:leading-[64px]">
          <span className="text-[#ffffff80] tracking-[-0.75px] leading-tight lg:leading-[86.4px]">
            More features
          </span>
          <span className="text-white tracking-[-0.75px] leading-tight lg:leading-[86.4px] block">
            Promptverse AI{" "}
          </span>
          <span className="text-[#ffffff80] tracking-[-0.75px] leading-tight lg:leading-[86.4px]">
            offers to an individual{" "}
          </span>
        </h2>
      </div>

      <div className="w-full border-t border-[#e0e0e0] pt-8 lg:pt-[61px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[60px] w-full max-w-[1309px]">
          {featureCards.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 lg:gap-[15px] w-full"
            >
              <h3 className="font-manrope font-semibold text-white text-lg lg:text-xl tracking-[-0.80px] leading-7 lg:leading-8">
                {feature.title}
              </h3>
              <p className="font-manrope font-medium text-[#828282] text-sm lg:text-base tracking-[-0.80px] leading-6 lg:leading-[28.8px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
