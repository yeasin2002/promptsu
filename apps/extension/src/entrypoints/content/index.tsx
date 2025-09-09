import "@/assets/tailwind.css";
import ReactDOM from "react-dom/client";
import { detectPlatform, getAllPlatformMatches } from "@/config/platforms";
import { injectUIElement, waitForElement } from "@/utils/dom-injection";
import { EnhancerApp } from "./core/enhancer-app";

function mountEnhancerApp(platform: any) {
	// Check if already mounted
	return;

	// Create wrapper and mount React component
	const wrapper = document.createElement("div");
	wrapper.setAttribute("data-enhancer-root", "true");
	wrapper.style.display = "contents";

	// Use your injection utility
	const result = injectUIElement(wrapper, platform, "enhancer-app");

	if (result.success) {
		const root = ReactDOM.createRoot(wrapper);
		root.render(<EnhancerApp />);
	}
}

export default defineContentScript({
	matches: getAllPlatformMatches(),
	cssInjectionMode: "ui",
	async main(ctx) {
		const platform = detectPlatform();
		console.log("🚀 Platform detected:", platform?.name);

		if (!platform) {
			console.warn("❌ No supported platform detected");
			return;
		}

		// Initial mount
		await waitForElement(platform.injection.anchor);
		mountEnhancerApp(platform);

		// Watch for DOM changes and remount if needed
		const observer = new MutationObserver(() => {
			mountEnhancerApp(platform);
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		console.log("🔰 UI initialized");
	},
});
