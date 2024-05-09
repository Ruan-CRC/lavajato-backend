import { Veiculo } from '@prisma/client';

interface VeiculoInput {
  placa: string;
  tipo: string;
  user: number
}
export interface CreateVeiculoInterface {
  create(data: VeiculoInput): Promise<Veiculo>
}
// VeiculoCreateWithoutUserInput
