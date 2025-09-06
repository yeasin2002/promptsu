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
    // Wait for the DOM to be fully loaded
    await new Promise<void>((resolve) => {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        // Document is already ready, execute immediately
        resolve();
      } else {
        // Wait for DOMContentLoaded
        document.addEventListener("DOMContentLoaded", () => resolve(), {
          once: true,
        });
      }
    });

    const platform = detectPlatform();
    console.log("🚀 ~ main ~ platform:", platform);
    if (!platform) return;

    const ui = createIntegratedUi(ctx, {
      position: platform?.injection.position,
      anchor: platform?.injection.anchor,
      onMount: (container) => {
        try {
          const root = ReactDOM.createRoot(container);
          if (!root) return;
          root.render(<EnhancerApp />);
          console.log("EnhancerApp mounted successfully");
          return root;
        } catch (error) {
          console.error("Failed to mount EnhancerApp:", error);
          return null;
        }
      },
      onRemove: (root) => {
        try {
          root?.unmount();
          console.log("EnhancerApp unmounted");
        } catch (error) {
          console.error("Error during unmount:", error);
        }
      },
    });

    try {
      await ui.mount();
      console.log("UI mounted successfully");
    } catch (error) {
      console.error("Failed to mount UI:", error);
    }
  },
});
