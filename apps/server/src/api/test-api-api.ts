import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import chalk from 'chalk';
import { z } from 'zod';

// Input and output schemas
export const testApiSchema = z.object({
  apiKey: z.string().min(1, 'API key is required'),
});

// Inferred types
export type TestApiInput = z.infer<typeof testApiSchema>;

export async function testApiService(input: TestApiInput) {
  try {
    const google = createGoogleGenerativeAI({ apiKey: input.apiKey });
    const model = google('gemini-2.0-flash-lite');
    const { text, usage } = await generateText({ model, prompt: 'just say hi' });
    console.log(chalk.white.bgYellow("'Prompt Title'"), chalk.green(text));
    console.log(usage);

    return { error: null, data: text };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { error: message, data: null };
  }
}
