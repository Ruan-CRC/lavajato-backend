import { Prisma } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateUserInterface } from '../../interfaces/createUserInterface';

export default class UsersRepository implements CreateUserInterface {
  findByEmail(email: string): Promise<{
    id: number;
    idUser: string;
    name: string;
    email: string;
    password: string;
    telefone: string | null;
    endereco: string | null;
  } | null> {
    throw new Error(`Method not implemented. ${email}`);
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return {
      idUser: user.idUser,
      name: user.name,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
    };
  }
}
