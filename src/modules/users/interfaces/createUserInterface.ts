import { UUID } from 'node:crypto';
import { OutputCreateUser } from '../services/createUser/create.d';

export interface UserOutputDTO {
  id: string
  idUser: string
  email: string
  telefone?: string
  endereco?: string
}

export interface InputCreate {
  id: UUID;
  email: string
  password: string
  telefone?: string
  endereco?: string
  veiculos: {
    placa: string
    tipo: number
  }[]
}

export interface CreateUserInterface {
  findByEmail(email: string): Promise<UserOutputDTO | boolean>
  create(data: InputCreate): Promise<OutputCreateUser>
}
