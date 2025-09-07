---
title: DOM Injection & React Integration Guide
description: This document explains how the browser extension injects React components into AI chat platforms and manipulates the real DOM to provide enhanced functionality.
---

## Overview

The extension uses a sophisticated content script architecture that:

1. **Detects the current AI platform** (ChatGPT, Claude, DeepSeek, etc.)
2. **Validates required DOM elements** are present
3. **Creates a React container** and injects it into the platform's UI
4. **Monitors DOM changes** to re-inject UI when needed
5. **Provides seamless integration** without breaking the host platform

## Architecture Flow

```
Content Script Entry Point (index.ts)
    ↓
Platform Detection & Validation
    ↓
Enhancer Manager Initialization
    ↓
React Renderer Creation
    ↓
DOM Injection & React Mounting
    ↓
DOM Observer Setup (for dynamic re-injection)
```

## 1. Content Script Entry Point

The content script starts in `src/entrypoints/content/index.ts`:

```typescript
export default defineContentScript({
  matches: getAllPlatformMatches(), // Matches all supported platforms
  cssInjectionMode: "ui",
  async main(ctx) {
    // Initialize enhancer manager
    enhancerManager = createEnhancerManager();
    const initialized = await enhancerManager.init();

    // Handle cleanup on extension reload
    ctx.onInvalidated(() => {
      enhancerManager?.destroy();
    });
  },
});
```

**Key Points:**

- Uses WXT's `defineContentScript` for cross-browser compatibility
- Matches multiple AI platforms using URL patterns
- Handles proper cleanup when extension is reloaded/updated

## 2. Platform Detection System

### Platform Configuration (`src/config/platforms.ts`)

Each AI platform has a specific configuration:

```typescript
export interface PlatformConfig {
  name: string;
  matches: string[]; // URL patterns to match
  selectors: {
    editor: string; // Text input element
    buttonContainer: string; // Where to inject UI
  };
  injection: {
    position: "before" | "after" | "inside";
    anchor: string; // Reference element for injection
  };
  textHandling: {
    getContent: (editor: HTMLElement) => string;
    setContent: (editor: HTMLElement, content: string) => void;
  };
}
```

### Example Platform Configs

**ChatGPT:**

```typescript
chatgpt: {
    name: "ChatGPT",
    matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
    selectors: {
        editor: "#prompt-textarea.ProseMirror",
        buttonContainer: '[data-testid="composer-speech-button-container"]',
    },
    injection: {
        position: "before",
        anchor: '[data-testid="composer-speech-button-container"]',
    },
    // ... text handling methods
}
```

**Claude:**

```typescript
claude: {
    name: "Claude",
    matches: ["*://claude.ai/*"],
    selectors: {
        editor: '[contenteditable="true"]',
        buttonContainer: '[data-testid="send-button"]',
    },
    injection: {
        position: "before",
        anchor: '[data-testid="send-button"]',
    },
    // ... text handling methods
}
```

### Platform Detection Logic

```typescript
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
```

## 3. DOM Element Validation

Before injection, the extension validates that required elements exist:

### Platform Validator (`src/entrypoints/content/core/platform-validator.ts`)

```typescript
export async function validatePlatformElements(
  platform: PlatformConfig,
  timeout: number = 10000
): Promise<void> {
  const validationPromises = [
    validateElement(platform.selectors.editor, "Editor element", timeout),
    validateElement(
      platform.selectors.buttonContainer,
      "Button container",
      timeout
    ),
  ];

  await Promise.all(validationPromises);
}
```

### Element Waiting Logic

```typescript
export function waitForElement(
  selector: string,
  timeout: number = 5000
): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}
```

## 4. DOM Injection Process

### Injection Utilities (`src/utils/injection.ts`)

The core DOM manipulation happens here:

