import { trpcServer } from '@hono/trpc-server';
import chalk from 'chalk';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './lib/auth';
import { createContext } from './lib/context';
import { trpcAppRouter } from './routers/index';

const app = new Hono();

app.use(async (ctx, next) => {
  console.warn(chalk.bgRed('origin'), ctx.req.header('origin'));
  await next();
});

app.use(logger());
// app.use(cors());
app.use(
  '*',
  cors({
    origin: ['http://10.10.13.40:3001', "'http://10.10.13.40:3000'"],
    credentials: true,
  })
);

// app.use('/*',cors({origin: process.env.CORS_ORIGIN || '',allowMethods: ['GET', 'POST', 'OPTIONS'],allowHeaders: ['Content-Type', 'Authorization'],credentials: true,}));

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

app.get('/', (c) => {
  return c.json({ message: 'Hello World' });
});

export default app;
