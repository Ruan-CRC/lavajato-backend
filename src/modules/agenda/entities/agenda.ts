import { randomUUID } from 'node:crypto';
import { AgendaInput, AgendaOutput } from './agenda.d';

class Agenda {
  constructor(
    private props: AgendaInput,
  ) {
    this.create(props);
  }

  private create(props: AgendaInput): AgendaOutput | string {
    const HORARIO_INICIO = 8;
    const HORAIO_FIM = 18;
    const { dataInicio } = props;

    if ((dataInicio.getHours() < HORARIO_INICIO) || (dataInicio.getHours() > HORAIO_FIM)) return 'Horário fora do expediente';

    this.props.id = randomUUID();
    this.props.servicoId = props.servicoId;
    this.props.veiculoId = props.veiculoId;
    this.props.dataInicio = props.dataInicio ?? new Date();
    this.props.dataFim = props.dataFim ?? null;

    return {
      id: this.props.id,
      servicoId: this.props.servicoId,
      veiculoId: this.props.veiculoId,
      dataInicio: this.props.dataInicio,
      dataFim: this.props.dataFim,
    };
  }

  set dataInicio(dataInicio: Date) {
    this.props.dataInicio = dataInicio;
  }

  getEntite(): AgendaOutput {
    return {
      id: this.props.id,
      servicoId: this.props.servicoId,
      veiculoId: this.props.veiculoId,
      dataInicio: this.props.dataInicio,
      dataFim: this.props.dataFim,
    };
  }
}

export default Agenda;
