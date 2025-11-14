# Vercel Deployment Guide (Monorepo)

## Project Settings in Vercel Dashboard

When deploying this server from a monorepo, configure these settings in your Vercel project:

### 1. Root Directory
Set the **Root Directory** to: `apps/server`

### 2. Build Settings
- **Framework Preset**: Other
- **Build Command**: `npm run build` (already configured in vercel.json)
- **Install Command**: `npm install` (already configured in vercel.json)
- **Output Directory**: Leave empty (handled by vercel.json)

### 3. Environment Variables
Add any required environment variables:
- `NODE_ENV=production`
- Any API keys or secrets your app needs

## What's Configured

✅ TypeScript with proper Node.js types (`@types/node`)
✅ Express with type-safe route handlers
✅ Serverless function entry point (`api/index.ts`)
✅ Build configuration for Vercel
✅ CORS enabled
✅ JSON body parsing

## Local Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Start server
npm start
```

## Deployment

1. Push your changes to Git
2. In Vercel Dashboard → Project Settings → General
3. Set Root Directory to `apps/server`
4. Deploy!

The build should now succeed without TypeScript errors.
