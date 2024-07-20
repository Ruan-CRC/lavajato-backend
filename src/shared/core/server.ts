/* eslint-disable no-console */
import app from './app';
// import WsServer from './wsServer';
import AmqpLibService from '@/shared/services/rabbitMQ/amqpLibService';
import WebsocketServer from './websocketServer';

import AddServicosService from '@/modules/agenda/services/addServicos/addServicos';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';

const veiculoServicosRepository = new VeiculoServicosRepository();
const addServicosService = new AddServicosService(veiculoServicosRepository);

const websocketInstance = WebsocketServer.Instance;
const amqpInstance = AmqpLibService.Instance;

const porta = process.env.PORT_API || 3333;

app.listen(porta, async () => {
  console.clear();
  console.log(`Server running on port ${porta}`);

  await amqpInstance.connect();
  const socketInstance = websocketInstance.socket;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await amqpInstance.consumeFromQueue(process.env.RABBITMQ_AGENDA_QUEUE, async (payload) => {
    const payloadJson = JSON.parse(payload);
    const props = {
      veiculoId: payloadJson.veiculoId,
      servicoIds: payloadJson.servicoId,
      dataInicio: payloadJson.dataIncio,
    };

    const result = await addServicosService.add(props);
    socketInstance.emit('agenda:create', result);
  });
});

export { websocketInstance, amqpInstance };
