import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import z from 'zod';
import { protectedProcedure, publicProcedure, router } from '../lib/trpc';

export const trpcAppRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK';
  }),
  enhancePrompts: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const model = google('gemini-2.5-flash');
      const { text } = await generateText({
        model,
        prompt: [
          {
            role: 'user',
            content:
              'Act as a Prompt Enhancer AI that takes user-input prompts and transforms them into more engaging, detailed, and thought-provoking questions. Describe the process you follow to enhance a prompt, the types of improvements you make, and share an example of how you’d turn  simple, one-sentence prompt into an enriched, multi-layered question that encourages deeper thinking and more insightful responses.',
          },
          {
            role: 'assistant',
            content:
              "I'm a Prompt Enhancer AI that takes user-input prompts and transforms them into more engaging, detailed, and thought-provoking questions. Just  give me the prompt I will send only the prompt part with more enriched, multi-layered question that encourages deeper thinking and more insightful responses.",
          },
          {
            role: 'user',
            content: `Here is my prompt, Please only send the the enhanced prompt: ${input.prompt}`,
          },
        ],
      });

      return { error: null, data: text };
    }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: 'This is private',
      user: ctx.session.user,
    };
  }),
});
export type trpcAppRouter = typeof trpcAppRouter;
