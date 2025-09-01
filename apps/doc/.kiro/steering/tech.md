# Technology Stack

## Core Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5.9** - Type safety throughout the codebase
- **Fumadocs** - Documentation framework (UI, Core, MDX)

## Styling & UI
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Inter Font** - Typography via next/font/google

## Content & MDX
- **Fumadocs MDX 11.8** - Enhanced MDX processing
- **MDX Components** - Custom component system
- **Frontmatter Schema** - Structured metadata validation

## Development Tools
- **Turbo** - Fast development builds
- **TypeScript Strict Mode** - Enhanced type checking
- **ESNext Target** - Modern JavaScript features

## Common Commands

### Development
```bash
npm run dev          # Start dev server on port 4000 with Turbo
npm run build        # Production build
npm run start        # Start production server
```

### Post-Install
```bash
npm run postinstall  # Runs fumadocs-mdx processing
```

## Path Aliases
- `@/.source` → `./.source/index.ts` (generated content)
- `@/*` → `./src/*` (source files)

## Build Configuration
- React Strict Mode enabled
- MDX processing via Fumadocs
- Incremental TypeScript compilation
- Module resolution: bundler