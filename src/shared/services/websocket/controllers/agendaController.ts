/* eslint-disable max-len */
import { Socket } from 'socket.io';

// import { Agenda } from '@prisma/client';
import ServicosAgendados from '../../../../modules/agenda/services/servicosAgendados';
// import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';

import { amqpInstance } from '@/shared/core/server';

// const veiculoServicosRepository = new VeiculoServicosRepository();
class AgendaController {
  constructor(private servicosAgendados: ServicosAgendados) { }

  createAgenda = async (socket: Socket, payload: any) => {
    // let result: Agenda;
    try {
      amqpInstance.publishInQueue(process.env.RABBITMQ_AGENDA_QUEUE, payload);
    } catch (error) {
      console.error({ status: 'error', error });
    }
  };

  enviarAgendas = async (socket: Socket) => {
    try {
      const result = await this.servicosAgendados.servicosAgendados();

      socket.emit('agenda:all', result);
    } catch (error) {
      console.log(error);
    }
  };
}

export default AgendaController;
