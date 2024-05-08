import { Prisma, User } from '@prisma/client';

interface UserOutputDTO {
  id: number
  name: string
  email: string
  telefone?: string
  endereco?: string
}

export interface CreateUserInterface {
  findByEmail(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<UserOutputDTO>
}
