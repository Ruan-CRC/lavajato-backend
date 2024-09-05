import { Server, Socket } from 'socket.io';
// import main from '../infra/prisma/seed/seed';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import { Redis } from 'ioredis';
import agendaHandler from '../services/websocket/handlers/agendaHandler';

class WebsocketServer {
  private static instance: WebsocketServer;

  private io: Server;

  private socketId: string;

  private redisClient: Redis;

  private portRedis = Number(process.env.REDIS_PORT);

  private constructor() {
    this.redisClient = new Redis(this.portRedis, 'redis-ws');

    let port = Number(process.env.PORT_WS_SERVER);
    if (process.env.IS_TEST === 'true') {
      port = 0;
    }

    const ioServer = new Server(port, {
      adapter: createAdapter(this.redisClient),
      connectionStateRecovery: {
        maxDisconnectionDuration: 3000,
        skipMiddlewares: false,
      },
      cors: {
        origin: [process.env.CORS_CLIENT_URL, process.env.CORS_CLIENT_URL_PROD, 'https://k6.io/'],
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

  public get ioInstance(): Server {
    return this.io;
  }

  public async sendMessageToClient(userId: string, customEvent: string, message: any) {
    const cliRedis = new Redis(this.portRedis, 'redis-ws');
    const socketId = await cliRedis.get(`user:${userId}:socketId`);
    if (socketId) {
      this.io.to(socketId).emit(customEvent, message);
    }
  }

  private async handleSocketEvents(socket: Socket) {
    if (this.socketId) {
      await this.redisClient.set(`user:${this.socketId}:socketId`, socket.id);
    }

    agendaHandler(this.io, socket);

    socket.on('disconnect', async () => {
      if (this.socketId) {
        await this.redisClient.del(`user:${this.socketId}:socketId`);
      }
    });
  }

  private webSocketEvents() {
    this.io.on('connection', (socket) => {
      this.socketId = socket.id;

      this.handleSocketEvents(socket);
    });
  }
}

export default WebsocketServer;
