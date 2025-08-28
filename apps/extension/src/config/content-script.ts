/**
 * Enhanced configuration for the prompt enhancer extension
 * Supports multiple platforms and provides comprehensive customization options
 */

export const CONTENT_SCRIPT_CONFIG = {
  // Core settings
  CORE: {
    // Use React-based UI (now always true for enhanced functionality)
    USE_REACT: true,

    // Extension version for debugging
    VERSION: "2.0.0",

    // Feature flags
    FEATURES: {
      NOTIFICATIONS: true,
      LOADING_ANIMATIONS: true,
      ERROR_RECOVERY: true,
      PLATFORM_AUTO_DETECTION: true,
    },
  },

  // Enhancement settings
  ENHANCEMENT: {
    // Enable tRPC calls (set to false to use fallback)
    USE_TRPC: true,

    // Fallback enhancement method
    FALLBACK_METHOD: "double" as "double" | "prefix" | "suffix" | "smart",

    // Timeout for enhancement requests (ms)
    TIMEOUT: 8000,

    // Retry attempts for failed requests
    MAX_RETRIES: 3,

    // Retry delay multiplier
    RETRY_DELAY_MULTIPLIER: 1.5,
  },

  // UI settings
  UI: {
    // Component injection settings
    INJECTION: {
      DELAY: 1000,
      RETRY_ATTEMPTS: 5,
      RETRY_INTERVAL: 500,
    },

    // DOM observer settings
    OBSERVER: {
      THROTTLE: 100,
      DEBOUNCE: 250,
    },

    // Animation settings
    ANIMATIONS: {
      DURATION: 200,
      EASING: "ease-in-out",
      LOADING_SPINNER_SPEED: "1s",
    },

    // Notification settings
    NOTIFICATIONS: {
      SUCCESS_DURATION: 3000,
      ERROR_DURATION: 5000,
      WARNING_DURATION: 4000,
      INFO_DURATION: 3000,
    },
  },

  // Debug settings
  DEBUG: {
    ENABLED: true,
    LOG_LEVEL: "info" as "debug" | "info" | "warn" | "error",
    LOG_ENHANCEMENTS: true,
    LOG_DOM_CHANGES: false,
    LOG_PLATFORM_DETECTION: true,
    LOG_UI_INJECTION: true,
  },
} as const;

// Enhanced helper functions for different enhancement methods
export const enhancementMethods = {
  double: (text: string) => `${text} ${text}`,
  prefix: (text: string) => `Enhanced: ${text}`,
  suffix: (text: string) => `${text} (enhanced)`,
  smart: (text: string) => {
    // Smart enhancement that adds context based on text length and content
    if (text.length < 50) {
      return `Please provide more detail about: ${text}`;
    } else if (text.includes("?")) {
      return `${text}\n\nPlease provide a comprehensive answer with examples and explanations.`;
    } else {
      return `${text}\n\nPlease elaborate on this topic with specific details and examples.`;
    }
  },
};

// Legacy support - keeping the old interface for backward compatibility
export const CONTENT_SCRIPT_CONFIG_LEGACY = {
  UI: {
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
  DEBUG: CONTENT_SCRIPT_CONFIG.DEBUG,
  ENHANCEMENT: CONTENT_SCRIPT_CONFIG.ENHANCEMENT,
};

// Type definitions for enhanced configuration
export interface EnhancementRequest {
  prompt: string;
  options?: {
    style?: "creative" | "professional" | "casual";
    length?: "short" | "medium" | "long";
    focus?: string[];
    platform?: string;
  };
}

export interface EnhancementResponse {
  data: string;
  confidence?: number;
  suggestions?: string[];
  metadata?: {
    originalLength: number;
    enhancedLength: number;
    processingTime: number;
    platform: string;
  };
}

// Utility function to get configuration with environment overrides
export function getConfig() {
  return {
    ...CONTENT_SCRIPT_CONFIG,
    // Allow environment-specific overrides
    DEBUG: {
      ...CONTENT_SCRIPT_CONFIG.DEBUG,
      ENABLED:
        process.env.NODE_ENV === "development" ||
        CONTENT_SCRIPT_CONFIG.DEBUG.ENABLED,
    },
  };
}
