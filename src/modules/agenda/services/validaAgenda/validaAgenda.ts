/* eslint-disable no-underscore-dangle */
import { UUID, randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import { AgendaError, AgendaCreateInputDTO } from '../../entities/agenda.d';
import temFuncionarioDisponivel from '@/shared/infra/modules/helpers/temFuncionarioDisponivel';
import calculaTempoTotalServicos from '@/shared/infra/modules/helpers/calculaTempoTotalServicos';

export default class ValidaAgenda {
  private readonly _error: AgendaError = { hasError: false, message: [] };

  async main(props: AgendaCreateInputDTO): Promise<UUID> {
    this.estaNoHorarioDeFuncionamento(props.dataInicio);

    await this.calculateDataFimServicos(props.dataInicio, props.servicoIds);

    return randomUUID();
  }

  estaNoHorarioDeFuncionamento(dataInicio: Date): void {
    const HORARIO_ABRE_LAVAJATO = 8;
    const HORARIO_FECHA_LAVAJATO = 18;
    const HORA_INICIA_AGENDA = dataInicio.getUTCHours();

    if (
      (HORA_INICIA_AGENDA <= HORARIO_ABRE_LAVAJATO) || (HORA_INICIA_AGENDA > HORARIO_FECHA_LAVAJATO)
    ) {
      this._error.hasError = true;
      this._error.message.push('Horário fora do expediente');
    }
  }

  async temFuncionarios(dataInicio: Date, dataFim: Date): Promise<void> {
    const funcionariosDisponiveis = await temFuncionarioDisponivel(dataInicio, dataFim);

    if (funcionariosDisponiveis.length === 0) {
      this._error.hasError = true;
      this._error.message.push(`Nenhum funcionário disponível neste horário entre ${dataInicio} e ${dataFim}`);
    }
  }

  async calculateDataFimServicos(dataInicio: Date, servicoIds: number[]): Promise<Date> {
    const tempoTotalServicos = await calculaTempoTotalServicos(servicoIds);

    return new Date(dayjs(dataInicio).minute(tempoTotalServicos).toString());
  }

  get error(): AgendaError {
    return this._error;
  }
}
