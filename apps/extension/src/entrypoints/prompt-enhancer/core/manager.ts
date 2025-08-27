import { ContentScriptContext } from "wxt/client";
import { PROMPT_ENHANCER_CONFIG } from "../config";
import { DOMManager } from "./dom-manager";
import { EnhancementService } from "./enhancement-service";

export class PromptEnhancerManager {
  private domManager: DOMManager;
  private enhancementService: EnhancementService;
  private observer: MutationObserver | null = null;

  constructor(private ctx: ContentScriptContext) {
    this.domManager = new DOMManager();
    this.enhancementService = new EnhancementService();
  }

  async initialize() {
    await this.enhancementService.initialize();
    this.setupDOMObserver();
    this.injectUI();
  }

  private setupDOMObserver() {
    this.observer = new MutationObserver(() => {
      setTimeout(
        () => this.injectUI(),
        PROMPT_ENHANCER_CONFIG.ui.observerThrottle
      );
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private injectUI() {
    const trailingArea = this.domManager.findTrailingArea();
    if (!trailingArea || this.domManager.buttonExists(trailingArea)) {
      return;
    }

    const button = this.domManager.createEnhancerButton(() =>
      this.handleEnhancement()
    );

    this.domManager.injectButton(trailingArea, button);

    if (PROMPT_ENHANCER_CONFIG.debug.enabled) {
      console.log("Prompt enhancer button injected");
    }
  }

  private async handleEnhancement() {
    const editor = this.domManager.findEditor();
    if (!editor) {
      console.warn("Editor not found");
      return;
    }

    const currentText = this.domManager.getCurrentText(editor);
    if (!currentText) {
      console.warn("No text to enhance");
      return;
    }

    try {
      this.domManager.setButtonState(true);
      const enhancedText = await this.enhancementService.enhance(currentText);
      this.domManager.updateEditor(editor, enhancedText);

      if (PROMPT_ENHANCER_CONFIG.debug.logEnhancements) {
        console.log("Enhancement completed:", {
          original: currentText,
          enhanced: enhancedText,
        });
      }
    } catch (error) {
      console.error("Enhancement failed:", error);
    } finally {
      this.domManager.setButtonState(false);
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.domManager.cleanup();
  }
}
