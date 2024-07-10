import { Prisma, Servico } from '@prisma/client';

export default interface ServicosInterface {
  create(data: Prisma.ServicoCreateWithoutVeiculosInput): Promise<Servico>;
  all(): Promise<Servico[]>;
}
