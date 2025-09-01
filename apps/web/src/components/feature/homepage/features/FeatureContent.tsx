import { motion } from 'motion/react';
import Image, { type StaticImageData } from 'next/image';

interface FeatureContentProps {
  image: StaticImageData;
  title: string;
}

export const FeatureContent = ({ image, title }: FeatureContentProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass relative w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <Image
          alt={title}
          className="relative z-10 h-full max-h-[27rem] w-full object-cover"
          src={image}
        />
      </div>
    </motion.div>
  );
};
