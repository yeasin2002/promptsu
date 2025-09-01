import { detectPlatform, type PlatformConfig } from "../config/platforms";
import type { EnhancementState } from "../types";
import {
	injectUIElement,
	isUIElementInjected,
	removeUIElement,
	waitForElement,
} from "../utils/injection";

/**
 * Core manager class that orchestrates the enhancement functionality
 * Handles platform detection, UI injection, and lifecycle management
 */
export class EnhancerManager {
		private platform: PlatformConfig | null = null;
		private observer: MutationObserver | null = null;
		// biome-ignore lint/correctness/noUnusedPrivateClassMembers: <>
		private uiRoot: HTMLDivElement | null = null;
		private reactRoot: HTMLElement | null = null; // React root for cleanup
		private isInitialized = false;

		private readonly ENHANCER_ID = "prompt-enhancer-ui";
		// private readonly INJECTION_DELAY = 1000;
		private readonly OBSERVER_THROTTLE = 100;

		constructor() {
			this.platform = detectPlatform();
		}

		/**
		 * Initialize the enhancer manager
		 */
		async init(): Promise<boolean> {
			if (this.isInitialized) {
				console.warn("EnhancerManager already initialized");
				return true;
			}

			if (!this.platform) {
				console.error("Unsupported platform detected");
				return false;
			}

			console.log(`Initializing enhancer for platform: ${this.platform.name}`);

			try {
				// Wait for the target elements to be available
				await this.waitForPlatformElements();

				// Inject the UI
				await this.injectUI();

				// Setup DOM observer for dynamic content
				this.setupDOMObserver();

				this.isInitialized = true;
				console.log("EnhancerManager initialized successfully");
				return true;
			} catch (error) {
				console.error("Failed to initialize EnhancerManager:", error);
				return false;
			}
		}

		/**
		 * Wait for platform-specific elements to be available
		 */
		private async waitForPlatformElements(): Promise<void> {
			if (!this.platform) throw new Error("Platform not detected");

			const editor = await waitForElement(
				this.platform.selectors.editor,
				10000,
			);
			if (!editor) {
				throw new Error(
					`Editor element not found: ${this.platform.selectors.editor}`,
				);
			}

			const buttonContainer = await waitForElement(
				this.platform.selectors.buttonContainer,
				10000,
			);
			if (!buttonContainer) {
				throw new Error(
					`Button container not found: ${this.platform.selectors.buttonContainer}`,
				);
			}
		}

		/**
		 * Inject the UI elements
		 */
		private async injectUI(): Promise<void> {
			if (!this.platform) throw new Error("Platform not detected");

			// Skip if already injected
			if (isUIElementInjected(this.ENHANCER_ID)) {
				return;
			}

			// Create container div
			const container = document.createElement("div");
			container.className = "enhancer-ui-container";

			// Inject the container
			const result = injectUIElement(
				container,
				this.platform,
				this.ENHANCER_ID,
			);

			if (!result.success) {
				throw new Error(result.error || "Failed to inject UI");
			}

			this.uiRoot = container;

			// Mount React component
			await this.mountReactComponent(container);
		}

		/**
		 * Mount the React component
		 */
		private async mountReactComponent(container: HTMLElement): Promise<void> {
			try {
				// Dynamic import to avoid bundling React if not needed
				const React = await import("react");
				const ReactDOM = await import("react-dom/client");
				const { EnhancerContainer } = await import(
					"../components/EnhancerContainer"
				);

				// Create React root
				this.reactRoot = ReactDOM.createRoot(container);

				// Render the component
				this.reactRoot.render(
					React.createElement(EnhancerContainer, {
						onEnhance: this.handleEnhancement.bind(this),
						onStateChange: this.handleStateChange.bind(this),
					}),
				);
			} catch (error) {
				console.error("Failed to mount React component:", error);
				throw error;
			}
		}

		/**
		 * Handle enhancement completion
		 */
		private handleEnhancement(
			originalText: string,
			enhancedText: string,
		): void {
			console.log("Enhancement completed:", {
				platform: this.platform?.name,
				originalLength: originalText.length,
				enhancedLength: enhancedText.length,
			});
		}

		/**
		 * Handle state changes
		 */
		private handleStateChange(state: EnhancementState): void {
			console.log("Enhancement state changed:", state);
		}

		/**
		 * Setup DOM observer to handle dynamic content changes
		 */
		private setupDOMObserver(): void {
			if (this.observer) {
				this.observer.disconnect();
			}

			let timeoutId: NodeJS.Timeout;

			this.observer = new MutationObserver(() => {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					this.handleDOMChanges();
				}, this.OBSERVER_THROTTLE);
			});

			this.observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		}

		/**
		 * Handle DOM changes (re-inject UI if needed)
		 */
		private async handleDOMChanges(): Promise<void> {
			if (!this.platform || !this.isInitialized) return;

			// Check if our UI is still present
			if (!isUIElementInjected(this.ENHANCER_ID)) {
				try {
					await this.injectUI();
				} catch (error) {
					console.error("Failed to re-inject UI:", error);
				}
			}
		}

		/**
		 * Cleanup and destroy the manager
		 */
		destroy(): void {
			console.log("Destroying EnhancerManager");

			// Disconnect observer
			if (this.observer) {
				this.observer.disconnect();
				this.observer = null;
			}

			// Unmount React component
			if (this.reactRoot) {
				this.reactRoot?.unmount();
				this.reactRoot = null;
			}

			// Remove UI elements
			removeUIElement(this.ENHANCER_ID);
			this.uiRoot = null;

			this.isInitialized = false;
		}

		/**
		 * Get current platform info
		 */
		getPlatformInfo(): PlatformConfig | null {
			return this.platform;
		}

		/**
		 * Check if manager is initialized
		 */
		isReady(): boolean {
			return this.isInitialized && !!this.platform;
		}
	}
