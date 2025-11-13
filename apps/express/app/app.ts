import { join } from 'node:path';
import bodyParser from 'body-parser';
// import type { NextFunction, Request, Response } from 'express';
// import jsend from 'jsend';
import cors from 'cors';
import express from 'express';
// import helmet from 'helmet';

import mainRouter from './routes';

export const app = express();
app.use(cors());
app.use(bodyParser.json());

// middleware routes
// const isProduction = process.env.NODE_ENV === 'production';
// if (isProduction) {
//   app.use(helmet());
// }
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(jsend.middleware); // more detail on https://github.com/omniti-labs/jsend
// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => res.jsend.error(err));
// const options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html'],
//   index: false,
//   maxAge: '1d',
//   redirect: false,
//   setHeaders(res: express.Response) {
//     res.set('x-static-timestamp', Date.now().toString());
//   },
// };

app.use('/api', mainRouter);

app.use('/static', express.static(join(__dirname, '../public')));
app.get('/', (_req, res: express.Response) => {
  res.json({ message: 'Welcome to Express Server!' });
});
