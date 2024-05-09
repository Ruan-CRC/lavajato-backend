import { Prisma, User } from '@prisma/client';

interface UserOutputDTO {
  idUser: string
  name: string
  email: string
  telefone?: string
  endereco?: string
}

export interface CreateUserInterface {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<UserOutputDTO>
}
