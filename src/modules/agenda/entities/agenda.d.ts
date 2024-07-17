import { UUID } from 'node:crypto';

export interface AgendaInput {
  id?: UUID;
  veiculoId: number;
  servicoId: number[];
  dataInicio?: Date;
  dataFim?: Date;
}

export interface AgendaOutput {
  id: UUID;
  veiculoId: number;
  servicoId: number[];
  dataInicio: Date;
  dataFim: Date;
}
