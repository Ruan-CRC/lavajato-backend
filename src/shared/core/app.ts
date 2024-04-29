// Modules Imports
import express, { Request, Response } from 'express';

// Dotenv Config

// Imports Routes

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.connection();
    this.middlewares();
    this.routes();
  }

  // eslint-disable-next-line class-methods-use-this
  async connection() {
    // await createConnection();
  }

  middlewares() {
    this.server.use(express.json({ limit: '50mb' }));
    this.server.use(express.urlencoded({ extended: true, limit: '50mb' }));
  }

  routes() {
    // Health Check
    this.server.get('/api/v1/healthcheck', (request: Request, response: Response) => response.status(200).json({ Ok: true }));

    this.server.get('/api/v1/users', (request, response) => response.status(200).json({ users: { name: 'John Doe', email: 'laele@gmailç.com' } }));
  }
}

const app = new App().server;
export default app;
