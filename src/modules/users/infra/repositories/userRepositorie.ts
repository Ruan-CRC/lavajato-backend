import { Prisma } from '@prisma/client';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateUserInterface } from '../../repositoriesInterface/createUserInterface';

interface UserOutputDTO {
  id: number
  name: string
  email: string
  telefone?: string
  endereco?: string
}

export default class UsersRepository implements CreateUserInterface {
  findByEmail(email: string): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    telefone: string | null;
    endereco: string | null;
  } | null> {
    throw new Error(`Method not implemented. ${email}`);
  }

  async create(data: Prisma.UserCreateInput): Promise<UserOutputDTO> {
    const user = await prisma.user.create({
      data,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
    };
  }
}
