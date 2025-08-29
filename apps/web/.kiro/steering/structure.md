# Project Structure & Organization

## Root Structure
```
├── src/                    # Source code
├── .kiro/                  # Kiro configuration and steering
├── .next/                  # Next.js build output
├── .turbo/                 # Turbo cache
├── node_modules/           # Dependencies
├── package.json            # Package configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
├── postcss.config.mjs      # PostCSS configuration
└── .env / .env.example     # Environment variables
```

## Source Directory (`src/`)
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth route group
│   ├── prompts/           # Prompts feature pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── feature/           # Feature-specific components
│   ├── forms/             # Form components
│   ├── icons/             # Custom icons
│   ├── magicui/           # Magic UI components
│   └── shared/            # Shared/common components
├── data/                  # Static data and constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and configurations
└── assets/                # Static assets (images, etc.)
```

## Component Organization
- **Feature components**: Organized by feature in `components/feature/`
- **Shared components**: Common UI elements in `components/shared/`
- **Form components**: Reusable form elements in `components/forms/`
- **UI components**: Import from `@workspace/ui` (monorepo package)

## Import Conventions
- Use `@/` alias for src imports: `@/components`, `@/lib`, `@/hooks`
- Workspace packages: `@workspace/ui`, `@workspace/core`, etc.
- UI components: Import from `@workspace/ui/components`
- Utils: Import from `@workspace/ui/lib/utils`

## File Naming
- React components: PascalCase (e.g., `HomePage.tsx`)
- Utilities/hooks: kebab-case (e.g., `use-mobile.ts`)
- Data files: kebab-case with `.data.ts` suffix
- Pages: lowercase (Next.js App Router convention)

## Data Management
- Static data in `src/data/` with `.data.ts` suffix
- Export all data from `src/data/index.ts`
- Use TypeScript for type safety