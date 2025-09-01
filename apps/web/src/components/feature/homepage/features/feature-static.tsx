'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import ai_features from '@/assets/extension-main.png';
import { features } from '@/components/feature/homepage/features/features-list.data';

export const FeatureStatic = () => {
  return (
    <section className="container px-4 py-24" id="features-static">
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

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {/* Left side - Feature list (no tabs) */}
        <div className="space-y-3 md:col-span-5">
          {features.map((feature) => (
            <div
              className="glass relative flex w-full items-center gap-4 rounded-xl p-5"
              key={feature.title}
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="text-primary">{feature.icon}</div>
                <div className="min-w-0 text-left">
                  <h3 className="truncate font-semibold text-base text-primary">
                    {feature.title}
                  </h3>
                  <p className="line-clamp-2 text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Static content with images */}

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex h-full items-center justify-center md:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass relative w-full overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <Image
              alt={'Img'}
              className="relative z-10 h-full w-full object-cover"
              src={ai_features}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
