/* eslint-disable @typescript-eslint/no-unused-vars */
import { Socket, Server } from 'socket.io';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados';

class AgendaController {
  constructor(
    private servicosAgendados: ServicosAgendados,
  ) { }

  createAgenda = async (io: Server, socket: Socket) => {
    try {
      const result = 'Nenhum serviço agendado';
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  enviarAgendas = async (io: Server, socket: Socket) => {
    try {
      socket.join('agenda');
      const result = await this.servicosAgendados.servicosAgendados();
      socket.emit('agenda:join', { status: 'success', result });
    } catch (error) {
      console.log(error);
    }
  };
}

export default AgendaController;
