import { ServicoVeiculoInterface } from '../interfaces/servicoVeiculoInterface';

export default class ServicosAgendados {
  constructor(private servicoVeiculoInterface: ServicoVeiculoInterface) { }

  async servicosAgendados() {
    const servicosEmAgendamento = await this.servicoVeiculoInterface.getServicosEmAgendamento();

    if (servicosEmAgendamento.length === 0) {
      return 'Nenhum serviço agendado';
    }

    return servicosEmAgendamento;
  }
}
