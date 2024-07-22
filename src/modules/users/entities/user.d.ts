import { UUID } from 'node:crypto';

export interface UserCreateInput {
  email: string;
  password: string;
  telefone?: string;
  endereco?: string;
  veiculos: {
    placa: string;
    tipo: number;
  }[];
}

export interface UserCreateOutput {
  id: UUID;
  email: string;
  password: string;
  telefone?: string;
  endereco?: string;
  veiculos: {
    placa: string;
    tipo: number;
  }[];
}
