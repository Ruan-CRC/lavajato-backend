import ServicosInterface from '../interfaces/servicosInterface';
import { CreateInputDTO, CreateOutputDTO } from './DTOs/mainFunctions';

export default class CreateServicoService {
  constructor(private servicosInterface: ServicosInterface) { }

  async create(data: CreateInputDTO): Promise<CreateOutputDTO> {
    const servico = await this.servicosInterface.create(data);
    return {
      nome: servico.nome,
      descricao: servico.descricao ?? '',
      valor: servico.valor,
    };
  }
}
