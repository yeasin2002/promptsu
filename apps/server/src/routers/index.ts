import { protectedProcedure, publicProcedure, router } from '../lib/trpc';
import { enhancePrompts } from './prompt-enhancer';

export const trpcAppRouter = router({
  enhancePrompts,
  hello: publicProcedure.query(() => ({ data: 'Hello from tRPC' })),
  userData: protectedProcedure.query(({ ctx }) => {
    return {
      message: 'This is private',
      user: ctx.session.user,
    };
  }),
});

export type trpcAppRouter = typeof trpcAppRouter;
