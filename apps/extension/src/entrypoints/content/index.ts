import "@/assets/tailwind.css";
import { getAllPlatformMatches } from "@/config/platforms";
import { createEnhancerManager, type EnhancerManagerFacade } from "./core";

/**
 * Enhanced content script with React integration and cross-platform support
 * Provides a robust, interactive UI with comprehensive error handling and loading states
 */
export default defineContentScript({
	matches: getAllPlatformMatches(),
	cssInjectionMode: "ui",
	async main(ctx) {
		console.log("🚀 Prompt Enhancer extension loaded");

		let enhancerManager: EnhancerManagerFacade | null = null;

		try {
			// Initialize the enhancer manager using functional approach
			enhancerManager = createEnhancerManager();
			const initialized = await enhancerManager.init();

			if (!initialized) {
				console.error("Failed to initialize enhancer manager");
				return;
			}

			const platformInfo = enhancerManager.getPlatformInfo();
			console.log(
				`✅ Enhancer initialized for platform: ${platformInfo?.name}`,
			);

			// Handle context invalidation (extension reload/update)
			ctx.onInvalidated(() => {
				console.log("🔄 Context invalidated, cleaning up...");
				enhancerManager?.destroy();
			});
		} catch (error) {
			console.error("❌ Failed to initialize prompt enhancer:", error);

			// Cleanup on error
			if (enhancerManager) {
				enhancerManager.destroy();
			}
		}
	},
});
