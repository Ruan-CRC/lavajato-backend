// Modules Imports
import express, {
  Request, Response,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import handlerRouters from '../infra/modules/api/v1/handlerRouters';
import errorMiddleware from '../infra/middlewares/error';

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

    this.app.use(errorMiddleware);
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

    this.app.use(handlerRouters);
  }
}

const { app } = new App();
export default app;
