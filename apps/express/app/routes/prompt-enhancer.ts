import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { PromptEnhancerSystemPrompt } from "../utils/prompt-enhancer-system-prompt";

// Input and output schemas
export const enhanceInputSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  apiKey: z.string().min(1, "API key is required"),
});

export const enhancedOutputSchema = z.object({
  title: z.string().describe("Title of the prompt"),
  enhancedPrompt: z.string().describe("Enhanced prompt by AI"),
});

// Inferred types
export type EnhanceInput = z.infer<typeof enhanceInputSchema>;
export type EnhancedOutput = z.infer<typeof enhancedOutputSchema>;

export async function promptEnhancerService(input: EnhanceInput) {
  try {
    const google = createGoogleGenerativeAI({
      apiKey: input.apiKey,
    });

    const model = google("gemini-2.0-flash");

    const { object, usage } = await generateObject({
      model,
      schema: enhancedOutputSchema,
      prompt: PromptEnhancerSystemPrompt(input.prompt),
    });

    console.log(usage);
    console.log("Prompt Title", object.title);

    return { error: null, data: object.enhancedPrompt };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return { error: message, data: null };
  }
}
