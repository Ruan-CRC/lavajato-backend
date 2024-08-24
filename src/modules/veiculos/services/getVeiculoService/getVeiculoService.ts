import { VeiculoInterface } from '../../interfaces/veiculoInterface';

export default class GetVeiculoService {
  constructor(private veiculoInterface: VeiculoInterface) { }

  async get(id: string) {
    const veiculo = await this.veiculoInterface.index(id);

    if (!veiculo) {
      return 'veiculo não encontrado';
    }

    return veiculo;
  }
}
