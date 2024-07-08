import { Socket, Server } from 'socket.io';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';
import AgendaController from '../controllers/agendaController';

const repositorie = new VeiculoServicosRepository();
const servicosAgendados = new ServicosAgendados(repositorie);
const agendaController = new AgendaController(servicosAgendados);

export default function agendaHandler(io: Server, socket: Socket) {
  socket.on('agenda:join', () => agendaController.enviarAgendas(io, socket));
  socket.on('agenda:create', () => agendaController.createAgenda(io, socket));
}
