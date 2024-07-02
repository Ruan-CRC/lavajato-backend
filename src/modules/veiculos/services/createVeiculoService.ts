import { CreateVeiculoInterface } from '../interfaces/createVeiculoInterface';

interface VeiculoImputDTO {
  placa: string
  tipo: string
}

interface UserImputDTO {
  id: number
}

export default class CreateVeiculoService {
  constructor(
    private createVeiculoInterface: CreateVeiculoInterface,
  ) { }

  async create(dataVeiculo: VeiculoImputDTO, dataUser: UserImputDTO): Promise<string | boolean> {
    const idVeiculo = this.createVeiculoInterface.create({
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
