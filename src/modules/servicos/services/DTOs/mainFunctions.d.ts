export interface CreateInputDTO {
  nome: string;
  descricao?: string;
  valor: number;
}

export interface CreateOutputDTO {
  nome: string;
  descricao?: string;
  valor: number;
}

export interface AllServicesOutputDTO {
  id: number;
  nome: string;
  descricao: string | null;
  valor: number;
}
