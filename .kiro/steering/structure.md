# Project Structure & Organization

## Monorepo Layout

```
full-app/
├── apps/                    # Application workspaces
│   ├── web/                # Next.js web application
│   ├── native/             # React Native + Expo mobile app
│   └── server/             # Hono backend API
│   └── extension/        # browser extension with wxt and react.js
├── packages/             # Application workspaces
│   └── core/               # core library
│   └── ui/                  # all shadcn component
│   └── validation/       # zod validation schema
│   └── tsconfig/          # Base TypeScript config that works with all apps
│   └── config//           # Shared configs (tailwind, postcss, vitest/jest, etc.)
├── .kiro/                   # Kiro AI assistant configuration
├── .husky/                # G  it hooks configuration
└── [config files]         # Root-level configuration
```

## Application Structure

### Web App (`apps/web/`)

- **Port**: 3001
- **Framework**: Next.js with App Router
- **Key Files**:
  - `src/` - Application source code
  - `components.json` - shadcn/ui configuration
  - `next.config.ts` - Next.js configuration
  - `tailwind.config.js` - TailwindCSS configuration

### Mobile App (`apps/native/`)

- **Framework**: Expo with React Native
- **Key Directories**:
  - `app/` - Expo Router file-based routing
  - `components/` - Reusable React Native components
  - `assets/` - Images, fonts, and other static assets
  - `lib/` - Shared utilities and configurations
- **Key Files**:
  - `app.json` - Expo configuration
  - `tailwind.config.js` - NativeWind configuration
  - `metro.config.js` - Metro bundler configuration

### Server App (`apps/server/`)

- **Port**: 3000
- **Framework**: Hono with tRPC
- **Key Directories**:
  - `src/` - Server source code
- **Key Files**:
  - `drizzle.config.ts` - Database configuration
  - Environment files (`.env`, `.env.example`)

### Extension App (`apps/extension/`)

- **Framework**: WXT with react.js - typescript
- **Key Directories**:
  - `src/` - Server source code
- **Key Files**:
  - `entrypoints` - extension entry files
  - `wxt.config.ts` - wxt config file

## Configuration Files

### Root Level

- `package.json` - Workspace configuration and scripts
- `turbo.json` - Turborepo build pipeline configuration
- `tsconfig.json` - Base TypeScript configuration
- `biome.json` - Code formatting configuration (extends ultracite)
- `.oxlintrc.json` - Linting rules and configuration
- `bunfig.toml` - Bun runtime configuration

### Environment Setup

- Each app has its own `.env` and `.env.example` files
- Database connection configured in `apps/server/.env`
- Shared environment variables can be referenced across apps

## Naming Conventions

- **Files**: kebab-case for configuration, camelCase for TypeScript
- **Components**: PascalCase for React components
- **Directories**: lowercase with hyphens where needed
- **Database**: snake_case for table and column names (Drizzle convention)

## Import Patterns

- Relative imports within the same app
- Absolute imports from app root using TypeScript path mapping
- Shared types and utilities through tRPC for cross-app communication
- UI components from shadcn/ui and custom component libraries
