# File Reference Documentation

## 📁 Complete File-by-File Reference

This document provides detailed information about each file in the content script core directory.

## 📋 Table of Contents

- [Entry Point](#entry-point)
- [Core Module](#core-module)
- [DOM Management](#dom-management)
- [State Management](#state-management)
- [Platform Integration](#platform-integration)
- [React Integration](#react-integration)
- [Type Definitions](#type-definitions)

---

## 🚀 Entry Point

### `src/entrypoints/content/index.ts`

**Purpose:** Main content script entry point that initializes the enhancer system.

**Key Responsibilities:**
- Initialize the enhancer manager
- Handle extension lifecycle
- Manage cleanup on context invalidation
- Provide error boundaries

**Code Structure:**
```typescript
export default defineContentScript({
  matches: getAllPlatformMatches(),
  cssInjectionMode: "ui",
  async main(ctx) {
    // Initialization logic
  },
});
```

**Key Functions:**
- **`main(ctx)`** - Main entry point function
  - Creates enhancer manager instance
  - Initializes the system
  - Sets up cleanup handlers
  - Handles initialization errors

**Dependencies:**
- `@/assets/tailwind.css` - Styling
- `@/config/platforms` - Platform configurations
- `./core` - Core functionality

**Error Handling:**
- Comprehensive try-catch around initialization
- Cleanup on errors
- Graceful degradation if initialization fails

**Usage Example:**
```typescript
// This file is automatically executed by WXT framework
// No direct usage required
```

---

## 🔧 Core Module

### `src/entrypoints/content/core/index.ts`

**Purpose:** Central export hub for all core functionality.

**Exports:**
```typescript
// DOM utilities
export { createDOMObserver } from "./dom-observer";

// React integration
export {
  EnhancerManagerProvider,
  useEnhancerManagerContext,
} from "./EnhancerManagerProvider";

// Core state management
export {
  ENHANCER_CONFIG,
  createInitialState,
  destroyEnhancer,
  getPlatformInfo,
  initializeEnhancer,
  isEnhancerReady,
} from "./enhancer-manager";

// Main interface
export { createEnhancerManager } from "./enhancer-manager-facade";

// Platform utilities
export { validatePlatformElements } from "./platform-validator";

// React renderer
export { createReactRenderer } from "./react-renderer";

// Types
export type * from "./types";

// React hooks
export { useEnhancerManager } from "./useEnhancerManager";
```

**Usage:**
```typescript
import { createEnhancerManager, ENHANCER_CONFIG } from "./core";
```

---

## 🔍 DOM Management

### `src/entrypoints/content/core/dom-observer.ts`

**Purpose:** Provides DOM mutation observation with throttling for performance.

**Key Functions:**

#### `createDOMObserver(callback, throttleMs?)`

**Signature:**
```typescript
function createDOMObserver(
  callback: DOMObserverCallback,
  throttleMs: number = 100
): MutationObserver
```

**Parameters:**
- `callback: DOMObserverCallback` - Function to call when DOM changes
- `throttleMs?: number` - Throttle delay in milliseconds (default: 100)

**Returns:** `MutationObserver` - Configured mutation observer

**Implementation Details:**
- Uses `MutationObserver` API
- Throttles callbacks to prevent excessive execution
- Observes entire document body with subtree monitoring
- Includes error handling for callback failures
- Automatically starts observing on creation

**Usage Example:**
```typescript
const observer = createDOMObserver(
  async () => {
    console.log("DOM changed, checking UI");
    await ensureUIInjected();
  },
  200 // 200ms throttle
);

// Cleanup when done
observer.disconnect();
```

**Error Handling:**
- Wraps callback execution in try-catch
- Logs errors without breaking observation
- Continues monitoring after callback errors

**Performance Considerations:**
- Throttling prevents excessive callback execution
- Uses `setTimeout` for throttling mechanism
- Clears previous timeout on new mutations

---

## 🎛️ State Management

### `src/entrypoints/content/core/enhancer-manager.ts`

**Purpose:** Core state management and orchestration of all enhancer functionality.

**Configuration:**
```typescript
export const ENHANCER_CONFIG: EnhancerConfig = {
  ENHANCER_ID: "prompt-enhancer-ui",
  OBSERVER_THROTTLE: 100,
  ELEMENT_TIMEOUT: 10000,
} as const;
```

**Key Functions:**

#### `createInitialState()`

**Signature:**
```typescript
function createInitialState(): EnhancerManagerState
```

**Returns:** Initial state object with platform detection

**Implementation:**
```typescript
return {
  platform: detectPlatform(),
  isInitialized: false,
  observer: null,
  reactRenderer: null,
};
```

#### `initializeEnhancer(state, handlers)`

**Signature:**
```typescript
async function initializeEnhancer(
  state: EnhancerManagerState,
  handlers: ReactRendererHandlers
): Promise<boolean>
```

**Parameters:**
- `state: EnhancerManagerState` - Current state object
- `handlers: ReactRendererHandlers` - Event handlers for React components

**Returns:** `Promise<boolean>` - Success status

**Process:**
1. Check if already initialized
2. Validate platform is supported
3. Validate required DOM elements exist
4. Create and mount React renderer
5. Setup DOM observer
6. Update state to initialized

**Error Handling:**
- Returns `false` on any failure
- Logs detailed error information
- Maintains state consistency

#### `destroyEnhancer(state)`

**Signature:**
```typescript
function destroyEnhancer(state: EnhancerManagerState): void
```

**Process:**
1. Disconnect DOM observer
2. Unmount React renderer
3. Clear state references
4. Set initialized to false

#### `handleDOMChanges(state)` (Internal)

**Purpose:** Handles DOM mutations by re-injecting UI if needed

**Implementation:**
- Checks if system is ready
- Calls `ensureMounted()` on React renderer
- Handles errors gracefully

**Usage Example:**
```typescript
const state = createInitialState();
const handlers = {
  onEnhance: (original, enhanced) => console.log("Enhanced!"),
  onStateChange: (state) => console.log("State:", state),
};

const success = await initializeEnhancer(state, handlers);
if (success) {
  console.log("System ready!");
}

// Cleanup when done
destroyEnhancer(state);
```

---

### `src/entrypoints/content/core/enhancer-manager-facade.ts`

**Purpose:** Provides a clean, object-oriented interface to the functional core.

**Key Function:**

#### `createEnhancerManager()`

**Signature:**
```typescript
function createEnhancerManager(): EnhancerManagerFacade
```

**Returns:** Object with methods for managing the enhancer

**Interface:**
```typescript
interface EnhancerManagerFacade {
  init(): Promise<boolean>;
  destroy(): void;
  getPlatformInfo(): PlatformConfig | null;
  isReady(): boolean;
  getState(): EnhancerManagerState;
}
```

**Implementation Details:**
- Creates internal state using `createInitialState()`
- Provides default handlers for enhancement events
- Wraps functional API in object-oriented interface
- Maintains backward compatibility

**Usage Example:**
```typescript
const enhancer = createEnhancerManager();

// Initialize
const success = await enhancer.init();
if (success) {
  console.log(`Ready on ${enhancer.getPlatformInfo()?.name}`);
}

// Check status
if (enhancer.isReady()) {
  console.log("System is ready");
}

// Cleanup
enhancer.destroy();
```

---

## 🏗️ Platform Integration

### `src/entrypoints/content/core/platform-validator.ts`

**Purpose:** Validates that required platform elements exist before initialization.

**Key Functions:**

#### `validatePlatformElements(platform, timeout?)`

**Signature:**
```typescript
async function validatePlatformElements(
  platform: PlatformConfig,
  timeout: number = 10000
): Promise<void>
```

**Parameters:**
- `platform: PlatformConfig` - Platform configuration to validate
- `timeout?: number` - Maximum wait time in milliseconds

**Process:**
1. Create validation promises for required elements
2. Add optional elements if configured
3. Wait for all elements using `Promise.all`
4. Throw descriptive errors if elements not found

**Required Elements:**
- `platform.selectors.editor` - Text editor element
- `platform.selectors.buttonContainer` - Container for UI buttons

**Optional Elements:**
- `platform.selectors.editorContainer` - Editor wrapper (if configured)
- `platform.selectors.submitButton` - Submit button (if configured)

#### `validateElement(selector, elementName, timeout)` (Internal)

**Purpose:** Validates a single element exists within timeout

**Implementation:**
- Uses `waitForElement` utility
- Provides meaningful error messages
- Returns the found element

**Usage Example:**
```typescript
try {
  await validatePlatformElements(platformConfig, 5000);
  console.log("All required elements found");
} catch (error) {
  console.error("Validation failed:", error.message);
}
```

**Error Messages:**
- `"Editor element not found: [selector]"`
- `"Button container not found: [selector]"`
- `"Editor container not found: [selector]"`
- `"Submit button not found: [selector]"`

---

## ⚛️ React Integration

### `src/entrypoints/content/core/react-renderer.ts`

**Purpose:** Manages React component lifecycle and DOM injection.

**Key Function:**

#### `createReactRenderer(platform, handlers)`

**Signature:**
```typescript
function createReactRenderer(
  platform: PlatformConfig,
  handlers: ReactRendererHandlers
): ReactRenderer
```

**Parameters:**
- `platform: PlatformConfig` - Platform configuration
- `handlers: ReactRendererHandlers` - Event handlers

**Returns:** `ReactRenderer` interface

**ReactRenderer Interface:**
```typescript
interface ReactRenderer {
  mount(): Promise<void>;
  unmount(): void;
  ensureMounted(): Promise<void>;
  isMounted(): boolean;
}
```

**Implementation Details:**

##### `mount()`
1. Check if already mounted
2. Create container element
3. Inject container into DOM using platform config
4. Mount React component with dynamic imports
5. Store references for cleanup

##### `unmount()`
1. Unmount React root
2. Remove UI element from DOM
3. Clear references

##### `ensureMounted()`
- Re-mount if not currently mounted
- Used by DOM observer for re-injection

##### `isMounted()`
- Check if UI is injected and React root exists

**Dynamic Imports:**
```typescript
const [React, ReactDOM, { EnhancerContainer }] = await Promise.all([
  import("react"),
  import("react-dom/client"),
  import("@/components/enhancers/EnhancerContainer"),
]);
```

**Usage Example:**
```typescript
const renderer = createReactRenderer(platform, {
  onEnhance: (original, enhanced) => console.log("Enhanced!"),
  onStateChange: (state) => console.log("State:", state),
});

await renderer.mount();
console.log("Mounted:", renderer.isMounted());

// Cleanup
renderer.unmount();
```

---

### `src/entrypoints/content/core/useEnhancerManager.ts`

**Purpose:** React hook for managing enhancer functionality.

**Key Function:**

#### `useEnhancerManager()`

**Signature:**
```typescript
function useEnhancerManager(): UseEnhancerManagerReturn
```

**Returns:** Hook interface with enhancer management functions

**Interface:**
```typescript
interface UseEnhancerManagerReturn {
  initialize: () => Promise<boolean>;
  destroy: () => void;
  getPlatform: () => PlatformConfig | null;
  isReady: boolean;
  platform: PlatformConfig | null;
  isInitialized: boolean;
}
```

**Implementation Details:**

**State Management:**
```typescript
const [state, setState] = useState<EnhancerManagerState>(createInitialState);
const [isReady, setIsReady] = useState(false);
const stateRef = useRef(state);
```

**Key Features:**
- Uses `useRef` to maintain mutable state reference
- Provides `useCallback` wrapped functions for performance
- Includes cleanup in `useEffect`
- Handles state synchronization

**Event Handlers:**
```typescript
const handleEnhancement = useCallback(
  (originalText: string, enhancedText: string) => {
    console.log("Enhancement completed:", {
      platform: stateRef.current.platform?.name,
      originalLength: originalText.length,
      enhancedLength: enhancedText.length,
    });
  },
  []
);
```

**Usage Example:**
```tsx
function MyComponent() {
  const {
    initialize,
    destroy,
    isReady,
    platform,
    isInitialized
  } = useEnhancerManager();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
    
    return () => {
      if (isInitialized) {
        destroy();
      }
    };
  }, [initialize, destroy, isInitialized]);

  if (!isReady) {
    return <div>Loading enhancer...</div>;
  }

  return <div>Enhancer ready on {platform?.name}</div>;
}
```

---

### `src/entrypoints/content/core/EnhancerManagerProvider.tsx`

**Purpose:** React context provider for enhancer manager.

**Components:**

#### `EnhancerManagerProvider`

**Signature:**
```tsx
const EnhancerManagerProvider: React.FC<{ children: ReactNode }>
```

**Implementation:**
```tsx
export const EnhancerManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const manager = useEnhancerManager();

  return (
    <EnhancerManagerContext.Provider value={manager}>
      {children}
    </EnhancerManagerContext.Provider>
  );
};
```

#### `useEnhancerManagerContext()`

**Signature:**
```typescript
function useEnhancerManagerContext(): EnhancerManagerContextType
```

**Error Handling:**
- Throws error if used outside provider
- Provides helpful error message

**Usage Example:**
```tsx
function App() {
  return (
    <EnhancerManagerProvider>
      <Header />
      <MainContent />
      <Footer />
    </EnhancerManagerProvider>
  );
}

function MainContent() {
  const { isReady, initialize } = useEnhancerManagerContext();
  
  return (
    <div>
      <button onClick={initialize} disabled={isReady}>
        {isReady ? "Ready" : "Initialize"}
      </button>
    </div>
  );
}
```

---

## 📝 Type Definitions

### `src/entrypoints/content/core/types.ts`

**Purpose:** Comprehensive TypeScript type definitions for all core functionality.

**Key Interfaces:**

#### `EnhancerConfig`
```typescript
interface EnhancerConfig {
  readonly ENHANCER_ID: string;
  readonly OBSERVER_THROTTLE: number;
  readonly ELEMENT_TIMEOUT: number;
}
```

#### `EnhancerManagerState`
```typescript
interface EnhancerManagerState {
  platform: PlatformConfig | null;
  isInitialized: boolean;
  observer: MutationObserver | null;
  reactRenderer: ReactRenderer | null;
}
```

#### `ReactRenderer`
```typescript
interface ReactRenderer {
  mount: () => Promise<void>;
  unmount: () => void;
  ensureMounted: () => Promise<void>;
  isMounted: () => boolean;
}
```

#### `ReactRendererHandlers`
```typescript
interface ReactRendererHandlers {
  onEnhance: (originalText: string, enhancedText: string) => void;
  onStateChange: (state: EnhancementState) => void;
}
```

#### `EnhancerManagerFacade`
```typescript
interface EnhancerManagerFacade {
  init: () => Promise<boolean>;
  destroy: () => void;
  getPlatformInfo: () => PlatformConfig | null;
  isReady: () => boolean;
  getState: () => EnhancerManagerState;
}
```

#### `UseEnhancerManagerReturn`
```typescript
interface UseEnhancerManagerReturn {
  initialize: () => Promise<boolean>;
  destroy: () => void;
  getPlatform: () => PlatformConfig | null;
  isReady: boolean;
  platform: PlatformConfig | null;
  isInitialized: boolean;
}
```

**Type Aliases:**

#### `DOMObserverCallback`
```typescript
type DOMObserverCallback = () => void | Promise<void>;
```

#### `EnhancerManagerContextType`
```typescript
type EnhancerManagerContextType = UseEnhancerManagerReturn;
```

**Usage:**
```typescript
import type {
  EnhancerManagerFacade,
  ReactRenderer,
  EnhancerManagerState
} from "./types";

const enhancer: EnhancerManagerFacade = createEnhancerManager();
```

---

## 🔗 File Dependencies

### Dependency Graph

```
index.ts
└── core/
    ├── enhancer-manager-facade.ts
    │   ├── enhancer-manager.ts
    │   │   ├── dom-observer.ts
    │   │   ├── platform-validator.ts
    │   │   └── react-renderer.ts
    │   └── types.ts
    ├── EnhancerManagerProvider.tsx
    │   ├── useEnhancerManager.ts
    │   └── types.ts
    └── index.ts (exports)
```

### External Dependencies

- `@/config/platforms` - Platform configurations
- `@/utils/injection` - DOM injection utilities
- `@/types` - Global type definitions
- `@/components/enhancers/EnhancerContainer` - React component
- `react` - React library
- `react-dom/client` - React DOM

---

## 📊 File Statistics

| File | Lines | Functions | Interfaces | Purpose |
|------|-------|-----------|------------|---------|
| `index.ts` | ~40 | 1 | 0 | Entry point |
| `core/index.ts` | ~30 | 0 | 0 | Exports |
| `dom-observer.ts` | ~35 | 1 | 0 | DOM observation |
| `enhancer-manager.ts` | ~120 | 6 | 0 | State management |
| `enhancer-manager-facade.ts` | ~60 | 1 | 0 | Facade interface |
| `platform-validator.ts` | ~50 | 2 | 0 | Platform validation |
| `react-renderer.ts` | ~100 | 3 | 0 | React lifecycle |
| `useEnhancerManager.ts` | ~80 | 1 | 0 | React hook |
| `EnhancerManagerProvider.tsx` | ~35 | 2 | 0 | React context |
| `types.ts` | ~80 | 0 | 8 | Type definitions |

**Total:** ~630 lines, 17 functions, 8 interfaces

---

## 🎯 Quick Reference

### Most Common Operations

```typescript
// Create and initialize enhancer
const enhancer = createEnhancerManager();
await enhancer.init();

// Use in React
const { isReady, initialize } = useEnhancerManager();

// Create DOM observer
const observer = createDOMObserver(callback, 100);

// Validate platform
await validatePlatformElements(platform);

// Create React renderer
const renderer = createReactRenderer(platform, handlers);
```

### Error Handling Patterns

```typescript
// Initialization
try {
  const success = await enhancer.init();
  if (!success) {
    console.error("Initialization failed");
  }
} catch (error) {
  console.error("Error:", error);
}

// Platform validation
try {
  await validatePlatformElements(platform);
} catch (error) {
  console.error("Platform not supported:", error.message);
}
```

### Cleanup Patterns

```typescript
// Manual cleanup
enhancer.destroy();

// React cleanup
useEffect(() => {
  return () => {
    if (isInitialized) {
      destroy();
    }
  };
}, []);

// Observer cleanup
observer.disconnect();
```

---

This completes the comprehensive file reference documentation. Each file's purpose, functionality, and usage patterns are clearly documented for contributors and maintainers.