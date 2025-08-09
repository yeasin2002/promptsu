# Technology Stack

## Build System & Framework
- **WXT**: Modern browser extension framework for development and building
- **React 19**: UI library for building extension interfaces
- **TypeScript**: Type-safe JavaScript development
- **Bun**: Package manager and runtime (based on bun.lock presence)

## Key Dependencies
- `@wxt-dev/module-react`: WXT module for React integration
- `react` & `react-dom`: Core React libraries
- TypeScript types for React development

## Common Commands

### Development
```bash
# Start development server with hot reload
npm run dev

# Start development for Firefox specifically
npm run dev:firefox
```

### Building
```bash
# Build extension for production
npm run build

# Build for Firefox specifically
npm run build:firefox

# Type checking without emitting files
npm run compile
```

### Packaging
```bash
# Create distributable zip file
npm run zip

# Create Firefox-specific zip
npm run zip:firefox
```

### Setup
```bash
# Prepare WXT environment (runs automatically after install)
npm run postinstall
```

## Configuration
- **wxt.config.ts**: Main WXT configuration
- **tsconfig.json**: TypeScript configuration extending WXT defaults
- Output directory: `dist/`
- Source directory: `src/`