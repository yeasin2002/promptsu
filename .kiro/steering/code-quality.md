# Code Quality & Standards

This project uses Ultracite (extends Biome) for formatting and Oxlint for linting. Line width is 120 characters.

## Key Principles

- **Ultracite + Biome** - Formatting with 120 char line width
- **Oxlint** - Fast linting with TypeScript and Unicorn plugins
- **Strict TypeScript** - Null checks enabled
- **Accessibility first** - WCAG compliance for extension UI

## Before Writing Any Code

1. **Analyze existing patterns** in the codebase
2. **Consider edge cases** and error scenarios
3. **Follow the rules below strictly**
4. **Validate accessibility requirements**

## Accessibility (a11y) Requirements

- Never use `accessKey` attribute on HTML elements
- Don't set `aria-hidden="true"` on focusable elements
- Don't use distracting elements like `<marquee>` or `<blink>`
- Always include `type` attribute for button elements
- Make sure label elements have text content and are associated with inputs
- Don't use positive integers for `tabIndex` property
- Don't include "image", "picture", or "photo" in img alt text
- Always include `title` element for SVG elements
- Always include `lang` attribute on html element
- Always include `title` attribute for iframe elements
- Accompany `onClick` with keyboard handlers (`onKeyUp`, `onKeyDown`, or `onKeyPress`)
- Accompany `onMouseOver`/`onMouseOut` with `onFocus`/`onBlur`
- Use semantic elements instead of role attributes in JSX
- Make sure all anchors are valid and navigable

## React & JSX Standards

- **Never use `<img>` elements** in Next.js projects (use `next/image`)
- **Array index in keys allowed** (biome rule disabled for this project)
- Don't define React components inside other components
- Don't use both `children` and `dangerouslySetInnerHTML` props
- Use `<>...</>` instead of `<Fragment>...</Fragment>`
- Don't forget key props in iterators and collection literals
- Make sure all React hooks are called from top level of component functions
- Make sure all dependencies are correctly specified in React hooks

## TypeScript Best Practices

- **Don't use TypeScript enums** - use const objects or union types
- **Don't use `any` type** - always provide proper typing
- **Non-null assertions allowed** (biome rule disabled for this project)
- Use `export type` for type exports
- Use `import type` for type imports
- Use `as const` instead of literal types and type annotations
- Don't use TypeScript namespaces
- Don't declare empty interfaces

## Code Quality Rules

### Functions & Control Flow
- Use arrow functions instead of function expressions
- Don't use unnecessary boolean casts
- Use `for...of` statements instead of `Array.forEach`
- Don't use nested ternary expressions
- Don't use `else` blocks when the `if` block breaks early
- Include `default` clause in switch statements
- Don't use `await` inside loops

### Variables & Constants
- Use `const` declarations for variables that are only assigned once
- Don't initialize variables to `undefined`
- Don't reassign function parameters
- Don't have unused variables, imports, or function parameters
- Don't let variable declarations shadow variables from outer scopes

### Error Handling & Safety
- Always use comprehensive error handling with try-catch
- Don't use `console` statements in production code
- Don't use `debugger` statements
- Use `===` and `!==` for comparisons
- Don't use `eval()` or similar unsafe functions
- Make sure Promise-like statements are handled appropriately

### Modern JavaScript/TypeScript
- Use template literals over string concatenation
- Use object spread instead of `Object.assign()` when constructing objects
- Use `Date.now()` to get milliseconds since Unix Epoch
- Use `.flatMap()` instead of `map().flat()` when possible
- Use `String.trimStart()` and `String.trimEnd()` over deprecated methods
- Use `Number.isNaN()` instead of global `isNaN()`
- Use `Array.isArray()` instead of `instanceof Array`

## Database & API Patterns

- Use Drizzle ORM with proper type safety
- Follow snake_case for database table and column names
- Use tRPC for type-safe API calls
- Always validate input data with Zod schemas
- Handle database errors gracefully with proper error responses

## Component Architecture

- Keep components focused and single-purpose
- Use proper TypeScript interfaces for props
- Implement proper loading and error states
- Follow shadcn/ui patterns for consistent styling
- Use TailwindCSS utility classes appropriately

## Performance Considerations

- Use React.memo() for expensive components when appropriate
- Implement proper code splitting with Next.js dynamic imports
- Optimize images with next/image component
- Use proper caching strategies with TanStack Query

## Common Commands

```bash
# Format and fix code automatically
npx ultracite format

# Check for issues without fixing
npx ultracite lint

# Run type checking
pnpm check-types

# Run linting
pnpm check
```

## Error Handling Example

```typescript
// ✅ Good: Comprehensive error handling
const fetchUserData = async (userId: string) => {
  try {
    const result = await api.user.getById.query({ id: userId });
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// ❌ Bad: Swallowing errors
const fetchUserData = async (userId: string) => {
  try {
    return await api.user.getById.query({ id: userId });
  } catch (e) {
    console.log(e);
  }
};
```

## Component Example

```typescript
// ✅ Good: Proper TypeScript component with accessibility
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onEdit: (userId: string) => void;
}

const UserCard = ({ user, onEdit }: UserCardProps) => {
  const handleEdit = () => {
    onEdit(user.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleEdit();
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <button
        type="button"
        onClick={handleEdit}
        onKeyDown={handleKeyDown}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Edit User
      </button>
    </div>
  );
};
```