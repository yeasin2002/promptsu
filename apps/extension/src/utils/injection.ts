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
	platform: PlatformConfig,
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
	identifier: string,
): InjectionResult {
	const container = findInjectionContainer(platform);

	if (!container) {
		return {
			success: false,
			container: null,
			error: "Injection container not found",
		};
	}

	// Check if element already exists
	if (container.querySelector(`[data-enhancer-id="${identifier}"]`)) {
		return {
			success: false,
			container,
			error: "Element already exists",
		};
	}

	// Add identifier to the element
	element.setAttribute("data-enhancer-id", identifier);

	try {
		const { injection } = platform;

		switch (injection.position) {
			case "before": {
				const anchor = container.querySelector(injection.anchor);
				if (anchor) {
					container.insertBefore(element, anchor);
				} else {
					container.appendChild(element);
				}
				break;
			}

			case "after": {
				const anchor = container.querySelector(injection.anchor);
				if (anchor?.nextSibling) {
					container.insertBefore(element, anchor.nextSibling);
				} else {
					container.appendChild(element);
				}
				break;
			}

			case "inside": {
				container.appendChild(element);
				break;
			}
		}

		return {
			success: true,
			container,
		};
	} catch (error) {
		return {
			success: false,
			container,
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
	timeout: number = 5000,
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
