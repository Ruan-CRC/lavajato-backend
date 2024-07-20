export interface CreateInputDTO {
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
