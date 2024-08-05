import { injectable } from 'tsyringe';
import dayjs from 'dayjs';
import ServicoRepository from '@/modules/servicos/infra/repositories/servicosRepositorie';
import Agenda from '../../entities/agenda';
import { CreateInputDTO } from '../addServicos/addServicos.dto';
import { AgendaError } from '../../entities/agenda.d';

@injectable()
export default class ValidaAgenda {
  async add(props: CreateInputDTO): Promise<boolean | AgendaError> {
    const { veiculoId, servicoIds, dataInicio } = props;

    const serv = new ServicoRepository();
    const servicos = await serv.getById(servicoIds);

    const tempoTotalServicos = servicos
      .map((servico) => servico.servicoValor.map((valor) => valor.tempo))
      .flat()
      .reduce((acc, valor) => acc + valor, 0);
    const dataFim = new Date(dayjs(dataInicio).minute(tempoTotalServicos).toString());

    const agenda = new Agenda({
      veiculoId,
      servicoIds,
      dataInicio,
      dataFim,
    });

    if (agenda.getError().hasError === true) {
      return agenda.getError();
    }

    return true;
  }
}
