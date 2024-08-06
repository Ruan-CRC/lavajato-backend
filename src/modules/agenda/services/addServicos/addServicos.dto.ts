import { UUID } from 'node:crypto';

export interface CreateInputDTO {
  id?: UUID;
  veiculoId: number;
  servicoIds: number[];
  dataInicio: Date;
}

export interface CreateOutputDTO {
  id: string;
  veiculoId: number;
  servicoIds: number[];
  dataInicio: Date;
  dataFim: Date;
}
