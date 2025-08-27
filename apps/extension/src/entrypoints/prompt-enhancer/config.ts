// Configuration for prompt enhancer
export const PROMPT_ENHANCER_CONFIG = {
  // ChatGPT interface selectors
  selectors: {
    editor: "#prompt-textarea.ProseMirror",
    trailingArea: '[data-testid="composer-speech-button-container"]',
  },

  // UI settings
  ui: {
    injectionDelay: 1000,
    observerThrottle: 100,
    buttonClasses: [
      "flex",
      "items-center",
      "justify-center",
      "w-9",
      "h-9",
      "ml-1",
      "rounded-full",
      "border",
      "border-white/10",
      "bg-transparent",
      "text-current",
      "transition-all",
      "duration-200",
      "hover:bg-white/10",
      "hover:opacity-80",
      "active:scale-95",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ],
  },

  // Enhancement settings
  enhancement: {
    timeout: 5000,
    maxRetries: 2,
    fallbackMethod: "double" as const,
  },

  // Debug settings
  debug: {
    enabled: true,
    logEnhancements: true,
  },
} as const;

// Enhancement methods for fallback
export const enhancementMethods = {
  double: (text: string) => `${text} ${text}`,
  prefix: (text: string) => `Enhanced: ${text}`,
  suffix: (text: string) => `${text} (enhanced)`,
};

// Types
export interface EnhancementRequest {
  prompt: string;
  options?: {
    style?: "creative" | "professional" | "casual";
    length?: "short" | "medium" | "long";
    focus?: string[];
  };
}

export interface EnhancementResponse {
  enhancedPrompt: string;
  confidence: number;
  suggestions?: string[];
}
