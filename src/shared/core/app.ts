// Modules Imports
import express, { Request, Response } from 'express';
import { createServer, Server as HTTPServer } from 'node:http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import dotenv from 'dotenv';

import usersRouters from '@/modules/users/infra/http/routers/users.routers';
import veiculoRouters from '@/modules/veiculos/infra/http/routers/veiculo.routers';
import servicosRouters from '@/modules/servicos/infra/http/routers/servicos.routers';
import servicoVeiculoRouters from '@/modules/servico-veiculo/infra/http/routers/servicoVeiculo.router';

import agendaHandler from '@/shared/services/websocket/handlers/agendaHandler';

// Dotenv Config
dotenv.config();

class App {
  public server: HTTPServer;

  public app: express.Application;

  public io: SocketIOServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: 'http://localhost:5173',
      },
    });

    this.connection();
    this.middlewares();
    this.routes();
    this.webSocketEvents();
  }

  async connection() {
    // await createConnection();
  }

  middlewares() {
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  }

  routes() {
    // Health Check
    this.app.get('/api/v1/healthcheck', (request: Request, response: Response) => response.status(200).json({ Ok: true }));

    this.app.use('/api/v1/users', usersRouters);
    this.app.use('/api/v1/veiculos', veiculoRouters);
    this.app.use('/api/v1/servicos', servicosRouters);
    this.app.use('/api/v1/servico/veiculos', servicoVeiculoRouters);
  }

  private handleSocketEvents(socket: Socket) {
    agendaHandler(this.io, socket);
  }

  webSocketEvents() {
    this.io.on('connection', this.handleSocketEvents);
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

const app = new App();
export default app;
