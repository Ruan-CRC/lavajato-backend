/* eslint-disable @typescript-eslint/no-unused-vars */
import { Veiculo, TiposVeiculos } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { VeiculoInterface } from '../../interfaces/veiculoInterface';

interface VeiculoInput {
  placa: string;
  tipo: TiposVeiculos
  user: number
}

export default class VeiculoRepository implements VeiculoInterface {
  async all(): Promise<any> {
    const veiculos = await prisma.veiculo.findMany();

    return veiculos;
  }

  async index(id: string): Promise<Veiculo | boolean> {
    const veiculo = await prisma.veiculo.findFirstOrThrow({
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

  delete(id: number): Promise<boolean | void> {
    throw new Error('Method not implemented.');
  }

  async create(data: VeiculoInput): Promise<string | boolean> {
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
