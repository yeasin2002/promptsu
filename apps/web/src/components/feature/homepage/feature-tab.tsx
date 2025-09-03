'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface FeatureTabProps {
  icon: ReactNode;
  title: string;
  description: string;
  isActive: boolean;
}

export const FeatureTab = ({ icon, title, description, isActive }: FeatureTabProps) => {
  return (
    <div
      className={`relative flex w-full items-center gap-4 rounded-xl p-5 transition-all duration-300 ${
        isActive ? 'glass shadow-lg shadow-primary/10' : 'hover:glass-hover'
      } `}
    >
      {isActive && (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-primary"
          initial={{ opacity: 0 }}
          layoutId="activeTab"
          transition={{ duration: 0.2 }}
        />
      )}
      <div className="flex min-w-0 items-center gap-4">
        <div className={`${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{icon}</div>
        <div className="min-w-0 text-left">
          <h3 className={`truncate font-semibold text-base ${isActive ? 'text-primary' : ''}`}>{title}</h3>
          <p className="line-clamp-2 text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
