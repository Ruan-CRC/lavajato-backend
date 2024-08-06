import { randomUUID, UUID } from 'node:crypto';
import { AgendaInput, AgendaOutput, AgendaError } from './agenda.d';

class Agenda {
  private id: UUID;

  private error: AgendaError;

  private props: AgendaInput;

  constructor(props: AgendaInput) {
    this.error = { hasError: false, message: [] };
    this.validate(props);
    this.initialize(props);
    this.id = randomUUID() || props.id;
  }

  private validate(props: AgendaInput) {
    const HORARIO_ABRE_LAVAJATO = 8;
    const HORARIO_FECHA_LAVAJATO = 18;
    const { dataInicio } = props;

    const HORA_INICIA_AGENDA = new Date(dataInicio).getHours();

    if (
      (HORA_INICIA_AGENDA < HORARIO_ABRE_LAVAJATO) || (HORA_INICIA_AGENDA > HORARIO_FECHA_LAVAJATO)
    ) {
      this.error.hasError = true;
      this.error.message.push('Horário fora do expediente');
    }
  }

  private initialize(props: AgendaInput): void {
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
