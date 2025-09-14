import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import chalk from 'chalk';
import { z } from 'zod';
import { publicProcedure } from '../../lib/orpc';

const enhancedOutputSchema = z.object({
  title: z.string().describe('title of the prompt, what kind of prompt it is'),
  enhancedPrompt: z.string().describe('enhanced prompt by AI'),
});

export const enhancePromptsWithOrpc = publicProcedure
  .input(z.object({ prompt: z.string().min(1) }))
  .handler(async ({ input }) => {
    try {
      const model = google('gemini-2.5-flash');
      const { object, usage } = await generateObject({
        model,
        schema: enhancedOutputSchema,
        prompt: [
          {
            role: 'system',
            content: `
          Act as a Prompt Enhancer AI that takes user-input prompts and transforms them into more engaging, detailed, and thought-provoking questions. Describe the process to  follow to enhance a prompt, the types of improvements you make, and share an example of how you’d turn  simple, one-sentence prompt into an enriched. 
            
             Follow this compact structure when possible (if needed): 
             1. Role (Persona) – Define who or what AI should act as.
             2. Additional Information – Context or background that sets up the task. 
             3. Directive – Your actual instruction or question 
             4. Task – What you want AI  to do.
             5. Constraints – Any additional rules or limitations.

            Follow this Core Principles: 
            1. Be clear and specific. Give the model enough detail to avoid vague answers
            2. Iterate and refine. Start with a draft, review responses, then tweak wording, add examples or cut unnecessary parts
            3.  Set the right tone using simple adjectives like “professional,” “friendly,” or “conversational -  add  this based on user input prompt. 
            4. Don't use Role, Directive, Task, or Constraints in the prompt. Just follow this structure when possible or needed with line break! but don't include this words 
            5. try to keep the prompt minimal  and simple but still informative and engaging under 100-200 words, if but it can be longer than that if needed, Balance both of text quality and make a proper prompt , based on use case it can be long

            Additional  Note: 
            1. Do not add any metadata or commentary. Return only the enhanced prompt string as text 
           2. Return response in application/text format!  No markdown format is allowed normally!  use markdown only when you need to add code blocks.
           3. fix any grammar errors if any with simple and readable  English! 
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
      console.log(chalk.white.bgYellow("'Prompt Title'"), chalk.green(object.title));
      return { error: null, data: object.enhancedPrompt };
    } catch (error) {
      if (error instanceof Error) return { error: error.message, data: null };
      return { error: 'Something went wrong', data: null };
    }
  });
