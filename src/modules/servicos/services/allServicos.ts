import ServicosInterface from '../interfaces/servicosInterface';
import { AllServicesOutputDTO } from './DTOs/mainFunctions';

export default class AllServicosServices {
  constructor(private servicosInterface: ServicosInterface) { }

  async get(): Promise<AllServicesOutputDTO[]> {
    const servicos = await this.servicosInterface.all();

    return servicos.map((servico) => ({
      id: servico.id,
      nome: servico.nome,
      descricao: servico.descricao,
      valor: servico.valor,
    }));
  }
}
