// Modules Imports
import express, { Request, Response } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import handler from '../infra/modules/api/v1/handler';

// Dotenv Config
dotenv.config();

const corsOptions = {
  origin: '*',
};

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.connection();
    this.middlewares();
    this.routes();
  }

  async connection() {
    // await createConnection();
  }

  middlewares() {
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(cors(corsOptions));
  }

  routes() {
    // Health Check
    this.app.get('/api/v1/healthcheck', (request: Request, response: Response) => response.status(200).json({ Ok: true }));

    this.app.use(handler);
  }
}

const { app } = new App();
export default app;
