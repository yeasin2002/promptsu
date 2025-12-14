# Development Standards

## Code Quality

### TypeScript
- Strict mode enabled
- No `any` types - use proper typing
- Use `import type` for type-only imports
- Non-null assertions allowed (biome rule disabled)

### React Patterns
- Functional components only
- Use React hooks for state and effects
- Proper cleanup in useEffect return functions
- Array index in keys allowed (biome rule disabled)

### Error Handling
```typescript
// ✅ Good: Proper error handling
const fetchData = async () => {
  try {
    const result = await api.enhance(prompt);
    return { success: true, data: result };
  } catch (error) {
    console.error("Enhancement failed:", error);
    return { success: false, error };
  }
};
```

## Styling

### TailwindCSS
- Use utility classes directly
- Use `cn()` helper for conditional classes
- Follow workspace TailwindCSS config

```typescript
import { cn } from "@/lib/cn";

<div className={cn("p-4 rounded-lg", isActive && "bg-primary")} />
```

### shadcn/ui Components
- Import from workspace package when available
- Local components in `src/components/ui/`

## Extension Development

### Content Scripts
- Use platform config for DOM selectors
- Handle dynamic page changes with MutationObserver
- Clean up observers on unmount

### Storage
- Use `src/utils/storage.ts` helpers
- Prefer `chrome.storage.local` for extension data

### Permissions
- Minimal permissions in `wxt.config.ts`
- Currently: `storage` only

## Testing Checklist

Before commits:
- [ ] `pnpm compile` passes
- [ ] Extension loads without errors
- [ ] UI works on supported platforms
- [ ] Both Chrome and Firefox tested

## Build & Deploy

```bash
# Development
pnpm dev           # Chrome
pnpm dev:firefox   # Firefox

# Production
pnpm build         # Chrome
pnpm build:firefox # Firefox

# Package
pnpm zip           # Chrome .zip
pnpm zip:firefox   # Firefox .zip
```

## Git Commits

```bash
# Feature
git commit -m "feat(extension): add prompt enhancement button"

# Fix
git commit -m "fix(extension): resolve content script injection"

# Refactor
git commit -m "refactor(extension): simplify platform detection"
```
