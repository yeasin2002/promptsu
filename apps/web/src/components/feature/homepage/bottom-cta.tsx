'use client';

import { Button } from '@workspace/ui/shadcn/button';
import { Input } from '@workspace/ui/shadcn/input';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import bgGrid from '@/assets/bg-grid.png';

interface Props extends React.ComponentProps<'div'> {}

export const BottomCta = ({ ...props }: Props) => {
  return (
    <section className="container relative px-4 py-20 " {...props}>
      <div
        className="absolute inset-0 overflow-hidden opacity-40"
        style={{
          backgroundImage: `url(${bgGrid.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 rounded-2xl border border-white/10 bg-[#0A0A0A]/80 p-8 text-center backdrop-blur-lg md:p-12"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 font-bold text-3xl md:text-4xl">
          Be a early adopter, join the waitlist
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Sign up to be the first to know when we launch
        </p>
        <div className="mx-auto flex max-w-xl items-center justify-center ">
          <Input
            className="!rounded-l-2xl !rounded-r-none py-2"
            placeholder="Enter your email"
            type="email"
          />
          <Button className="button-gradient !rounded-l-2xl" size="lg">
            Start for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
