/* eslint-disable no-console */
import app from './app';
import WsServer from './wsServer';
import AmqpLibService from '@/shared/services/rabbitMQ/amqpLibService';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';

const websocketInstance = WsServer.Instance;

const amqpInstance = AmqpLibService.Instance;

const veiculoServicosRepository = new VeiculoServicosRepository();

const porta = process.env.PORT_API || 3333;

app.listen(porta, async () => {
  console.clear();
  console.log(`Server running on port ${porta}`);

  websocketInstance.start();
  await amqpInstance.connect();
  websocketInstance.start();

  amqpInstance.consumeFromQueue(process.env.RABBITMQ_AGENDA_QUEUE, (payload) => {
    veiculoServicosRepository.addServicos(1, 1);

    websocketInstance.broadcast('agenda:now', payload);
  });
});

export { websocketInstance, amqpInstance };