```typescript
export function injectUIElement(
  element: HTMLElement,
  platform: PlatformConfig,
  identifier: string
): InjectionResult {
  const container = findInjectionContainer(platform);

  if (!container) {
    return { success: false, container: null, error: "Container not found" };
  }

  // Add unique identifier
  element.setAttribute("data-enhancer-id", identifier);

  const { injection } = platform;

  switch (injection.position) {
    case "before": {
      const anchor = container.querySelector(injection.anchor);
      if (anchor) {
        container.insertBefore(element, anchor);
      } else {
        container.appendChild(element);
      }
      break;
    }

    case "after": {
      const anchor = container.querySelector(injection.anchor);
      if (anchor?.nextSibling) {
        container.insertBefore(element, anchor.nextSibling);
      } else {
        container.appendChild(element);
      }
      break;
    }

    case "inside": {
      container.appendChild(element);
      break;
    }
  }

  return { success: true, container };
}
```

### Container Finding Logic

```typescript
export function findInjectionContainer(
  platform: PlatformConfig
): HTMLElement | null {
  const { injection } = platform;

  switch (injection.position) {
    case "before":
    case "after":
      return document.querySelector(injection.anchor)?.parentElement || null;

    case "inside":
      return (document.querySelector(injection.anchor) as HTMLElement) || null;

    default:
      return null;
  }
}
```

## 5. React Component Mounting

### React Renderer (`src/entrypoints/content/core/react-renderer.ts`)

```typescript
export function createReactRenderer(
  platform: PlatformConfig,
  handlers: ReactRendererHandlers
): ReactRenderer {
  let reactRoot: ReactDOMRoot | null = null;
  let containerElement: HTMLDivElement | null = null;

  const mount = async (): Promise<void> => {
    // Skip if already mounted
    if (isUIElementInjected(ENHANCER_CONFIG.ENHANCER_ID)) {
      return;
    }

    // Create container element
    containerElement = createContainerElement();

    // Inject the container into the DOM
    const result = injectUIElement(
      containerElement,
      platform,
      ENHANCER_CONFIG.ENHANCER_ID
    );

    if (!result.success) {
      throw new Error(result.error || "Failed to inject UI container");
    }

    // Mount React component
    reactRoot = await mountReactComponent(containerElement, handlers);
  };

  return { mount, unmount, ensureMounted, isMounted };
}
```

### React Component Mounting Process

```typescript
async function mountReactComponent(
  container: HTMLElement,
  handlers: ReactRendererHandlers
): Promise<ReactDOMRoot> {
  // Dynamic imports to avoid bundling React if not needed
  const [React, ReactDOM, { EnhancerContainer }] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    import("@/components/enhancers/EnhancerContainer"),
  ]);

  // Create React root
  const root = ReactDOM.createRoot(container);

  // Render the component
  root.render(
    React.createElement(EnhancerContainer, {
      onEnhance: handlers.onEnhance,
      onStateChange: handlers.onStateChange,
    })
  );

  return root;
}
```

## 6. Dynamic DOM Monitoring

### DOM Observer (`src/entrypoints/content/core/dom-observer.ts`)

The extension monitors DOM changes to re-inject UI when needed:

```typescript
export function createDOMObserver(
  callback: DOMObserverCallback,
  throttleMs: number = 100
): MutationObserver {
  let timeoutId: NodeJS.Timeout;

  const observer = new MutationObserver(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      try {
        await callback();
      } catch (error) {
        console.error("DOM observer callback failed:", error);
      }
    }, throttleMs);
  });

  // Start observing DOM changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}
```

### Re-injection Logic

```typescript
async function handleDOMChanges(state: EnhancerManagerState): Promise<void> {
  if (!state.platform || !state.isInitialized || !state.reactRenderer) {
    return;
  }

  try {
    await state.reactRenderer.ensureMounted();
  } catch (error) {
    console.error("Failed to handle DOM changes:", error);
  }
}
```

## 7. React UI Components

### Main Container Component

