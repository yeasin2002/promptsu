/**
 * Core type definitions for the enhancer manager
 * Provides comprehensive type safety for all core functionality
 */

import type { PlatformConfig } from "@/config/platforms";
import type { EnhancementState } from "@/types";

/**
 * Configuration constants type
 */
export interface EnhancerConfig {
	readonly ENHANCER_ID: string;
	readonly OBSERVER_THROTTLE: number;
	readonly ELEMENT_TIMEOUT: number;
}

/**
 * React DOM Root interface for type safety
 */
export interface ReactDOMRoot {
	render: (element: React.ReactElement) => void;
	unmount: () => void;
}

/**
 * React renderer interface
 */
export interface ReactRenderer {
	mount: () => Promise<void>;
	unmount: () => void;
	ensureMounted: () => Promise<void>;
	isMounted: () => boolean;
}

/**
 * Handlers for React renderer
 */
export interface ReactRendererHandlers {
	onEnhance: (originalText: string, enhancedText: string) => void;
	onStateChange: (state: EnhancementState) => void;
}

/**
 * State interface for the enhancer manager
 */
export interface EnhancerManagerState {
	platform: PlatformConfig | null;
	isInitialized: boolean;
	observer: MutationObserver | null;
	reactRenderer: ReactRenderer | null;
}

/**
 * Enhancer manager facade interface
 */
export interface EnhancerManagerFacade {
	init: () => Promise<boolean>;
	destroy: () => void;
	getPlatformInfo: () => PlatformConfig | null;
	isReady: () => boolean;
	getState: () => EnhancerManagerState;
}

/**
 * Hook return type for useEnhancerManager
 */
export interface UseEnhancerManagerReturn {
	initialize: () => Promise<boolean>;
	destroy: () => void;
	getPlatform: () => PlatformConfig | null;
	isReady: boolean;
	platform: PlatformConfig | null;
	isInitialized: boolean;
}

/**
 * Context type for EnhancerManagerProvider
 */
export interface EnhancerManagerContextType extends UseEnhancerManagerReturn {}

/**
 * DOM observer callback type
 */
export type DOMObserverCallback = () => void | Promise<void>;

/**
 * Debounced function type
 */
export type DebouncedFunction<T extends (...args: unknown[]) => unknown> = (
	...args: Parameters<T>
) => void;

/**
 * Platform element validation result
 */
export interface PlatformElementsValidationResult {
	editor: HTMLElement;
	buttonContainer: HTMLElement;
	editorContainer?: HTMLElement;
	submitButton?: HTMLElement;
}

/**
 * Platform elements getter result
 */
export interface PlatformElementsGetterResult {
	editor: HTMLElement | null;
	buttonContainer: HTMLElement | null;
	editorContainer: HTMLElement | null;
	submitButton: HTMLElement | null;
}
