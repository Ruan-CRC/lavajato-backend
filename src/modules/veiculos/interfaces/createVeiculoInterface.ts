import { Prisma, Veiculo } from '@prisma/client';

export interface CreateVeiculoInterface {
  create(data: Prisma.VeiculoCreateWithoutServicosInput): Promise<Veiculo>
}
// VeiculoCreateWithoutUserInput
