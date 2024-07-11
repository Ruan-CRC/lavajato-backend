export interface Payload {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly valor: number;
}

class Servico {
  constructor(public readonly payload: Payload) { }

  get servico() {
    return this.payload;
  }

  set servico(servico: Payload) {
    Object.assign(this.payload, servico);
  }
}

export default Servico;
