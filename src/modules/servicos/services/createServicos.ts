import CreateServicosInterface from '../interfaces/createServicosInterface';

interface CreateInputDTO {
  nome: string;
  descricao?: string;
  valor: number;
}

interface CreateOutputDTO {
  nome: string;
  descricao?: string;
  valor: number;
}

export default class CreateServicoService {
  constructor(private createServicosInterface: CreateServicosInterface) {}

  async create(data: CreateInputDTO): Promise<CreateOutputDTO> {
    const servico = await this.createServicosInterface.create(data);
    return {
      nome: servico.nome,
      descricao: servico.descricao ?? '',
      valor: servico.valor,
    };
  }
}
