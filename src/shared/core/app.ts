// Modules Imports
import express, { Request, Response } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import usersRouters from '@/modules/users/infra/http/routers/users.routers';
import veiculoRouters from '@/modules/veiculos/infra/http/routers/veiculoRouters';
import servicosRouters from '@/modules/servicos/infra/http/routers/servicosRouters';
import servicoVeiculoRouters from '@/modules/agenda/infra/http/routers/servicoVeiculo.router';

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

    this.app.use('/api/v1/users', usersRouters);
    this.app.use('/api/v1/veiculos', veiculoRouters);
    this.app.use('/api/v1/servicos', servicosRouters);
    this.app.use('/api/v1/agenda', servicoVeiculoRouters);
  }

  start(port: String) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

const app = new App();
export default app;
