import { Prisma, Servico } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import ServicosInterface, { ServicosWithMetadados } from '../../interfaces/servicosInterface';

export default class ServicoRepository implements ServicosInterface {
  async all(): Promise<Servico[]> {
    const servicos = await prisma.servico.findMany();

    return servicos;
  }

  async create(data: Prisma.ServicoCreateInput): Promise<Servico> {
    const servico = await prisma.servico.create({
      data,
    });

    return {
      id: servico.id,
      nome: servico.nome,
      descricao: servico.descricao,
      valor: servico.valor,
    };
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
