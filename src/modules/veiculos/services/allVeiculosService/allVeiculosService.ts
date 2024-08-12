import { VeiculoInterface } from '../../interfaces/veiculoInterface';
import { VeiculosOutputDTO } from '../DTOs/mainFunctions';

export default class AllVeiculosService {
  constructor(private veiculoInterface: VeiculoInterface) { }

  async get(): Promise<VeiculosOutputDTO[] | string> {
    const veiculo = await this.veiculoInterface.all();

    if (!veiculo) {
      return 'Sem veiculos cadastrados';
    }

    return veiculo;
  }
}
