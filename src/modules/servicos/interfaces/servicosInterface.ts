import { Prisma, Servico } from '@prisma/client';

export interface ServicosWithMetadados {
  id: number
  nome: string
  descricao: string
  servicoValor: {
    valor: number
    tempo: number
  }[]
}

export default interface ServicosInterface {
  create(data: Prisma.ServicoCreateNestedManyWithoutAgendasInput): Promise<Servico>;
  all(): Promise<Servico[]>;
  getById(id: number[]): Promise<ServicosWithMetadados[] | null>;
}
