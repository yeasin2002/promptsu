import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { enhanceInputSchema, promptEnhancerService } from './prompt-enhancer';
import { testApiSchema, testApiService } from './test-api-api';

const commonRouter = new Hono();

commonRouter.post('/prompt-enhancer', zValidator('json', enhanceInputSchema), async (c) => {
  const input = c.req.valid('json');
  const result = await promptEnhancerService(input);

  if (result.error) {
    return c.json({ error: result.error, data: null }, 500);
  }

  return c.json({ error: null, data: result.data });
});

commonRouter.post('/test-api', zValidator('json', testApiSchema), async (c) => {
  const input = c.req.valid('json');
  const result = await testApiService(input);

  if (result.error) {
    return c.json({ error: result.error, data: null }, 500);
  }

  return c.json({ error: null, data: result.data });
});

export default commonRouter;
