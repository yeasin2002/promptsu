import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import { PromptEnhancerSystemPrompt } from "../utils/prompt-enhancer-system-prompt.js";

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
    const ai = new GoogleGenAI({ apiKey: input.apiKey });
    const messages = PromptEnhancerSystemPrompt(input.prompt);

    // Extract system instruction and convert messages to contents
    const systemMessage = messages.find((m) => m.role === "system");
    const chatMessages = messages.filter((m) => m.role !== "system");

    const contents = chatMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction: systemMessage?.content,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Title of the prompt" },
            enhancedPrompt: {
              type: Type.STRING,
              description: "Enhanced prompt by AI",
            },
          },
          required: ["title", "enhancedPrompt"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}") as EnhancedOutput;

    console.log("Usage:", response.usageMetadata);
    console.log("Prompt Title:", result.title);

    return { error: null, data: result.enhancedPrompt };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return { error: message, data: null };
  }
}
