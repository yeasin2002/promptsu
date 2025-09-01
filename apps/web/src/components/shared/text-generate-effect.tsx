'use client';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect } from 'react';

export const TextGenerateEffect = ({
  words,
  className = '',
}: {
  words: string;
  className?: string;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => words.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, words.length, {
      type: 'tween',
      duration: 2.5, // Increased from 1 to 2.5 seconds
      ease: 'easeInOut',
    });
    return controls.stop;
  }, [words, count]);

  return <motion.span className={className}>{displayText}</motion.span>;
};
