import type { PlatformConfig } from "@/config/platforms";
import { waitForElement } from "@/utils/injection";
import type { PlatformElementsGetterResult } from "./types";

/**
 * Platform validation utilities
 * Ensures required platform elements are available before initialization
 */

/**
 * Validates that all required platform elements are present
 */
export async function validatePlatformElements(
	platform: PlatformConfig,
	timeout: number = 10000,
): Promise<void> {
	const validationPromises = [
		validateElement(platform.selectors.editor, "Editor element", timeout),
		validateElement(
			platform.selectors.buttonContainer,
			"Button container",
			timeout,
		),
	];

	// Add optional elements if they exist in the config
	if (platform.selectors.editorContainer) {
		validationPromises.push(
			validateElement(
				platform.selectors.editorContainer,
				"Editor container",
				timeout,
			),
		);
	}

	if (platform.selectors.submitButton) {
		validationPromises.push(
			validateElement(
				platform.selectors.submitButton,
				"Submit button",
				timeout,
			),
		);
	}

	await Promise.all(validationPromises);
}

/**
 * Validates a single element exists within the timeout period
 */
async function validateElement(
	selector: string,
	elementName: string,
	timeout: number,
): Promise<HTMLElement> {
	const element = await waitForElement(selector, timeout);

	if (!element) {
		throw new Error(`${elementName} not found: ${selector}`);
	}

	return element;
}

/**
 * Checks if platform elements are currently available (synchronous)
 */
export function arePlatformElementsAvailable(
	platform: PlatformConfig,
): boolean {
	const editor = document.querySelector(platform.selectors.editor);
	const buttonContainer = document.querySelector(
		platform.selectors.buttonContainer,
	);

	return !!(editor && buttonContainer);
}

/**
 * Gets all available platform elements
 */
export function getPlatformElements(
	platform: PlatformConfig,
): PlatformElementsGetterResult {
	return {
		editor: document.querySelector(
			platform.selectors.editor,
		) as HTMLElement | null,
		buttonContainer: document.querySelector(
			platform.selectors.buttonContainer,
		) as HTMLElement | null,
		editorContainer: platform.selectors.editorContainer
			? (document.querySelector(
					platform.selectors.editorContainer,
				) as HTMLElement | null)
			: null,
		submitButton: platform.selectors.submitButton
			? (document.querySelector(
					platform.selectors.submitButton,
				) as HTMLElement | null)
			: null,
	};
}
