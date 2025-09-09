import type { PlatformConfig } from "@/config/platforms";
import { waitForElement } from "@/utils/dom-injection";

/**
 * Platform validation utilities
 * Ensures required platform elements are available before initialization
 */

/**
 * Validates that all required platform elements are present
 */
export async function validatePlatformElements(
  platform: PlatformConfig,
  timeout: number = 10000
): Promise<void> {
  const validationPromises = [
    validateElement(platform.selectors.editor, "Editor element", timeout),
    validateElement(
      platform.selectors.buttonContainer,
      "Button container",
      timeout
    ),
  ];

  // Add optional elements if they exist in the config
  if (platform.selectors.editorContainer) {
    validationPromises.push(
      validateElement(
        platform.selectors.editorContainer,
        "Editor container",
        timeout
      )
    );
  }

  if (platform.selectors.submitButton) {
    validationPromises.push(
      validateElement(platform.selectors.submitButton, "Submit button", timeout)
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
  timeout: number
): Promise<HTMLElement> {
  const element = await waitForElement(selector, timeout);

  if (!element) {
    throw new Error(`${elementName} not found: ${selector}`);
  }

  return element;
}


