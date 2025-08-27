# Technology Stack

## Runtime & Build System

- **Runtime**: Bun (JavaScript/TypeScript runtime)
- **Build Tool**: tsdown for TypeScript compilation
- **Package Manager**: Bun with workspace support
- **Module System**: ESNext modules with bundler resolution

## Core Framework & Libraries

- **Web Framework**: Hono (lightweight web framework)
- **API Layer**: tRPC for type-safe APIs
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM with migrations
- **Authentication**: Better Auth with Expo plugin
- **AI Integration**: Vercel AI SDK with Google Vertex AI (Gemini)
- **Validation**: Zod for schema validation

## Development Tools

- **TypeScript**: Strict typing with composite project setup
- **Path Mapping**: `@/*` maps to `./src/*`
- **JSX**: Configured for Hono JSX

## Common Commands

### Development
```bash
bun run dev          # Start development server with hot reload
bun run build        # Build for production
bun run start        # Start production server
bun run check-types  # Type checking
bun run compile      # Create standalone executable
```

### Database Operations
```bash
bun run db:push      # Push schema changes to database
bun run db:studio    # Open Drizzle Studio
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
```

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Authentication secret
- `BETTER_AUTH_URL`: Base URL for auth
- `CORS_ORIGIN`: Allowed CORS origin