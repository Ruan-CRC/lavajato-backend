import { Agenda } from '@prisma/client';
import { CreateInputDTO } from '../DTOs/createDTO';

export interface ServicoVeiculoInterface {
  updateServico(
    idServico: string, dataInicio?: string, dataFim?: string
  ): Promise<Agenda>
  addServicos(props: CreateInputDTO): Promise<Agenda>
  getServicosEmAgendamento(): Promise<Agenda[]>
}
