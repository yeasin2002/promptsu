# Technology Stack

## Core Technologies
- **WXT Framework**: Modern browser extension development framework
- **React 19**: UI library for building components with latest features
- **TypeScript**: Type-safe JavaScript development with strict configuration
- **Biome**: Code formatting and linting for consistent code quality

## Architecture Patterns
- **Functional Programming**: No classes, pure functions only
- **Immutable State**: React hooks with immutable patterns
- **Error Boundaries**: Graceful error handling throughout
- **Performance Optimization**: Throttled observers, memory management
- **Modular Design**: Clean separation of concerns

## Build System
- **Package Manager**: Uses Bun (bun.lock present) for fast installs
- **Module Bundler**: WXT handles bundling and build process
- **Tree Shaking**: Optimized bundle sizes with unused code elimination
- **Output Directory**: `dist/`
- **Source Directory**: `src/`

## Development Workflow

### Daily Development Commands
```bash
# Start development server (Chrome)
bun run dev

# Start development server (Firefox)
bun run dev:firefox

# TypeScript compilation check
bun run compile

# Format and lint code
bun run format
bun run lint
```

### Production Build Commands
```bash
# Build for production (Chrome)
bun run build

# Build for Firefox
bun run build:firefox

# Create distribution packages
bun run zip
bun run zip:firefox
```

### Quality Assurance
```bash
# Type checking (must pass before commits)
bun run compile

# Code formatting (auto-fix)
bun run format

# Linting (catch issues early)
bun run lint
```

### Setup & Maintenance
```bash
# Initial setup (runs automatically after install)
bun run postinstall

# Clean build artifacts
rm -rf dist/ .wxt/

# Reinstall dependencies
rm -rf node_modules/ && bun install
```

## Configuration Files
- `wxt.config.ts`: WXT framework configuration
- `tsconfig.json`: TypeScript configuration (extends WXT's base config)
- `biome.json`: Code formatting and linting rules
- `package.json`: Dependencies and scripts
- `.gitignore`: Version control exclusions

## Code Quality Standards
- **Zero TypeScript Errors**: All code must compile without errors
- **Functional Approach**: No classes, use pure functions and hooks
- **Error Handling**: All async operations must have try/catch blocks
- **Performance**: Use throttling, cleanup resources, avoid memory leaks
- **Documentation**: All public APIs must be documented with JSDoc
- **Testing**: Manual testing required on all supported platforms

## Platform Support Matrix
| Platform | Chrome | Firefox | Edge | Safari |
|----------|--------|---------|------|--------|
| ChatGPT  | ✅     | ✅      | ✅   | 🚧     |
| Claude   | ✅     | ✅      | ✅   | 🚧     |
| Custom   | ✅     | ✅      | ✅   | 🚧     |

## Performance Targets
- **Bundle Size**: < 500KB total
- **Memory Usage**: < 50MB peak
- **Initialization**: < 100ms on modern hardware
- **DOM Observer**: < 10ms callback execution
- **React Render**: < 16ms for 60fps UI