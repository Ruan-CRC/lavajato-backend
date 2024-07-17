/* eslint-disable no-console */
import app from './app';
// import WsServer from './wsServer';
import AmqpLibService from '@/shared/services/rabbitMQ/amqpLibService';
import WebsocketServer from './websocketServer';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';
import AddServicosService from '@/modules/agenda/services/addServicos';

const veiculoServicosRepository = new VeiculoServicosRepository();
const addServicosService = new AddServicosService(veiculoServicosRepository);
const websocketInstance = WebsocketServer.Instance;
const amqpInstance = AmqpLibService.Instance;
const porta = process.env.PORT_API || 3333;

app.listen(porta, async () => {
  console.clear();
  console.log(`Server running on port ${porta}`);

  await amqpInstance.connect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await amqpInstance.consumeFromQueue(process.env.RABBITMQ_AGENDA_QUEUE, async (payload) => {
    console.log('payload', payload);
    const result = await addServicosService.add(JSON.parse(payload));

    const socketInstance = websocketInstance.socket;
    socketInstance.emit('agenda:create', result);
  });
});

export { websocketInstance, amqpInstance };
