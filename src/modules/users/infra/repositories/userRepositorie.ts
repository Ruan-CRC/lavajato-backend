import { Prisma } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateUserInterface, UserOutputDTO } from '../../interfaces/createUserInterface';

export default class UsersRepository implements CreateUserInterface {
  async create(data: Prisma.UserCreateInput): Promise<UserOutputDTO> {
    const user = await prisma.user.create({
      data,
    });

    return {
      id: user.idUser,
      idUser: user.idUser,
      name: user.name,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
    };
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
