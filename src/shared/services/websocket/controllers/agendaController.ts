import { Socket } from 'socket.io';
import { websocketInstance } from '@/shared/core/server';
import { AgendaCreateInputDTO } from '../../../../modules/agenda/entities/agenda.d';
import { addServicosService, servicosAgendados } from '@/modules/agenda/utils/factory';
import ValidaAgenda from '@/modules/agenda/services/validaAgenda/validaAgenda';

export default class AgendaControllerWS {
  async createAgenda(payload: string) {
    const socketInstance = websocketInstance.socket;
    const { ioInstance } = websocketInstance;
    const payloadJson = JSON.parse(payload);

    const props: AgendaCreateInputDTO = {
      id: payloadJson.id,
      veiculoId: payloadJson.veiculoId,
      servicoIds: payloadJson.servicoIds,
      dataInicio: new Date(payloadJson.dataInicio),
    };

    const valida = new ValidaAgenda();
    const dataFim = await valida.calculateDataFimServicos(props.dataInicio, props.servicoIds);
    await valida.temFuncionarios(props.dataInicio, dataFim);

    if (valida.error.hasError === true) {
      socketInstance.to(socketInstance.id).emit('agenda:error', valida.error);
      return '';
    }

    const result = await addServicosService.add(props);

    ioInstance.emit('agenda:create', result);
  }

  enviarAgendas = async (socket: Socket) => {
    try {
      const result = await servicosAgendados.servicosAgendados();

      socket.broadcast.emit('user joined', result);
    } catch (error) {
      console.log(error);
    }
  };
}
