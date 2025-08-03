import { AudioAndMusic } from './audio-and-music';
import { FeatureCta } from './feature-cta';
import { GeneratedImageGrid } from './generated-image-grid';
import { MoreFeatures } from './more-features';
import { TrendingPrompts } from './trending-prompts';

export const FeaturesSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-16 px-4 py-8 lg:gap-[244px] lg:px-0 lg:py-16">
      <TrendingPrompts />
      <GeneratedImageGrid />
      <AudioAndMusic />
      <MoreFeatures />
      <FeatureCta />
    </section>
  );
};
