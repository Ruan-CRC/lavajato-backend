import { Server, Socket } from 'socket.io';

import ServicosAgendados from '@/modules/agenda/services/servicosAgendados';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';
import AgendaController from '../controllers/agendaController';
// import main from '@/shared/infra/prisma/seed/seed';

const repositorie = new VeiculoServicosRepository();
const servicosAgendados = new ServicosAgendados(repositorie);
const agendaController = new AgendaController(servicosAgendados);

export default function agendaHandler(io: Server, socket: Socket) {
  socket.on('agenda:all', async () => { await agendaController.enviarAgendas(socket); });
  socket.on('agenda:create', () => { agendaController.createAgenda(socket); });
}
