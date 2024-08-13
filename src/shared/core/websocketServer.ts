import { Server, Socket } from 'socket.io';
import agendaHandler from '../services/websocket/handlers/agendaHandler';
// import main from '../infra/prisma/seed/seed';

class WebsocketServer {
  private static instance: WebsocketServer;

  private io: Server;

  private socketInstance: Socket;

  private constructor() {
    let port = Number(process.env.PORT_WS_SERVER);
    if (process.env.IS_TEST === 'true') {
      port = 0;
    }

    const ioServer = new Server(port, {
      cors: {
        origin: process.env.CORS_CLIENT_URL,
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
