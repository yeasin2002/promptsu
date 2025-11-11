# OpenAPI Documentation Setup

## What Was Created

1. **`src/api/openapi.ts`**: OpenAPI-enabled router with Zod schemas

   - Replaces the old `src/api/index.ts` router
   - Uses `@hono/zod-openapi` for automatic OpenAPI spec generation
   - Includes proper type-safe request/response handling

2. **Updated `src/index.ts`**:
   - Imports the new OpenAPI router
   - Configures Scalar API documentation at `/docs`
   - OpenAPI spec available at `/api/openapi.json`

## API Endpoints

### POST /api/prompt-enhancer

Enhances a user prompt using Google Gemini AI

**Request Body:**

```json
{
  "prompt": "What is artificial intelligence?",
  "apiKey": "your-google-api-key"
}
```

**Response (200):**

```json
{
  "error": null,
  "data": "Enhanced prompt string"
}
```

### POST /api/test-api

Tests the Google Gemini API connection

**Request Body:**

```json
{
  "apiKey": "your-google-api-key"
}
```

**Response (200):**

```json
{
  "error": null,
  "data": "hi"
}
```

## Accessing Documentation

1. **Start the server:**

   ```bash
   bun run dev
   ```

2. **View API Documentation:**

   - Open http://localhost:3000/docs
   - Interactive Scalar UI with all endpoints documented

3. **Get OpenAPI JSON:**
   - Open http://localhost:3000/api/openapi.json
   - Raw OpenAPI 3.1.0 specification

## Features

- ✅ Automatic OpenAPI spec generation from Zod schemas
- ✅ Type-safe request validation
- ✅ Interactive API documentation with Scalar
- ✅ Request/response examples
- ✅ Proper error handling with typed responses
- ✅ Tags for endpoint organization

## Next Steps

If you want to add more routes:

1. Define Zod schemas with `.openapi()` metadata
2. Create routes using `createRoute()`
3. Implement handlers with `app.openapi()`
4. The OpenAPI spec updates automatically!
