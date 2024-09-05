import { Socket } from 'socket.io';
import Redis from 'ioredis';
import { websocketInstance } from '@/shared/core/server';
import { AgendaCreateInputDTO } from '../../../../modules/agenda/entities/agenda.d';
import { addServicosService, servicosAgendados } from '@/modules/agenda/utils/factory';
import ValidaAgenda from '@/modules/agenda/services/validaAgenda/validaAgenda';
import { BadRequestError } from '@/shared/infra/middlewares/errorAbst';

export default class AgendaControllerWS {
  async createAgenda(payload: string) {
    const { ioInstance } = websocketInstance;
    const payloadJson = JSON.parse(payload);
    const cliRedis = new Redis(6379, 'redis-ws');

    const props: AgendaCreateInputDTO = {
      id: payloadJson.id,
      veiculoId: payloadJson.veiculoId,
      servicoIds: payloadJson.servicoIds,
      dataInicio: new Date(payloadJson.dataInicio),
    };

    const valida = new ValidaAgenda();
    const dataFim = await valida.calculateDataFimServicos(props.dataInicio, props.servicoIds);
    await valida.temFuncionarios(props.dataInicio, dataFim);

    const socketId = await cliRedis.get(`user:${payloadJson.socket}:socketId`);

    if (valida.error.hasError === true) {
      const errorPadronizado = new BadRequestError({
        errors: [{
          title: 'Erro ao criar a agenda',
          detail: valida.error.message[0],
          instance: 'agenda:create',
        }],
      });

      ioInstance.to(socketId).emit('agenda:error', errorPadronizado);

      return '';
    }

    const result = await addServicosService.add(props);

    ioInstance.emit('agenda:create', result);
    ioInstance.to(socketId).emit('agenda:confirmada', `agenda: ${props.dataInicio.toUTCString()} criada com sucesso`);
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
