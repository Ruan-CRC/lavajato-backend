import { WebSocketServer } from 'ws';
import agendaHandler from '../services/websocket/handlers/agendaHandler';

class WsServer {
  private wsServer: WebSocketServer;

  constructor(port: number) {
    this.wsServer = new WebSocketServer({ port });

    this.events(this.wsServer);
  }

  public get wss(): WebSocketServer {
    return this.wsServer;
  }

  private events(wss: WebSocketServer) {
    wss.on('connection', (ws) => {
      console.log('New connection', ws);
      agendaHandler(ws);
    });
  }

  broadcast(event: string, data: any) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ evento: event, data }));
      }
    });
  }
}

export default WsServer;
