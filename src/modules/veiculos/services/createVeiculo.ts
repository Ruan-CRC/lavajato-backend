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
  ) {}

  async createVeiculo(dataVeiculo: VeiculoImputDTO, dataUser: UserImputDTO): Promise<{}> {
    return this.createVeiculoInterface.create({
      placa: dataVeiculo.placa,
      tipo: dataVeiculo.tipo,
      user: dataUser.id,
    });
  }
}
