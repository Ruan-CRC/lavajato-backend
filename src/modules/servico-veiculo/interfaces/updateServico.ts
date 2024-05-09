import { VeiculoServico } from '@prisma/client';

export interface UpdateServicosInterface {
  updateServico(
    idVeiculo: number, idServico: number, dataInicio: string, dataFim?: string
  ): Promise<VeiculoServico>
}
