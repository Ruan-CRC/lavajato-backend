// socketSingleton.ts
import { Server as HTTPServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';

class SocketSingleton {
  private static instance: SocketIOServer | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static init(httpServer: HTTPServer): SocketIOServer {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = new SocketIOServer(httpServer, {
        cors: {
          origin: 'http://localhost:5173',
        },
      });
    }
    return SocketSingleton.instance;
  }

  public static getInstance(): SocketIOServer {
    if (!SocketSingleton.instance) {
      throw new Error('Socket.IO not initialized!');
    }
    return SocketSingleton.instance;
  }
}

export default SocketSingleton;
