import "@/assets/tailwind.css";
import { detectPlatform, getAllPlatformMatches } from "@/config/platforms";
import ReactDOM from "react-dom/client";
import { EnhancerApp } from "./core/enhancer-app";

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

    // Create UI with dynamic anchor from platform config
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: platform.injection.anchor,
      onMount: (container) => {
        // Check for existing mount to prevent duplicates
        if (container.querySelector("[data-enhancer-root]")) {
          return null;
        }

        // Create wrapper and mount React component
        const wrapper = document.createElement("div");
        wrapper.setAttribute("data-enhancer-root", "true");
        wrapper.style.display = "contents";
        container.appendChild(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<EnhancerApp />);

        console.log("✅ EnhancerApp mounted");
        return { root, wrapper };
      },
      onRemove: (mountData) => {
        if (mountData?.root) {
          mountData.root.unmount();
        }
        if (mountData?.wrapper?.parentNode) {
          mountData.wrapper.remove();
        }
        console.log("🔄 EnhancerApp unmounted");
      },
    });

    // Mount UI and setup persistence for SPAs
    ui.mount();
    setupSPAPersistence(ctx, ui, platform.injection.anchor);
    console.log("🔰 UI initialized");
  },
});

/**
 * Ensures UI persists across SPA navigation with minimal overhead
 */
function setupSPAPersistence(ctx: any, ui: any, anchor: string): void {
  let currentUrl = window.location.href;

  // Simple DOM observer with throttling
  let isObserving = false;
  const observer = new MutationObserver(() => {
    if (isObserving || ctx.isInvalidated) return;

    isObserving = true;
    setTimeout(() => {
      // Re-mount if anchor exists but component is missing
      const anchorElement = document.querySelector(anchor);
      if (
        anchorElement &&
        !anchorElement.querySelector("[data-enhancer-root]")
      ) {
        ui.mount();
      }
      isObserving = false;
    }, 100);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Handle SPA navigation
  const urlCheck = setInterval(() => {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href;
      setTimeout(() => ui.mount(), 500); // Delay for DOM to settle
    }
  }, 1000);

  // Cleanup on context invalidation
  ctx.addEventListener("invalidated", () => {
    observer.disconnect();
    clearInterval(urlCheck);
  });
}