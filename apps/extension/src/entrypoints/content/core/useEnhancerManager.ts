import { useCallback, useEffect, useRef, useState } from "react";
import type { EnhancementState } from "@/types";
import {
	createInitialState,
	destroyEnhancer,
	getPlatformInfo,
	initializeEnhancer,
	isEnhancerReady,
} from "./enhancer-manager";
import type { EnhancerManagerState, UseEnhancerManagerReturn } from "./types";

/**
 * Custom hook for managing the enhancer functionality
 * Provides a React-friendly interface to the enhancer manager
 */
export function useEnhancerManager(): UseEnhancerManagerReturn {
	const [state, setState] = useState<EnhancerManagerState>(createInitialState);
	const [isReady, setIsReady] = useState(false);
	const stateRef = useRef(state);

	// Keep ref in sync with state
	useEffect(() => {
		stateRef.current = state;
	}, [state]);

	const handleEnhancement = useCallback(
		(originalText: string, enhancedText: string) => {
			console.log("Enhancement completed:", {
				platform: stateRef.current.platform?.name,
				originalLength: originalText.length,
				enhancedLength: enhancedText.length,
			});
		},
		[],
	);

	const handleStateChange = useCallback(
		(enhancementState: EnhancementState) => {
			console.log("Enhancement state changed:", enhancementState);
		},
		[],
	);

	const initialize = useCallback(async (): Promise<boolean> => {
		const success = await initializeEnhancer(stateRef.current, {
			onEnhance: handleEnhancement,
			onStateChange: handleStateChange,
		});

		setState({ ...stateRef.current });
		setIsReady(isEnhancerReady(stateRef.current));
		return success;
	}, [handleEnhancement, handleStateChange]);

	const destroy = useCallback(() => {
		destroyEnhancer(stateRef.current);
		setState({ ...stateRef.current });
		setIsReady(false);
	}, []);

	const getPlatform = useCallback(() => {
		return getPlatformInfo(stateRef.current);
	}, []);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (stateRef.current.isInitialized) {
				destroyEnhancer(stateRef.current);
			}
		};
	}, []);

	return {
		initialize,
		destroy,
		getPlatform,
		isReady,
		platform: state.platform,
		isInitialized: state.isInitialized,
	};
}

/**
 * Hook for managing enhancer lifecycle with automatic initialization
 */
export function useAutoEnhancerManager() {
	const manager = useEnhancerManager();
	const [initializationAttempted, setInitializationAttempted] = useState(false);

	useEffect(() => {
		if (!initializationAttempted && manager.platform) {
			setInitializationAttempted(true);
			manager.initialize().catch((error) => {
				console.error("Auto-initialization failed:", error);
			});
		}
	}, [manager, initializationAttempted]);

	return manager;
}
