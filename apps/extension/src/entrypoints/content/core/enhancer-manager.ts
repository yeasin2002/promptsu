import { detectPlatform, type PlatformConfig } from "@/config/platforms";
import type { EnhancementState } from "@/types";
import { createDOMObserver } from "./dom-observer";
import { validatePlatformElements } from "./platform-validator";
import { createReactRenderer } from "./react-renderer";
import type {
	EnhancerConfig,
	EnhancerManagerState,
	ReactRendererHandlers,
} from "./types";

/**
 * Configuration constants for the enhancer manager
 */
export const ENHANCER_CONFIG: EnhancerConfig = {
	ENHANCER_ID: "prompt-enhancer-ui",
	OBSERVER_THROTTLE: 100,
	ELEMENT_TIMEOUT: 10000,
} as const;

/**
 * Creates initial state for the enhancer manager
 */
export function createInitialState(): EnhancerManagerState {
	return {
		platform: detectPlatform(),
		isInitialized: false,
		observer: null,
		reactRenderer: null,
	};
}

/**
 * Initializes the enhancer manager with all required components
 */
export async function initializeEnhancer(
	state: EnhancerManagerState,
	handlers: ReactRendererHandlers,
): Promise<boolean> {
	if (state.isInitialized) {
		console.warn("EnhancerManager already initialized");
		return true;
	}

	if (!state.platform) {
		console.error("Unsupported platform detected");
		return false;
	}

	console.log(`Initializing enhancer for platform: ${state.platform.name}`);

	try {
		// Validate platform elements are available
		await validatePlatformElements(state.platform);

		// Create and setup React renderer
		state.reactRenderer = createReactRenderer(state.platform, handlers);
		await state.reactRenderer.mount();

		// Setup DOM observer for dynamic content changes
		state.observer = createDOMObserver(
			() => handleDOMChanges(state),
			ENHANCER_CONFIG.OBSERVER_THROTTLE,
		);

		state.isInitialized = true;
		console.log("EnhancerManager initialized successfully");
		return true;
	} catch (error) {
		console.error("Failed to initialize EnhancerManager:", error);
		return false;
	}
}

/**
 * Handles DOM changes by re-injecting UI if needed
 */
async function handleDOMChanges(state: EnhancerManagerState): Promise<void> {
	if (!state.platform || !state.isInitialized || !state.reactRenderer) {
		return;
	}

	try {
		await state.reactRenderer.ensureMounted();
	} catch (error) {
		console.error("Failed to handle DOM changes:", error);
	}
}

/**
 * Cleans up all resources and destroys the enhancer manager
 */
export function destroyEnhancer(state: EnhancerManagerState): void {
	console.log("Destroying EnhancerManager");

	// Disconnect DOM observer
	if (state.observer) {
		state.observer.disconnect();
		state.observer = null;
	}

	// Unmount React renderer
	if (state.reactRenderer) {
		state.reactRenderer.unmount();
		state.reactRenderer = null;
	}

	state.isInitialized = false;
}

/**
 * Gets current platform information
 */
export function getPlatformInfo(
	state: EnhancerManagerState,
): PlatformConfig | null {
	return state.platform;
}

/**
 * Checks if the enhancer manager is ready
 */
export function isEnhancerReady(state: EnhancerManagerState): boolean {
	return state.isInitialized && !!state.platform;
}
