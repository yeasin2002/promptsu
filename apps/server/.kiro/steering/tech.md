# Tech Stack

## Runtime & Language

- Node.js with ES Modules (`"type": "module"`)
- TypeScript

## Framework & Server

- Express.js for HTTP server
- CORS enabled
- Morgan for request logging

## AI Integration

- Google Gen AI SDK (`@google/genai`) for Gemini API
- Default model: `gemini-2.0-flash`

## Validation

- Zod for schema validation and type inference

## Build Tools

- `tsdown` for TypeScript bundling (outputs to `dist/`)
- `tsx` for development runtime

## Deployment

- Vercel (configured via `vercel.json`)

## Other Dependencies

- `dotenv` for environment variables
- `axios` + `cheerio` + `puppeteer` for web scraping (available but not actively used in current routes)
- `mongodb` driver (available)
- `node-cron` for scheduled tasks (available)
- `express-rate-limit` for rate limiting (available)
- `package manager`: - pnpm 


## Common Commands

```bash
# Development
pnpm run dev        # Start dev server with tsx

# Build
pnpm run build      # Bundle with tsdown to dist/

# Production
pnpm run start      # Run bundled server from dist/
```

## Environment Variables

- `PORT` - Server port (default: 4000)
- Google AI API keys are passed per-request, not stored server-side
