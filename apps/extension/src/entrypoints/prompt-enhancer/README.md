# Prompt Enhancer

A browser extension feature that enhances prompts in ChatGPT interface.

## Structure

```
prompt-enhancer/
├── index.ts                    # Main vanilla JS content script
├── react.tsx                   # React-based content script
├── config.ts                   # Configuration and constants
├── components/
│   └── EnhancerButton.tsx      # React button component
└── core/
    ├── manager.ts              # Main orchestration logic
    ├── dom-manager.ts          # DOM manipulation utilities
    └── enhancement-service.ts  # Enhancement API logic
```

## Usage

### Vanilla JS Version
Use `index.ts` for a lightweight, class-based implementation.

### React Version  
Use `react.tsx` for a React-based implementation with shadow DOM isolation.

## Features

- Automatic button injection into ChatGPT interface
- tRPC integration with fallback methods
- DOM observation for dynamic content
- Proper cleanup and error handling
- Configurable enhancement methods
- Loading states and user feedback

## Configuration

All configuration is centralized in `config.ts`:
- UI settings (button styles, delays)
- ChatGPT selectors
- Enhancement options
- Debug settings