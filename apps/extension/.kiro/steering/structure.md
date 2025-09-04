# Project Structure

## Root Directory
```
├── src/                    # Source code
├── dist/                   # Build output (generated)
├── public/                 # Static assets
├── .wxt/                   # WXT framework files (generated)
├── node_modules/           # Dependencies
└── [config files]          # Various configuration files
```

## Source Organization (`src/`)
```
src/
├── entrypoints/           # Extension entry points
│   ├── background.ts      # Background script
│   ├── content.ts         # Main content script entry
│   ├── content/           # Content script architecture
│   │   ├── core/          # Core functionality (CLEAN & OPTIMIZED)
│   │   │   ├── dom-observer.ts          # DOM mutation observation
│   │   │   ├── enhancer-manager.ts      # Core state management
│   │   │   ├── enhancer-manager-facade.ts # Backward compatibility
│   │   │   ├── EnhancerManagerProvider.tsx # React context
│   │   │   ├── platform-validator.ts    # Platform validation
│   │   │   ├── react-renderer.ts        # React lifecycle
│   │   │   ├── types.ts                 # TypeScript definitions
│   │   │   ├── useEnhancerManager.ts    # React hooks
│   │   │   └── index.ts                 # Public API exports
│   │   └── docs/          # Comprehensive documentation
│   │       ├── ARCHITECTURE.md         # System architecture
│   │       ├── CORE_API.md             # API reference
│   │       ├── DEVELOPMENT_GUIDE.md    # Development workflow
│   │       ├── FILE_REFERENCE.md       # File descriptions
│   │       └── CONTRIBUTING.md         # Contribution guidelines
│   └── popup/             # Popup UI
│       ├── App.tsx        # Main popup component
│       ├── main.tsx       # Popup entry point
│       ├── index.html     # Popup HTML template
│       └── style.css      # Popup styles
├── components/            # Reusable React components
│   └── enhancers/         # Enhancement UI components
├── config/                # Configuration files
│   └── platforms/         # Platform-specific configurations
├── types/                 # Global TypeScript definitions
├── utils/                 # Utility functions
└── assets/                # Static assets (images, etc.)
```

## Key Conventions

### File Naming
- **Entry points**: Located in `src/entrypoints/`
- **React components**: Use `.tsx` extension
- **TypeScript files**: Use `.ts` extension
- **Styles**: Use `.css` extension
- **Documentation**: Use `.md` extension in `docs/` folders

### Content Script Architecture
- **Core modules**: Functional programming approach, no classes
- **Platform detection**: Automatic detection with configurable selectors
- **React integration**: Proper lifecycle management with error boundaries
- **State management**: Immutable patterns with React hooks
- **Error handling**: Graceful degradation, never break the extension

### Entry Point Structure
- Each extension entry point has its own directory or file
- Content script uses modular architecture in `src/entrypoints/content/`
- Popup follows React app structure with separate component files
- HTML templates are co-located with their respective entry points

### Asset Management
- Static assets go in `src/assets/`
- Public assets (like icons) go in `public/`
- Extension icons should be in `public/icon/`
- Platform configurations in `src/config/platforms/`

### Documentation Structure
- Each major module has its own `docs/` folder
- Comprehensive guides for development workflow
- API documentation with examples
- Architecture diagrams and explanations

### Build Output
- All built files output to `dist/`
- WXT handles manifest generation and file organization
- Separate builds for different browsers when needed
- Optimized bundle sizes with tree shaking