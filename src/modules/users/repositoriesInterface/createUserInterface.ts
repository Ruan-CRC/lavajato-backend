import { Prisma, User } from '@prisma/client';

export interface CreateUserInterface {
  findByEmail(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<{}>
}
