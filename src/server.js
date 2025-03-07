
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();
const PORT = Number(getEnvVar('PORT', '2000'))

export const setupServer = () => {
    const app = express();
    app.use(express.json());

    app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

      app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
      });

  app.use(contactsRouter);

    app.use('*', notFoundHandler);

  app.use(errorHandler);

     app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

