import { Veiculo, TiposVeiculos } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateVeiculoInterface } from '../../interfaces/createVeiculoInterface';
import { AddServicosInterface } from '../../interfaces/addServicoInterface';

interface VeiculoInput {
  placa: string;
  tipo: TiposVeiculos
  user: number
}

export default class VeiculoRepository implements CreateVeiculoInterface, AddServicosInterface {
  async create(data: VeiculoInput): Promise<Veiculo> {
    const veiculo = await prisma.veiculo.create({
      data: {
        placa: data.placa,
        tipo: data.tipo,
        user: { connect: { id: data.user } },
      },
    });

    return {
      id: veiculo.id,
      placa: veiculo.placa,
      tipo: veiculo.tipo,
      userId: veiculo.userId,
    };
  }

  async addServicos(veiculoId: number, servicoId: number): Promise<any> {
    const agenda = await prisma.veiculoServico.create({
      data: {
        veiculoId,
        servicoId,
        dataInicio: new Date(),
      },
    });

    return agenda;
  }
}
