# Contributing Guide

## 🎯 How to Contribute to Content Script Core

This guide provides step-by-step instructions for contributing to the content script core functionality.

## 📋 Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** installed
- **Bun** package manager
- **TypeScript** knowledge
- **React** experience
- **Git** for version control

## 🚀 Getting Started

### 1. **Setup Development Environment**

```bash
# Clone the repository
git clone <repository-url>
cd apps/extension

# Install dependencies
bun install

# Run type checking
bun run compile

# Start development server
bun run dev
```

### 2. **Understanding the Codebase**

Read these documents first:
- [Architecture Guide](./ARCHITECTURE.md) - System design
- [Core API Reference](./CORE_API.md) - API documentation
- [File Reference](./FILE_REFERENCE.md) - File details

## 🔧 Development Workflow

### Step 1: **Identify the Change Type**

Choose the appropriate workflow based on your contribution:

#### 🐛 **Bug Fix**
- Fix existing functionality
- Improve error handling
- Performance optimizations

#### ✨ **New Feature**
- Add new platform support
- Extend existing functionality
- Add new APIs

#### 📚 **Documentation**
- Update API docs
- Improve code comments
- Add examples

#### 🧹 **Refactoring**
- Code cleanup
- Type improvements
- Architecture changes

### Step 2: **Create a Branch**

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

### Step 3: **Make Changes**

Follow the guidelines below based on the file you're modifying.

## 📁 File-Specific Contribution Guidelines

### 🔍 **DOM Observer** (`dom-observer.ts`)

**When to modify:**
- Adding new DOM observation patterns
- Improving throttling logic
- Enhancing error handling

**Guidelines:**
```typescript
// ✅ Good: Simple, focused function
export function createDOMObserver(
  callback: DOMObserverCallback,
  throttleMs: number = 100
): MutationObserver {
  // Implementation
}

// ❌ Avoid: Complex, multi-purpose functions
export function createComplexObserver(/* many parameters */) {
  // Too much responsibility
}
```

**Testing:**
```typescript
// Test DOM observer functionality
const mockCallback = jest.fn();
const observer = createDOMObserver(mockCallback, 50);

// Simulate DOM changes
document.body.appendChild(document.createElement('div'));

// Verify callback was called
expect(mockCallback).toHaveBeenCalled();
```

### 🎛️ **Enhancer Manager** (`enhancer-manager.ts`)

**When to modify:**
- Adding new initialization steps
- Improving state management
- Enhancing error recovery

**Guidelines:**
```typescript
// ✅ Good: Pure functions with clear responsibilities
export function initializeEnhancer(
  state: EnhancerManagerState,
  handlers: ReactRendererHandlers
): Promise<boolean> {
  // Clear initialization logic
}

// ✅ Good: Immutable state updates
export function updateState(
  currentState: EnhancerManagerState,
  updates: Partial<EnhancerManagerState>
): EnhancerManagerState {
  return { ...currentState, ...updates };
}
```

**Error Handling:**
```typescript
// ✅ Always include comprehensive error handling
try {
  await validatePlatformElements(state.platform);
  // ... other operations
} catch (error) {
  console.error("Initialization failed:", error);
  // Cleanup and return failure
  return false;
}
```

### 🏗️ **Platform Validator** (`platform-validator.ts`)

**When to modify:**
- Adding new platform support
- Improving element detection
- Enhancing validation logic

**Adding New Platform Support:**

1. **Update platform configuration** (in `@/config/platforms`)
2. **Add validation logic:**

```typescript
// Add new validation for specific platform
export async function validateCustomPlatformElements(
  platform: PlatformConfig,
  timeout: number = 10000
): Promise<void> {
  // Platform-specific validation
  const customElement = await waitForElement(
    platform.selectors.customElement,
    timeout
  );
  
  if (!customElement) {
    throw new Error(`Custom element not found: ${platform.selectors.customElement}`);
  }
}
```

### ⚛️ **React Integration** (`react-renderer.ts`, `useEnhancerManager.ts`)

**When to modify:**
- Improving React lifecycle management
- Adding new hooks
- Enhancing component integration

**Hook Guidelines:**
```typescript
// ✅ Good: Use proper dependency arrays
const initialize = useCallback(async (): Promise<boolean> => {
  const success = await initializeEnhancer(stateRef.current, {
    onEnhance: handleEnhancement,
    onStateChange: handleStateChange,
  });
  return success;
}, [handleEnhancement, handleStateChange]); // Proper dependencies

// ✅ Good: Cleanup in useEffect
useEffect(() => {
  return () => {
    if (stateRef.current.isInitialized) {
      destroyEnhancer(stateRef.current);
    }
  };
}, []);
```

**Component Guidelines:**
```tsx
// ✅ Good: Simple, focused components
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

### 📝 **Types** (`types.ts`)

**When to modify:**
- Adding new interfaces
- Extending existing types
- Improving type safety

**Guidelines:**
```typescript
// ✅ Good: Clear, specific interfaces
export interface ReactRendererHandlers {
  onEnhance: (originalText: string, enhancedText: string) => void;
  onStateChange: (state: EnhancementState) => void;
}

