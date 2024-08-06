import { Server, Socket } from 'socket.io';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados/servicosAgendados';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';
import AgendaControllerWS from '../controllers/agendaController';

const repositorie = new VeiculoServicosRepository();
const servicosAgendados = new ServicosAgendados(repositorie);
const agendaController = new AgendaControllerWS(servicosAgendados);

export default function agendaHandler(io: Server, socket: Socket) {
  socket.on('agenda:all', async () => { await agendaController.enviarAgendas(socket); });
}
