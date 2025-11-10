import 'dotenv/config';

import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { onError } from '@orpc/server';
import { RPCHandler } from '@orpc/server/fetch';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { Scalar } from '@scalar/hono-api-reference';
import chalk from 'chalk';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import promptRouter from './api';
import { auth } from './lib/auth';
import { createContext } from './lib/context';
import { appRouter } from './routers';

const app = new Hono({ strict: true });

app.use(logger());

app.get('openapi.json', serveStatic({ path: './public/openapi.json' }));

app.use(
  cors({
    origin: ['http://10.10.13.40:3001', 'http://localhost:3001', 'https://chatgpt.com'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.get(
  '/docs',
  Scalar({
    pageTitle: 'API Documentation',
    theme: 'deepSpace',
    sources: [
      { title: 'oRPC', url: '../openapi.json' },
      { url: '/api/auth/open-api/generate-schema', title: 'Auth' },
    ],
  })
);
app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

/* oRTC Start */
export const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

app.use('/*', async (c, next) => {
  const context = await createContext({ context: c });

  const rpcResult = await rpcHandler.handle(c.req.raw, {
    prefix: '/rpc',
    context,
  });

  if (rpcResult.matched) {
    return c.newResponse(rpcResult.response.body, rpcResult.response);
  }

  const apiResult = await apiHandler.handle(c.req.raw, {
    prefix: '/api',
    context,
  });

  if (apiResult.matched) {
    return c.newResponse(apiResult.response.body, apiResult.response);
  }

  await next();
});

// app.get('/openapi.json', async (c) => {
//   try {
//     // If OpenAPIReferencePlugin produced a runtime spec accessible via apiHandler, use that API.
//     // Otherwise, read a generated file created by your build script.
//     const spec = await fs.readFile('./openapi.json', 'utf-8');
//     return c.body(spec, 200, { 'content-type': 'application/json' });
//   } catch {
//     return c.text('openapi.json not found', 404);
//   }
// });

/* oRTC End */

app.get('/', (c) => {
  return c.json({ message: 'Hello World' });
});

app.route('/prompt-enhancer', promptRouter);

app.onError((err, c) => {
  console.error(chalk.bgRed.white('Global error : '), err);
  return c.json({ success: false, message: err?.message || 'Something went wrong' }, 500);
});

export default app;
