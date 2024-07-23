import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '@/shared/infra/prisma/prisma';

import CreateVeiculoService from '@/modules/veiculos/services/createVeiculoService';
import GetVeiculoService from '@/modules/veiculos/services/getVeiculoService';
import AllVeiculosService from '@/modules/veiculos/services/allVeiculosService';

export default class VeiculoController {
  constructor(
    private createVeiculoService: CreateVeiculoService,
    private getVeiculoService: GetVeiculoService,
    private allVeiculosService: AllVeiculosService,
  ) { }

  async create(req: Request, res: Response) {
    const { placa, tipo, user } = req.body;

    try {
      // TODO: criar use-case de buscar usuário
      const donoVeiculo = await prisma.user.findUnique({
        where: {
          idUser: user,
        },
      });

      if (!donoVeiculo) {
        throw new Error('Usuário não encontrado!');
      }

      const idVeiculo = await this.createVeiculoService
        .create({ placa, tipo }, { id: donoVeiculo.id });

      return res.status(201).json({
        placa,
        tipo,
        user,
        idVeiculo,
      });
    } catch (err) {
      return res.status(404).json({ error: (err as Error).message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = z.string().parse(req.params.id);

    try {
      const veiculo = await this.getVeiculoService.get(id);

      return res.status(200).json(veiculo);
    } catch (err) {
      return res.status(404).json({ error: (err as Error).message });
    }
  }

  async all(res: Response) {
    const veiculos = await this.allVeiculosService.get();

    return res.status(200).json({ data: veiculos });
  }
}
