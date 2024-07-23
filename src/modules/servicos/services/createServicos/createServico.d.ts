export interface ServicosWithMetadados {
  id: number
  nome: string
  descricao: string
  servicoValor: {
    tipoVeiculoId: number
    valor: number
    tempo: number
  }[]
}

export interface InputServicosWithMetadados {
  nome: string
  descricao: string
  servicoValor: {
    tipoVeiculoId: number
    valor: number
    tempo: number
  }[]
}
