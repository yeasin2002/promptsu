import 'dotenv/config';

import { Scalar } from '@scalar/hono-api-reference';
import chalk from 'chalk';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import commonRouter from './api';
import { auth } from './lib/auth';


const app = new Hono({ strict: true });

app.use(logger());

app.get('openapi.json', serveStatic({ path: './public/openapi.json' }));

// app.use(
//   cors({
//     origin: ['http://10.10.13.40:3001', 'http://localhost:3001', 'https://chatgpt.com'],
//     allowHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );

app.use('/*', cors());
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


app.get('/', (c) => {
  return c.json({ message: 'Hello World' });
});

app.route('/api', commonRouter);

app.onError((err, c) => {
  console.error(chalk.bgRed.white('Global error : '), err);
  return c.json({ success: false, message: err?.message || 'Something went wrong' }, 500);
});

export default app;
