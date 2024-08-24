import { decorators } from 'tsyringe';
import dayjs from 'dayjs';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import Agenda from '../../entities/agenda';
import { AgendaOutput, AgendaCreateInputDTO } from '../../entities/agenda.d';
import calculaTempoTotalServicos from '@/shared/infra/modules/helpers/calculaTempoTotalServicos';

const { injectable, inject } = decorators;

@injectable()
export default class AddServicosService {
  constructor(
    @inject('ServicoVeiculoInterface') private servicoVeiculoInterface: ServicoVeiculoInterface,
  ) { }

  async add(props: AgendaCreateInputDTO): Promise<AgendaOutput | string> {
    const {
      id, veiculoId, servicoIds, dataInicio,
    } = props;

    const tempoTotalServicos = await calculaTempoTotalServicos(servicoIds);

    const dataFim = new Date(dayjs(dataInicio).minute(tempoTotalServicos).toString());

    const agenda = new Agenda({
      id,
      veiculoId,
      servicoIds,
      dataInicio,
      dataFim,
    });

    const servico = await this.servicoVeiculoInterface
      .addServicos(agenda.getEntidade());

    if (typeof servico === 'string') {
      return servico;
    }

    return servico;
  }
}
