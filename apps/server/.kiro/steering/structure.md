# Project Structure

```
├── app/
│   ├── server.ts           # Express app entry point, route registration
│   ├── routes/             # API route handlers (service functions)
│   │   ├── prompt-enhancer.ts
│   │   └── test-api-api.ts
│   └── utils/              # Shared utilities
│       ├── env.ts          # Environment variable exports
│       └── prompt-enhancer-system-prompt.ts
├── dist/                   # Build output (tsdown)
├── .env                    # Environment variables
├── package.json
├── tsdown.config.ts        # Build configuration
└── vercel.json             # Vercel deployment config
```

## Conventions

### Route Files (`app/routes/`)

- Export a service function (e.g., `promptEnhancerService`)
- Define Zod schemas for input/output validation
- Export inferred TypeScript types from schemas
- Return `{ error: string | null, data: T | null }` pattern

### Server Registration (`app/server.ts`)

- Import service functions from routes
- Register endpoints with `app.post()` or `app.get()`
- Handle error/data response pattern consistently

### Imports

- Use `.js` extension in imports (ES Module resolution)
- Example: `import { foo } from './utils/env.js'`
