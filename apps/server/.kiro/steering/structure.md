# Project Structure

## Root Level

- **Configuration Files**: `package.json`, `tsconfig.json`, `drizzle.config.ts`
- **Environment**: `.env`, `.env.example` for environment variables
- **Build Output**: `dist/` for compiled JavaScript, `node_modules/` for dependencies

## Source Organization (`src/`)

### Core Application (`src/`)
- `index.ts`: Main application entry point with Hono server setup, middleware, and route mounting

### API Layer (`src/routers/`)
- `index.ts`: tRPC router definitions with all API endpoints
- Export `trpcAppRouter` type for client-side type safety

### Database Layer (`src/db/`)
- `index.ts`: Database connection setup using Neon and Drizzle
- `schema/`: Drizzle schema definitions (folder structure)
- `migrations/`: Generated database migrations

### Utilities (`src/lib/`)
- `auth.ts`: Better Auth configuration and setup
- `context.ts`: tRPC context creation for request handling
- `trpc.ts`: tRPC instance initialization, procedures (public/protected)

## Architectural Patterns

### API Design
- Use tRPC for type-safe API endpoints
- Separate public and protected procedures
- Export router types for client consumption

### Database Access
- Centralized database connection in `src/db/index.ts`
- Schema-first approach with Drizzle ORM
- Migration-based schema changes

### Authentication Flow
- Better Auth handles authentication logic
- tRPC middleware enforces protection on routes
- Context provides session information to procedures

### File Naming
- Use kebab-case for configuration files
- Use camelCase for TypeScript files
- Keep router exports consistent: `export const [name]Router`