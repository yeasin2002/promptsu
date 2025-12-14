# Technology Stack

## Core Technologies

- **WXT Framework**: Modern browser extension development framework
- **React 19**: UI library with latest features
- **TypeScript**: Type-safe development with strict configuration
- **TailwindCSS v4**: Utility-first styling via @tailwindcss/vite
- **TanStack Query**: Server state management for API calls

## UI Components

- **shadcn/ui**: Radix-based component library
- **Lucide React**: Icon library
- **Sonner**: Toast notifications
- **class-variance-authority**: Component variant management

## Shared Packages

- `@workspace/ui` - Shared shadcn components
- `@workspace/core` - Core utilities
- `@workspace/validation` - Zod validation schemas
- `@workspace/tailwind-config` - Shared TailwindCSS config

## Build System

- **Package Manager**: pnpm (workspace member)
- **Bundler**: Vite via WXT
- **Output Directory**: `dist/`
- **Source Directory**: `src/`
- **Entry Points Directory**: `src/app/`

## Development Commands

```bash
# Development (Chrome)
pnpm dev

# Development (Firefox)
pnpm dev:firefox

# TypeScript check
pnpm compile

# Production build
pnpm build
pnpm build:firefox

# Package for distribution
pnpm zip
pnpm zip:firefox
```

## Configuration Files

- `wxt.config.ts` - WXT framework configuration
- `tsconfig.json` - TypeScript configuration
- `biome.json` - Code formatting (extends root)
- `components.json` - shadcn/ui configuration

## Code Quality

- **Formatting**: Ultracite (Biome) - 120 char line width
- **Linting**: Oxlint via root workspace
- **Type Checking**: TypeScript strict mode

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome  | ✅ Supported |
| Firefox | ✅ Supported |
| Edge    | ✅ (Chromium-based) |

## Platform Support

| Platform | Status |
|----------|--------|
| ChatGPT  | ✅ Supported |
| Claude   | ✅ Supported |
| Others   | 🚧 Configurable |
