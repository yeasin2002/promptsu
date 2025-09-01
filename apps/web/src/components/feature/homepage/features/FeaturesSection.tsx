'use client';

import { buttonVariants } from '@workspace/ui/shadcn/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/shadcn/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FirefoxIcon from '@/assets/Firefox-Logo.svg';
import ChromeIcon from '@/assets/google-chrome-logo.svg';
import { features } from '@/components/feature/homepage/features/features-list.data';
import { FeatureTab } from '../FeatureTab';

export const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(features[0]?.title || '');
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Auto-tab change functionality
  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = features.findIndex(
          (feature) => feature.title === current
        );
        const nextIndex = (currentIndex + 1) % features.length;
        return features[nextIndex]?.title ?? features[0]?.title ?? '';
      });
    }, 8000); // Change tab every 4 seconds

    return () => clearInterval(interval);
  }, [isUserInteracting]);

  // Reset user interaction after 8 seconds
  useEffect(() => {
    if (!isUserInteracting) return;

    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isUserInteracting]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsUserInteracting(true);
  };

  return (
    <section className="container px-4 py-24" id="features">
      {/* Header Section */}
      <div className="mb-20 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="mb-6 text-left font-normal text-5xl tracking-tight md:text-6xl ">
            <span className=" font-bold text-gradient">Prompt Enhancer</span>
          </h2>
          <p className="text-left text-gray-400 text-lg md:text-xl">
            Do Next-level prompting , Turn raw prompts into dependable,
            production-ready instructions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 lg:flex-row">
          <Link
            className={buttonVariants({
              variant: 'outline',
              className: '!rounded-full flex',
            })}
            href={'/'}
          >
            <Image alt="Google Chrome" className="size-10" src={ChromeIcon} />
            Download on Chrome
          </Link>
          <Link
            className={buttonVariants({
              variant: 'outline',
              className: '!rounded-full flex',
            })}
            href={'/'}
          >
            <Image alt="Firefox" className="size-10" src={FirefoxIcon} />
            Download on Firefox
          </Link>
        </div>
      </div>

      <Tabs
        className="w-full"
        onValueChange={handleTabChange}
        value={activeTab}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left side - Tab triggers */}
          <div className="space-y-3 md:col-span-5">
            <TabsList className="flex h-auto w-full flex-col space-y-3 bg-transparent p-0">
              {features.map((feature) => (
                <TabsTrigger
                  className="w-full cursor-pointer data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  key={feature.title}
                  value={feature.title}
                >
                  <FeatureTab
                    description={feature.description}
                    icon={feature.icon}
                    isActive={activeTab === feature.title}
                    title={feature.title}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Right side - Tab content with components */}
          <div className="md:col-span-7">
            {features.map((feature) => (
              <TabsContent
                className="mt-0 h-full"
                key={feature.title}
                value={feature.title}
              >
                {feature.component}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  );
};
