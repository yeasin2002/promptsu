# Technology Stack & Build System

## Core Technologies

- **Package Manager**: pnpm with workspace catalogs
- **Build System**: Turborepo for monorepo management
- **TypeScript**: Strict null checks enabled across all apps
- **AI Integration**: Vercel AI SDK with Google AI provider

## Application Stack

### Browser Extension (`apps/extension/`)
- **Framework**: WXT (Web Extension Tools) with React 19
- **Styling**: TailwindCSS v4 with shadcn/ui components
- **State**: TanStack Query for server state
- **Build**: Vite-based bundling via WXT

### Backend API (`apps/server/`)
- **Framework**: Express.js with TypeScript
- **AI**: Vercel AI SDK (`ai` package) with `@ai-sdk/google`
- **Database**: MongoDB
- **Utilities**: Cheerio for scraping, Puppeteer for automation
- **Build**: tsdown for production builds

### Documentation (`apps/doc/`)
- **Framework**: Next.js 15 with Turbopack
- **Docs Engine**: Fumadocs (fumadocs-ui, fumadocs-mdx, fumadocs-core)
- **Styling**: TailwindCSS v4
- **Port**: 4000

## Shared Packages

- `@workspace/core` - Core utilities and Better Auth integration
- `@workspace/ui` - shadcn/ui components, kokonutui, magicui
- `@workspace/validation` - Zod validation schemas
- `@workspace/assets` - Shared fonts, icons, images
- `@workspace/tailwind-config` - Shared TailwindCSS configuration
- `@workspace/typescript-config` - Base TypeScript configuration

## Code Quality & Tooling

- **Linting**: Oxlint with TypeScript, Unicorn plugins
- **Formatting**: Ultracite (extends Biome) with 120 char line width
- **Git Hooks**: Husky with lint-staged for pre-commit formatting
- **Type Checking**: TypeScript with strict configuration

## Common Commands

### Development
```bash
pnpm dev              # Start server in development
pnpm dev:server       # Start server only
pnpm dev:doc          # Start documentation site (port 4000)
```

### Building & Type Checking
```bash
pnpm build            # Build all applications
pnpm check-types      # Type check across all apps
pnpm check            # Run oxlint across codebase
pnpm lint             # Format with ultracite
```

### Package Management
- Uses pnpm with workspace catalogs for version management
- Workspaces: `apps/*`, `packages/*`, `configs/*`
- Catalog versions defined in `pnpm-workspace.yaml`
