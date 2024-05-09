import { Request, Response } from 'express';
import CreateVeiculoService from '@/modules/veiculos/services/createVeiculo';
import AddServicosService from '../../../services/addServicos';
import prisma from '@/shared/infra/prisma/prisma';

export default class VeiculoController {
  constructor(
    private createVeiculoService: CreateVeiculoService,
    private addServicoService: AddServicosService,
  ) {}

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

      await this.createVeiculoService.createVeiculo({ placa, tipo }, { id: donoVeiculo.id });

      return res.status(201).json({ message: 'Veículo criado com sucesso!' });
    } catch (err) {
      return res.status(404).json({ error: (err as Error).message });
    }
  }

  async addServico(req: Request, res: Response) {
    const { veiculoId, servicoId } = req.body;

    try {
      const servico = await this.addServicoService.add(veiculoId, servicoId);

      return res.status(201).json({ message: 'Serviço adicionado com sucesso!', servico });
    } catch (err) {
      return res.status(404).json({ error: (err as Error).message });
    }
  }
}
