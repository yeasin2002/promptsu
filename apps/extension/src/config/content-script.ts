// Configuration for content script behavior
export const CONTENT_SCRIPT_CONFIG = {
  // Use React-based UI (true) or vanilla JS class-based approach (false)
  USE_REACT: false,

  // Enhancement settings
  ENHANCEMENT: {
    // Enable tRPC calls (set to false to use fallback)
    USE_TRPC: false,

    // Fallback enhancement method
    FALLBACK_METHOD: "double" as "double" | "prefix" | "suffix",

    // Timeout for enhancement requests (ms)
    TIMEOUT: 5000,

    // Retry attempts for failed requests
    MAX_RETRIES: 2,
  },

  // UI settings
  UI: {
    // Button injection delay (ms)
    INJECTION_DELAY: 1000,

    // DOM observer throttle (ms)
    OBSERVER_THROTTLE: 100,

    // Tailwind CSS classes for button styling
    BUTTON_CLASSES: [
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

  // Selectors for ChatGPT interface
  SELECTORS: {
    EDITOR: "#prompt-textarea.ProseMirror",
    TRAILING_AREA: '[data-testid="composer-speech-button-container"]',
    SPEECH_CONTAINER: '[data-testid="composer-speech-button-container"]',
  },

  // Debug settings
  DEBUG: {
    ENABLED: true,
    LOG_ENHANCEMENTS: true,
    LOG_DOM_CHANGES: false,
  },
} as const;

// Helper functions for different enhancement methods
export const enhancementMethods = {
  double: (text: string) => `${text} ${text}`,
  prefix: (text: string) => `Enhanced: ${text}`,
  suffix: (text: string) => `${text} (enhanced)`,
};

// Type for tRPC enhancement request
export interface EnhancementRequest {
  prompt: string;
  options?: {
    style?: "creative" | "professional" | "casual";
    length?: "short" | "medium" | "long";
    focus?: string[];
  };
}

// Type for tRPC enhancement response
export interface EnhancementResponse {
  enhancedPrompt: string;
  confidence: number;
  suggestions?: string[];
}
