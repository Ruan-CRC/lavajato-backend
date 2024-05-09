import { Prisma, Servico } from '@prisma/client';

export default interface CreateServicosInterface {
  create(data: Prisma.ServicoCreateWithoutVeiculosInput): Promise<Servico>;
}
