import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

// Input schema
export const testApiSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
});

// Inferred types
export type TestApiInput = z.infer<typeof testApiSchema>;

export async function testApiService(input: TestApiInput) {
  try {
    const ai = new GoogleGenAI({ apiKey: input.apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "just say hi",
    });

    console.log("Response:", response.text);
    console.log("Usage:", response.usageMetadata);

    return { error: null, data: response.text };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return { error: message, data: null };
  }
}
