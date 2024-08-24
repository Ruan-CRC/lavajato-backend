import { Funcionario } from '@prisma/client';

export interface CreateFuncionario extends Funcionario {
  id: number | null;
}

export interface FuncionarioInterface {
  create(props: CreateFuncionario): Promise<void>
}
