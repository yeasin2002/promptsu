import z from 'zod';
import { protectedProcedure, publicProcedure, router } from '../lib/trpc';

export const trpcAppRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK';
  }),
  enhancePrompts: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(({ input }) => {
      return { error: null, data: `${input.prompt} enhanced` };
    }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: 'This is private',
      user: ctx.session.user,
    };
  }),
});
export type trpcAppRouter = typeof trpcAppRouter;
