import { Socket } from 'socket.io';
import { websocketInstance } from '@/shared/core/server';
import { AgendaCreateInputDTO } from '../../../../modules/agenda/entities/agenda.d';
import { addServicosService, servicosAgendados } from '@/modules/agenda/utils/factory';

export default class AgendaControllerWS {
  async createAgenda(payload: string) {
    const socketInstance = websocketInstance.ioInstance;
    const payloadJson = JSON.parse(payload);

    const props: AgendaCreateInputDTO = {
      id: payloadJson.id,
      veiculoId: payloadJson.veiculoId,
      servicoIds: payloadJson.servicoIds,
      dataInicio: payloadJson.dataInicio,
    };

    const result = await addServicosService.add(props);

    socketInstance.emit('agenda:create', result);
  }

  enviarAgendas = async (socket: Socket) => {
    try {
      const result = await servicosAgendados.servicosAgendados();

      socket.emit('agenda:all', result);
    } catch (error) {
      console.log(error);
    }
  };
}
