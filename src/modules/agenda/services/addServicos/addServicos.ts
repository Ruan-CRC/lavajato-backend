import { decorators } from 'tsyringe';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import Agenda from '../../entities/agenda';
import { AgendaOutput } from '../../entities/agenda.d';

const { injectable, inject } = decorators;

@injectable()
export default class AddServicosService {
  constructor(
    @inject('ServicoVeiculoInterface') private servicoVeiculoInterface: ServicoVeiculoInterface,
  ) { }

  async add(props: AgendaOutput): Promise<AgendaOutput> {
    const {
      id, veiculoId, servicoIds, dataInicio, dataFim,
    } = props;

    const agenda = new Agenda({
      id,
      veiculoId,
      servicoIds,
      dataInicio,
      dataFim,
    });

    const servico = await this.servicoVeiculoInterface
      .addServicos(agenda.getEntidade());
    return servico;
  }
}
