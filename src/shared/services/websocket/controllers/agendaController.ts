import { Socket } from 'socket.io';
import ServicosAgendados from '../../../../modules/agenda/services/servicosAgendados/servicosAgendados';
import { amqpInstance } from '@/shared/core/server';

export default class AgendaController {
  constructor(
    private servicosAgendados: ServicosAgendados,
  ) {}

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
