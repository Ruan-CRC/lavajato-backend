import { VeiculoServico } from '@prisma/client';

export interface AddServicosInterface {
  addServicos(idVeiculo: number, idServico: number): Promise<VeiculoServico>
}
