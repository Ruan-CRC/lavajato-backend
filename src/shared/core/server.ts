/* eslint-disable no-console */
import app from './app';
// import WsServer from './wsServer';
import AmqpLibService from '@/shared/services/rabbitMQ/amqpLibService';
import WebsocketServer from './websocketServer';

const websocketInstance = WebsocketServer.Instance;
const amqpInstance = AmqpLibService.Instance;

const porta = process.env.PORT_API || 3333;

app.listen(porta, async () => {
  console.clear();
  console.log(`Server running on port ${porta}`);

  await amqpInstance.connect();
});

export { websocketInstance, amqpInstance };
