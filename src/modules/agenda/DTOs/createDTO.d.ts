export interface CreateInputDTO {
  veiculoId: number;
  servicoId: number[];
  dataInicio?: Date;
  dataFim?: Date;
}

export interface CreateOutputDTO {
  id: string;
  veiculoId: number;
  servicoId: number[];
  dataInicio: Date;
  dataFim: Date;
}
