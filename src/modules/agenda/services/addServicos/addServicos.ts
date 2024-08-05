import decorators from 'tsyringe';
import dayjs from 'dayjs';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import ServicoRepository from '@/modules/servicos/infra/repositories/servicosRepositorie';
import Agenda from '../../entities/agenda';
import { CreateInputDTO } from './addServicos.dto';
import { AgendaOutput, AgendaError } from '../../entities/agenda.d';

const { injectable, inject } = decorators;

@injectable()
export default class AddServicosService {
  constructor(
    @inject('ServicoVeiculoInterface') private servicoVeiculoInterface: ServicoVeiculoInterface,
  ) { }

  async add(props: CreateInputDTO): Promise<AgendaOutput | AgendaError> {
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

    if (agenda.getError().hasError === true) {
      return agenda.getError();
    }

    const servico = await this.servicoVeiculoInterface
      .addServicos(agenda.getEntidade());
    return servico;
  }
}
