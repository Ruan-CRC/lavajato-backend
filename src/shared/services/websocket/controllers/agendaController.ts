import { Socket } from 'socket.io';
import { container } from 'tsyringe';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados/servicosAgendados';
import VeiculoServicosRepository from '@/modules/agenda/infra/repositories/veiculo-servicos-repositories';
import AddServicosService from '@/modules/agenda/services/addServicos/addServicos';
import { ServicoVeiculoInterface } from '@/modules/agenda/interfaces/servicoVeiculoInterface';
import { websocketInstance } from '@/shared/core/server';
import { AgendaOutput } from '../../../../modules/agenda/entities/agenda.d';

container.register<ServicoVeiculoInterface>('ServicoVeiculoInterface', {
  useClass: VeiculoServicosRepository,
});

const addServicosService = container.resolve(AddServicosService);
const servicosAgendados = container.resolve(ServicosAgendados);

export default class AgendaControllerWS {
  async createAgenda(payload: string) {
    const socketInstance = websocketInstance.ioInstance;
    const payloadJson = JSON.parse(payload);

    const props: AgendaOutput = {
      id: payloadJson.id,
      veiculoId: payloadJson.veiculoId,
      servicoIds: payloadJson.servicoIds,
      dataInicio: payloadJson.dataInicio,
      dataFim: payloadJson.dataFim,
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
