import { Funcionario } from '@prisma/client';
import prisma from '@/shared/infra/prisma/prisma';
import { FuncionarioInterface } from '../../interfaces/funcionariosInteraface';

class FuncionarioRepository implements FuncionarioInterface {
  async create(props: Funcionario): Promise<void> {
    await prisma.funcionario.create({
      data: {
        cpf: props.cpf,
        email: props.email,
        password: props.password,
        telefone: props.telefone,
        endereco: props.endereco,
        funcao: { connect: { id: props.id } },
      },
    });
  }
}

export default FuncionarioRepository;
