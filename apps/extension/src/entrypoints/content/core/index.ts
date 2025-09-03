/**
 * Core enhancer functionality exports
 * Provides both functional and React-based interfaces for the enhancer manager
 */

// Main functional interface (backward compatible)
export { createEnhancerManager } from "./enhancer-manager-facade";

// React hooks and components
export {
  EnhancerManagerProvider,
  useEnhancerManagerContext,
} from "./EnhancerManagerProvider";
export {
  useAutoEnhancerManager,
  useEnhancerManager,
} from "./useEnhancerManager";

// Core utilities (for advanced usage)
export {
  ENHANCER_CONFIG,
  createInitialState,
  destroyEnhancer,
  getPlatformInfo,
  initializeEnhancer,
  isEnhancerReady,
} from "./enhancer-manager";

export {
  createDOMObserver,
  debounce,
  observeElementChanges,
} from "./dom-observer";
export {
  arePlatformElementsAvailable,
  getPlatformElements,
  validatePlatformElements,
} from "./platform-validator";
export { createReactRenderer } from "./react-renderer";

// Export all types
export type * from "./types";

