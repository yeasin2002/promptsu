# @workspace/validation

Shared validation schemas and utilities using Zod for the full-app monorepo.

## Features

- 🔒 Type-safe validation schemas
- 🔄 Reusable across all apps (web, native, extension, server)
- 🛠️ Utility functions for common validation patterns
- 📝 TypeScript types automatically generated from schemas

## Installation

This package is automatically available in your workspace. Add it to your app's dependencies:

```json
{
  "dependencies": {
    "@workspace/validation": "workspace:*"
  }
}
```

## Usage

### Basic Schema Usage

```typescript
import { loginSchema, type LoginInput } from '@workspace/validation';

// Validate data
const result = loginSchema.safeParse({
  email: 'user@example.com',
  password: 'password123'
});

if (result.success) {
  console.log('Valid data:', result.data);
} else {
  console.log('Validation errors:', result.error);
}
```

### Using Utility Functions

```typescript
import { createSafeParser, validateOrThrow } from '@workspace/validation';
import { userSchema } from '@workspace/validation';

// Create a safe parser
const parseUser = createSafeParser(userSchema);
const result = parseUser(userData);

// Or validate and throw on error
try {
  const validUser = validateOrThrow(userSchema, userData);
  // Use validUser...
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

### Available Schemas

#### Authentication
- `loginSchema` - Email and password login
- `registerSchema` - User registration with password confirmation
- `forgotPasswordSchema` - Forgot password request
- `resetPasswordSchema` - Password reset with token
- `changePasswordSchema` - Change password with current password

#### User Management
- `userSchema` - Complete user object
- `createUserSchema` - User creation input
- `updateUserSchema` - User update input (partial)
- `userProfileSchema` - User profile update

#### Common
- `emailSchema` - Email validation
- `passwordSchema` - Strong password requirements
- `idSchema` - UUID validation
- `paginationSchema` - Pagination parameters
- `successResponseSchema` - Success API response
- `errorResponseSchema` - Error API response

## Adding New Schemas

1. Create a new file in `src/schemas/` (e.g., `product.ts`)
2. Export your schemas and types
3. Add the export to `src/index.ts`
4. Run `pnpm run build` to compile

Example:

```typescript
// src/schemas/product.ts
import { z } from 'zod';
import { idSchema, timestampSchema } from './common';

export const productSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  description: z.string().optional(),
}).merge(timestampSchema);

export type Product = z.infer<typeof productSchema>;
```

## Development

```bash
# Build the package
pnpm run build

# Type check
pnpm run check-types

# Lint
pnpm run lint
```