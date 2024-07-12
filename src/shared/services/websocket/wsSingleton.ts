import { WebSocketServer, WebSocket } from 'ws';

class WsSingleton {
  private wsServer: WebSocketServer;

  constructor(server: any) {
    this.wsServer = new WebSocketServer(server);
  }

  public get wss(): WebSocketServer {
    return this.wsServer;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enventsHandler(ws: WebSocket, req: Request) {
    ws.on('message', (message: string) => {
      switch (JSON.parse(message)) {
        case 'agenda:join':
          // agendaController.enviarAgendas(ws, req);
          break;

        case 'agenda:seed':
          // main(ws);
          break;

        default:
          break;
      }
    });
  }

  enviarEventos(ws: WebSocket, event: string, payload: any) {
    ws.send(JSON.stringify({ evento: event, payload }));
  }
}

export default WsSingleton;
