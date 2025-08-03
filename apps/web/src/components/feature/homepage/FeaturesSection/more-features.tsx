import { featureCards } from '@/data';

export const MoreFeatures = () => {
  return (
    <div className="flex w-full max-w-[1309px] flex-col items-center justify-center gap-8 lg:gap-7">
      <div className="flex w-full">
        <h2 className="flex-1 font-manrope font-medium text-3xl leading-tight tracking-[-1.16px] lg:text-[64px] lg:leading-[64px]">
          <span className="text-[#ffffff80] leading-tight tracking-[-0.75px] lg:leading-[86.4px]">
            More features
          </span>
          <span className="block text-white leading-tight tracking-[-0.75px] lg:leading-[86.4px]">
            Promptverse AI{' '}
          </span>
          <span className="text-[#ffffff80] leading-tight tracking-[-0.75px] lg:leading-[86.4px]">
            offers to an individual{' '}
          </span>
        </h2>
      </div>

      <div className="w-full border-[#e0e0e0] border-t pt-8 lg:pt-[61px]">
        <div className="grid w-full max-w-[1309px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-[60px]">
          {featureCards.map((feature, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-4 lg:gap-[15px]"
            >
              <h3 className="font-manrope font-semibold text-lg text-white leading-7 tracking-[-0.80px] lg:text-xl lg:leading-8">
                {feature.title}
              </h3>
              <p className="font-manrope font-medium text-[#828282] text-sm leading-6 tracking-[-0.80px] lg:text-base lg:leading-[28.8px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
