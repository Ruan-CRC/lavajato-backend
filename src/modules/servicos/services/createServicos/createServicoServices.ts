import ServicosInterface from '../../interfaces/servicosInterface';
import { ServicosWithMetadados, InputServicosWithMetadados } from './createServico';

export default class CreateServicoService {
  constructor(private servicosInterface: ServicosInterface) { }

  async create(data: InputServicosWithMetadados): Promise<ServicosWithMetadados> {
    const servico = await this.servicosInterface.create(data);
    return servico;
  }
}
