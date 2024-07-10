import { Prisma, Servico } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import CreateServicosInterface from '../../interfaces/servicosInterface';

export default class ServicoRepository implements CreateServicosInterface {
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
}
