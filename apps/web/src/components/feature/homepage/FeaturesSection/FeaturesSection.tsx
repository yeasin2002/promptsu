import { AudioAndMusic } from './audio-and-music';
import { FeatureCta } from './feature-cta';
import { GeneratedImageGrid } from './generated-image-grid';
import { MoreFeatures } from './more-features';
import { TrendingPrompts } from './trending-prompts';

export const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center w-full gap-16 lg:gap-[244px] py-8 lg:py-16 px-4 lg:px-0">
      <TrendingPrompts />
      <GeneratedImageGrid />
      <AudioAndMusic />
      <MoreFeatures />
      <FeatureCta />
    </section>
  );
};
