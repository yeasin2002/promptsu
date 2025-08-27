# Prompt Enhancer Extension

A browser extension that adds AI-powered prompt enhancement to ChatGPT's interface.

## 🚀 Features

- **Smart Button Injection**: Seamlessly integrates with ChatGPT's UI
- **Two Implementation Approaches**: Class-based (vanilla) and React-based
- **tRPC Integration**: Ready for server-side AI enhancement
- **Modular Architecture**: Clean separation of concerns
- **State Management**: Proper loading states and error handling

## 📁 Project Structure

```
src/
├── entrypoints/
│   └── prompt-enhancer/
│       ├── index.ts                    # Main vanilla JS content script
│       ├── react.tsx                   # React-based content script
│       ├── config.ts                   # Configuration and constants
│       ├── components/
│       │   └── EnhancerButton.tsx      # React button component
│       └── core/
│           ├── manager.ts              # Main orchestration logic
│           ├── dom-manager.ts          # DOM manipulation utilities
│           └── enhancement-service.ts  # Enhancement API logic
├── lib/
│   └── trpc-chrome-client.ts           # tRPC client configuration
└── assets/
    └── tailwind.css                    # Styling
```

## 🛠️ Installation

### Chrome/Edge
```bash
bun run build
```
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `dist/chrome-mv3` folder

### Firefox
```bash
bun run build:firefox
```
1. Open `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select `manifest.json` from `dist/firefox-mv2`

## 🎯 Usage

1. Go to [ChatGPT](https://chatgpt.com)
2. Type your prompt
3. Click the ⚡ enhancer button
4. Your prompt will be enhanced

## ⚙️ Configuration

Edit `src/entrypoints/prompt-enhancer/config.ts` to customize:

```typescript
export const PROMPT_ENHANCER_CONFIG = {
  selectors: {
    editor: "#prompt-textarea.ProseMirror",
    trailingArea: '[data-testid="composer-speech-button-container"]',
  },
  
  enhancement: {
    timeout: 5000,
    maxRetries: 2,
    fallbackMethod: "double", // 'double' | 'prefix' | 'suffix'
  },
  
  debug: {
    enabled: true,
    logEnhancements: true,
  },
};
```

## 🔧 Implementation Approaches

### 1. Class-Based (Default)
- **File**: `src/entrypoints/prompt-enhancer/index.ts`
- **Pros**: Lightweight, fast, modular architecture
- **Best for**: Performance-critical scenarios, clean separation of concerns

### 2. React-Based (Alternative)
- **File**: `src/entrypoints/prompt-enhancer/react.tsx`
- **Pros**: Component reusability, React ecosystem, shadow DOM isolation
- **Best for**: Complex UI interactions, multiple enhancement options

Both implementations share the same core services and configuration.

## 🌐 tRPC Integration

### Current Setup
```typescript
// src/lib/trpc-chrome-client.ts
export const trpc = createTRPCProxyClient<trpcAppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.VITE_SERVER_URL}/trpc`,
      // CORS and error handling configured
    }),
  ],
});
```

### Server Requirements
Your tRPC server should have an `enhancePrompts` mutation:

```typescript
// Expected server endpoint
enhancePrompts: publicProcedure
  .input(z.object({
    prompt: z.string(),
    options: z.object({
      style: z.enum(['creative', 'professional', 'casual']).optional(),
      length: z.enum(['short', 'medium', 'long']).optional(),
    }).optional(),
  }))
  .mutation(async ({ input }) => {
    return {
      enhancedPrompt: "Your enhanced prompt here",
      confidence: 0.95,
      suggestions: ["suggestion1", "suggestion2"],
    };
  });
```

### Environment Setup
```bash
# .env
VITE_SERVER_URL=http://localhost:3000
```

## 🎨 Customization

### Enhancement Logic
```typescript
// In EnhancementService class
async enhance(text: string): Promise<string> {
  if (this.isServerHealthy) {
    try {
      const result = await trpc.enhancePrompts.mutate({ 
        prompt: text,
        options: { style: 'creative' }
      });
      return result.data;
    } catch (error) {
      // Fallback to local enhancement
    }
  }
  
  // Local enhancement methods
  return enhancementMethods[PROMPT_ENHANCER_CONFIG.enhancement.fallbackMethod](text);
}
```

### Button Styling
Update the Tailwind classes in the config:

```typescript
ui: {
  buttonClasses: [
    "flex", "items-center", "justify-center",
    "w-9", "h-9", "ml-1",
    "rounded-full", "border", "border-white/10",
    "bg-transparent", "text-current",
    "transition-all", "duration-200",
    "hover:bg-white/10", "hover:opacity-80",
    "active:scale-95",
    "disabled:opacity-50", "disabled:cursor-not-allowed"
  ],
}
```

## 🐛 Debugging

Enable debug mode in config:
```typescript
debug: {
  enabled: true,
  logEnhancements: true,
}
```

Check browser console for:
- Button injection status
- Enhancement requests/responses
- tRPC connection health
- DOM change events

## 🔄 Development Workflow

```bash
# Development with hot reload
bun run dev

# Build for production
bun run build

# Type checking
bun run compile
```

## 📝 Next Steps

1. **Implement tRPC Server**: Create the `enhancePrompts` endpoint
2. **Add Enhancement Options**: Style, length, focus areas
3. **UI Improvements**: Loading animations, error states
4. **Advanced Features**: Prompt history, favorites, templates

## 🤝 Contributing

1. Choose your implementation approach (class-based or React)
2. Update the enhancement logic in `getEnhancedText()`
3. Test with both tRPC and fallback methods
4. Update configuration as needed