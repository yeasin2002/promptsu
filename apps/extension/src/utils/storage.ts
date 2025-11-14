import { storage } from "#imports";

/**
 * Utility functions for managing extension storage
 */

export interface StorageKeys {
  geminiApiKey: string;
}

/**
 * Get the Gemini API key from storage
 */
export async function getGeminiApiKey(): Promise<string | null> {
  try {
    const key = await storage.getItem<string>("local:geminiApiKey");
    return key || null;
  } catch (error) {
    console.error("Failed to get Gemini API key:", error);
    return null;
  }
}

/**
 * Save the Gemini API key to storage
 */
export async function setGeminiApiKey(apiKey: string): Promise<boolean> {
  try {
    await storage.setItem("local:geminiApiKey", apiKey);
    return true;
  } catch (error) {
    console.error("Failed to save Gemini API key:", error);
    return false;
  }
}

/**
 * Remove the Gemini API key from storage
 */
export async function removeGeminiApiKey(): Promise<boolean> {
  try {
    await storage.removeItem("local:geminiApiKey");
    return true;
  } catch (error) {
    console.error("Failed to remove Gemini API key:", error);
    return false;
  }
}
