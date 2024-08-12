import { decorators } from 'tsyringe';
import { UUID, randomUUID } from 'node:crypto';
import { AgendaError, AgendaCreateInputDTO } from '../../entities/agenda.d';

const { injectable } = decorators;

@injectable()
export default class ValidaAgenda {
  private readonly error: AgendaError = { hasError: false, message: [] };

  async main(props: AgendaCreateInputDTO): Promise<UUID | AgendaError> {
    const { dataInicio } = props;

    const HORARIO_ABRE_LAVAJATO = 8;
    const HORARIO_FECHA_LAVAJATO = 18;
    const HORA_INICIA_AGENDA = new Date(dataInicio).getHours();

    if (
      (HORA_INICIA_AGENDA < HORARIO_ABRE_LAVAJATO) || (HORA_INICIA_AGENDA > HORARIO_FECHA_LAVAJATO)
    ) {
      this.error.hasError = true;
      this.error.message.push('Horário fora do expediente');
    }

    if (this.error.hasError === true) {
      return this.error;
    }

    return randomUUID();
  }
}
