import { Socket } from 'socket.io';

import ServicosAgendados from '@/modules/servico-veiculo/services/servicosAgendados';

// agendaController.ts
class AgendaController {
  constructor(private servicosAgendados: ServicosAgendados) { }

  createAgenda() {
    return async (data: any, callback: (response: any) => void) => {
      try {
        // const result = await this.servicosAgendados.servicosAgendados();
        const result = 'Nenhum serviço agendado';
        callback({ status: 'success', result });
      } catch (error) {
        callback({ status: 'error', error });
      }
    };
  }

  enviarAgendas(socket: Socket) {
    return async (callback: (response: any) => void) => {
      try {
        socket.join('agenda');
        const result = await this.servicosAgendados.servicosAgendados();
        callback({ status: 'success', result });
      } catch (error) {
        callback({ status: 'error', error });
      }
    };
  }
}

export default AgendaController;
