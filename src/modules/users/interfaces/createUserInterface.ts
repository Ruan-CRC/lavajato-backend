import { Prisma } from '@prisma/client';

export interface UserOutputDTO {
  id: string
  idUser: string
  name: string
  email: string
  telefone?: string
  endereco?: string
}

export interface CreateUserInterface {
  findByEmail(email: string): Promise<UserOutputDTO | boolean>
  create(data: Prisma.UserCreateInput): Promise<UserOutputDTO>
}