The `EnhancerContainer` is the root React component that gets injected:

```typescript
export const EnhancerContainer: React.FC<UIComponentProps> = ({
  onEnhance,
  onStateChange,
  className = "",
}) => {
  const [state, setState] = useState<EnhancementState>({
    isLoading: false,
    error: null,
    success: false,
    message: null,
  });

  return (
    <div className={`enhancer-container relative ${className}`}>
      <EnhancerButton
        isLoading={state.isLoading}
        onEnhanceStart={handleEnhanceStart}
        onEnhanceSuccess={handleEnhanceSuccess}
        onEnhanceError={handleEnhanceError}
      />

      {/* Loading, success, and error states */}
    </div>
  );
};
```

## 8. Text Manipulation

### Platform-Specific Text Handling

Each platform has custom text manipulation methods:

```typescript
// ChatGPT (ProseMirror editor)
textHandling: {
    getContent: (editor) => editor.textContent?.trim() || "",
    setContent: (editor, content) => {
        editor.focus();
        editor.innerHTML = "";
        const paragraph = document.createElement("p");
        paragraph.textContent = content;
        editor.appendChild(paragraph);

        // Set cursor to end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(paragraph);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
    },
}

// DeepSeek (textarea)
textHandling: {
    getContent: (editor) => (editor as HTMLTextAreaElement).value?.trim() || "",
    setContent: (editor, content) => {
        const textarea = editor as HTMLTextAreaElement;
        textarea.focus();
        textarea.value = content;
        textarea.setSelectionRange(content.length, content.length);
    },
}
```

## 9. Lifecycle Management

### Initialization Flow

1. **Content script loads** on matching URLs
2. **Platform detection** identifies current AI platform
3. **Element validation** ensures required DOM elements exist
4. **React renderer creation** prepares the UI system
5. **DOM injection** places the container in the correct location
6. **React mounting** renders the UI components
7. **DOM observer setup** monitors for dynamic changes

### Cleanup Process

```typescript
export function destroyEnhancer(state: EnhancerManagerState): void {
  // Disconnect DOM observer
  if (state.observer) {
    state.observer.disconnect();
    state.observer = null;
  }

  // Unmount React renderer
  if (state.reactRenderer) {
    state.reactRenderer.unmount();
    state.reactRenderer = null;
  }

  state.isInitialized = false;
}
```

## 10. Error Handling & Resilience

### Graceful Degradation

- **Platform not supported**: Extension silently does nothing
- **Required elements missing**: Waits with timeout, then fails gracefully
- **Injection fails**: Logs error but doesn't break the host page
- **React errors**: Contained within error boundaries

### Performance Optimizations

- **Throttled DOM observation**: Prevents excessive callback execution
- **Dynamic imports**: React is only loaded when needed
- **Efficient selectors**: Platform-specific, optimized CSS selectors
- **Memory cleanup**: Proper cleanup prevents memory leaks

## 11. Security Considerations

### Content Security Policy (CSP) Compliance

- **No inline scripts**: All JavaScript is in external files
- **No eval usage**: Pure DOM manipulation and React rendering
- **Sanitized content**: All user input is properly escaped
- **Minimal permissions**: Only required host permissions

### DOM Isolation

- **Unique identifiers**: All injected elements have unique data attributes
- **Non-conflicting styles**: CSS classes are prefixed to avoid conflicts
- **Event isolation**: Extension events don't interfere with host page

## Summary

The extension achieves seamless DOM injection through:

1. **Smart platform detection** using URL patterns and DOM selectors
2. **Robust element validation** with timeout-based waiting
3. **Strategic DOM injection** at platform-specific anchor points
4. **React component mounting** with proper lifecycle management
5. **Dynamic re-injection** through throttled DOM observation
6. **Graceful error handling** that never breaks the host platform

This architecture allows the extension to work across multiple AI platforms while maintaining performance, security, and user experience standards.
