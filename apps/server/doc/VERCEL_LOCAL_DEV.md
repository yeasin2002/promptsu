# Vercel Local Development Issue

## The Problem

`vercel dev` is trying to run TypeScript files directly using `ts-node`, which has compatibility issues with your TypeScript configuration and Bun workspace setup.

## Solutions

### Option 1: Use Bun for Local Development (Recommended)

Instead of `vercel dev`, use Bun's built-in dev server:

```bash
bun run dev
```

This will:

- Start the server on http://localhost:3000
- Enable hot reload
- Work exactly like it will on Vercel (same code)
- Avoid TypeScript compilation issues

### Option 2: Build First, Then Use Vercel Dev

If you need to test the exact Vercel environment:

```bash
# Build the project
bun run build

# Then run vercel dev
vercel dev
```

But this won't have hot reload.

### Option 3: Deploy to Vercel Preview

The most accurate way to test:

```bash
# Deploy to preview environment
vercel

# Or deploy to production
vercel --prod
```

## Why This Happens

- Vercel uses Node.js runtime, not Bun
- `vercel dev` tries to run TypeScript with `ts-node`
- Your project uses Bun workspaces and modern TypeScript features
- There's a version mismatch between the TypeScript in your project and what `ts-node` expects

## Recommended Workflow

1. **Local Development**: Use `bun run dev`
2. **Testing**: Deploy to Vercel preview with `vercel`
3. **Production**: Deploy with `vercel --prod`

## Current Setup

Your `api/index.ts` is configured correctly:

```typescript
import { handle } from "hono/vercel";
import app from "../src/index";

export default handle(app);
```

When you deploy to Vercel:

1. Vercel runs `bun install`
2. Vercel runs `bun run build` (creates `dist/index.js`)
3. Vercel serves your API through the serverless function

Everything works in production - the issue is only with `vercel dev` locally.
