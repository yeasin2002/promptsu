'use client';

import { buttonVariants } from '@workspace/ui/shadcn/button';
import { ArrowRight, Command } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import videoConference from '@/assets/video-conference-dashboard.png';
import { TextGenerateEffect } from '@/components/shared';

// interface Props extends React.ComponentProps<'div'> {}

export const Hero = () => {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="container relative px-4 pt-40 pb-20"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div className="-z-10 absolute inset-0 bg-[#0a0a0a]" />

      <motion.div
        animate={{ opacity: 1 }}
        className="glass mb-4 inline-block rounded-full px-4 py-1.5"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="font-medium text-sm">
          <Command className="mr-2 inline-block h-4 w-4" />
          Next-generation video conferencing platform
        </span>
      </motion.div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="mb-4 text-left font-normal text-5xl tracking-tight md:text-7xl">
          <span className="text-gray-200">
            <TextGenerateEffect words="Connect & collaborate" />
          </span>
          <br />
          <span className="font-medium text-white">
            <TextGenerateEffect words="anywhere, anytime" />
          </span>
        </h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 max-w-2xl text-left text-gray-200 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
        >
          Experience crystal-clear video meetings with AI-powered features,
          seamless collaboration tools, and enterprise-grade security.{' '}
          <span className="text-white">Start meeting in seconds.</span>
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          <Link className={buttonVariants({ size: 'lg' })} href={'/signup'}>
            create new rooms
          </Link>
          <Link
            className={buttonVariants({
              size: 'lg',
              variant: 'outline',
              className: '!rounded-full text-white',
            })}
            href={'/rooms'}
          >
            Join a room
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto mt-20 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.6 }}
      >
        <div className="glass overflow-hidden rounded-xl">
          <Image
            alt="VideoMeet Platform Interface"
            className="h-auto w-full"
            src={videoConference}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};
