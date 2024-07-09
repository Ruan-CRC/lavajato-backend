import { Request } from 'express';
import { WebSocket } from 'ws';

import ServicosAgendados from '@/modules/agenda/services/servicosAgendados';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';
import AgendaController from '../controllers/agendaController';
import main from '@/shared/infra/prisma/seed/seed';

const repositorie = new VeiculoServicosRepository();
const servicosAgendados = new ServicosAgendados(repositorie);
const agendaController = new AgendaController(servicosAgendados);

export default function agendaHandler(ws: WebSocket, req: Request) {
  ws.on('message', (message: string) => {
    switch (JSON.parse(message)) {
      case 'agenda:join':
        agendaController.enviarAgendas(ws, req);
        break;

      case 'agenda:seed':
        main(ws);
        break;

      default:
        break;
    }
  });
}
