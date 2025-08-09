# Project Structure

## Root Directory
```
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Build output (generated)
├── .wxt/                   # WXT generated files
├── node_modules/           # Dependencies
├── wxt.config.ts          # WXT configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
```

## Source Directory (`src/`)
```
src/
├── entrypoints/           # Extension entry points
│   ├── background.ts      # Background script
│   ├── content.ts         # Content script
│   └── popup/             # Popup interface
│       ├── main.tsx       # Popup entry point
│       ├── App.tsx        # Main popup component
│       ├── App.css        # Popup styles
│       ├── style.css      # Global popup styles
│       └── index.html     # Popup HTML template
└── assets/                # Static assets (images, etc.)
    └── react.svg          # React logo
```

## Key Conventions

### Entrypoints
- **Background scripts**: Place in `src/entrypoints/background.ts`
- **Content scripts**: Place in `src/entrypoints/content.ts`
- **Popup/Options pages**: Create folders under `src/entrypoints/` with `main.tsx` entry point
- Each entrypoint should export a default function using WXT's `define*` helpers

### React Components
- Use `.tsx` extension for React components
- Place component-specific CSS files alongside components
- Import assets using `@/assets/` alias for src/assets
- Import public assets using `/` prefix

### File Naming
- Use PascalCase for React components (`App.tsx`)
- Use camelCase for utility files and scripts
- Use kebab-case for CSS files when needed

### Import Patterns
- Use `@/` alias for src directory imports
- Use `/` prefix for public directory assets
- Prefer named exports for utilities, default exports for components