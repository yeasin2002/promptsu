# Technology Stack & Build System

## Core Technologies

- **Runtime**: Bun (package manager and runtime)
- **Build System**: Turborepo for monorepo management
- **TypeScript**: Strict null checks enabled across all apps
- **Database**: PostgreSQL with Drizzle ORM
- **API**: tRPC for end-to-end type safety
- **Authentication**: Better Auth

## Frontend Stack

### Web (Next.js)
- **Framework**: Next.js 15.3.0 with Turbopack
- **Styling**: TailwindCSS v4 with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Forms**: TanStack React Form
- **Icons**: Lucide React, Remix Icons
- **Animations**: Framer Motion
- **Theming**: next-themes for dark/light mode

### Mobile (React Native + Expo)
- **Framework**: Expo with React Native
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Navigation**: Expo Router

### Backend (Hono)
- **Framework**: Hono v4.8.2
- **Database**: Drizzle ORM with Neon PostgreSQL
- **WebSockets**: ws library for real-time features

## Code Quality & Tooling

- **Linting**: Oxlint with TypeScript, Unicorn, and custom rules
- **Formatting**: Ultracite (extends Biome)
- **Git Hooks**: Husky with lint-staged for pre-commit checks
- **Type Checking**: TypeScript with strict configuration

## Common Commands

### Development
```bash
bun dev              # Start all apps in development
bun dev:web          # Start web app only (port 3001)
bun dev:server       # Start server only (port 3000)
bun dev:native       # Start React Native/Expo dev server
```

### Building & Type Checking
```bash
bun build            # Build all applications
bun check-types      # Type check across all apps
bun check            # Run oxlint across codebase
```

### Database Operations
```bash
bun db:push          # Push schema changes to database
bun db:studio        # Open Drizzle Studio UI
bun db:generate      # Generate migrations
bun db:migrate       # Run migrations
```

### Package Management
- Uses Bun with isolated linker for dependency management
- Workspaces configured for `apps/*` and `packages/*`
- All apps share common devDependencies at root level