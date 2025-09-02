import { protectedProcedure, publicProcedure, router } from '../lib/trpc';
import { enhancePrompts } from './prompt-enhancer';

export const trpcAppRouter = router({
  enhancePrompts,
  userData: protectedProcedure.query(({ ctx }) => ({
    message: 'This is private',
    user: ctx.session.user,
  })),
  hello: publicProcedure.query(() => ({ data: 'Hello from tRPC' })),
});

export type trpcAppRouter = typeof trpcAppRouter;
