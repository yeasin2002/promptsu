import "@/assets/tailwind.css";
import { detectPlatform, getAllPlatformMatches } from "@/config/platforms";
import ReactDOM from "react-dom/client";
import { EnhancerApp } from "./core/enhancer-app";

// import { createEnhancerManager, type EnhancerManagerFacade } from "./core";

/**
 * Enhanced content script with React integration and cross-platform support
 * Provides a robust, interactive UI with comprehensive error handling and loading states
 */
export default defineContentScript({
  matches: getAllPlatformMatches(),
  cssInjectionMode: "ui",
  main(ctx) {
    
    const platform = detectPlatform();
    console.log("🚀 ~ main ~ platform:", platform)
    if (!platform) return;

    const ui = createIntegratedUi(ctx, {
      position: platform?.injection.position,
      anchor: platform?.injection.anchor,
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<EnhancerApp />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
