'use client';

import { motion } from 'framer-motion';

interface Props extends React.ComponentProps<'svg'> {}

export const AnimatedBeam = ({ ...props }: Props) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <title>Animated beam</title>
        <defs>
          <linearGradient id="grad1" x1="1" x2="0" y1="0" y2="0">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="1" x2="0" y1="0" y2="0">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          animate={{ pathLength: 1, opacity: 1 }}
          d="M 100 100 Q 300 0 500 100 T 900 100"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          stroke="url(#grad1)"
          strokeWidth="1"
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            repeatDelay: 1,
          }}
        />
        <motion.path
          animate={{ pathLength: 1, opacity: 1 }}
          d="M 0 200 Q 200 100 400 200 T 800 200"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          stroke="url(#grad2)"
          strokeWidth="1"
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            repeatDelay: 1,
            delay: 0.5,
          }}
        />
      </svg>

      <div className="absolute inset-0 z-[1]">
        <motion.div
          animate={{ opacity: 1 }}
          className="-left-1/4 absolute top-1/4 h-96 w-96 rounded-full bg-main-secondary/30 blur-3xl"
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
        <motion.div
          animate={{ opacity: 1 }}
          className="-right-1/4 absolute top-1/2 h-96 w-96 rounded-full bg-main-secondary/30 blur-3xl"
          initial={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>
    </div>
  );
};
