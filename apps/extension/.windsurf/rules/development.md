# Development Standards & Practices

## Code Quality Requirements

### TypeScript Standards
- **Zero Compilation Errors**: All code must pass `bun run compile`
- **Strict Type Safety**: No `any` types, proper interface definitions
- **Functional Programming**: No classes, use pure functions and React hooks
- **Immutable Patterns**: State updates through immutable operations only

### Error Handling Requirements
- **Async Operations**: All async functions must have try/catch blocks
- **Graceful Degradation**: Errors should never break the extension
- **Logging**: Use `console.error()` for errors, `console.log()` for debug only
- **User Experience**: Silent failures with fallback behavior

### Performance Standards
- **DOM Observers**: Use throttling (100ms default) to prevent excessive callbacks
- **Memory Management**: Proper cleanup in useEffect return functions
- **Bundle Size**: Keep imports minimal, use dynamic imports for large dependencies
- **React Optimization**: Use `useCallback`, `useMemo`, and `React.memo` appropriately

## Architecture Principles

### Functional Programming
```typescript
// ✅ Good: Pure function
export function createInitialState(): EnhancerManagerState {
  return {
    platform: detectPlatform(),
    isInitialized: false,
    observer: null,
    reactRenderer: null,
  };
}

// ❌ Bad: Class-based approach
class EnhancerManager {
  constructor() { /* ... */ }
}
```

### Error Handling Pattern
```typescript
// ✅ Good: Proper error handling
export async function initializeEnhancer(
  state: EnhancerManagerState,
  handlers: ReactRendererHandlers,
): Promise<boolean> {
  try {
    await validatePlatformElements(state.platform);
    state.reactRenderer = createReactRenderer(state.platform, handlers);
    await state.reactRenderer.mount();
    return true;
  } catch (error) {
    console.error("Failed to initialize EnhancerManager:", error);
    return false;
  }
}

// ❌ Bad: Unhandled errors
export async function badInitialize() {
  await validatePlatformElements(platform); // Could throw
  // No error handling
}
```

### State Management Pattern
```typescript
// ✅ Good: Immutable state updates
const [state, setState] = useState<EnhancerManagerState>(createInitialState);

const updateState = useCallback((updates: Partial<EnhancerManagerState>) => {
  setState(prevState => ({ ...prevState, ...updates }));
}, []);

// ❌ Bad: Direct mutation
state.isInitialized = true; // Mutating state directly
```

## File Organization Standards

### Import Order
```typescript
// 1. External libraries
import React from 'react';
import type { PlatformConfig } from '@/config/platforms';

// 2. Internal modules (relative imports)
import { createDOMObserver } from './dom-observer';
import type { EnhancerManagerState } from './types';
```

### Export Patterns
```typescript
// ✅ Good: Named exports with clear purpose
export function createEnhancerManager(): EnhancerManagerFacade { }
export type { EnhancerManagerState, ReactRenderer };

// ❌ Bad: Default exports (harder to refactor)
export default class EnhancerManager { }
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `EnhancerContainer.tsx`)
- **Utilities**: camelCase (e.g., `dom-observer.ts`)
- **Types**: camelCase with `.ts` extension (e.g., `types.ts`)
- **Documentation**: UPPERCASE (e.g., `README.md`, `ARCHITECTURE.md`)

## Testing Requirements

### Manual Testing Checklist
Before any commit, verify:
- [ ] Extension loads without console errors
- [ ] UI injects correctly on supported platforms
- [ ] Navigation between pages works
- [ ] Browser refresh maintains functionality
- [ ] Multiple tabs work independently

### Browser Compatibility
Test on:
- [ ] Chrome (latest stable)
- [ ] Firefox (latest stable)
- [ ] Edge (latest stable)

### Platform Compatibility
Test on:
- [ ] ChatGPT (chat.openai.com)
- [ ] Claude (claude.ai)
- [ ] Any custom platforms added

## Documentation Standards

### Code Comments
```typescript
/**
 * Creates a throttled DOM mutation observer
 * @param callback - Function to call when DOM changes are detected
 * @param throttleMs - Throttle delay in milliseconds (default: 100)
 * @returns MutationObserver instance
 */
export function createDOMObserver(
  callback: DOMObserverCallback,
  throttleMs: number = 100,
): MutationObserver {
  // Implementation...
}
```

### README Updates
When adding new features:
- Update relevant documentation in `src/entrypoints/content/docs/`
- Add examples to `DEVELOPMENT_GUIDE.md`
- Update API reference in `CORE_API.md`

## Git Workflow

### Commit Messages
```bash
# ✅ Good: Clear, descriptive commits
git commit -m "feat: add platform validation with timeout handling"
git commit -m "fix: prevent memory leak in DOM observer cleanup"
git commit -m "refactor: simplify enhancer manager state management"

# ❌ Bad: Vague commits
git commit -m "fix stuff"
git commit -m "updates"
```

### Branch Naming
- `feature/platform-detection` - New features
- `fix/memory-leak-observer` - Bug fixes
- `refactor/state-management` - Code improvements
- `docs/api-reference` - Documentation updates

## Performance Monitoring

### Memory Usage
```typescript
// Monitor memory in development
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    if (performance.memory) {
      console.log('Memory:', {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
        total: Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB'
      });
    }
  }, 10000);
}
```

### Performance Timing
```typescript
// Measure critical operations
const startTime = performance.now();
await initializeEnhancer(state, handlers);
const duration = performance.now() - startTime;
console.log(`Initialization took ${duration.toFixed(2)}ms`);
```

## Security Considerations

### Content Script Security
- Never inject arbitrary HTML from external sources
- Validate all DOM selectors before use
- Use CSP-compliant code (no eval, inline scripts)
- Sanitize any user input before DOM manipulation

### Extension Permissions
- Request minimal permissions required
- Document why each permission is needed
- Regular audit of manifest.json permissions

## Deployment Checklist

### Pre-deployment
- [ ] `bun run compile` passes without errors
- [ ] All manual tests completed
- [ ] No console.log statements in production code
- [ ] Version number updated in package.json
- [ ] CHANGELOG.md updated with changes

### Build Verification
- [ ] `bun run build` completes successfully
- [ ] `bun run build:firefox` completes successfully
- [ ] Test built extension in clean browser profile
- [ ] Verify all functionality works in production build

This development guide ensures consistent, high-quality code that follows senior engineering practices and maintains the robust architecture we've established.