export interface VeiculoImputDTO {
  placa: string
  tipo: string
}

export interface UserImputDTO {
  id: number
}

export interface VeiculosOutputDTO {
  id: number
  placa: string
  tipo: string
  userId: string
}
