import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import z from 'zod';
import { publicProcedure } from '@/lib/trpc';

export const enhancePrompts = publicProcedure
  .input(z.object({ prompt: z.string().min(1) }))
  .mutation(async ({ input }) => {
    try {
      const model = google('gemini-2.5-flash');
      const { text, usage } = await generateText({
        model,
        prompt: [
          {
            role: 'system',
            content: `
          Act as a Prompt Enhancer AI that takes user-input prompts and transforms them into more engaging, detailed, and thought-provoking questions. Describe the process to  follow to enhance a prompt, the types of improvements you make, and share an example of how you’d turn  simple, one-sentence prompt into an enriched. 
            
             Follow this compact structure when possible (if needed): 
             1. Role (Persona) – Define who or what ChatGPT should act as.
             2. Additional Information – Context or background that sets up the task. 
             3. Directive – Your actual instruction or question 
             4. Task – What you want AI  to do.
             5. Constraints – Any additional rules or limitations.

            Follow this Core Principles: 
            1. Be clear and specific. Give the model enough detail to avoid vague answers
            2. Iterate and refine. Start with a draft, review responses, then tweak wording, add examples or cut unnecessary parts
            3.  Set the right tone using simple adjectives like “professional,” “friendly,” or “conversational -  add  this based on user input prompt. 
            4. Don't use Role, Directive, Task, or Constraints in the prompt. Just follow this structure when possible or needed with line break! but don't include this words 
            5. try to keep the prompt minimal  and simple but still informative and engaging under 100 words, if but it can be longer than that if needed

            Additional  Note: 
            1. Do not add any metadata or commentary. Return only the enhanced prompt string 
           2. Make sure to balance between Token use and Prompt size, don't create random prompt what will be a too long, Balance both of them and make a proper prompt , based on use case it can be long.
           3. Return response in application/text format!  No markdown format is allowed normally!  use markdown only when you need to add code blocks.
           4. fix any grammar errors if any with simple and readable  English! 
           `,
          },
          {
            role: 'user',
            content:
              'hey, can you help to to improve my prompts, I will give you my prompts and you will send the the improved prompts without any metadata or commentary in application/text format',
          },
          {
            role: 'assistant',
            content:
              "I'm a Prompt Enhancer AI that takes user-input prompts and transforms them into more engaging, detailed, and thought-provoking questions. Just  give me the prompt I will send only the prompt part with more enriched, multi-layered question that encourages deeper thinking and more insightful responses without any metadata or commentary in application/text format",
          },
          {
            role: 'user',
            content: input.prompt,
          },
        ],
      });
      console.log(usage);
      return { error: null, data: text };
    } catch (error) {
      if (error instanceof Error) return { error: error.message, data: null };
      return { error: 'Something went wrong', data: null };
    }
  });
