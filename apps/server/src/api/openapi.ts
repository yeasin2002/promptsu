import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { promptEnhancerService } from "./prompt-enhancer";
import { testApiService } from "./test-api-api";

// Create OpenAPI Hono instance
const app = new OpenAPIHono();

// Input schemas with OpenAPI metadata
const enhanceInputSchema = z
  .object({
    prompt: z.string().min(1, "Prompt is required").openapi({
      example: "What is artificial intelligence?",
      description: "The prompt to enhance",
    }),
    apiKey: z.string().min(1, "API key is required").openapi({
      example: "your-google-api-key",
      description: "Google Gemini API key",
    }),
  })
  .openapi("EnhanceInput");

const testApiInputSchema = z
  .object({
    apiKey: z.string().min(1, "API key is required").openapi({
      example: "your-google-api-key",
      description: "Google Gemini API key",
    }),
  })
  .openapi("TestApiInput");

// Response schemas
const errorResponseSchema = z
  .object({
    error: z.string().openapi({ example: "An error occurred" }),
    data: z.null(),
  })
  .openapi("ErrorResponse");

const successResponseSchema = z
  .object({
    error: z.null(),
    data: z.string().openapi({ example: "Enhanced prompt result" }),
  })
  .openapi("SuccessResponse");

// Prompt Enhancer Route
const promptEnhancerRoute = createRoute({
  method: "post",
  path: "/prompt-enhancer",
  tags: ["AI Services"],
  summary: "Enhance a prompt using AI",
  description:
    "Takes a user prompt and transforms it into a more engaging, detailed question using Google Gemini AI",
  request: {
    body: {
      content: {
        "application/json": {
          schema: enhanceInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Successfully enhanced the prompt",
      content: {
        "application/json": {
          schema: successResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

app.openapi(promptEnhancerRoute, async (c) => {
  const input = c.req.valid("json");
  const result = await promptEnhancerService(input);

  if (result.error) {
    return c.json({ error: result.error, data: null }, 500);
  }

  return c.json({ error: null, data: result.data! }, 200);
});

// Test API Route
const testApiRoute = createRoute({
  method: "post",
  path: "/test-api",
  tags: ["AI Services"],
  summary: "Test API connection",
  description:
    "Tests the Google Gemini API connection by sending a simple prompt",
  request: {
    body: {
      content: {
        "application/json": {
          schema: testApiInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Successfully tested the API",
      content: {
        "application/json": {
          schema: successResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

app.openapi(testApiRoute, async (c) => {
  const input = c.req.valid("json");
  const result = await testApiService(input);

  if (result.error) {
    return c.json({ error: result.error, data: null }, 500);
  }

  return c.json({ error: null, data: result.data! }, 200);
});

// OpenAPI documentation endpoint
app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "Prompt Enhancer API",
    version: "1.0.0",
    description: "API for enhancing prompts using Google Gemini AI",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local development server",
    },
  ],
});

export default app;
