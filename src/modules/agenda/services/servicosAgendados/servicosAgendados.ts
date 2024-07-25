import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';

export default class ServicosAgendados {
  constructor(private servicoVeiculoInterface: ServicoVeiculoInterface) { }

  async servicosAgendados() {
    const servicosEmAgendamento = await this.servicoVeiculoInterface.getServicosEmAgendamento();

    return servicosEmAgendamento;
  }
}
