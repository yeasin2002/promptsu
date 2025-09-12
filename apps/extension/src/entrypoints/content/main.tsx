import ReactDOM from "react-dom/client";
import type { PlatformConfig } from "@/config/platforms";
import { injectUIElement } from "@/lib/utils/dom-injection";
import { EnhancerApp } from "./enhancer-app";

export function mountEnhancerApp(platform: PlatformConfig) {
	// Check if already mounted
	// return;

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
