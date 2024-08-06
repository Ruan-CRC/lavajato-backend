import { injectable } from 'tsyringe';
import dayjs from 'dayjs';
import Agenda from '../../entities/agenda';
import { CreateInputDTO } from '../addServicos/addServicos.dto';
import { AgendaError, AgendaOutput } from '../../entities/agenda.d';
import calculaTempoTotalServicos from '@/shared/infra/modules/helpers/calculaTempoTotalServicos';

@injectable()
export default class ValidaAgenda {
  async add(props: CreateInputDTO): Promise<AgendaOutput | AgendaError> {
    const { veiculoId, servicoIds, dataInicio } = props;

    const tempoTotalServicos = await calculaTempoTotalServicos(servicoIds);

    const dataFim = new Date(dayjs(dataInicio).minute(tempoTotalServicos).toString());

    const agenda = new Agenda({
      veiculoId,
      servicoIds,
      dataInicio,
      dataFim,
    });

    if (agenda.getError().hasError === true) {
      const errors = agenda.getError();
      return errors;
    }

    return agenda.getEntidade();
  }
}
