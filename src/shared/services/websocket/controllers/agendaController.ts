/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';
import { WebSocket } from 'ws';

import ServicosAgendados from '@/modules/agenda/services/servicosAgendados';

class AgendaController {
  constructor(
    private servicosAgendados: ServicosAgendados,
  ) { }

  createAgenda = async (ws: WebSocket, req: Request) => {
    try {
      const result = 'Nenhum serviço agendado';
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  enviarAgendas = async (ws: WebSocket) => {
    try {
      console.log('Enviando agendas');
      const result = await this.servicosAgendados.servicosAgendados();
      ws.send(JSON.stringify({ event: 'agenda:agendados', result }));
    } catch (error) {
      console.log(error);
    }
  };
}

export default AgendaController;
