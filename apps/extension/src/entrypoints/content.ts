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
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>{/* Icon from Ant Design Icons by HeskeyBaozi - https://github.com/ant-design/ant-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" /></svg>
			`;

      button.className = "composer-btn";
      button.setAttribute("aria-label", "Enhance prompt");
      button.setAttribute("type", "button");
      button.style.marginLeft = "4px";
      button.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      button.style.borderRadius = "999px";

      // Add click handler
      button.addEventListener("click", enhancePrompt);

      return button;
    }

    // Function to enhance the prompt (currently just doubles the text)
    function enhancePrompt() {
      // Find the ProseMirror editor
      const editor = document.querySelector(
        "#prompt-textarea.ProseMirror"
      ) as HTMLElement;
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
      editor?.focus();

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
