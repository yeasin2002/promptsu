import { PROMPT_ENHANCER_CONFIG } from "../config";

export class DOMManager {
  private currentButton: HTMLButtonElement | null = null;

  findTrailingArea(): Element | null {
    return (
      document.querySelector(PROMPT_ENHANCER_CONFIG.selectors.trailingArea)
        ?.parentElement || null
    );
  }

  findEditor(): HTMLElement | null {
    return document.querySelector(
      PROMPT_ENHANCER_CONFIG.selectors.editor
    ) as HTMLElement;
  }

  buttonExists(trailingArea: Element): boolean {
    return !!trailingArea.querySelector('[aria-label="Enhance prompt"]');
  }

  getCurrentText(editor: HTMLElement): string {
    return editor.textContent?.trim() || "";
  }

  createEnhancerButton(onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = PROMPT_ENHANCER_CONFIG.ui.buttonClasses.join(" ");
    button.setAttribute("aria-label", "Enhance prompt");
    button.innerHTML = this.getButtonIcon();
    button.addEventListener("click", onClick);

    this.currentButton = button;
    return button;
  }

  injectButton(trailingArea: Element, button: HTMLButtonElement) {
    const speechContainer = trailingArea.querySelector(
      PROMPT_ENHANCER_CONFIG.selectors.trailingArea
    );
    if (speechContainer) {
      trailingArea.insertBefore(button, speechContainer);
    }
  }

  setButtonState(isLoading: boolean) {
    if (!this.currentButton) return;

    this.currentButton.disabled = isLoading;
    this.currentButton.innerHTML = isLoading
      ? this.getLoadingIcon()
      : this.getButtonIcon();
  }

  updateEditor(editor: HTMLElement, enhancedText: string) {
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

  private getButtonIcon(): string {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
        <title>Enhance prompt</title>
        <path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" />
      </svg>
    `;
  }

  private getLoadingIcon(): string {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <title>Enhancing...</title>
        <circle cx="12" cy="12" r="3" opacity="0.4">
          <animate attributeName="r" values="3;6;3" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    `;
  }

  cleanup() {
    this.currentButton = null;
  }
}
