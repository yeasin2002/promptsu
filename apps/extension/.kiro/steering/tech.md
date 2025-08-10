# Technology Stack

## Core Technologies
- **WXT Framework**: Modern browser extension development framework
- **React 19**: UI library for building components
- **TypeScript**: Type-safe JavaScript development
- **Biome**: Code formatting and linting

## Build System
- **Package Manager**: Uses Bun (bun.lock present)
- **Module Bundler**: WXT handles bundling and build process
- **Output Directory**: `dist/`
- **Source Directory**: `src/`

## Common Commands

### Development
```bash
# Start development server (Chrome)
bun run dev

# Start development server (Firefox)
bun run dev:firefox
```

### Building
```bash
# Build for production (Chrome)
bun run build

# Build for Firefox
bun run build:firefox

# Create distribution zip
bun run zip
bun run zip:firefox
```

### Type Checking
```bash
# Run TypeScript compiler check
bun run compile
```

### Setup
```bash
# Prepare WXT environment (runs automatically after install)
bun run postinstall
```

## Configuration Files
- `wxt.config.ts`: WXT framework configuration
- `tsconfig.json`: TypeScript configuration (extends WXT's base config)
- `biome.json`: Code formatting and linting rules