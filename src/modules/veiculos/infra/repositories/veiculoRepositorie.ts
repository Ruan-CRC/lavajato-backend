/* eslint-disable @typescript-eslint/no-unused-vars */
import { Veiculo, TiposVeiculos } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateVeiculoInterface } from '../../interfaces/createVeiculoInterface';
import RepositoryInterface from '@/shared/infra/modules/repository/repositoryInterface';

interface VeiculoInput {
  placa: string;
  tipo: TiposVeiculos
  user: number
}

type Id = string;

export default class VeiculoRepository implements RepositoryInterface, CreateVeiculoInterface {
  async findById(id: string): Promise<Veiculo | boolean> {
    const veiculo = await prisma.veiculo.findFirst({
      where: {
        // eslint-disable-next-line radix
        id: parseInt(id),
      },
    });

    return veiculo ?? false;
  }

  update(E: any): Promise<boolean | void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean | void> {
    throw new Error('Method not implemented.');
  }

  async create(data: VeiculoInput): Promise<Id | boolean> {
    const veiculo = await prisma.veiculo.create({
      data: {
        placa: data.placa,
        tipo: data.tipo,
        user: { connect: { id: data.user } },
      },
    });

    if (!veiculo) {
      return false;
    }

    return veiculo.id.toString();
  }
}
