import { Server, Socket } from 'socket.io';
import AgendaControllerWS from '../controllers/agendaController';

const agendaController = new AgendaControllerWS();

export default function agendaHandler(io: Server, socket: Socket) {
  socket.on('agenda:all', async () => { await agendaController.enviarAgendas(socket); });
}
