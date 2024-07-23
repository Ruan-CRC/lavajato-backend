import { Request, Response } from 'express';

import { z } from 'zod';

import CreateServicoService from '@/modules/servicos/services/createServicos/createServicoServices';
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
      servicoValor: z.array(z.object({
        tipoVeiculoId: z.number(),
        valor: z.number(),
        tempo: z.number(),
      })),
    }), req.body);

    if (isValidRequest.valueOf() !== true) {
      return res.status(400).json({ error: isValidRequest });
    }

    const veiculo = await this.createServicoService.create(req.body);

    return res.json({ veiculo });
  }

  async all(res: Response) {
    const servicos = await this.allServicosServices.get();

    return res.json({ servicos });
  }
}
