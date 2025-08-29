# Tech Stack & Build System

## Core Technologies
- **Framework**: Next.js 15.5+ with App Router
- **Runtime**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives
- **Icons**: Lucide React + Remix Icons
- **Animations**: Framer Motion
- **State Management**: TanStack Query + tRPC
- **Forms**: React Hook Form + TanStack Form with Zod validation
- **Authentication**: Better Auth
- **Themes**: next-themes for dark/light mode

## Monorepo Structure
This is part of a workspace monorepo with shared packages:
- `@workspace/ui` - Shared UI components
- `@workspace/core` - Core utilities
- `@workspace/validation` - Zod schemas
- `@workspace/tailwind-config` - Tailwind configuration
- `@workspace/typescript-config` - TypeScript configuration
- `@workspace/assets` - Shared assets

## Build & Development Commands

```bash
# Development (with Turbopack on port 3001)
npm run dev

# Production build
npm run build

# Start production server (port 3001)
npm run start

# Linting
npm run lint
```

## Key Configurations
- **Port**: Development and production run on port 3001
- **Turbopack**: Enabled for faster development builds
- **Path Aliases**: `@/*` maps to `./src/*`
- **Image Domains**: Configured for images.unsplash.com and raw.githubusercontent.com