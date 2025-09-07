/**
 * DOM utility functions for content scripts
 * Provides essential DOM manipulation helpers
 */

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

/**
 * Checks if an element exists in the DOM
 */
export function elementExists(selector: string): boolean {
  return !!document.querySelector(selector);
}

/**
 * Waits for multiple elements to appear
 */
export async function waitForElements(
  selectors: string[],
  timeout: number = 5000
): Promise<HTMLElement[]> {
  const promises = selectors.map((selector) =>
    waitForElement(selector, timeout)
  );
  const results = await Promise.all(promises);
  return results.filter((element): element is HTMLElement => element !== null);
}
