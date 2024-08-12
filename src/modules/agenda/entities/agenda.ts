import { randomUUID, UUID } from 'node:crypto';
import { AgendaInput, AgendaOutput } from './agenda.d';

class Agenda {
  private id: UUID;

  private props: AgendaInput;

  constructor(props: AgendaInput) {
    this.initialize(props);
    this.id = randomUUID() || props.id;
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
}

export default Agenda;
