import "../../assets/tailwind.css";

export default defineContentScript({
  matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    console.log("🚀 Simple Prompt Enhancer loaded");

    // Simple function to inject button
    function injectButton() {
      // Find the speech button container
      const speechButton = document.querySelector(
        '[data-testid="composer-speech-button-container"]'
      );
      if (!speechButton) {
        console.log("❌ Speech button not found");
        return;
      }

      const trailingArea = speechButton.parentElement;
      if (!trailingArea) {
        console.log("❌ Trailing area not found");
        return;
      }

      // Check if button already exists
      if (trailingArea.querySelector('[aria-label="Enhance prompt"]')) {
        console.log("✅ Button already exists");
        return;
      }

      // Create the enhancer button
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "Enhance prompt");
      button.className = [
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
      ].join(" ");

      // Add the lightning bolt icon
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
          <title>Enhance prompt</title>
          <path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" />
        </svg>
      `;

      // Add click handler
      button.addEventListener("click", async () => {
        console.log("🔥 Enhance button clicked!");

        // Find the editor
        const editor = document.querySelector(
          "#prompt-textarea.ProseMirror"
        ) as HTMLElement;
        if (!editor) {
          console.log("❌ Editor not found");
          return;
        }

        const currentText = editor.textContent?.trim() || "";
        if (!currentText) {
          console.log("❌ No text to enhance");
          return;
        }

        // Simple enhancement (double the text)
        const enhancedText = `${currentText} ${currentText}`;

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

        console.log("✅ Text enhanced successfully!");
      });

      // Insert the button before the speech button
      trailingArea.insertBefore(button, speechButton);
      console.log("✅ Enhancer button injected successfully!");
    }

    // Try to inject immediately
    setTimeout(injectButton, 1000);

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(injectButton, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    ctx.onInvalidated(() => {
      observer.disconnect();
    });
  },
});
