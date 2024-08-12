import { VeiculoInterface } from '../../interfaces/veiculoInterface';
import { VeiculoImputDTO, UserImputDTO } from '../DTOs/mainFunctions';

export default class CreateVeiculoService {
  constructor(
    private veiculoInterface: VeiculoInterface,
  ) { }

  async create(dataVeiculo: VeiculoImputDTO, dataUser: UserImputDTO): Promise<string | boolean> {
    const idVeiculo = await this.veiculoInterface.create({
      placa: dataVeiculo.placa,
      tipo: dataVeiculo.tipo,
      user: dataUser.id,
    });

    if (!idVeiculo) {
      return 'Error creating veiculo';
    }

    return idVeiculo;
  }
}
