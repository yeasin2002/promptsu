import { trpcServer } from '@hono/trpc-server';
import { Scalar } from '@scalar/hono-api-reference';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './lib/auth';
import { createContext } from './lib/context';
import { trpcAppRouter } from './routers';

const app = new Hono({ strict: true });

app.use(logger());
app.use(cors());
app.get('/scalar', Scalar({ url: '/doc' }));

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
