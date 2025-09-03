import type { DOMObserverCallback, DebouncedFunction } from "./types";

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

/**
 * Creates a debounced function that delays execution
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	delay: number,
): DebouncedFunction<T> {
	let timeoutId: NodeJS.Timeout;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...args), delay);
	};
}

/**
 * Observes specific element changes with a callback
 */
export function observeElementChanges(
	element: HTMLElement,
	callback: (mutations: MutationRecord[]) => void,
	options: MutationObserverInit = { childList: true, subtree: true },
): MutationObserver {
	const observer = new MutationObserver(callback);
	observer.observe(element, options);
	return observer;
}
