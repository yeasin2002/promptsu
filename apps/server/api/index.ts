import cors from 'cors';
import express from 'express';
import mainRouter from '../src/routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/api', mainRouter);

export default app;
