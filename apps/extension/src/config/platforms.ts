/**
 * Platform-specific configuration for different AI chat interfaces
 * This enables easy adaptation to new platforms with minimal code changes
 */

export interface PlatformConfig {
  name: string;
  matches: string[];
  selectors: {
    editor: string;
    editorContainer?: string;
    buttonContainer: string;
    submitButton?: string;
  };
  injection: {
    // position: "before" | "after" | "inside";
    position: "inline" | "overlay" | "modal";
    anchor: string;
  };
  textHandling: {
    getContent: (editor: HTMLElement) => string;
    setContent: (editor: HTMLElement, content: string) => void;
    triggerEvents?: string[];
  };
}

export const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  chatgpt: {
    name: "ChatGPT",
    matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
    selectors: {
      editor: "#prompt-textarea.ProseMirror",
      buttonContainer: '[data-testid="composer-speech-button-container"]',
    },
    injection: {
      //   position: "before",
      position: "inline",
      anchor: 'button[aria-label="Dictate button"].composer-btn',
    },
    textHandling: {
      getContent: (editor) => editor.textContent?.trim() || "",
      setContent: (editor, content) => {
        // editor.focus();
        // editor.innerHTML = "";
        // const paragraph = document.createElement("p");
        // paragraph.textContent = content;
        // editor.appendChild(paragraph);
        // // Set cursor to end
        // const range = document.createRange();
        // const selection = window.getSelection();
        // range.selectNodeContents(paragraph);
        // range.collapse(false);
        // selection?.removeAllRanges();
        // selection?.addRange(range);
      },
      triggerEvents: ["input", "change"],
    },
  },

  //   deepseek: {
  //     name: "DeepSeek",
  //     matches: ["*://chat.deepseek.com/*"],
  //     selectors: {
  //       editor: "#chat-input",
  //       buttonContainer: ".ec4f5d61", // The container with DeepThink and Search buttons
  //     },
  //     injection: {
  //       position: "inside",
  //       anchor: ".ec4f5d61",
  //     },
  //     textHandling: {
  //       getContent: (editor) =>
  //         (editor as HTMLTextAreaElement).value?.trim() || "",
  //       setContent: (editor, content) => {
  //         const textarea = editor as HTMLTextAreaElement;
  //         textarea.focus();
  //         textarea.value = content;

  //         // Set cursor to end
  //         textarea.setSelectionRange(content.length, content.length);
  //       },
  //       triggerEvents: ["input", "change"],
  //     },
  //   },
};

/**
 * Detects the current platform based on URL
 */
export function detectPlatform(): PlatformConfig | null {
  const currentUrl = window.location.href;

  for (const [_key, config] of Object.entries(PLATFORM_CONFIGS)) {
    if (
      config.matches.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*/g, ".*"));
        return regex.test(currentUrl);
      })
    ) {
      return config;
    }
  }

  return null;
}

/**
 * Gets all supported platform matches for content script registration
 */
export function getAllPlatformMatches(): string[] {
  return Object.values(PLATFORM_CONFIGS).flatMap((config) => config.matches);
}

// Helper function to wait for anchor element
export function waitForAnchor(
  selector: string,
  timeout = 5000
): Promise<Element> {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((_mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for anchor: ${selector}`));
    }, timeout);
  });
}