// ✅ Good: Use readonly for configuration
export interface EnhancerConfig {
  readonly ENHANCER_ID: string;
  readonly OBSERVER_THROTTLE: number;
  readonly ELEMENT_TIMEOUT: number;
}

// ❌ Avoid: Overly generic types
export interface GenericHandler<T> {
  handle: (data: T) => void;
}
```

## 🧪 Testing Your Changes

### 1. **Type Checking**
```bash
# Ensure no TypeScript errors
bun run compile
```

### 2. **Manual Testing**
```bash
# Test in development mode
bun run dev

# Test the extension in browser
# 1. Load extension in Chrome/Firefox
# 2. Navigate to supported platforms
# 3. Verify functionality works
# 4. Check browser console for errors
```

### 3. **Unit Testing** (if applicable)
```bash
# Run tests (when test suite is available)
bun test
```

## 📏 Code Quality Standards

### 1. **TypeScript**
- No `any` types
- Proper interface definitions
- Comprehensive type coverage
- Use strict mode

### 2. **Functional Programming**
- No classes
- Pure functions preferred
- Immutable data structures
- Predictable side effects

### 3. **Error Handling**
- Comprehensive try-catch blocks
- Meaningful error messages
- Graceful degradation
- Proper resource cleanup

### 4. **Performance**
- Avoid unnecessary re-renders
- Use proper React hooks
- Throttle expensive operations
- Clean up resources

### 5. **Documentation**
- Clear function comments
- Type annotations
- Usage examples
- Update relevant docs

## 🔍 Code Review Checklist

Before submitting your changes, verify:

### ✅ **Functionality**
- [ ] Feature works as expected
- [ ] No breaking changes
- [ ] Backward compatibility maintained
- [ ] Error cases handled

### ✅ **Code Quality**
- [ ] TypeScript compilation passes
- [ ] No console errors
- [ ] Follows existing patterns
- [ ] Proper error handling

### ✅ **Performance**
- [ ] No memory leaks
- [ ] Efficient algorithms
- [ ] Proper cleanup
- [ ] Minimal bundle impact

### ✅ **Documentation**
- [ ] Code comments updated
- [ ] API docs updated
- [ ] Examples provided
- [ ] README updated if needed

## 📤 Submitting Changes

### 1. **Commit Guidelines**

```bash
# Use conventional commit format
git commit -m "feat: add new platform support for Perplexity"
git commit -m "fix: resolve DOM observer memory leak"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify state management logic"
```

### 2. **Pull Request**

Create a pull request with:

- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Testing instructions** for reviewers
- **Screenshots** if UI changes are involved
- **Breaking changes** clearly marked

### 3. **PR Template**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] TypeScript compilation passes
- [ ] Manual testing completed
- [ ] No console errors

## Checklist
- [ ] Code follows project standards
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🚨 Common Pitfalls to Avoid

### 1. **State Management**
```typescript
// ❌ Avoid: Mutating state directly
state.isInitialized = true;

// ✅ Good: Immutable updates
setState({ ...state, isInitialized: true });
```

### 2. **Error Handling**
```typescript
// ❌ Avoid: Unhandled promises
initializeEnhancer(state, handlers);

// ✅ Good: Proper error handling
try {
  await initializeEnhancer(state, handlers);
} catch (error) {
  console.error("Initialization failed:", error);
}
```

### 3. **React Hooks**
```typescript
// ❌ Avoid: Missing dependencies
useEffect(() => {
  initialize();
}, []); // Missing 'initialize' dependency

// ✅ Good: Proper dependencies
useEffect(() => {
  initialize();
}, [initialize]);
```

### 4. **Resource Cleanup**
```typescript
// ❌ Avoid: Memory leaks
const observer = createDOMObserver(callback);
// Never disconnected

// ✅ Good: Proper cleanup
useEffect(() => {
  const observer = createDOMObserver(callback);
  return () => observer.disconnect();
}, []);
```

## 🎯 Advanced Contributions

### Adding New Platform Support

1. **Update platform configuration**
2. **Add platform-specific selectors**
3. **Test element detection**
4. **Update documentation**
5. **Add validation logic**

### Extending React Integration

1. **Create new hooks if needed**
2. **Follow React best practices**
3. **Ensure proper cleanup**
4. **Add TypeScript types**
5. **Update context if needed**

### Performance Optimizations

1. **Profile current performance**
2. **Identify bottlenecks**
3. **Implement optimizations**
4. **Measure improvements**
5. **Document changes**

## 📞 Getting Help

If you need help:

1. **Check existing documentation**
2. **Review similar implementations**
3. **Ask questions in issues**
4. **Reach out to maintainers**

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Web Extensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [WXT Framework](https://wxt.dev/)

---

Thank you for contributing! Your efforts help make this extension better for everyone. 🚀