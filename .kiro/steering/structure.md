# Project Structure & Organization

## Monorepo Layout

```
promptsu-ai/
├── apps/
│   ├── extension/       # WXT browser extension (Chrome/Firefox)
│   ├── server/          # Express.js backend API
│   └── doc/             # Fumadocs documentation site
├── packages/
│   ├── core/            # Core utilities, auth integration
│   ├── ui/              # shadcn/ui + custom components
│   ├── validation/      # Zod validation schemas
│   └── assets/          # Shared fonts, icons, images
├── configs/
│   ├── tailwindcss/     # Shared TailwindCSS config
│   └── typescript/      # Base TypeScript config
├── .kiro/               # Kiro AI assistant configuration
├── .husky/              # Git hooks configuration
└── [config files]       # Root-level configuration
```

## Application Structure

### Extension App (`apps/extension/`)

- **Framework**: WXT with React 19
- **Key Directories**:
  - `src/app/` - Entry points (popup, content scripts, background)
  - `src/components/` - React components (cards, ui)
  - `src/config/` - Platform configurations
  - `src/data/` - Static data (prompt lists)
  - `src/lib/` - Utilities
  - `src/types/` - TypeScript types
  - `public/` - Static assets
- **Key Files**:
  - `wxt.config.ts` - WXT configuration
  - `components.json` - shadcn/ui configuration

### Server App (`apps/server/`)

- **Framework**: Express.js with TypeScript
- **Key Directories**:
  - `app/routes/` - API route handlers
  - `app/utils/` - Utility functions and prompts
- **Key Files**:
  - `app/server.ts` - Main server entry
  - `tsdown.config.ts` - Build configuration
  - `vercel.json` - Vercel deployment config

### Documentation (`apps/doc/`)

- **Framework**: Next.js 15 with Fumadocs
- **Port**: 4000
- **Key Directories**:
  - `content/` - MDX documentation content
  - `src/` - Next.js app source
  - `.source/` - Generated Fumadocs files
- **Key Files**:
  - `source.config.ts` - Fumadocs source configuration
  - `next.config.mjs` - Next.js configuration

## Shared Packages

### `@workspace/ui`
- Exports: `./shadcn/*`, `./kokonutui/*`, `./magicui/*`, `./workspace-ui/*`
- Contains: shadcn components, hooks, lib utilities

### `@workspace/core`
- Exports: `.`, `./auth`, `./utils`
- Contains: Better Auth integration, shared utilities

### `@workspace/validation`
- Exports: `./auth`, `./user`, `./common`
- Contains: Zod schemas for validation

## Root Configuration Files

- `package.json` - Workspace scripts and root dependencies
- `turbo.json` - Turborepo pipeline configuration
- `pnpm-workspace.yaml` - Workspace packages and version catalogs
- `biome.json` - Code formatting (extends ultracite)
- `.oxlintrc.json` - Linting rules
- `tsconfig.json` - Base TypeScript configuration

## Version Management

- `.changeset/config.json` - Changesets configuration
- `.changeset/README.md` - Changeset workflow documentation
- `.github/workflows/release.yml` - GitHub Actions release workflow
- `apps/extension/RELEASE_NOTES.md` - Release notes for extension (triggers release)
- `apps/extension/package.json` - Extension version source

## Naming Conventions

- **Files**: kebab-case for configs, camelCase for TypeScript
- **Components**: PascalCase for React components
- **Directories**: lowercase with hyphens
- **Packages**: `@workspace/` prefix for internal packages

## Import Patterns

- Use workspace package imports: `@workspace/ui/shadcn/button`
- Relative imports within same app
- Path aliases configured per app
