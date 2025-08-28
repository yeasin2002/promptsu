import { features } from '@/data/features-list.data';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/shadcn/tabs';
import { FeatureContent } from './FeatureContent';
import { FeatureTab } from './FeatureTab';

export const FeaturesSection = () => {
  return (
    <section className="container px-4 py-24" id="features">
      {/* Header Section */}
      <div className="mb-20 max-w-2xl">
        <h2 className="mb-6 text-left font-normal text-5xl tracking-tight md:text-6xl">
          Next-Generation
          <br />
          <span className="font-medium text-gradient">Meeting Experience</span>
        </h2>
        <p className="text-left text-gray-400 text-lg md:text-xl">
          Experience AI-powered video conferencing tools and features designed
          for modern teams and remote collaboration.
        </p>
      </div>

      <Tabs className="w-full" defaultValue={features[0]?.title}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left side - Tab triggers */}
          <div className="space-y-3 md:col-span-5">
            <TabsList className="flex h-auto w-full flex-col space-y-3 bg-transparent p-0">
              {features.map((feature) => (
                <TabsTrigger
                  className="w-full data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  key={feature.title}
                  value={feature.title}
                >
                  <FeatureTab
                    description={feature.description}
                    icon={feature.icon}
                    isActive={false}
                    title={feature.title}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Right side - Tab content with images */}
          <div className="md:col-span-7">
            {features.map((feature) => (
              <TabsContent
                className="mt-0 h-full"
                key={feature.title}
                value={feature.title}
              >
                <FeatureContent image={feature.image} title={feature.title} />
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  );
};
