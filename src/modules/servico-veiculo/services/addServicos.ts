import { ServicoVeiculoInterface } from '../interfaces/servicoVeiculoInterface';

export default class AddServicosService {
  constructor(private servicoVeiculoInterface: ServicoVeiculoInterface) { }

  async add(veiculoId: number, servicoId: number) {
    // TODO: validacao de veiculo e servico
    const servico = await this.servicoVeiculoInterface.addServicos(veiculoId, servicoId);
    return servico;
  }
}
