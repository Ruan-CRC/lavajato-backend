import decorators from 'tsyringe';

import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';

const { injectable, inject } = decorators;

@injectable()
export default class ServicosAgendados {
  constructor(
    @inject('ServicoVeiculoInterface') private servicoVeiculoInterface: ServicoVeiculoInterface,
  ) { }

  async servicosAgendados() {
    const servicosEmAgendamento = await this.servicoVeiculoInterface.getServicosEmAgendamento();

    return servicosEmAgendamento;
  }
}
