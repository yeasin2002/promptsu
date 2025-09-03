import type { PlatformConfig } from "@/config/platforms";
import type { EnhancementState } from "@/types";
import {
  injectUIElement,
  isUIElementInjected,
  removeUIElement,
} from "@/utils/injection";
import type React from "react";
import { ENHANCER_CONFIG } from "./enhancer-manager";
import type {
  ReactDOMRoot,
  ReactRenderer,
  ReactRendererHandlers,
} from "./types";

/**
 * React renderer utilities for managing React component lifecycle
 * Handles mounting, unmounting, and re-mounting of React components
 */

/**
 * Creates a React renderer for the given platform
 */
export function createReactRenderer(
  platform: PlatformConfig,
  handlers: ReactRendererHandlers
): ReactRenderer {
  let reactRoot: ReactDOMRoot | null = null;
  let containerElement: HTMLDivElement | null = null;

  const mount = async (): Promise<void> => {
    // Skip if already mounted
    if (isUIElementInjected(ENHANCER_CONFIG.ENHANCER_ID)) {
      return;
    }

    // Create container element
    containerElement = createContainerElement();

    // Inject the container into the DOM
    const result = injectUIElement(
      containerElement,
      platform,
      ENHANCER_CONFIG.ENHANCER_ID
    );

    if (!result.success) {
      throw new Error(result.error || "Failed to inject UI container");
    }

    // Mount React component
    reactRoot = await mountReactComponent(containerElement, handlers);
  };

  const unmount = (): void => {
    if (reactRoot) {
      reactRoot.unmount();
      reactRoot = null;
    }

    removeUIElement(ENHANCER_CONFIG.ENHANCER_ID);
    containerElement = null;
  };

  const ensureMounted = async (): Promise<void> => {
    if (!isMounted()) {
      await mount();
    }
  };

  const isMounted = (): boolean => {
    return isUIElementInjected(ENHANCER_CONFIG.ENHANCER_ID) && !!reactRoot;
  };

  return {
    mount,
    unmount,
    ensureMounted,
    isMounted,
  };
}

/**
 * Creates the container element for the React component
 */
function createContainerElement(): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "enhancer-ui-container";
  return container;
}

/**
 * Mounts the React component into the container
 */
async function mountReactComponent(
  container: HTMLElement,
  handlers: ReactRendererHandlers
): Promise<ReactDOMRoot> {
  try {
    // Dynamic imports to avoid bundling React if not needed
    const [React, ReactDOM, { EnhancerContainer }] = await Promise.all([
      import("react"),
      import("react-dom/client"),
      import("@/components/enhancers/EnhancerContainer"),
    ]);

    // Create React root
    const root = ReactDOM.createRoot(container);

    // Render the component
    root.render(
      React.createElement(EnhancerContainer, {
        onEnhance: handlers.onEnhance,
        onStateChange: handlers.onStateChange,
      })
    );

    return root;
  } catch (error) {
    console.error("Failed to mount React component:", error);
    throw error;
  }
}
