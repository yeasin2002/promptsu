import type { DOMObserverCallback } from "./types";

/**
 * DOM observer utilities for handling dynamic content changes
 * Provides throttled mutation observation to detect when UI needs re-injection
 */

/**
 * Creates a throttled DOM mutation observer
 */
export function createDOMObserver(
	callback: DOMObserverCallback,
	throttleMs: number = 100,
): MutationObserver {
	let timeoutId: NodeJS.Timeout;

	const observer = new MutationObserver(() => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(async () => {
			try {
				await callback();
			} catch (error) {
				console.error("DOM observer callback failed:", error);
			}
		}, throttleMs);
	});

	// Start observing DOM changes
	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});

	return observer;
}
