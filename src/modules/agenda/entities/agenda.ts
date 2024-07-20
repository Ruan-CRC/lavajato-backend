import { randomUUID, UUID } from 'node:crypto';
import { AgendaInput, AgendaOutput } from './agenda.d';

class Agenda {
  private id: UUID;

  private props: AgendaInput;

  constructor(props: AgendaInput) {
    this.id = randomUUID();
    this.props = props;
    this.validateAndInitialize(props);
  }

  private validateAndInitialize(props: AgendaInput): void {
    const HORARIO_INICIO = 8;
    const HORARIO_FIM = 18;
    const { dataInicio } = props;

    const HORA_AGENDA = new Date(dataInicio).getHours();

    if (HORA_AGENDA < HORARIO_INICIO || HORA_AGENDA > HORARIO_FIM) {
      throw new Error('Horário fora do expediente');
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
}

export default Agenda;
