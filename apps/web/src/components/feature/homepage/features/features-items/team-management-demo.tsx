'use client';

import { BarChart3, Crown, Settings, Users } from 'lucide-react';
import { motion } from 'motion/react';

export const TeamManagementDemo = () => {
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
            <Users className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-2xl">Team Management</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="glass-hover rounded-lg p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <span className="font-medium">Role Management</span>
                </div>
                <p className="text-muted-foreground text-sm">Admin, Moderator, Member</p>
              </div>

              <div className="glass-hover rounded-lg p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="font-medium">Permissions</span>
                </div>
                <p className="text-muted-foreground text-sm">Granular access control</p>
              </div>
            </div>

            <div className="glass-hover rounded-lg p-4">
              <div className="mb-3 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="font-medium">Analytics</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meeting Hours</span>
                  <span className="text-primary">124h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Users</span>
                  <span className="text-primary">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Satisfaction</span>
                  <span className="text-primary">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
