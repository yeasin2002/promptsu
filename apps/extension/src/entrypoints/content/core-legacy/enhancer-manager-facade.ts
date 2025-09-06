import type { PlatformConfig } from "@/config/platforms";
import type { EnhancementState } from "@/types";
import {
	createInitialState,
	destroyEnhancer,
	getPlatformInfo,
	initializeEnhancer,
	isEnhancerReady,
} from "./enhancer-manager";
import type { EnhancerManagerFacade, EnhancerManagerState } from "./types";

/**
 * Functional facade that provides the same interface as the original class
 * This maintains backward compatibility while using the new modular approach
 */
export function createEnhancerManager(): EnhancerManagerFacade {
	const state: EnhancerManagerState = createInitialState();

	const handleEnhancement = (
		originalText: string,
		enhancedText: string,
	): void => {
		console.log("Enhancement completed:", {
			platform: state.platform?.name,
			originalLength: originalText.length,
			enhancedLength: enhancedText.length,
		});
	};

	const handleStateChange = (enhancementState: EnhancementState): void => {
		console.log("Enhancement state changed:", enhancementState);
	};

	return {
		/**
		 * Initialize the enhancer manager
		 */
		async init(): Promise<boolean> {
			const success = await initializeEnhancer(state, {
				onEnhance: handleEnhancement,
				onStateChange: handleStateChange,
			});
			return success;
		},

		/**
		 * Cleanup and destroy the manager
		 */
		destroy(): void {
			destroyEnhancer(state);
		},

		/**
		 * Get current platform info
		 */
		getPlatformInfo(): PlatformConfig | null {
			return getPlatformInfo(state);
		},

		/**
		 * Check if manager is initialized
		 */
		isReady(): boolean {
			return isEnhancerReady(state);
		},

		/**
		 * Get current state (for debugging)
		 */
		getState(): EnhancerManagerState {
			return { ...state };
		},
	};
}
