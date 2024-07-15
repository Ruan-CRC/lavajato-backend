import { Server, Socket } from 'socket.io';
import agendaHandler from '../services/websocket/handlers/agendaHandler';

class WebsocketServer {
  private static instance: WebsocketServer;

  private io: Server;

  socketInstance: Socket;

  private constructor() {
    const ioServer = new Server(Number(process.env.PORT_WS_SERVER), {
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

  private handleSocketEvents(socket: Socket) {
    agendaHandler(this.io, socket);
  }

  private webSocketEvents() {
    this.io.on('connection', (socket) => {
      this.socketInstance = socket;
      this.handleSocketEvents(socket);
    });
  }
}

export default WebsocketServer;
