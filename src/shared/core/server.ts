/* eslint-disable no-console */
import app from './app';
// import WsServer from './wsServer';
import AmqpLibService from '@/shared/services/rabbitMQ/amqpLibService';
import WebsocketServer from './websocketServer';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';

const veiculoServicosRepository = new VeiculoServicosRepository();
const websocketInstance = WebsocketServer.Instance;
const amqpInstance = AmqpLibService.Instance;
const porta = process.env.PORT_API || 3333;

app.listen(porta, async () => {
  console.clear();
  console.log(`Server running on port ${porta}`);

  await amqpInstance.connect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await amqpInstance.consumeFromQueue(process.env.RABBITMQ_AGENDA_QUEUE, async (payload) => {
    const result = await veiculoServicosRepository.addServicos(1, 1);

    const socketInstance = websocketInstance.socket;
    socketInstance.emit('agenda:create', result);
  });
});

export { websocketInstance, amqpInstance };
