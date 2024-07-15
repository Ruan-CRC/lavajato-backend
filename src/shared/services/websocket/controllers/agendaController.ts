import { Socket } from 'socket.io';

import { Agenda } from '@prisma/client';
import ServicosAgendados from '../../../../modules/agenda/services/servicosAgendados';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';

import { amqpInstance } from '@/shared/core/server';

const veiculoServicosRepository = new VeiculoServicosRepository();
// agendaController.ts
class AgendaController {
  constructor(private servicosAgendados: ServicosAgendados) { }

  createAgenda = async (socket: Socket) => {
    let result: Agenda;
    try {
      await amqpInstance.consumeFromQueue(process.env.RABBITMQ_AGENDA_QUEUE, async (payload) => {
        console.log('payload=-=-=-=-', payload);
        result = await veiculoServicosRepository.addServicos(1, 1);
        socket.emit('agenda:create', result);
      });
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
