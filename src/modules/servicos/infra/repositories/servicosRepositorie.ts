import { Servico } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import ServicosInterface from '../../interfaces/servicosInterface';
import { ServicosWithMetadados, InputServicosWithMetadados } from '../../services/createServicos/createServico';

export default class ServicoRepository implements ServicosInterface {
  async all(): Promise<Servico[]> {
    const servicos = await prisma.servico.findMany();

    return servicos;
  }

  async create(data: InputServicosWithMetadados): Promise<ServicosWithMetadados> {
    const servico = await prisma.servico.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        servicoValor: {
          create: data.servicoValor.map((servce) => ({
            valor: servce.valor,
            tempo: servce.tempo,
            tipoVeiculo: {
              connect: { id: servce.tipoVeiculoId },
            },
          })),
        },
      },
    });

    const servicoComValores = await prisma.servico.findUnique({
      where: { id: servico.id },
      include: {
        servicoValor: {
          select: {
            tipoVeiculoId: true,
            valor: true,
            tempo: true,
          },
        },
      },
    });

    return servicoComValores;
  }

  async getById(ids: number[]): Promise<ServicosWithMetadados[]> {
    const servicos = await prisma.servico.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        servicoValor: {
          select: {
            valor: true,
            tempo: true,
          },
        },
      },
    });

    return servicos;
  }
}
