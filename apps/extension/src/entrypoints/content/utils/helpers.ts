/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/**
 * Common utility functions for the enhanced prompt extension
 */

/**
 * Debounce function to limit the rate of function execution
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Throttle function to limit function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number,
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => inThrottle === false, limit);
		}
	};
}

/**
 * Sleep function for async delays
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
		fn: () => Promise<T>,
		maxAttempts: number = 3,
		baseDelay: number = 1000,
		multiplier: number = 1.5,
	) {
		try {
			let lastError: Error;

			for (let attempt = 1; attempt <= maxAttempts; attempt++) {
				try {
					return await fn();
				} catch (error) {
					lastError = error instanceof Error ? error : new Error(String(error));

					if (attempt === maxAttempts) {
						throw lastError;
					}

					const delay = baseDelay * multiplier ** (attempt - 1);
					await sleep(delay);
				}
			}
		} catch (error) {
			console.log("🚀 ~ retry ~ error:", error);
			throw new Error("Unknown error");
		}
	}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
	try {
		return JSON.parse(json);
	} catch {
		return fallback;
	}
}

/**
 * Generate a unique identifier
 */
export function generateId(prefix: string = "id"): string {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if an element is visible in the viewport
 */
export function isElementVisible(element: HTMLElement): boolean {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

/**
 * Get the text content length safely
 */
export function getTextLength(text: string | null | undefined): number {
	return text?.trim().length || 0;
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return `${text.substring(0, maxLength - 3)}...`;
}

/**
 * Format error message for user display
 */
export function formatErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === "string") {
		return error;
	}
	return "An unexpected error occurred";
}

/**
 * Check if the current environment is development
 */
export function isDevelopment(): boolean {
	return process.env.NODE_ENV === "development";
}

/**
 * Log with level control
 */
export function log(
	level: "debug" | "info" | "warn" | "error",
	message: string,
	...args: any[]
): void {
	if (!isDevelopment() && level === "debug") return;

	const timestamp = new Date().toISOString();
	const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

	switch (level) {
		case "debug":
			console.debug(prefix, message, ...args);
			break;
		case "info":
			console.info(prefix, message, ...args);
			break;
		case "warn":
			console.warn(prefix, message, ...args);
			break;
		case "error":
			console.error(prefix, message, ...args);
			break;
	}
}
