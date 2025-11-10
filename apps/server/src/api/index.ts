import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { enhanceInputSchema, promptEnhancerService } from './prompt-enhancer';

const promptRouter = new Hono();

promptRouter.post('/', zValidator('json', enhanceInputSchema), async (c) => {
  const input = c.req.valid('json');
  const result = await promptEnhancerService(input);

  if (result.error) {
    return c.json({ error: result.error, data: null }, 500);
  }

  return c.json({ error: null, data: result.data });
});

export default promptRouter;
