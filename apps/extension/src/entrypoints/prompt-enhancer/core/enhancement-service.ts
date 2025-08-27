import { checkServerHealth, trpc } from "@/lib/trpc-chrome-client";
import { PROMPT_ENHANCER_CONFIG, enhancementMethods } from "../config";

export class EnhancementService {
  private isServerHealthy = false;

  async initialize() {
    this.isServerHealthy = await checkServerHealth();
    if (!this.isServerHealthy) {
      console.warn("tRPC server not available, using fallback methods");
    }
  }

  async enhance(text: string): Promise<string> {
    if (this.isServerHealthy) {
      return this.enhanceWithTRPC(text);
    }
    return this.enhanceWithFallback(text);
  }

  private async enhanceWithTRPC(text: string): Promise<string> {
    try {
      const result = await Promise.race([
        trpc.enhancePrompts.mutate({ prompt: text }),
        this.createTimeout(PROMPT_ENHANCER_CONFIG.enhancement.timeout),
      ]);

      return result.data;
    } catch (error) {
      console.error("tRPC enhancement failed:", error);
      return this.enhanceWithFallback(text);
    }
  }

  private enhanceWithFallback(text: string): string {
    const method = PROMPT_ENHANCER_CONFIG.enhancement.fallbackMethod;
    return enhancementMethods[method](text);
  }

  private createTimeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Enhancement timeout")), ms);
    });
  }
}
