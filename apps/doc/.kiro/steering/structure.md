# Project Structure

## Root Level
- `package.json` - Dependencies and scripts
- `next.config.mjs` - Next.js configuration with Fumadocs MDX
- `tsconfig.json` - TypeScript configuration with path aliases
- `source.config.ts` - Fumadocs MDX configuration and schemas
- `postcss.config.mjs` - PostCSS configuration for Tailwind

## Generated Content
- `.source/` - Auto-generated content index and configuration
  - `index.ts` - Generated content exports
  - `source.config.mjs` - Compiled configuration

## Source Code (`src/`)
```
src/
├── app/                    # Next.js App Router
│   ├── (home)/            # Route group for landing pages
│   ├── docs/              # Documentation layout and pages
│   ├── api/               # API routes (search functionality)
│   ├── layout.tsx         # Root layout with RootProvider
│   └── global.css         # Global styles
├── lib/                   # Shared utilities
│   ├── source.ts          # Content source adapter
│   └── layout.shared.tsx  # Shared layout configurations
└── mdx-components.tsx     # MDX component definitions
```

## Content (`content/`)
- `docs/` - Documentation content in MDX format
- Organized by topic/section with `meta.json` files for navigation

## Conventions

### File Naming
- Use kebab-case for directories and files
- TypeScript files: `.ts`, `.tsx`
- Configuration files: `.mjs` for ES modules
- Content files: `.mdx` for documentation

### Import Patterns
- Use path aliases: `@/*` for src files, `@/.source` for generated content
- Import Fumadocs components from `fumadocs-ui/*`
- Import utilities from `fumadocs-core/*`

### Layout Structure
- Root layout provides RootProvider wrapper
- Shared layout options in `lib/layout.shared.tsx`
- Route groups for organizing different page types

### Content Organization
- Documentation content in `content/docs/`
- Use frontmatter for metadata
- `meta.json` files for navigation structure
- MDX components for enhanced content