import { UUID } from 'node:crypto';

export interface OutputCreateUser {
  id: UUID,
  email: string;
  telefone?: string
  endereco?: string
  veiculos: {
    placa: string;
    tipo: number;
  }[];
}
export interface InputCreateUser {
  email: string;
  password: string;
  telefone?: string
  endereco?: string
  veiculos: {
    placa: string;
    tipo: number;
  }[];
}
