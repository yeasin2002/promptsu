# Tech Stack

## Runtime & Build System

- **Runtime**: Bun (preferred) or Node.js
- **Build Tool**: tsdown (for production builds)
- **Dev Tool**: tsx (for development with hot reload)
- **TypeScript**: v5.9.3 with strict mode enabled

## Core Dependencies

- **Framework**: Express.js v5.1.0
- **AI SDK**: @ai-sdk/google, ai (Vercel AI SDK)
- **Validation**: Zod v4.1.12
- **Logging**: Pino v9.14.0
- **Security**: Helmet v8.1.0, CORS v2.8.5
- **Response Format**: json with express

## Development Tools

- **Linter/Formatter**: Biome v1.9.4 (replaces ESLint + Prettier)
- **Testing**: Vitest v3.2.4 with coverage support
- **Pre-commit**: pre-commit hooks configured

## Common Commands

### Development

```bash
bun run dev          # Start dev server with hot reload on port 3000
bun run start        # Start server without hot reload
```

### Testing

```bash
bun run test         # Run tests in watch mode
bun run test:ui      # Run tests with UI
bun run test:coverage # Run tests with coverage report
```

### Code Quality

```bash
bun run check        # Run Biome check and auto-fix issues
bun run format       # Format code with Biome
bun run lint         # Lint code with Biome
bun run typecheck    # Type check without emitting files
```

### Build & Deploy

```bash
bun run build        # Build for Vercel (outputs to api/ folder)
bun run build:normal # Build for normal deployment (cjs + esm)
```

## Deployment

- **Platform**: Vercel (serverless functions)
- **Build Output**: `api/` directory (configured in vercel.json)
- **Environment**: Set NODE_ENV=production and DEPLOYMENT_ENV=vercel for builds
