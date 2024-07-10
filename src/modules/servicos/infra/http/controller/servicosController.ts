import { Request, Response } from 'express';

import { z } from 'zod';

import CreateServicoService from '@/modules/servicos/services/createServicos';
import AllServicosServices from '@/modules/servicos/services/allServicos';

import safeParseModel from '@/shared/infra/helpers/parserZod';

export default class ServicoController {
  constructor(
    private createServicoService: CreateServicoService,
    private allServicosServices: AllServicosServices,
  ) { }

  async create(req: Request, res: Response) {
    const isValidRequest = safeParseModel(z.object({
      nome: z.string(),
      descricao: z.string().optional(),
      valor: z.number(),
    }), req.body);

    if (!isValidRequest) {
      return res.status(400).json({ error: isValidRequest });
    }

    const { nome, descricao, valor } = req.body;

    const veiculo = await this.createServicoService.create({ nome, descricao, valor });

    return res.json({ data: veiculo });
  }

  async all(res: Response) {
    const servicos = await this.allServicosServices.get();

    return res.json({ data: servicos });
  }
}
