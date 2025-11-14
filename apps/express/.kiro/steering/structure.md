# Project Structure

## Directory Organization

```
├── app/                    # Main application code
│   ├── index.ts           # Entry point (starts server on port 3000)
│   ├── app.ts             # Express app configuration and middleware setup
│   ├── routes/            # API route handlers
│   │   ├── index.ts       # Main router that aggregates all routes
│   │   └── *.ts           # Individual route modules
│   └── utils/             # Utility functions and helpers
├── api/                   # Build output for Vercel deployment
├── public/                # Static files served at /static
├── logger.ts              # Pino logger configuration (root level)
├── .kiro/                 # Kiro AI assistant configuration
│   └── steering/          # AI steering rules and guidelines
└── [config files]         # Various configuration files
```

## Key Conventions

### Routing
- All API routes are prefixed with `/api`
- Routes are organized in `app/routes/` directory
- Main router in `app/routes/index.ts` aggregates all route modules
- Static files served from `/static` endpoint

### Application Setup
- Express app configured in `app/app.ts` (exported as named export)
- Server startup in `app/index.ts` (listens on port 3000)
- Middleware applied in order: CORS → body-parser → routes

### Code Style (Biome)
- **Indentation**: Tabs (width: 2)
- **Line Width**: 80 characters
- **Import Organization**: Enabled (auto-sorts imports)
- **Strict Rules**: Recommended rules enabled, explicit any warnings

### File Naming
- TypeScript files use `.ts` extension
- Test files use `.test.ts` suffix
- Route files use kebab-case naming

### Module System
- ESNext modules with bundler resolution
- Allows importing `.ts` extensions
- No emit during type checking (build handled by tsdown)

### Testing
- Tests colocated with source files (e.g., `app.test.ts` next to `app.ts`)
- Use Vitest for testing
- Supertest for HTTP endpoint testing
