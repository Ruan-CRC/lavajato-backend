import { VeiculoServico } from '@prisma/client';

export interface ServicoVeiculoInterface {
  updateServico(
    idVeiculo: number, idServico: number, dataInicio: string, dataFim?: string
  ): Promise<VeiculoServico>
  addServicos(idVeiculo: number, idServico: number): Promise<VeiculoServico>
  getServicosEmAgendamento(): Promise<VeiculoServico[]>
}
