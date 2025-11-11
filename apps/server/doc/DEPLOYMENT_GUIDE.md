# Complete Vercel Deployment Guide

## Quick Summary

Your Hono app is configured for Vercel deployment. The issue you're experiencing with `vercel dev` is a known limitation - use `bun run dev` for local development instead.

## Local Development

```bash
# Start development server (recommended)
bun run dev

# Server runs on http://localhost:3000
# Hot reload enabled
```

Test your endpoints:

- http://localhost:3000 - Hello World
- http://localhost:3000/docs - API Documentation
- http://localhost:3000/api/openapi.json - OpenAPI Spec
- http://localhost:3000/api/prompt-enhancer - POST endpoint
- http://localhost:3000/api/test-api - POST endpoint

## Deploy to Vercel

### First Time Setup

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Confirm settings
```

### Subsequent Deployments

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Environment Variables

Set these in Vercel Dashboard (Settings → Environment Variables):

```
DATABASE_URL=your-neon-database-url
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=https://your-app.vercel.app
CORS_ORIGIN=https://your-frontend.vercel.app
```

## Project Structure

```
apps/server/
├── api/
│   └── index.ts          # Vercel serverless function entry
├── src/
│   ├── index.ts          # Main Hono app
│   ├── api/
│   │   └── openapi.ts    # OpenAPI routes
│   └── lib/
│       └── auth.ts       # Better Auth config
├── vercel.json           # Vercel configuration
└── package.json
```

## How It Works

### Local Development (`bun run dev`)

1. Bun runs `src/index.ts` directly
2. Hot reload on file changes
3. Full TypeScript support

### Vercel Deployment

1. Vercel runs `bun install`
2. Vercel runs `bun run build` (creates `dist/index.js`)
3. `api/index.ts` wraps your app with Vercel's handler
4. All routes are served through `/api/*`

## Troubleshooting

### Issue: `vercel dev` doesn't work

**Solution**: Use `bun run dev` instead. The `vercel dev` command has TypeScript compatibility issues with Bun workspaces.

### Issue: 404 errors on Vercel

**Solution**: Make sure:

1. `api/index.ts` exists
2. Environment variables are set
3. Build completed successfully (check Vercel logs)

### Issue: CORS errors

**Solution**: Update CORS configuration in `src/index.ts`:

```typescript
app.use(
  "/*",
  cors({
    origin: ["https://your-frontend.vercel.app"],
    credentials: true,
  })
);
```

## Testing Production Build Locally

```bash
# Build the project
bun run build

# Start production server
bun run start

# Test on http://localhost:3000
```

## Vercel Configuration

Your `vercel.json`:

```json
{
  "buildCommand": "bun run build",
  "installCommand": "bun install"
}
```

This tells Vercel:

- Install dependencies with Bun
- Build the project before deployment
- Use the `api/` directory for serverless functions

## Next Steps

1. ✅ Local development works with `bun run dev`
2. ✅ OpenAPI documentation is set up
3. ✅ Vercel configuration is ready
4. 🚀 Deploy with `vercel` command
5. 🔧 Set environment variables in Vercel dashboard
6. ✅ Test your deployed API

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with `bun run dev` first
4. Check the Vercel documentation: https://vercel.com/docs
