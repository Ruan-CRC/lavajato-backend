import { Request, Response } from 'express';
import CreateVeiculoService from '@/modules/veiculos/services/createVeiculo';

export default class VeiculoController {
  constructor(private createVeiculoService: CreateVeiculoService) {}

  async create(req: Request, res: Response) {
    const { placa, tipo, user } = req.body;

    const veiculo = await this.createVeiculoService.createWithUser({ placa, tipo }, { id: user });

    return res.json(veiculo);
  }
}
