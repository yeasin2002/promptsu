# Vercel Deployment Fix

## What Was Wrong

1. **`api/index.ts` was importing from source**: It was importing `../src/index` which doesn't exist in production
2. **`.vercelignore` was excluding `dist/`**: The built files weren't being deployed

## What Was Fixed

### 1. Changed `api/index.ts` to `api/index.js`
```javascript
import { handle } from 'hono/vercel';
import app from '../dist/index.js';  // ✅ Now imports from built files

export default handle(app);
```

### 2. Updated `.vercelignore`
Removed `dist` from the ignore list so the built files are included in deployment:
```
node_modules
.turbo
.env
.env.local
```

## How It Works Now

1. **Build Phase** (on Vercel):
   - Vercel runs `bun install`
   - Vercel runs `bun run build`
   - Creates `dist/index.js` with your bundled app

2. **Runtime Phase**:
   - `api/index.js` imports from `dist/index.js`
   - Wraps it with Vercel's handler
   - Serves all routes through the serverless function

## Deploy Now

```bash
# Deploy to preview
vercel

# Or deploy to production
vercel --prod
```

## Verify Deployment

After deployment, test these endpoints:

- `https://your-app.vercel.app/` - Should return `{"message":"Hello World"}`
- `https://your-app.vercel.app/docs` - API documentation
- `https://your-app.vercel.app/api/openapi.json` - OpenAPI spec
- `https://your-app.vercel.app/api/prompt-enhancer` - POST endpoint
- `https://your-app.vercel.app/api/test-api` - POST endpoint

## Local Development

Continue using:
```bash
bun run dev
```

This runs your app locally on http://localhost:3000 with hot reload.

## What's Different

- **Local dev**: Uses `src/index.ts` directly (TypeScript with hot reload)
- **Production**: Uses `dist/index.js` (compiled JavaScript bundle)
- **Entry point**: `api/index.js` (JavaScript file that imports the built bundle)

This is the standard pattern for deploying bundled apps to Vercel!
