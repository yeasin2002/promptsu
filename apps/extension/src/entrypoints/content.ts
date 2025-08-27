import { CONTENT_SCRIPT_CONFIG } from "@/config/content-script";
import { checkServerHealth, trpc } from "@/lib/trpc-chrome-client";
import "../assets/tailwind.css";

export default defineContentScript({
  matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
  cssInjectionMode: "ui",
  async main() {
    if (CONTENT_SCRIPT_CONFIG.DEBUG.ENABLED) {
      console.log("Prompt Enhancer extension loaded");
    }

    // Check server health if tRPC is enabled
    if (CONTENT_SCRIPT_CONFIG.ENHANCEMENT.USE_TRPC) {
      const serverHealthy = await checkServerHealth();
      if (!serverHealthy) {
        console.warn("tRPC server not available, using fallback methods");
      }
    }

    // Initialize the prompt enhancer
    const promptEnhancer = new PromptEnhancer();
    await promptEnhancer.init();
  },
});

class PromptEnhancer {
  private observer: MutationObserver | null = null;
  private isEnhancing = false;

  async init() {
    this.setupDOMObserver();
    this.injectButton();
  }

  private setupDOMObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          setTimeout(() => this.injectButton(), 100);
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private injectButton() {
    const trailingArea = this.findTrailingArea();
    if (!trailingArea || this.buttonAlreadyExists(trailingArea)) {
      return;
    }

    const enhancerButton = this.createEnhancerButton();
    const speechContainer = trailingArea.querySelector(
      '[data-testid="composer-speech-button-container"]'
    );

    if (speechContainer) {
      trailingArea.insertBefore(enhancerButton, speechContainer);
      console.log("Enhancer button injected");
    }
  }

  private findTrailingArea(): Element | null {
    return (
      document.querySelector('[data-testid="composer-speech-button-container"]')
        ?.parentElement || null
    );
  }

  private buttonAlreadyExists(trailingArea: Element): boolean {
    return !!trailingArea.querySelector('[aria-label="Enhance prompt"]');
  }

  private createEnhancerButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
        <path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" />
      </svg>
    `;

    this.styleButton(button);
    button.addEventListener("click", () => this.handleEnhanceClick());

    return button;
  }

  private styleButton(button: HTMLButtonElement) {
    // Use Tailwind classes from configuration
    button.className = CONTENT_SCRIPT_CONFIG.UI.BUTTON_CLASSES.join(" ");
    button.setAttribute("aria-label", "Enhance prompt");
    button.setAttribute("type", "button");
    button.disabled = this.isEnhancing;
  }

  private async handleEnhanceClick() {
    if (this.isEnhancing) return;

    try {
      this.setEnhancingState(true);
      await this.enhancePrompt();
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      this.setEnhancingState(false);
    }
  }

  private setEnhancingState(isEnhancing: boolean) {
    this.isEnhancing = isEnhancing;
    const button = document.querySelector(
      '[aria-label="Enhance prompt"]'
    ) as HTMLButtonElement;
    if (button) {
      button.disabled = isEnhancing;
      // Tailwind classes handle the disabled state styling automatically
    }
  }

  private async enhancePrompt() {
    const editor = this.findEditor();
    if (!editor) {
      console.log("Editor not found");
      return;
    }

    const currentText = this.getCurrentText(editor);
    if (!currentText) {
      console.log("No text to enhance");
      return;
    }

    const enhancedText = await this.getEnhancedText(currentText);
    this.updateEditor(editor, enhancedText);

    console.log("Prompt enhanced:", enhancedText);
  }

  private findEditor(): HTMLElement | null {
    return document.querySelector(
      "#prompt-textarea.ProseMirror"
    ) as HTMLElement;
  }

  private getCurrentText(editor: HTMLElement): string {
    return editor.textContent?.trim() || "";
  }

  private async getEnhancedText(currentText: string): Promise<string> {
    try {
      // Try to use tRPC for enhancement
      // Uncomment and modify this when your tRPC endpoint is ready
      // const result = await trpc.enhancePrompts.mutate({ prompt: currentText });
      // return result.enhancedPrompt;

      // For now, simulate API call with timeout
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await trpc.enhancePrompts.mutate({ prompt: currentText });
      return result.data;

      // Fallback: double the text for now
      // return `${currentText} ${currentText}`;
    } catch (error) {
      console.error("tRPC enhancement failed, using fallback:", error);
      return `${currentText} ${currentText}`;
    }
  }

  private updateEditor(editor: HTMLElement, enhancedText: string) {
    editor.focus();
    editor.innerHTML = "";

    const paragraph = document.createElement("p");
    paragraph.textContent = enhancedText;
    editor.appendChild(paragraph);

    this.setCursorToEnd(paragraph);
    this.triggerInputEvents(editor);
  }

  private setCursorToEnd(paragraph: HTMLElement) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(paragraph);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  private triggerInputEvents(editor: HTMLElement) {
    const inputEvent = new Event("input", { bubbles: true });
    const changeEvent = new Event("change", { bubbles: true });
    editor.dispatchEvent(inputEvent);
    editor.dispatchEvent(changeEvent);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
