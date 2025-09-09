import type { PlatformConfig } from "@/config/platforms";

/**
 * Platform-agnostic UI injection utilities
 * Handles the complexity of injecting UI elements into different platforms
 */

export interface InjectionResult {
  success: boolean;
  container: HTMLElement | null;
  error?: string;
}

/**
 * Finds the appropriate container for UI injection based on platform config
 */
export function findInjectionContainer(
  platform: PlatformConfig
): HTMLElement | null {
  const { injection } = platform;

  switch (injection.position) {
    case "before":
    case "after":
      return document.querySelector(injection.anchor)?.parentElement || null;

    case "inside":
      return (document.querySelector(injection.anchor) as HTMLElement) || null;

    default:
      return null;
  }
}

/**
 * Injects a UI element into the appropriate location based on platform config
 */
export function injectUIElement(
  element: HTMLElement,
  platform: PlatformConfig,
  identifier: string
): InjectionResult {
  const { injection } = platform;

  // Check if element already exists
  if (document.querySelector(`[data-enhancer-id="${identifier}"]`)) {
    return {
      success: false,
      container: null,
      error: "Element already exists",
    };
  }

  // Add identifier to the element
  element.setAttribute("data-enhancer-id", identifier);

  try {
    switch (injection.position) {
      case "before": {
        const anchor = document.querySelector(injection.anchor);
        if (anchor?.parentElement) {
          anchor.parentElement.insertBefore(element, anchor);
          return {
            success: true,
            container: anchor.parentElement,
          };
        }
        break;
      }

      case "after": {
        const anchor = document.querySelector(injection.anchor);
        if (anchor?.parentElement) {
          if (anchor.nextSibling) {
            anchor.parentElement.insertBefore(element, anchor.nextSibling);
          } else {
            anchor.parentElement.appendChild(element);
          }
          return {
            success: true,
            container: anchor.parentElement,
          };
        }
        break;
      }

      case "inside": {
        const container = document.querySelector(
          injection.anchor
        ) as HTMLElement;
        if (container) {
          container.appendChild(element);
          return {
            success: true,
            container,
          };
        }
        break;
      }
    }

    return {
      success: false,
      container: null,
      error: "Anchor element not found",
    };
  } catch (error) {
    return {
      success: false,
      container: null,
      error: error instanceof Error ? error.message : "Injection failed",
    };
  }
}

/**
 * Removes an injected UI element
 */
export function removeUIElement(identifier: string): boolean {
  const element = document.querySelector(`[data-enhancer-id="${identifier}"]`);
  if (element) {
    element.remove();
    return true;
  }
  return false;
}

/**
 * Checks if a UI element is already injected
 */
export function isUIElementInjected(identifier: string): boolean {
  return !!document.querySelector(`[data-enhancer-id="${identifier}"]`);
}

/**
 * Waits for an element to appear in the DOM
 */
export function waitForElement(
  selector: string,
  timeout: number = 5000
): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Timeout fallback
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}
