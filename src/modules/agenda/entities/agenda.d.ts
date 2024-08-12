import { UUID } from 'node:crypto';

interface AgendaBase {
  veiculoId: number;
  servicoIds: number[];
  dataInicio: Date;
  dataFim: Date;
}

export interface AgendaInput extends AgendaBase {
  id?: UUID;
}

export interface AgendaOutput extends AgendaBase {
  id: UUID;
}

export type AgendaError = {
  hasError: boolean;
  message?: string[];
};

export interface AgendaCreateInputDTO extends Omit<AgendaInput, 'dataFim'> {}
