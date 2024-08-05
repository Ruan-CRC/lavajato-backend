import { UUID } from 'node:crypto';

export interface AgendaInput {
  veiculoId: number;
  servicoIds: number[];
  dataInicio: Date;
  dataFim: Date;
}

export interface AgendaOutput {
  id: UUID;
  veiculoId: number;
  servicoIds: number[];
  dataInicio: Date;
  dataFim: Date;
}

export type AgendaError = {
  hasError: boolean;
  message?: string[];
};
