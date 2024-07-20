import { UUID } from 'node:crypto';
import { Agenda } from '@prisma/client';
import { AgendaOutput } from '../entities/agenda.d';

export interface AgendasAll {
  id: string;
  veiculoId: string;
  dataInicio: string;
  dataFim: string;
  servicos: {
    id: string;
    nome: string;
    servicoValor: {
      id: string;
      valor: number;
    }
  }[]
}

export interface AddServicoInput {
  id: UUID;
  veiculoId: number;
  servicoIds: number[];
  dataInicio: Date;
  dataFim: Date;
}

export interface ServicoVeiculoInterface {
  updateServico(
    idServico: string, dataInicio?: string, dataFim?: string
  ): Promise<Agenda>
  addServicos(props: AddServicoInput): Promise<AgendaOutput>
  getServicosEmAgendamento(): Promise<AgendasAll[]>
}
