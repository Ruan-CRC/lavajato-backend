import { UUID } from 'node:crypto';
import { Prisma } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateUserInterface, UserOutputDTO, InputCreate } from '../../interfaces/createUserInterface';
import { OutputCreateUser } from '../../services/createUser/create';

export default class UsersRepository implements CreateUserInterface {
  async create(data: InputCreate): Promise<OutputCreateUser> {
    const user = await prisma.user.create({
      data: {
        idUser: data.id,
        email: data.email,
        telefone: data.telefone,
        endereco: data.endereco,
        veiculos: {
          create: {
            placa: data.veiculo[0].placa,
            tipoVeiculoId: data.veiculo[0].tipo,
          },
        },
      },
    });

    const veiculos = await prisma.veiculo.findMany({
      where: {
        userId: user.id,
      },
    });

    return {
      id: user.idUser as UUID,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
      veiculo: user.
    }
  }

  async findByEmail(email: string): Promise<UserOutputDTO | boolean> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    return {
      id: user.id.toString(),
      idUser: user.idUser,
      name: user.name,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
    };
  }
}
