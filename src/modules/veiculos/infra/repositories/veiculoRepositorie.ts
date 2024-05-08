import { Prisma, Veiculo } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateVeiculoInterface } from '../../interfaces/createVeiculoInterface';

export default class VeiculoRepository implements CreateVeiculoInterface {
  async create(data: Prisma.VeiculoCreateInput): Promise<Veiculo> {
    const veiculo = await prisma.veiculo.create({
      data,
    });

    return {
      id: veiculo.id,
      placa: veiculo.placa,
      tipo: veiculo.tipo,
      userId: veiculo.userId,
    };
  }
}
