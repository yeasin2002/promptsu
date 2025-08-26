import "../assets/content-styles.css";

export default defineContentScript({
  matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
  cssInjectionMode: "ui",
  main() {
    console.log("Prompt Enhancer extension loaded");

    // Function to create and inject the enhancer button
    function createEnhancerButton() {
      const button = document.createElement("button");
      button.innerHTML = `
				<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon">
					<path d="M10 2C10.5523 2 11 2.44772 11 3V9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11H3C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H9V3C9 2.44772 9.44772 2 10 2Z"/>
					<circle cx="15" cy="5" r="2" fill="currentColor" opacity="0.7"/>
				</svg>
			`;

      button.className = "composer-btn";
      button.setAttribute("aria-label", "Enhance prompt");
      button.setAttribute("type", "button");
      button.style.marginLeft = "4px";

      // Add click handler
      button.addEventListener("click", enhancePrompt);

      return button;
    }

    // Function to enhance the prompt (currently just doubles the text)
    function enhancePrompt() {
      // Find the ProseMirror editor
      const editor = document.querySelector("#prompt-textarea.ProseMirror");
      if (!editor) {
        console.log("Editor not found");
        return;
      }

      // Get current text content
      const currentText = editor.textContent?.trim() || "";

      if (!currentText) {
        console.log("No text to enhance");
        return;
      }

      // Create enhanced text (current implementation: double the text)
      const enhancedText = currentText + " " + currentText;

      // Focus the editor first
      editor.focus();

      // Clear the editor content
      editor.innerHTML = "";

      // Create a new paragraph with the enhanced text
      const paragraph = document.createElement("p");
      paragraph.textContent = enhancedText;
      editor.appendChild(paragraph);

      // Move cursor to the end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(paragraph);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);

      // Trigger input events to notify the system of the change
      const inputEvent = new Event("input", { bubbles: true });
      const changeEvent = new Event("change", { bubbles: true });
      editor.dispatchEvent(inputEvent);
      editor.dispatchEvent(changeEvent);

      console.log("Prompt enhanced:", enhancedText);
    }

    // Function to inject the button into the interface
    function injectButton() {
      // Look for the trailing area where other buttons are located
      const trailingArea = document.querySelector(
        '[data-testid="composer-speech-button-container"]'
      )?.parentElement;

      if (
        trailingArea &&
        !trailingArea.querySelector('[aria-label="Enhance prompt"]')
      ) {
        const enhancerButton = createEnhancerButton();

        // Insert before the speech button container
        const speechContainer = trailingArea.querySelector(
          '[data-testid="composer-speech-button-container"]'
        );
        if (speechContainer) {
          trailingArea.insertBefore(enhancerButton, speechContainer);
          console.log("Enhancer button injected");
        }
      }
    }

    // Initial injection
    setTimeout(injectButton, 1000);

    // Watch for DOM changes to re-inject button if needed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // Check if we need to re-inject the button
          setTimeout(injectButton, 100);
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});
