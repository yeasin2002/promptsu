# @workspace/core

Shared core utilities, configurations, and services for the full-app monorepo.

## Features

- 🔧 **tRPC Configuration**: Pre-configured tRPC setup with middleware
- 🔐 **Better Auth Integration**: Auth client and server utilities
- 🛠️ **Common Utilities**: String, date, array, object, and async helpers
- 📡 **API Response Helpers**: Standardized response formats
- 🌍 **Environment Utilities**: Safe environment variable handling
- 📝 **TypeScript Types**: Comprehensive type definitions

## Installation

This package is automatically available in your workspace. Add it to your app's dependencies:

```json
{
  "dependencies": {
    "@workspace/core": "workspace:*"
  }
}
```

## Usage

### tRPC Configuration

```typescript
import { createTRPCRouter, createAuthMiddleware } from '@workspace/core/trpc';

// Create your tRPC router
const { router, procedure, middleware } = createTRPCRouter();

// Use auth middleware
const authMiddleware = createAuthMiddleware({ middleware });
const protectedProcedure = procedure.use(authMiddleware);

// Create your router
export const appRouter = router({
  hello: procedure
    .input(z.string())
    .query(({ input }) => `Hello ${input}!`),
    
  protected: protectedProcedure
    .query(({ ctx }) => `Hello ${ctx.user.email}!`),
});
```

### Better Auth Setup

```typescript
import { createAuth, createAuthContext } from '@workspace/core/auth';

// Server-side auth setup
export const auth = createAuth({
  // Your custom config
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
});

// Create auth context for tRPC
export const createContext = async ({ req, res }) => {
  const session = await auth.api.getSession({ headers: req.headers });
  return {
    ...createAuthContext(session),
    req,
    res,
  };
};
```

### Client-side Auth

```typescript
import { authClientConfig } from '@workspace/core/auth';
import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient(authClientConfig);

// Use in your components
const { data: session } = authClient.useSession();
```

### Utility Functions

```typescript
import { 
  stringUtils, 
  dateUtils, 
  arrayUtils, 
  apiResponse,
  env 
} from '@workspace/core/utils';

// String utilities
const slug = stringUtils.slugify('Hello World!'); // 'hello-world'
const id = stringUtils.generateId(12); // Random 12-char ID

// Date utilities
const formatted = dateUtils.formatDate(new Date()); // 'January 12, 2025'
const isToday = dateUtils.isToday(new Date()); // true

// Array utilities
const chunks = arrayUtils.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
const unique = arrayUtils.unique([1, 1, 2, 3, 3]); // [1, 2, 3]

// API responses
const success = apiResponse.success({ id: 1, name: 'John' });
const error = apiResponse.error('User not found', 'USER_NOT_FOUND');

// Environment variables
const dbUrl = env.require('DATABASE_URL'); // Throws if not set
const apiUrl = env.get('API_URL', 'http://localhost:3000'); // With default
```

### API Response Types

```typescript
import type { ApiResponse, ApiSuccessResponse } from '@workspace/core/utils';

// Use in your API handlers
const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    const user = await db.user.findById(id);
    return apiResponse.success(user);
  } catch (error) {
    return apiResponse.error('User not found');
  }
};
```

## Available Exports

### tRPC (`@workspace/core/trpc`)
- `createTRPCRouter()` - Initialize tRPC with base context
- `createAuthMiddleware()` - Authentication middleware
- `createAdminMiddleware()` - Admin-only middleware
- `paginationInput` - Common pagination schema
- `createPaginatedResponse()` - Helper for paginated data

### Auth (`@workspace/core/auth`)
- `createAuth()` - Better Auth instance creator
- `createAuthConfig()` - Base auth configuration
- `createAuthContext()` - Auth context for tRPC
- `authClientConfig` - Client configuration
- `authUtils` - Authentication helper functions

### Utils (`@workspace/core/utils`)
- `env` - Environment variable utilities
- `apiResponse` - API response helpers
- `stringUtils` - String manipulation functions
- `dateUtils` - Date formatting and manipulation
- `arrayUtils` - Array processing utilities
- `objectUtils` - Object manipulation helpers
- `asyncUtils` - Async operation utilities

## Development

```bash
# Build the package
pnpm run build

# Type check
pnpm run check-types

# Lint
pnpm run lint
```

## Examples

Check the `examples/` directory for complete usage examples:
- tRPC router setup
- Auth integration
- Utility function usage
- Type-safe API responses