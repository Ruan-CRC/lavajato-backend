import dayjs from 'dayjs';

import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import ServicoRepository from '@/modules/servicos/infra/repositories/servicosRepositorie';
import Agenda from '../../entities/agenda';
import { CreateInputDTO } from './addServicos.dto';
import { AgendaOutput } from '../../entities/agenda.d';

export default class AddServicosService {
  constructor(
    private servicoVeiculoInterface: ServicoVeiculoInterface,
  ) { }

  async add(props: CreateInputDTO): Promise<AgendaOutput> {
    // TODO: validacao de veiculo e servico
    const { veiculoId, servicoIds, dataInicio } = props;

    const serv = new ServicoRepository();
    const servicos = await serv.getById(servicoIds);

    const tempoTotal = servicos
      .map((servico) => servico.servicoValor.map((valor) => valor.tempo))
      .flat()
      .reduce((acc, valor) => acc + valor, 0);
    const dataFim = new Date(dayjs(dataInicio).minute(tempoTotal).toString());

    const agenda = new Agenda({
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
