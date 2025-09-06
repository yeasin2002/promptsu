import "@/assets/tailwind.css";
import { detectPlatform, getAllPlatformMatches } from "@/config/platforms";
import ReactDOM from "react-dom/client";
import { EnhancerApp } from "./core/enhancer-app";

/**
 * Enhanced content script with React integration and cross-platform support
 * Provides a robust, interactive UI with comprehensive error handling and loading states
 */
export default defineContentScript({
  matches: getAllPlatformMatches(),
  cssInjectionMode: "ui",
  async main(ctx) {
    const platform = detectPlatform();
    console.log("🚀  platform:", platform);
    if (!platform) return;

    const ui = createIntegratedUi(ctx, {
      position: platform?.injection.position,
      anchor: platform?.injection.anchor,
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        if (!root) return;
        root.render(<EnhancerApp />);
        console.log("✅ EnhancerApp mounted successfully");
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
        console.log("⚠️ EnhancerApp unmounted");
      },
    });

    ui.mount();
    console.log("🔰 UI mounted successfully");
  },
});
