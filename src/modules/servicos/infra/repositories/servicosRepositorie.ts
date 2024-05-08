import { Prisma, Servico } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import CreateServicosInterface from '../../interfaces/createServicosInterface';

export default class ServicoRepository implements CreateServicosInterface {
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
