import { Socket } from 'socket.io';
import { container } from 'tsyringe';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados/servicosAgendados';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';
import AddServicosService from '@/modules/agenda/services/addServicos/addServicos';
import { ServicoVeiculoInterface } from '@/modules/agenda/interfaces/servicoVeiculoInterface';

import { BadRequestError } from '@/shared/infra/middlewares/errorAbst';
import { websocketInstance } from '@/shared/core/server';

container.register<ServicoVeiculoInterface>('ServicoVeiculoInterface', {
  useClass: VeiculoServicosRepository,
});

const addServicosService = container.resolve(AddServicosService);
const servicosAgendados = container.resolve(ServicosAgendados);

export default class AgendaControllerWS {
  async createAgenda(payload: string) {
    const socketInstance = websocketInstance.ioInstance;
    const payloadJson = JSON.parse(payload);

    const props = {
      veiculoId: payloadJson.veiculoId,
      servicoIds: payloadJson.servicoIds,
      dataInicio: payloadJson.dataInicio,
    };

    const result = await addServicosService.add(props);

    if ('hasError' in result && result.hasError) {
      throw new BadRequestError({
        type: 'validation_error',
        errors: result.message.map((message) => ({
          title: 'validation_error',
          detail: message,
          instance: 'agenda/create',
        })),
      });
    }

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
