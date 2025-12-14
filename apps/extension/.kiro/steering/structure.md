# Project Structure

## Directory Layout

```
apps/extension/
├── src/
│   ├── app/                    # WXT entry points
│   │   ├── background.ts       # Background script
│   │   ├── content/            # Content scripts
│   │   └── popup/              # Popup UI
│   ├── assets/                 # Static assets (CSS, images)
│   │   └── tailwind.css        # TailwindCSS entry
│   ├── components/             # React components
│   │   ├── cards/              # Card components
│   │   └── ui/                 # UI components
│   ├── config/                 # Configuration
│   │   └── platforms.ts        # Platform selectors
│   ├── data/                   # Static data
│   │   └── prompt-list.ts      # Prompt collection
│   ├── lib/                    # Utilities
│   │   ├── cn.ts               # className utility
│   │   └── utils/              # Helper functions
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts            # Type exports
│   └── utils/                  # Extension utilities
│       └── storage.ts          # Browser storage helpers
├── public/                     # Static public assets
├── dist/                       # Build output (generated)
├── .wxt/                       # WXT cache (generated)
├── wxt.config.ts               # WXT configuration
├── tsconfig.json               # TypeScript config
├── biome.json                  # Biome config
├── components.json             # shadcn/ui config
└── package.json                # Dependencies
```

## Entry Points (`src/app/`)

WXT uses `entrypointsDir: "app"` configuration:

- **background.ts**: Extension background script
- **content/**: Content scripts injected into web pages
- **popup/**: Extension popup UI (React app)

## Key Conventions

### File Naming
- **React components**: PascalCase `.tsx` (e.g., `PromptCard.tsx`)
- **Utilities**: kebab-case `.ts` (e.g., `storage.ts`)
- **Types**: `index.ts` in `types/` folder
- **Config**: descriptive names (e.g., `platforms.ts`)

### Import Patterns
```typescript
// Workspace packages
import { Button } from "@workspace/ui/shadcn/button";
import { someSchema } from "@workspace/validation/common";

// Local imports
import { cn } from "@/lib/cn";
import { PLATFORMS } from "@/config/platforms";
```

### Component Organization
- Shared UI components in `src/components/ui/`
- Feature-specific components in `src/components/[feature]/`
- Use workspace UI package for shadcn components when possible

### Asset Management
- TailwindCSS entry in `src/assets/tailwind.css`
- Static images in `src/assets/` or `public/`
- Extension icons in `public/`
