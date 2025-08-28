import { CONTENT_SCRIPT_CONFIG } from "@/config/content-script";
import { trpc } from "@/lib/trpc-chrome-client";
import "../assets/tailwind.css";

export default defineContentScript({
  matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
  cssInjectionMode: "ui",
  async main() {
    if (CONTENT_SCRIPT_CONFIG.DEBUG.ENABLED) {
      console.log("Prompt Enhancer extension loaded");
    }

    let isEnhancing = false;

    // Simple function to inject the enhancer button
    function injectButton() {
      const trailingArea = document.querySelector(
        '[data-testid="composer-speech-button-container"]'
      )?.parentElement;
      if (
        !trailingArea ||
        trailingArea.querySelector('[aria-label="Enhance prompt"]')
      ) {
        return;
      }

      const button = document.createElement("button");
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
          <path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" />
        </svg>
      `;

      button.className = CONTENT_SCRIPT_CONFIG.UI.BUTTON_CLASSES.join(" ");
      button.setAttribute("aria-label", "Enhance prompt");
      button.addEventListener("click", handleEnhance);

      const speechContainer = trailingArea.querySelector(
        '[data-testid="composer-speech-button-container"]'
      );
      if (speechContainer) {
        trailingArea.insertBefore(button, speechContainer);
      }
    }

    // Handle the enhancement process
    async function handleEnhance() {
      if (isEnhancing) return;

      const editor = document.querySelector(
        "#prompt-textarea.ProseMirror"
      ) as HTMLElement;
      if (!editor) return;

      const currentText = editor.textContent?.trim();
      if (!currentText) return;

      try {
        isEnhancing = true;
        updateButtonState(true);

        const result = await trpc.enhancePrompts.mutate({
          prompt: currentText,
        });
        updateEditor(editor, result.data);
      } catch (error) {
        console.error("Enhancement failed:", error);
        // Fallback: simple duplication for demo
        updateEditor(editor, `${currentText} ${currentText}`);
      } finally {
        isEnhancing = false;
        updateButtonState(false);
      }
    }

    // Update button disabled state
    function updateButtonState(disabled: boolean) {
      const button = document.querySelector(
        '[aria-label="Enhance prompt"]'
      ) as HTMLButtonElement;
      if (button) {
        button.disabled = disabled;
      }
    }

    // Update the editor with enhanced text
    function updateEditor(editor: HTMLElement, enhancedText: string) {
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

      // Trigger input events
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      editor.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Initial injection and DOM observer
    injectButton();

    const observer = new MutationObserver(() => {
      setTimeout(injectButton, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});