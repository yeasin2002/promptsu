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
│   ├── content.ts         # Content script
│   └── popup/             # Popup UI
│       ├── App.tsx        # Main popup component
│       ├── main.tsx       # Popup entry point
│       ├── index.html     # Popup HTML template
│       └── style.css      # Popup styles
└── assets/                # Static assets (images, etc.)
```

## Key Conventions

### File Naming
- **Entry points**: Located in `src/entrypoints/`
- **React components**: Use `.tsx` extension
- **TypeScript files**: Use `.ts` extension
- **Styles**: Use `.css` extension

### Entry Point Structure
- Each extension entry point (background, content, popup) has its own directory or file
- Popup follows React app structure with separate component files
- HTML templates are co-located with their respective entry points

### Asset Management
- Static assets go in `src/assets/`
- Public assets (like icons) go in `public/`
- Extension icons should be in `public/icon/`

### Build Output
- All built files output to `dist/`
- WXT handles manifest generation and file organization
- Separate builds for different browsers when needed