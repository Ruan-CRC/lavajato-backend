import { Request, Response } from 'express';
import CreateServicoService from '@/modules/servicos/services/createServicos';

export default class ServicoController {
  constructor(private createServicoService: CreateServicoService) {}

  async create(req: Request, res: Response) {
    const { nome, descricao, valor } = req.body;

    const veiculo = await this.createServicoService.create({ nome, descricao, valor });

    return res.json({ veiculo });
  }
}
