/* eslint-disable no-console */
import 'reflect-metadata';
import app from './app';
import AmqpLibService from '@/shared/services/rabbitMQ/amqpLibService';
import AgendaControllerWS from '../services/websocket/controllers/agendaController';
import errorMiddleware from '../infra/middlewares/error';
import WebsocketServer from '@/shared/core/websocketServer';

const websocketInstance = WebsocketServer.Instance;
const amqpInstance = AmqpLibService.Instance;
const agendaInstance = new AgendaControllerWS();
let porta = process.env.PORT_API || 3333;

if (process.env.IS_TEST === 'true') {
  porta = 0;
}

app.listen(porta, async () => {
  console.log(`Server running on port ${porta}`);

  await amqpInstance.connect();

  await amqpInstance.consumeFromQueue(process.env.RABBITMQ_AGENDA_QUEUE, async (payload) => {
    agendaInstance.createAgenda(payload);
  });
});
app.use(errorMiddleware);

export { websocketInstance, amqpInstance, app };
