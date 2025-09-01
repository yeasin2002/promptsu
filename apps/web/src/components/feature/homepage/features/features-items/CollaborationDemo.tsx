'use client';

import { Edit3, Monitor, Share2, Users2 } from 'lucide-react';
import { motion } from 'motion/react';

export const CollaborationDemo = () => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full min-h-[27rem] items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass relative w-full overflow-hidden rounded-xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <Share2 className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-2xl">Collaboration Tools</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-hover rounded-lg p-4 text-center">
              <Monitor className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="font-medium text-sm">Screen Share</p>
            </div>
            <div className="glass-hover rounded-lg p-4 text-center">
              <Edit3 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="font-medium text-sm">Whiteboard</p>
            </div>
            <div className="glass-hover rounded-lg p-4 text-center">
              <Users2 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="font-medium text-sm">Real-time Editing</p>
            </div>
            <div className="glass-hover rounded-lg p-4 text-center">
              <Share2 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="font-medium text-sm">File Sharing</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Seamless collaboration with real-time tools for productive
              meetings
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
