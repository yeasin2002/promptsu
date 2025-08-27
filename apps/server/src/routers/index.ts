import { protectedProcedure, publicProcedure, router } from '@/lib/trpc';
import { promptEnhancerRouter } from './prompt-enhancer';

export const trpcAppRouter = router({
  healthCheck: publicProcedure.query(() => 'OK'),
  promptEnhancer: promptEnhancerRouter,
  userData: protectedProcedure.query(({ ctx }) => {
    return { message: 'This is private', user: ctx.session.user };
  }),
});

export type trpcAppRouter = typeof trpcAppRouter;
