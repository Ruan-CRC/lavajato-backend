import { Socket, Server } from 'socket.io';
import ServicosAgendados from '@/modules/servico-veiculo/services/servicosAgendados';
import VeiculoServicosRepository from '@/modules/servico-veiculo/infra/repositories/veiculo-servicos-repositories';
import AgendaController from '../controllers/agendaController';

const repositorie = new VeiculoServicosRepository();
const servicosAgendados = new ServicosAgendados(repositorie);
const agendaController = new AgendaController(servicosAgendados);

export default function agendaHandler(io: Server, socket: Socket) {
  console.log('Socket connected: ', socket.id);
  socket.on('agenda:create', agendaController.createAgenda());
}
