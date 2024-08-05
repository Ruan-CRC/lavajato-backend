import { randomUUID, UUID } from 'node:crypto';
import { AgendaInput, AgendaOutput, AgendaError } from './agenda.d';

class Agenda {
  private id: UUID;

  private error: AgendaError;

  private props: AgendaInput;

  constructor(props: AgendaInput) {
    this.id = randomUUID();
    this.error = { hasError: false, message: [] };
    this.props = props;
    this.validateAndInitialize(props);
  }

  private validateAndInitialize(props: AgendaInput): void {
    const HORARIO_INICIO = 8;
    const HORARIO_FIM = 18;
    const { dataInicio } = props;

    const HORA_AGENDA = new Date(dataInicio).getHours();

    if (HORA_AGENDA < HORARIO_INICIO || HORA_AGENDA > HORARIO_FIM) {
      this.error.hasError = true;
      this.error.message.push('Horário fora do expediente');
    }

    this.props = {
      ...props,
      dataInicio: new Date(props.dataInicio),
      dataFim: new Date(props.dataFim),
    };
  }

  getEntidade(): AgendaOutput {
    return {
      id: this.id,
      servicoIds: this.props.servicoIds,
      veiculoId: this.props.veiculoId,
      dataInicio: this.props.dataInicio,
      dataFim: this.props.dataFim,
    };
  }

  getError(): AgendaError {
    return this.error;
  }
}

export default Agenda;
