import "../../assets/tailwind.css";
import { PromptEnhancerManager } from "./core/manager";

export default defineContentScript({
  matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    console.log("Prompt Enhancer extension loaded");

    const manager = new PromptEnhancerManager(ctx);
    await manager.initialize();

    // Cleanup on context invalidation
    ctx.onInvalidated(() => {
      manager.destroy();
    });
  },
});
