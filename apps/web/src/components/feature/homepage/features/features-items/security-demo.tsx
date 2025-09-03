'use client';

import { Eye, Lock, ShieldCheck, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const SecurityDemo = () => {
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
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-2xl">Enterprise Security</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border border-primary/20 p-4">
              <Lock className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">End-to-End Encryption</p>
                <p className="text-muted-foreground text-sm">256-bit AES encryption</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-primary/20 p-4">
              <Eye className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Waiting Rooms</p>
                <p className="text-muted-foreground text-sm">Control meeting access</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-primary/20 p-4">
              <UserCheck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Admin Controls</p>
                <p className="text-muted-foreground text-sm">Advanced permissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
