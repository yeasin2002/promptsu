import type { RouterClient } from '@orpc/server';
import { protectedProcedure, publicProcedure } from '../lib/orpc';
import { enhancePromptsWithOrpc } from './prompt-enhancer';

export const appRouter = {
  enhancePrompts: enhancePromptsWithOrpc,
  healthCheck: publicProcedure.handler(() => {
    return 'OK';
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    };
  }),
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
