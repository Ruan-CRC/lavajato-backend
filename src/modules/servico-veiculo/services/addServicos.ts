import { AddServicosInterface } from '../interfaces/addServicoInterface';

export default class AddServicosService {
  constructor(private addServicos: AddServicosInterface) {}

  async add(veiculoId: number, servicoId: number) {
    // TODO: validacao de veiculo e servico
    const servico = await this.addServicos.addServicos(veiculoId, servicoId);
    return servico;
  }
}
