// Modules Imports
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import usersRouters from '@/modules/users/infra/http/routers/users.routers';
import veiculoRouters from '@/modules/veiculos/infra/http/routers/veiculo.routers';
import servicosRouters from '@/modules/servicos/infra/http/routers/servicos.routers';
import servicoVeiculoRouters from '@/modules/servico-veiculo/infra/http/routers/servicoVeiculo.router';

// Dotenv Config
dotenv.config();
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

    this.server.use('/api/v1/users', usersRouters);
    this.server.use('/api/v1/veiculos', veiculoRouters);
    this.server.use('/api/v1/servicos', servicosRouters);
    this.server.use('/api/v1/servico/veiculos', servicoVeiculoRouters);
  }
}

const app = new App().server;
export default app;
