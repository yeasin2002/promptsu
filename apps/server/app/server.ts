import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { promptEnhancerService } from './routes/prompt-enhancer.js';
import { testApiService } from './routes/test-api-api.js';
import { PORT } from './utils/env.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.post('/api/prompt-enhancer', async (req, res) => {
  const input = req.body;
  const result = await promptEnhancerService(input);

  if (result.error) {
    return res.json({ error: result.error, data: null });
  }

  return res.json({ error: null, data: result.data });
});

app.post('/api/test-api', async (req, res) => {
  const input = req.body;
  console.log('input', input);
  const result = await testApiService(input);

  if (result.error) {
    return res.json({ error: result.error, data: null });
  }

  return res.json({ error: null, data: result.data });
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
