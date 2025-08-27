import { checkServerHealth, trpc } from "@/lib/trpc-chrome-client";
import "../../assets/tailwind.css";

// Configuration
const CONFIG = {
  selectors: {
    editor: "#prompt-textarea.ProseMirror",
    trailingArea: '[data-testid="composer-speech-button-container"]',
  },
  ui: {
    injectionDelay: 1000,
    observerThrottle: 100,
    buttonClasses: [
      "flex",
      "items-center",
      "justify-center",
      "w-9",
      "h-9",
      "ml-1",
      "rounded-full",
      "border",
      "border-white/10",
      "bg-transparent",
      "text-current",
      "transition-all",
      "duration-200",
      "hover:bg-white/10",
      "hover:opacity-80",
      "active:scale-95",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ],
  },
  debug: true,
};

export default defineContentScript({
  matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    if (CONFIG.debug) {
      console.log("🚀 Prompt Enhancer extension loaded");
    }

    let isServerHealthy = false;
    let currentButton: HTMLButtonElement | null = null;

    // Check server health
    try {
      isServerHealthy = await checkServerHealth();
      if (CONFIG.debug) {
        console.log(
          `🌐 Server health: ${isServerHealthy ? "healthy" : "unavailable"}`
        );
      }
    } catch (error) {
      console.warn("Server health check failed:", error);
    }

    // Enhanced text function
    async function enhanceText(text: string): Promise<string> {
      if (isServerHealthy) {
        try {
          const result = await Promise.race([
            trpc.enhancePrompts.mutate({ prompt: text }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), 5000)
            ),
          ]);
          return (result as any).data;
        } catch (error) {
          console.error("tRPC enhancement failed:", error);
        }
      }

      // Fallback: double the text
      return `${text} ${text}`;
    }

    // Button creation and injection
    function injectButton() {
      const speechButton = document.querySelector(
        CONFIG.selectors.trailingArea
      );
      if (!speechButton) {
        if (CONFIG.debug) console.log("❌ Speech button not found");
        return;
      }

      const trailingArea = speechButton.parentElement;
      if (!trailingArea) {
        if (CONFIG.debug) console.log("❌ Trailing area not found");
        return;
      }

      // Check if button already exists
      if (trailingArea.querySelector('[aria-label="Enhance prompt"]')) {
        if (CONFIG.debug) console.log("✅ Button already exists");
        return;
      }

      // Create the enhancer button
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "Enhance prompt");
      button.className = CONFIG.ui.buttonClasses.join(" ");

      // Add the lightning bolt icon
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
          <title>Enhance prompt</title>
          <path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" />
        </svg>
      `;

      // Add click handler
      button.addEventListener("click", async () => {
        if (CONFIG.debug) console.log("🔥 Enhance button clicked!");

        // Find the editor
        const editor = document.querySelector(
          CONFIG.selectors.editor
        ) as HTMLElement;
        if (!editor) {
          console.warn("❌ Editor not found");
          return;
        }

        const currentText = editor.textContent?.trim() || "";
        if (!currentText) {
          console.warn("❌ No text to enhance");
          return;
        }

        try {
          // Set loading state
          button.disabled = true;
          button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <title>Enhancing...</title>
              <circle cx="12" cy="12" r="3" opacity="0.4">
                <animate attributeName="r" values="3;6;3" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          `;

          // Enhance the text
          const enhancedText = await enhanceText(currentText);

          // Update the editor
          editor.focus();
          editor.innerHTML = "";
          const paragraph = document.createElement("p");
          paragraph.textContent = enhancedText;
          editor.appendChild(paragraph);

          // Set cursor to end
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(paragraph);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);

          // Trigger events
          editor.dispatchEvent(new Event("input", { bubbles: true }));
          editor.dispatchEvent(new Event("change", { bubbles: true }));

          if (CONFIG.debug) {
            console.log("✅ Enhancement completed:", {
              original: currentText,
              enhanced: enhancedText,
            });
          }
        } catch (error) {
          console.error("Enhancement failed:", error);
        } finally {
          // Reset button state
          button.disabled = false;
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
              <title>Enhance prompt</title>
              <path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" />
            </svg>
          `;
        }
      });

      // Insert the button before the speech button
      trailingArea.insertBefore(button, speechButton);
      currentButton = button;

      if (CONFIG.debug) {
        console.log("✅ Enhancer button injected successfully!");
      }
    }

    // Initial injection attempt
    setTimeout(injectButton, CONFIG.ui.injectionDelay);

    // Watch for DOM changes (for SPA navigation)
    const observer = new MutationObserver(() => {
      setTimeout(injectButton, CONFIG.ui.observerThrottle);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup on context invalidation
    ctx.onInvalidated(() => {
      observer.disconnect();
      currentButton = null;
      if (CONFIG.debug) {
        console.log("🧹 Prompt Enhancer cleaned up");
      }
    });
  },
});
