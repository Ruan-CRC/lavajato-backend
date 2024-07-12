/* eslint-disable no-console */
import app from './app';
import WsServer from './wsServer';

import AmqpLibService from '@/shared/services/rabbitMQ/amqpLibService';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';

const websocket = new WsServer(8080);
const amqp = new AmqpLibService();
const veiculoServicosRepository = new VeiculoServicosRepository();
const porta = process.env.PORT || 3333;

app.listen(porta, async () => {
  console.clear();
  console.log(`Server running on port ${porta}`);

  await amqp.connect();
  amqp.consumeFromQueue(process.env.RABBITMQ_AGENDA_QUEUE, (message) => {
    console.log('Message received: ', message);

    veiculoServicosRepository.addServicos(1, 1);

    websocket.broadcast('message', message);
  });
});

export default websocket;
