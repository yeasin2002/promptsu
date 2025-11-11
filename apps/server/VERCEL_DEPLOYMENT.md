# Vercel Deployment Guide

## Changes Made

1. **Created `api/index.ts`**: Vercel serverless function entry point using Hono's Vercel adapter
2. **Updated `vercel.json`**: Simplified configuration for Vercel deployment
3. **Removed Bun-specific code**: Removed `serveStatic` from `hono/bun` (not compatible with Vercel)
4. **Created `tsdown.config.ts`**: Build configuration for bundling
5. **Created `.vercelignore`**: Excludes unnecessary files from deployment

## Deployment Steps

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel dashboard
3. Vercel will auto-detect the configuration

## Environment Variables

Make sure to set these in Vercel dashboard:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `CORS_ORIGIN`

## Testing Locally

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally with Vercel dev server
vercel dev
```

## Important Notes

- The `/openapi.json` endpoint was removed because `serveStatic` from `hono/bun` doesn't work on Vercel
- If you need to serve static files, use Vercel's public directory or add them as routes in `vercel.json`
- All API routes are now under `/api/*` path
- The root `/` route still works and returns "Hello World"

## Troubleshooting

If you still get 404 errors:

1. Check that `api/index.ts` exists
2. Verify environment variables are set in Vercel
3. Check build logs in Vercel dashboard
4. Make sure `hono` package is installed (it includes the Vercel adapter)
