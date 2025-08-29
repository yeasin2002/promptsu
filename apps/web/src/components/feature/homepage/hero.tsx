'use client';

import { RiGithubFill } from '@remixicon/react';
import { buttonVariants } from '@workspace/ui/shadcn/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';


export const Hero = () => {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="container relative min-h-[60vh] px-4 pt-40 pb-20"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div className="-z-10 absolute inset-0 bg-[#0a0a0a]" />

      <motion.a
        animate={{ opacity: 1 }}
        className="glass mb-4 inline-block rounded-full px-4 py-1.5"
        href="https://github.com/yeasin2002/prompverse"
        initial={{ opacity: 0 }}
        rel="noopener noreferrer"
        target="_blank"
        transition={{ delay: 0.2 }}
      >
        <span className="font-medium text-sm">
          <RiGithubFill className="mr-2 inline-block h-4 w-4" />
          Open Sourced
        </span>
      </motion.a>

      <div className="relative z-10 max-w-2xl">
        <h1 className=" mb-4 font-bold font-roboto text-5xl md:text-6xl">
          Prompting, but smarter
        </h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 max-w-2xl text-left font-manrope text-gray-200 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
        >
          Discover, compose, and share prompts that spark smarter AI outputs
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

      {/* <motion.div
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
      </motion.div> */}
    </motion.section>
  );
};
