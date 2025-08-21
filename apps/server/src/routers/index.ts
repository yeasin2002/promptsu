import { protectedProcedure, publicProcedure, router } from '../lib/trpc';

export const trpcAppRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
});
export type trpcAppRouter = typeof trpcAppRouter;
