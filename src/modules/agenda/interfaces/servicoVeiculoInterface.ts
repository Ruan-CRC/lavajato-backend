import { Agenda } from '@prisma/client';

export interface ServicoVeiculoInterface {
  updateServico(
    idServico: string, dataInicio?: string, dataFim?: string
  ): Promise<Agenda>
  addServicos(idVeiculo: number, idServico: number): Promise<Agenda>
  getServicosEmAgendamento(): Promise<Agenda[]>
}
