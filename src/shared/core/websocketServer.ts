import { Server, Socket } from 'socket.io';
// import main from '../infra/prisma/seed/seed';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import { Redis } from 'ioredis';
import agendaHandler from '../services/websocket/handlers/agendaHandler';

class WebsocketServer {
  private static instance: WebsocketServer;

  private io: Server;

  private socketInstance: Socket;

  private constructor() {
    const redisClient = new Redis(6379, 'redis-ws');

    let port = Number(process.env.PORT_WS_SERVER);
    if (process.env.IS_TEST === 'true') {
      port = 0;
    }

    const ioServer = new Server(port, {
      adapter: createAdapter(redisClient),
      connectionStateRecovery: {
        maxDisconnectionDuration: 3000,
        skipMiddlewares: false,
      },
      cors: {
        origin: ['http://localhost:5173', 'http://localhost:4173', 'https://k6.io/'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
      },
    });

    this.io = ioServer;
    this.webSocketEvents();
  }

  public static get Instance(): WebsocketServer {
    if (!WebsocketServer.instance) {
      WebsocketServer.instance = new WebsocketServer();
    }

    return WebsocketServer.instance;
  }

  public get socket(): Socket {
    return this.socketInstance;
  }

  public get ioInstance(): Server {
    return this.io;
  }

  private handleSocketEvents(socket: Socket) {
    agendaHandler(this.io, socket);
  }

  private webSocketEvents() {
    this.io.on('connection', (socket) => {
      // if (process.env.IS_DEV === 'true') {
      //   main();
      // }
      this.socketInstance = socket;
      this.handleSocketEvents(socket);
    });
  }
}

export default WebsocketServer;
