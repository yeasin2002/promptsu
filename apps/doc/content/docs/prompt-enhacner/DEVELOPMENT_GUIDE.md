# Development Guide

## 🎯 Step-by-Step Development Workflow

This guide provides a comprehensive workflow for developing and contributing to the content script core functionality.

## 📋 Table of Contents

- [Environment Setup](#environment-setup)
- [Understanding the Codebase](#understanding-the-codebase)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Debugging Guide](#debugging-guide)
- [Performance Optimization](#performance-optimization)
- [Deployment Process](#deployment-process)

## 🚀 Environment Setup

### Prerequisites

Ensure you have the following installed:

```bash
# Check Node.js version (18+ required)
node --version

# Check Bun installation
bun --version

# Check Git
git --version
```

### Initial Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd apps/extension

# 2. Install dependencies
bun install

# 3. Verify TypeScript compilation
bun run compile

# 4. Start development server
bun run dev
```

### IDE Configuration

**VS Code Extensions (Recommended):**

- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

**Settings:**

````json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.associations": {
    "*.tsx": "typescriptreact"
  }
}```

##
🏗️ Understanding the Codebase

### Core Architecture Overview

````

src/entrypoints/content/core/
├── dom-observer.ts # DOM mutation observation
├── enhancer-manager.ts # Core state management
├── enhancer-manager-facade.ts # Backward compatibility layer
├── EnhancerManagerProvider.tsx # React context provider
├── platform-validator.ts # Platform element validation
├── react-renderer.ts # React component lifecycle
├── types.ts # TypeScript definitions
├── useEnhancerManager.ts # React hooks
└── index.ts # Public API exports

````

### Key Concepts

#### 1. **Platform Detection**
The system automatically detects supported platforms (ChatGPT, Claude, etc.) and adapts UI injection accordingly.

#### 2. **DOM Observation**
Monitors page changes to re-inject UI when needed, using throttled mutation observers for performance.

#### 3. **React Integration**
Manages React component lifecycle with proper mounting/unmounting and error boundaries.

#### 4. **State Management**
Functional state management using React hooks and immutable patterns.

## 🔄 Development Workflow

### 1. Feature Development Process

#### Step 1: Planning
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Review existing architecture
cat src/entrypoints/content/docs/ARCHITECTURE.md
````

#### Step 2: Implementation

```bash
# Start development server
bun run dev

# Open browser extension developer tools
# Chrome: chrome://extensions/ -> Developer mode -> Load unpacked
# Firefox: about:debugging -> This Firefox -> Load Temporary Add-on
```

#### Step 3: Code Quality Checks

```bash
# TypeScript compilation
bun run compile

# Format code (if using Biome)
bun run format

# Lint code (if using Biome)
bun run lint
```

### 2. Adding New Platform Support

#### Step 1: Define Platform Configuration

```typescript
// In src/config/platforms/index.ts
export const NEW_PLATFORM_CONFIG: PlatformConfig = {
  name: "NewPlatform",
  domain: "newplatform.com",
  selectors: {
    editor: "[data-editor]",
    buttonContainer: ".button-container",
    editorContainer: ".editor-wrapper", // optional
    submitButton: "[type='submit']", // optional
  },
};
```

#### Step 2: Test Platform Detection

```typescript
// Test in browser console
import { detectPlatform } from "@/config/platforms";
console.log(detectPlatform()); // Should return your platform config
```

#### Step 3: Validate Elements

```typescript
// Test element validation
import { validatePlatformElements } from "@/entrypoints/content/core";
validatePlatformElements(NEW_PLATFORM_CONFIG)
  .then(() => console.log("Platform validated"))
  .catch(console.error);
```

### 3. Modifying Core Functionality

#### Adding New Features

```typescript
// 1. Update types in types.ts
export interface NewFeatureConfig {
  enabled: boolean;
  options: Record<string, unknown>;
}

// 2. Extend state interface
export interface EnhancerManagerState {
  // ... existing properties
  newFeature?: NewFeatureConfig;
}

// 3. Implement feature logic
export function initializeNewFeature(
  state: EnhancerManagerState,
  config: NewFeatureConfig
): boolean {
  try {
    // Implementation here
    state.newFeature = config;
    return true;
  } catch (error) {
    console.error("Failed to initialize new feature:", error);
    return false;
  }
}
```

#### Modifying Existing Features

```typescript
// Always maintain backward compatibility
export function enhancedFunction(
  // Keep existing parameters
  existingParam: string,
  // Add new optional parameters
  newParam?: NewType
): ReturnType {
  // Handle both old and new usage patterns
  if (newParam) {
    // New functionality
  }
  // Existing functionality
}
```

## 🧪 Testing Strategy

### 1. Manual Testing Checklist

#### Platform Compatibility

- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Edge (latest)
- [ ] Verify on all supported platforms (ChatGPT, Claude, etc.)

#### Core Functionality

- [ ] Extension loads without errors
- [ ] UI injects correctly on page load
- [ ] UI re-injects after page navigation
- [ ] Enhancement button works
- [ ] Error handling doesn't break extension

#### Edge Cases

- [ ] Test with slow network connections
- [ ] Test with DOM mutations
- [ ] Test page refresh scenarios
- [ ] Test multiple tabs simultaneously

### 2. Automated Testing Setup

#### Unit Tests (Future Implementation)

```bash
# Install testing dependencies
bun add -d vitest @testing-library/react @testing-library/jest-dom

# Create test files
touch src/entrypoints/content/core/__tests__/enhancer-manager.test.ts
```

#### Integration Tests

```typescript
// Example test structure
describe("EnhancerManager", () => {
  it("should initialize successfully", async () => {
    const manager = createEnhancerManager();
    const result = await manager.init();
    expect(result).toBe(true);
  });

  it("should handle platform detection", () => {
    // Mock DOM elements
    document.body.innerHTML = "<div data-editor></div>";
    const platform = detectPlatform();
    expect(platform).toBeDefined();
  });
});
```

### 3. Performance Testing

#### Memory Leak Detection

```javascript
// In browser console
// 1. Open extension
// 2. Navigate between pages multiple times
// 3. Check memory usage in DevTools -> Memory tab
// 4. Look for increasing heap size over time
```

#### DOM Observer Performance

```javascript
// Monitor observer callback frequency
let callbackCount = 0;
const originalCallback = /* your callback */;
const monitoredCallback = () => {
  callbackCount++;
  console.log(`Observer callback called ${callbackCount} times`);
  return originalCallback();
};
```

## 🐛 Debugging Guide

### 1. Common Issues & Solutions

#### Issue: Extension Not Loading

```bash
# Check console for errors
# Chrome DevTools -> Console
# Look for:
# - Import/export errors
# - TypeScript compilation errors
# - Missing dependencies
```

**Solution:**

```bash
# Verify compilation
bun run compile

# Check for syntax errors
# Review recent changes
git diff HEAD~1
```

#### Issue: UI Not Injecting

```javascript
// Debug platform detection
console.log("Platform detected:", detectPlatform());

// Debug element validation
validatePlatformElements(platform)
  .then(() => console.log("Elements valid"))
  .catch((error) => console.error("Validation failed:", error));

// Check DOM observer
console.log("Observer active:", !!observer);
```

#### Issue: React Component Not Rendering

```javascript
// Check React root creation
console.log("React root created:", !!reactRoot);

// Verify container injection
console.log("Container in DOM:", document.getElementById("prompt-enhancer-ui"));

// Check for React errors
// Look in browser console for React error boundaries
```

### 2. Debugging Tools

#### Browser Extension DevTools

```bash
# Chrome
chrome://extensions/ -> Details -> Inspect views: background page

# Firefox
about:debugging -> This Firefox -> Inspect
```

#### Console Debugging

```typescript
// Add debug logging
const DEBUG = process.env.NODE_ENV === "development";

function debugLog(message: string, data?: unknown): void {
  if (DEBUG) {
    console.log(`[EnhancerManager] ${message}`, data);
  }
}

// Use throughout code
debugLog("Initializing enhancer", { platform: platform.name });
```

#### React DevTools

```bash
# Install React DevTools browser extension
# Inspect React component tree
# Monitor state changes
# Profile component performance
```

### 3. Error Tracking

#### Error Boundary Implementation

```typescript
// Add to React components
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React Error Boundary caught error:", error, errorInfo);
    // Optional: Send to error tracking service
  }
}
```

#### Global Error Handling

```typescript
// In content script
window.addEventListener("error", (event) => {
  console.error("Global error in content script:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});
```

## ⚡ Performance Optimization

### 1. Bundle Size Optimization

#### Code Splitting

```typescript
// Use dynamic imports for large dependencies
const loadReactComponent = async () => {
  const { EnhancerContainer } = await import(
    "@/components/enhancers/EnhancerContainer"
  );
  return EnhancerContainer;
};
```

#### Tree Shaking

```typescript
// Import only what you need
import { validatePlatformElements } from "@/entrypoints/content/core";
// Instead of: import * as core from '@/entrypoints/content/core';
```

### 2. Runtime Performance

#### DOM Observer Optimization

```typescript
// Use throttling to limit callback frequency
const OBSERVER_THROTTLE = 100; // ms

// Disconnect observer when not needed
if (!isActive) {
  observer.disconnect();
}
```

#### Memory Management

```typescript
// Clean up resources properly
useEffect(() => {
  return () => {
    // Cleanup function
    if (observer) observer.disconnect();
    if (reactRoot) reactRoot.unmount();
  };
}, []);
```

#### React Performance

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### 3. Monitoring Performance

#### Performance Metrics

```typescript
// Measure initialization time
const startTime = performance.now();
await initializeEnhancer(state, handlers);
const endTime = performance.now();
console.log(`Initialization took ${endTime - startTime} milliseconds`);
```

#### Memory Usage Tracking

```javascript
// Monitor memory usage
setInterval(() => {
  if (performance.memory) {
    console.log("Memory usage:", {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB",
      total: Math.round(performance.memory.totalJSHeapSize / 1048576) + " MB",
    });
  }
}, 10000); // Every 10 seconds
```

## 🚀 Deployment Process

### 1. Pre-deployment Checklist

#### Code Quality

- [ ] All TypeScript errors resolved (`bun run compile`)
- [ ] Code formatted and linted
- [ ] No console.log statements in production code
- [ ] Error handling implemented for all async operations

#### Testing

- [ ] Manual testing completed on all target browsers
- [ ] All supported platforms tested
- [ ] Performance benchmarks meet requirements
- [ ] No memory leaks detected

#### Documentation

- [ ] Code comments updated
- [ ] API documentation current
- [ ] CHANGELOG.md updated
- [ ] Version number incremented

### 2. Build Process

#### Production Build

```bash
# Clean previous builds
rm -rf dist/

# Build for Chrome
bun run build

# Build for Firefox
bun run build:firefox

# Create distribution packages
bun run zip
bun run zip:firefox
```

#### Build Verification

```bash
# Test production build locally
# Load unpacked extension from dist/ folder
# Verify all functionality works
# Check for console errors
```

### 3. Release Process

#### Version Management

```bash
# Update version in package.json
npm version patch  # or minor/major

# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

#### Distribution

```bash
# Chrome Web Store
# Upload dist-chrome.zip to Chrome Developer Dashboard

# Firefox Add-ons
# Upload dist-firefox.zip to Firefox Developer Hub

# GitHub Releases
# Create release with changelog and distribution files
```

## 📚 Additional Resources

### Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Core API Reference](./CORE_API.md)
- [File Reference](./FILE_REFERENCE.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

### External Resources

- [WXT Framework Documentation](https://wxt.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/)
- [Firefox Extension API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)

### Community

- [GitHub Issues](../../issues) - Bug reports and feature requests
- [GitHub Discussions](../../discussions) - General questions and ideas
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to the project

---

## 🎯 Quick Reference Commands

```bash
# Development
bun run dev              # Start development server
bun run dev:firefox      # Start Firefox development
bun run compile          # TypeScript check
bun run build            # Production build
bun run zip              # Create distribution package

# Quality Assurance
bun run format           # Format code
bun run lint             # Lint code
bun run test             # Run tests (when implemented)

# Debugging
bun run build && echo "Build successful" || echo "Build failed"
```

Remember: Always test thoroughly before deploying, and maintain backward compatibility when making changes to the public API!
