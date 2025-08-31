import { trpcServer } from '@hono/trpc-server';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './lib/auth';
import { createContext } from './lib/context';
import { trpcAppRouter } from './routers/index';
import { performStartupChecks } from './startup-check';

const app = new Hono();

// Perform startup checks
performStartupChecks().then((success) => {
  if (!success) {
    console.error();
  }
});

app.use(logger());

// Configure CORS properly for Better Auth
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: ['*'],
  })
);

// Add debugging middleware for auth routes
app.use('/api/auth/*', async (c, next) => {
  console.log('Auth request:', {
    method: c.req.method,
    url: c.req.url,
    origin: c.req.header('origin'),
    userAgent: c.req.header('user-agent'),
  });
  await next();
});

// Handle Better Auth routes - use all method to catch everything
app.all('/api/auth/*', async (c) => {
  try {
    const response = await auth.handler(c.req.raw);
    return response;
  } catch (error) {
    console.error('Auth handler error:', error);
    return c.json({ error: 'Auth handler failed', details: error }, 500);
  }
});

// Add health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount tRPC router
app.use(
  '/trpc/*',
  trpcServer({
    router: trpcAppRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  })
);

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Better-T-Stack API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      trpc: '/trpc',
      health: '/health',
    },
  });
});

export default app;
export type AppType = typeof app;
