import { trpcServer } from '@hono/trpc-server';
import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { onError } from '@orpc/server';
import { RPCHandler } from '@orpc/server/fetch';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { Scalar } from '@scalar/hono-api-reference';
import 'dotenv/config';
import fs from 'fs';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './lib/auth';
import { createContext } from './lib/context';
import { trpcAppRouter } from './routers';
import { appRouter } from './routers/oRPC-router';

const app = new Hono({ strict: true });

app.use(logger());
app.use(
  cors({
    origin: ['http://10.10.13.40:3001', 'http://localhost:3001', 'https://chatgpt.com'],
    credentials: true,
  })
);
app.get('/scalar', Scalar({ url: '../openapi.json' }));

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

app.use(
  '/trpc/*',
  trpcServer({
    router: trpcAppRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  })
);

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

app.get('/openapi.json', async (c) => {
  try {
    // If OpenAPIReferencePlugin produced a runtime spec accessible via apiHandler, use that API.
    // Otherwise, read a generated file created by your build script.
    const spec = await fs.readFileSync('./openapi.json', 'utf-8');
    return c.body(spec, 200, { 'content-type': 'application/json' });
  } catch {
    return c.text('openapi.json not found', 404);
  }
});

/* oRTC End */

app.get('/', (c) => {
  return c.json({ message: 'Hello World' });
});

export default app;

// app.use(
//   '*',
//   cors({
//     // origin: ['http://10.10.13.40:3001', "'http://10.10.13.40:3000'", 'https://chatgpt.com'],
//     origin: ['*'],
//     credentials: true,
//     //      Access-Control-Allow-Origin: *
//     allowHeaders: ['Content-Type', 'Authorization'],
//     allowMethods: ['GET', 'POST', 'OPTIONS'],
//     exposeHeaders: ['Content-Type', 'Authorization'],
//   })
// );
