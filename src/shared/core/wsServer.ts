import { WebSocketServer, WebSocket } from 'ws';
import agendaHandler from '../services/websocket/handlers/agendaHandler';

class WsServer {
  private static instance: WsServer;

  private wsServer: WebSocketServer;

  private ws: WebSocket;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static get Instance(): WsServer {
    if (!WsServer.instance) {
      WsServer.instance = new WsServer();
    }

    return WsServer.instance;
  }

  public start() {
    this.wsServer = new WebSocketServer({ port: 8080 });

    this.events(this.wsServer);
  }

  private events(wss: WebSocketServer) {
    wss.on('connection', (ws) => {
      ws.on('error', console.error);

      this.ws = ws;

      agendaHandler(ws);
    });
  }

  broadcast(event: string, data: any) {
    this.wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event, data }));
      }
    });
  }
}

export default WsServer;
