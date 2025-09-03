/**
 * Core enhancer functionality exports
 * Provides both functional and React-based interfaces for the enhancer manager
 */

export {
	createDOMObserver,
	debounce,
	observeElementChanges,
} from "./dom-observer";

// React hooks and components
export {
	EnhancerManagerProvider,
	useEnhancerManagerContext,
} from "./EnhancerManagerProvider";
// Core utilities (for advanced usage)
export {
	createInitialState,
	destroyEnhancer,
	ENHANCER_CONFIG,
	getPlatformInfo,
	initializeEnhancer,
	isEnhancerReady,
} from "./enhancer-manager";
// Main functional interface (backward compatible)
export { createEnhancerManager } from "./enhancer-manager-facade";
export {
	arePlatformElementsAvailable,
	getPlatformElements,
	validatePlatformElements,
} from "./platform-validator";
export { createReactRenderer } from "./react-renderer";
// Export all types
export type * from "./types";
export {
	useAutoEnhancerManager,
	useEnhancerManager,
} from "./useEnhancerManager";
