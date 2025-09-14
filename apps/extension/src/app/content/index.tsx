import "@/assets/tailwind.css";
import { detectPlatform, getAllPlatformMatches } from "@/config/platforms";
import { waitForElement } from "@/lib/utils/dom-injection";
import { mountEnhancerApp } from "./main";



export default defineContentScript({
	matches: getAllPlatformMatches(),
	cssInjectionMode: "ui",
	async main(_ctx) {
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
		const observer = new MutationObserver(() => mountEnhancerApp(platform));

		observer.observe(document.body, { childList: true, subtree: true });
		console.log("🔰 UI initialized");
	},
});
